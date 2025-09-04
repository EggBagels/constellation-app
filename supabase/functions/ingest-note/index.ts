// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("PROJECT_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;

type Note = { id: string; user_id: string; raw_text: string };

async function openai(path: string, body: unknown) {
  const res = await fetch(`https://api.openai.com/v1/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

Deno.serve(async (req) => {
  try {
    // 0) CORS preflight
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (!OPENAI_API_KEY) {
      return new Response("Missing OPENAI_API_KEY", { status: 500, headers: corsHeaders });
    }

    // 1) Validate JWT for POST
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return new Response("Missing Authorization header", { status: 401, headers: corsHeaders });
    }

    const { createClient } = await import("npm:@supabase/supabase-js");
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response("Invalid or expired token", { status: 401, headers: corsHeaders });
    }
    const authedUserId = userData.user.id;

    // 2) Parse body
    const { noteId } = await req.json();
    if (!noteId) {
      return new Response("noteId required", { status: 400, headers: corsHeaders });
    }

    // 3) Load and authorize note ownership
    const { data: note, error: nerr } = await admin
      .from("notes").select("*").eq("id", noteId).single() as { data: Note | null; error: any };

    if (nerr || !note) {
      return new Response("note not found", { status: 404, headers: corsHeaders });
    }
    if (note.user_id !== authedUserId) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }

    const text = (note.raw_text ?? "").trim();

    // 4) Summary
    const sum = await openai("chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize for quick recall in <=40 words. No fluff." },
        { role: "user", content: text }
      ],
      temperature: 0.2
    });
    const summary = sum.choices?.[0]?.message?.content ?? "";

    // 5) Tags
    const tagsRes = await openai("chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return ONLY a JSON array (5-10 strings, 1-3 words each) of tags to categorize the note." },
        { role: "user", content: text }
      ],
      temperature: 0.1
    });
    let tags: string[] = [];
    try { tags = JSON.parse(tagsRes.choices?.[0]?.message?.content ?? "[]"); } catch { tags = []; }

    // 6) Embedding
    const emb = await openai("embeddings", {
      model: "text-embedding-3-small",
      input: text || summary
    });
    const vector: number[] = emb.data[0].embedding;

    // 7) Write updates
    await admin.from("notes").update({
      cleaned_text: text,
      summary,
      updated_at: new Date().toISOString()
    }).eq("id", noteId);

    await admin.from("embeddings").insert({
      note_id: noteId, model: "text-embedding-3-small", vector
    });

    // 8) Upsert tags and note_tags
    const tagIds: string[] = [];
    for (const name of tags.slice(0, 10)) {
      const { data: t } = await admin
        .from("tags")
        .upsert({ user_id: note.user_id, name }, { onConflict: "user_id,name" })
        .select()
        .single();
      if (t) tagIds.push(t.id);
    }
    for (const tagId of tagIds) {
      await admin.from("note_tags").upsert({ note_id: noteId, tag_id: tagId });
    }

    // 9) Associations
    const { data: neighbors } = await admin.rpc("match_notes", {
      p_note_id: noteId, p_user_id: note.user_id, p_limit: 20
    });

    const edges = (neighbors ?? [])
      .filter((n: any) => n.similarity >= 0.45)
      .slice(0, 8);

    for (const n of edges) {
      await admin.from("edges").upsert({
        user_id: note.user_id,
        source_note_id: noteId,
        target_note_id: n.note_id,
        strength: n.similarity,
        reason: { by: "ai", method: "semantic", timestamp: new Date().toISOString() }
      }, { onConflict: "user_id,source_note_id,target_note_id" });
    }

    return new Response(JSON.stringify({ ok: true, summary, tags, linked: edges.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (e: any) {
    return new Response(e?.message ?? "error", { status: 500, headers: corsHeaders });
  }
});
