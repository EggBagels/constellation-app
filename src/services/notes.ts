import { supabase } from "@/lib/supabase";

/** Insert a raw note */
export async function createNote(raw: string, title?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: user.id, raw_text: raw, title }])
    .select()
    .single();

  if (error) throw error;
  return data; // { id, ... }
}

/** Trigger the Edge Function to summarize/tag/embed/link */
export async function ingestNote(noteId: string) {
  // grab access token for auth on the function call
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("Missing session");

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ingest-note`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ noteId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/** Fetch a simple graph (recent notes + all edges) */
export async function fetchGraph() {
  const { data: notes } = await supabase
    .from("notes")
    .select("id,title,summary,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const { data: edges } = await supabase
    .from("edges")
    .select("source_note_id,target_note_id,strength");

  return { notes: notes ?? [], edges: edges ?? [] };
}

/** Get one note with tags and related */
export async function getNote(noteId: string) {
  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  const { data: tagRows } = await supabase
    .from("note_tags")
    .select("tag_id, tags(name)")
    .eq("note_id", noteId);

  const tags = (tagRows ?? []).map((r: any) => r.tags.name);

  const { data: related } = await supabase
    .from("edges")
    .select("target:target_note_id(id,title,summary), strength")
    .eq("source_note_id", noteId)
    .order("strength", { ascending: false });

  return { note, tags, related: related ?? [] };
}
