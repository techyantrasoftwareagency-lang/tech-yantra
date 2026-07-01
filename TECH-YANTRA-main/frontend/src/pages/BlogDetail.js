import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => { api.get(`/blog/${slug}`).then((r) => setPost(r.data)).catch(() => setErr(true)); }, [slug]);

  if (err) return <main className="pt-32 px-6 min-h-screen"><div className="max-w-3xl mx-auto"><Link to="/blog" className="text-crimson">← Back to blog</Link><h1 className="mt-4 font-display text-3xl">Post not found</h1></div></main>;
  if (!post) return <main className="pt-32 px-6 min-h-screen text-center">Loading…</main>;

  return (
    <main className="pt-32 pb-24 min-h-screen" data-testid="blog-detail-page">
      <article className="max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-crimson"><ArrowLeft size={14}/> Back to blog</Link>
        <div className="mt-6 flex gap-2 flex-wrap">{post.tags?.map((t) => <span key={t} className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-foreground/5 border border-border">{t}</span>)}</div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-black tracking-tighter leading-tight">{post.title}</h1>
        <div className="mt-3 text-sm text-muted-foreground">By {post.author}</div>
        <img src={post.cover} alt="" className="mt-8 w-full aspect-video object-cover rounded-2xl" />
        <p className="mt-8 text-lg leading-relaxed text-foreground/85 whitespace-pre-line">{post.content}</p>
      </article>
    </main>
  );
}
