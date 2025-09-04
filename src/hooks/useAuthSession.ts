import { useEffect, useState } from "react";
import { supabase, ensureUserRow, onAuthChanged } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) await ensureUserRow();
      setSession(session ?? null);
      setReady(true);
      const sub = onAuthChanged((s) => setSession(s));
      return () => sub.data.subscription.unsubscribe();
    })();
  }, []);

  return { session, ready };
}
