import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatApiError } from "@/lib/api";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const u = await login(email, password);
      toast.success("Welcome back");
      nav(u.role === "admin" ? "/admin" : "/dashboard");
    } catch (e2) {
      const msg = formatApiError(e2.response?.data?.detail) || "Login failed";
      setErr(msg); toast.error(msg);
    } finally { setBusy(false); }
  };

  return (
    <main className="pt-20 pb-24 min-h-screen px-6" data-testid="login-page">
      <div className="max-w-sm mx-auto pt-10">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-2 text-[14px] text-foreground/60">Welcome back to Tech Yantra.</p>
        <form onSubmit={submit} className="mt-8 space-y-3">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-foreground/40 text-[14px]" data-testid="login-email" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-foreground/40 text-[14px]" data-testid="login-password" />
          {err && <div className="text-[13px] text-crimson">{err}</div>}
          <button type="submit" disabled={busy} className="w-full py-2.5 rounded-md bg-crimson text-white text-[14px] font-medium hover:bg-crimson-hover disabled:opacity-60" data-testid="login-submit">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="mt-6 text-[13px] text-foreground/60">
          No account? <Link to="/register" className="text-crimson hover:underline" data-testid="login-register-link">Create one</Link>
        </div>
      </div>
    </main>
  );
}
