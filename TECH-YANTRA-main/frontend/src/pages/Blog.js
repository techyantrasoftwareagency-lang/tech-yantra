import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { api.get("/blog").then((r) => setPosts(r.data)).catch(() => {}); }, []);

  return (
    <main className="pt-20 pb-24 min-h-screen" data-testid="blog-page">
      <div className="max-w-5xl mx-auto px-6 pt-16">
        <div className="text-[12px] uppercase tracking-wider text-foreground/50">Writing</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">Notes from the studio.</h1>
        <p className="mt-4 text-foreground/65 max-w-xl">Short essays on building software, working with clients and shipping things.</p>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {posts.map((p, i) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="block py-8 group grid md:grid-cols-12 gap-6 items-center" data-testid={`blog-card-${i}`}>
              <div className="md:col-span-3 aspect-[4/3] overflow-hidden rounded-md bg-foreground/5 border border-border">
                <img src={p.cover} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="md:col-span-9">
                <div className="flex gap-2 flex-wrap mb-2">
                  {p.tags?.map((t) => <span key={t} className="text-[11px] text-foreground/50">{t}</span>)}
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-crimson transition">{p.title}</h2>
                <p className="text-[15px] text-foreground/65 mt-2 max-w-2xl">{p.excerpt}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[13px] text-crimson">Read <ArrowRight size={12} /></div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && <div className="py-8 text-foreground/60">No posts yet.</div>}
        </div>
      </div>
    </main>
  );
}
