import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle } from "lucide-react";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  useEffect(() => { api.get("/client/projects").then((r) => setProjects(r.data)).catch(() => {}); }, []);

  return (
    <main className="pt-28 pb-24 min-h-screen" data-testid="client-dashboard">
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">Client portal</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tighter">Welcome, {user?.name}.</h1>
        <p className="mt-3 text-foreground/70">Track your active projects, share updates and chat with the team.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div key={p.id} className="p-6 rounded-2xl border border-border bg-foreground/[0.02]">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">{p.status}</div>
              <h3 className="font-display text-xl font-bold mt-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              <div className="mt-4">
                <div className="h-2 rounded-full bg-foreground/10 overflow-hidden"><div className="h-full bg-crimson" style={{ width: `${p.progress}%` }} /></div>
                <div className="mt-1 text-xs text-muted-foreground">{p.progress}% complete</div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="md:col-span-2 p-10 rounded-2xl border border-dashed border-border text-center">
              <h3 className="font-display text-xl font-bold">No active projects yet.</h3>
              <p className="mt-2 text-sm text-muted-foreground">Once we kick off your project, you&apos;ll see real-time updates here.</p>
              <a href="https://wa.me/918607492753" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm hover:bg-crimson-hover transition" data-testid="client-wa-btn">
                <MessageCircle size={14}/> Chat with us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
