import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Inbox, Users, Briefcase, BookOpen, GraduationCap, Mail } from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "users", label: "Users", icon: Users },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "careers", label: "Careers", icon: GraduationCap },
  { id: "newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("inquiries");
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const s = await api.get("/admin/stats");
      setStats(s.data);
      const map = { inquiries: "/admin/inquiries", users: "/admin/users", portfolio: "/portfolio", blog: "/admin/all-blog", careers: "/admin/all-careers", newsletter: "/admin/newsletter" };
      const d = await api.get(map[tab]);
      setData(d.data);
    } catch (e) { toast.error("Failed to load"); }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [tab]);

  const del = async (path, id) => {
    try {
      await api.delete(`${path}/${id}`);
      toast.success("Deleted");
      load();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <main className="pt-28 pb-24 min-h-screen" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">Admin</div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tighter">Welcome, {user?.name}.</h1>
          </div>
        </div>

        {stats && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-3">
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="p-4 rounded-xl border border-border bg-foreground/[0.02]">
                <div className="font-display text-2xl font-black">{v}</div>
                <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mt-1">{k}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition ${tab === t.id ? "bg-crimson text-white border-crimson" : "border-border hover:border-crimson/60"}`} data-testid={`admin-tab-${t.id}`}>
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-foreground/[0.03]">
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {tab === "inquiries" && <><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Type</th><th className="p-3">Budget</th><th className="p-3">Message</th><th className="p-3 w-12"></th></>}
                {tab === "users" && <><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Company</th></>}
                {tab === "portfolio" && <><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Tags</th><th className="p-3 w-12"></th></>}
                {tab === "blog" && <><th className="p-3">Title</th><th className="p-3">Slug</th><th className="p-3">Published</th><th className="p-3 w-12"></th></>}
                {tab === "careers" && <><th className="p-3">Title</th><th className="p-3">Dept</th><th className="p-3">Location</th><th className="p-3">Active</th><th className="p-3 w-12"></th></>}
                {tab === "newsletter" && <><th className="p-3">Email</th><th className="p-3">Subscribed</th></>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={row.id || idx} className="border-t border-border hover:bg-foreground/[0.02]">
                  {tab === "inquiries" && <><td className="p-3">{row.name}</td><td className="p-3">{row.email}</td><td className="p-3">{row.project_type || "—"}</td><td className="p-3">{row.budget || "—"}</td><td className="p-3 max-w-sm truncate">{row.message}</td><td className="p-3"><button onClick={() => del("/admin/inquiries", row.id)} className="text-crimson hover:opacity-70"><Trash2 size={14}/></button></td></>}
                  {tab === "users" && <><td className="p-3">{row.name}</td><td className="p-3">{row.email}</td><td className="p-3"><span className={`px-2 py-0.5 rounded text-xs ${row.role === "admin" ? "bg-crimson/20 text-crimson" : "bg-foreground/10"}`}>{row.role}</span></td><td className="p-3">{row.company || "—"}</td></>}
                  {tab === "portfolio" && <><td className="p-3">{row.title}</td><td className="p-3">{row.category}</td><td className="p-3 truncate max-w-xs">{(row.tags || []).join(", ")}</td><td className="p-3"><button onClick={() => del("/admin/portfolio", row.id)} className="text-crimson hover:opacity-70"><Trash2 size={14}/></button></td></>}
                  {tab === "blog" && <><td className="p-3">{row.title}</td><td className="p-3 font-mono text-xs">{row.slug}</td><td className="p-3">{row.published ? "Yes" : "No"}</td><td className="p-3"><button onClick={() => del("/admin/blog", row.id)} className="text-crimson hover:opacity-70"><Trash2 size={14}/></button></td></>}
                  {tab === "careers" && <><td className="p-3">{row.title}</td><td className="p-3">{row.department}</td><td className="p-3">{row.location}</td><td className="p-3">{row.active ? "Yes" : "No"}</td><td className="p-3"><button onClick={() => del("/admin/careers", row.id)} className="text-crimson hover:opacity-70"><Trash2 size={14}/></button></td></>}
                  {tab === "newsletter" && <><td className="p-3">{row.email}</td><td className="p-3 text-muted-foreground">{row.created_at?.slice(0,10)}</td></>}
                </tr>
              ))}
              {data.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No records.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
