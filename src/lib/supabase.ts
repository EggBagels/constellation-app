import { createClient, type Session } from "@supabase/supabase-js";

// These come from .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://resphktomumelwvakzei.supabase.co";
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlc3Boa3RvbXVtZWx3dmFremVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MzA0MzIsImV4cCI6MjA3MjUwNjQzMn0.7JBvHn6Bak2mo8FMiAjcw0-SrGom5d0XJqabgyuysXA";

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

/** Ensure there's a row in public.users that matches auth.users */
export async function ensureUserRow() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from("users")
    .upsert({ id: user.id, email: user.email ?? null }, { onConflict: "id" });
}

/** Subscribe to auth changes (call once on app mount) */
export function onAuthChanged(cb: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) await ensureUserRow();
    cb(session ?? null);
  });
}
