import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MagicLinkLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) alert(error.message);
    else setSent(true);
  };

  if (sent) return <p className="text-sm opacity-80">Check your email for a login link.</p>;

  return (
    <div className="flex gap-2">
      <input
        className="neural-input max-w-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        type="email"
      />
      <button className="btn-cosmic" onClick={send} disabled={loading || !email}>
        {loading ? "Sending..." : "Send magic link"}
      </button>
    </div>
  );
}
