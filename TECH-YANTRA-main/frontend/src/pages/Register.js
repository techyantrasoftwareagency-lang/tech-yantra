import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatApiError } from "@/lib/api";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await register(form);
      toast.success("Welcome to Tech Yantra");
      nav("/dashboard");
    } catch (e2) {
      const msg = formatApiError(e2.response?.data?.detail) || "Registration failed";
      setErr(msg); toast.error(msg);
    } finally { setBusy(false); }
  };

  return (
    <main className="pt-20 pb-24 min-h-screen px-6" data-testid="register-page">
      <div className="max-w-sm mx-auto pt-10">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="mt-2 text-[14px] text-foreground/60">Track your projects in one place.</p>
        <form onSubmit={submit} className="mt-8 space-y-3">
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-foreground/40 text-[14px]" data-testid="register-name" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-foreground/40 text-[14px]" data-testid="register-email" />
          <input placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-foreground/40 text-[14px]" data-testid="register-company" />
          <input required type="password" placeholder="Password (min 6 chars)" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-foreground/40 text-[14px]" data-testid="register-password" />
          {err && <div className="text-[13px] text-crimson">{err}</div>}
          <button type="submit" disabled={busy} className="w-full py-2.5 rounded-md bg-crimson text-white text-[14px] font-medium hover:bg-crimson-hover disabled:opacity-60" data-testid="register-submit">
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>
        <div className="mt-6 text-[13px] text-foreground/60">
          Already have an account? <Link to="/login" className="text-crimson hover:underline">Sign in</Link>
        </div>
      </div>
    </main>
  );
}
