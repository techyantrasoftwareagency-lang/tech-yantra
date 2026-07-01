import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ArrowUpRight, Sparkles, Code2, Smartphone, Cloud, Brain, Globe, ShoppingCart, Cog, FlaskConical, GraduationCap, Layers, Workflow, ShieldCheck, Zap, Search, Headphones, Wallet, Star, Check, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const SERVICES = [
  { icon: Code2, title: "Custom Software", desc: "End-to-end product engineering for startups and enterprises." },
  { icon: Globe, title: "Website Development", desc: "Lightning-fast marketing sites and web apps." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps with delightful UX." },
  { icon: Brain, title: "AI Integration", desc: "LLM-powered features, RAG, agents and evals in production." },
  { icon: Layers, title: "SaaS Product Development", desc: "Multi-tenant SaaS platforms with billing and analytics." },
  { icon: Sparkles, title: "UI/UX Design", desc: "Premium product design and design systems." },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, GCP and Azure — secure and scalable infrastructure." },
  { icon: Cog, title: "API Development", desc: "Battle-tested REST and GraphQL APIs with versioning." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Conversion-focused stores and headless commerce." },
  { icon: Workflow, title: "Automation", desc: "Workflow automation and internal tools that save hours weekly." },
  { icon: FlaskConical, title: "Testing & QA", desc: "Automated, manual and performance QA pipelines." },
  { icon: GraduationCap, title: "Final Year Projects", desc: "Mentor-led projects for engineering students." },
];

const TECHS = ["React", "Next.js", "Flutter", "Node.js", "Express", "MongoDB", "Firebase", "AWS", "Docker", "Python", "OpenAI", "TensorFlow", "PostgreSQL", "GitHub"];

const WHY = [
  { icon: Sparkles, t: "Modern UI" }, { icon: Code2, t: "Clean Code" }, { icon: ShieldCheck, t: "Secure Architecture" },
  { icon: Zap, t: "Fast Performance" }, { icon: Search, t: "SEO Optimized" }, { icon: Brain, t: "AI Powered" },
  { icon: Headphones, t: "24/7 Support" }, { icon: Wallet, t: "Affordable Pricing" },
];

const TESTIMONIALS = [
  { name: "Aarav Mehta", co: "Finlytics", rating: 5, text: "Tech Yantra rebuilt our trading dashboard with a level of polish I didn't think possible at the timeline they quoted." },
  { name: "Priya Sharma", co: "Brewline", rating: 5, text: "Our Flutter app shipped in 7 weeks, complete with payments and loyalty. Their team treats your product like their own." },
  { name: "Daniel Kapoor", co: "Atlas Edu", rating: 5, text: "Strategy, design, engineering — all in one team. We finally have a partner instead of a vendor." },
  { name: "Sneha Iyer", co: "Verba AI", rating: 5, text: "From ideation to a paid product in under 3 months. The AI integrations are tasteful and reliable." },
];

const PRICING = [
  { name: "Starter", price: "₹9,999", desc: "For founders validating an idea.", features: ["Landing page or single-page app", "Up to 5 sections", "Basic CMS", "Mobile responsive", "2 weeks delivery"], cta: "Start small" },
  { name: "Business", price: "₹24,999", desc: "For growing teams shipping a real product.", features: ["Custom web app or SaaS", "Auth, dashboard, payments", "Up to 20 screens", "Admin panel", "6–8 weeks delivery", "3 months support"], cta: "Most popular", featured: true },
  { name: "Enterprise", price: "Custom", desc: "For complex platforms and AI products.", features: ["Custom architecture", "AI / ML integration", "Multi-tenant SaaS", "SLA & security audit", "Dedicated team", "12 months support"], cta: "Let's talk" },
];

const FAQS = [
  { q: "How much does a typical project cost?", a: "Most projects range from ₹9,999 for a polished landing page to custom quotes for complex SaaS platforms. We share a transparent breakdown after discovery." },
  { q: "How long does delivery take?", a: "Landing pages ship in 1–2 weeks. Mobile apps and dashboards take 6–10 weeks. Enterprise platforms take 3–6 months — we always commit to a sprint plan." },
  { q: "Do you provide maintenance & support?", a: "Yes — every project ships with 1–3 months of post-launch support. We also offer retainer plans for ongoing iteration and 24/7 monitoring." },
  { q: "What technologies do you use?", a: "React, Next.js, Flutter, FastAPI, Node.js, MongoDB, Postgres, AWS, OpenAI and more. We pick the stack that fits your use case — not the other way around." },
  { q: "Do you handle hosting?", a: "Yes. We set up production-grade hosting on AWS, GCP, Vercel or your preferred cloud, with CI/CD, monitoring and backups configured." },
  { q: "Do you sign NDAs?", a: "Absolutely. We sign an NDA before any sensitive discussion and use enterprise-grade tooling for code and design." },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="particle animate-float-slow" style={{
          top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`,
          animationDelay: `${i * 0.4}s`, animationDuration: `${4 + (i % 5)}s`,
          opacity: 0.15 + (i % 5) * 0.08,
        }} />
      ))}
    </div>
  );
}

function SectionHeader({ kicker, title, sub, center }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/30 bg-crimson/5">
        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-glow" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">{kicker}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tighter font-black leading-[1.02]">{title}</h2>
      {sub && <p className="mt-4 text-base md:text-lg text-foreground/70 leading-relaxed">{sub}</p>}
    </div>
  );
}

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [active, setActive] = useState("All");
  const [openItem, setOpenItem] = useState(null);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => { api.get("/portfolio").then((r) => setPortfolio(r.data)).catch(() => {}); }, []);
  useEffect(() => {
    const t = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const categories = ["All", "Business Websites", "Mobile Apps", "AI Projects", "Dashboards", "SaaS Products", "E-commerce"];
  const filtered = active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", budget: "", project_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/inquiries", form);
      toast.success("Thanks! We'll reach out within 24 hours.");
      const wa = `https://wa.me/918607492753?text=${encodeURIComponent(`Hi Tech Yantra, I'm ${form.name} from ${form.company || "—"}. ${form.message}`)}`;
      window.open(wa, "_blank");
      setForm({ name: "", email: "", phone: "", company: "", budget: "", project_type: "", message: "" });
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <main className="pt-24" data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden hero-glow grain">
        <Particles />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-7">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/40 bg-crimson/5">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">Engineering Ideas Into Intelligent Software</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95]">
              We build software that <span className="text-gradient">moves businesses forward.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
              Custom software, websites, AI solutions, mobile apps, automation and scalable digital products for startups and enterprises.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-crimson text-white font-medium hover:bg-crimson-hover transition btn-primary" data-testid="hero-cta-consult">
                Get Free Consultation <ArrowUpRight size={16} />
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border hover:border-foreground/40 transition" data-testid="hero-cta-work">View Our Work</a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[["100+", "Projects shipped"], ["48hr", "Average response"], ["12+", "Tech stacks"], ["24/7", "Support"]].map(([n, l]) => (
                <div key={n}>
                  <div className="font-display text-3xl font-black tracking-tight">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden beam-border">
              <img src="https://images.unsplash.com/photo-1624533358643-7336036c9482?w=1200" alt="" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-crimson/20" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                <div className="glass-dark rounded-xl p-3"><div className="font-mono text-[10px] text-crimson uppercase tracking-widest">AI</div><div className="font-display font-bold mt-1">Agents & RAG</div></div>
                <div className="glass-dark rounded-xl p-3"><div className="font-mono text-[10px] text-crimson uppercase tracking-widest">Cloud</div><div className="font-display font-bold mt-1">AWS · GCP</div></div>
                <div className="glass-dark rounded-xl p-3"><div className="font-mono text-[10px] text-crimson uppercase tracking-widest">Web</div><div className="font-display font-bold mt-1">React · Next.js</div></div>
                <div className="glass-dark rounded-xl p-3"><div className="font-mono text-[10px] text-crimson uppercase tracking-widest">Mobile</div><div className="font-display font-bold mt-1">Flutter · iOS</div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5"><SectionHeader kicker="Why Tech Yantra" title="We turn ideas into scalable software." sub="From websites and mobile applications to AI-powered platforms and enterprise software, we craft digital products that are fast, secure and designed for growth." /></div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[["100+", "Projects delivered", "across 12+ industries"], ["Fast", "Delivery", "weekly demos, sprint plans"], ["Modern", "Technologies", "React · Next · Flutter · AI"], ["End-to-End", "Support", "from idea to scale"]].map(([k, t, d], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:border-crimson/40 transition">
                <div className="font-display text-4xl font-black tracking-tighter text-crimson">{k}</div>
                <div className="font-display font-bold mt-2">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader kicker="Services" title="Everything you need to ship." sub="A full-stack team — design, engineering, AI and DevOps — under one roof." center />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.05 }} className="group relative p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] transition" data-testid={`service-card-${i}`}>
                <div className="w-11 h-11 rounded-xl bg-crimson/10 grid place-items-center mb-4 group-hover:bg-crimson/20 transition">
                  <Icon size={20} className="text-crimson" />
                </div>
                <h3 className="font-display font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader kicker="Work" title="Recent projects, lovingly built." center />
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-sm border transition ${active === c ? "bg-crimson text-white border-crimson" : "border-border hover:border-crimson/60"}`} data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.button key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }} onClick={() => setOpenItem(p)} className="group text-left rounded-2xl overflow-hidden border border-border hover:border-crimson/50 bg-foreground/[0.02] transition" data-testid={`portfolio-card-${i}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">{p.category}</div>
                  <h3 className="font-display text-lg font-bold mt-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <Dialog open={!!openItem} onOpenChange={() => setOpenItem(null)}>
          <DialogContent className="max-w-2xl">
            {openItem && (
              <>
                <img src={openItem.image} alt="" className="w-full aspect-video object-cover rounded-lg" />
                <DialogHeader>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">{openItem.category}</div>
                  <DialogTitle className="font-display text-2xl">{openItem.title}</DialogTitle>
                  <DialogDescription>{openItem.description}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-1.5">
                  {openItem.tags?.map((t) => <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-foreground/5 border border-border">{t}</span>)}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* TECHNOLOGIES */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Our Stack</div>
          <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold">Modern technologies, mastered.</h2>
        </div>
        <div className="mt-10 relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="marquee-track gap-12 py-2">
            {[...TECHS, ...TECHS].map((t, i) => (
              <div key={i} className="font-display font-black text-2xl md:text-3xl text-foreground/40 hover:text-crimson transition whitespace-nowrap">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader kicker="Why Choose Us" title="Built with care. Delivered with confidence." center />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY.map(({ icon: Icon, t }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.05 }} className="p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:shadow-[0_8px_40px_-12px_rgba(229,57,53,0.3)] hover:border-crimson/40 transition text-center">
                <Icon size={22} className="mx-auto text-crimson" />
                <div className="font-display font-bold mt-3">{t}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeader kicker="Testimonials" title="What our clients say." center />
          <div className="mt-12 relative h-64">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote key={t.name} initial={false} animate={{ opacity: i === tIdx ? 1 : 0, y: i === tIdx ? 0 : 20 }} transition={{ duration: 0.5 }} className={`absolute inset-0 ${i === tIdx ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={16} className="fill-crimson text-crimson" />)}
                </div>
                <p className="font-display text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 text-sm">
                  <div className="font-bold">{t.name}</div>
                  <div className="text-muted-foreground">{t.co}</div>
                </div>
              </motion.blockquote>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} className={`h-1.5 rounded-full transition-all ${i === tIdx ? "w-8 bg-crimson" : "w-1.5 bg-foreground/20"}`} aria-label={`testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader kicker="Pricing" title="Transparent, honest pricing." sub="No hidden fees. Pay for outcomes, not seat-hours." center />
          <div className="mt-14 grid md:grid-cols-3 gap-5 items-stretch">
            {PRICING.map((p) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative p-7 rounded-2xl border ${p.featured ? "beam-border bg-foreground/[0.04] md:scale-[1.03]" : "border-border bg-foreground/[0.02]"}`} data-testid={`pricing-${p.name.toLowerCase()}`}>
                {p.featured && <span className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-crimson text-white text-[10px] font-mono uppercase tracking-widest">Most Popular</span>}
                <div className="font-display text-xl font-bold">{p.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
                <div className="mt-6 font-display text-4xl font-black tracking-tighter">{p.price}<span className="text-sm font-normal text-muted-foreground ml-1">/ project</span></div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check size={15} className="text-crimson mt-0.5 flex-none" /><span>{f}</span></li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-7 block text-center py-3 rounded-full text-sm font-medium transition ${p.featured ? "bg-crimson text-white hover:bg-crimson-hover" : "border border-border hover:border-foreground/40"}`}>{p.cta}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader kicker="FAQ" title="Questions, answered." center />
          <Accordion type="single" collapsible className="mt-10" data-testid="faq-accordion">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-base md:text-lg font-semibold hover:no-underline hover:text-crimson text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionHeader kicker="Contact" title="Let's build something remarkable." sub="Tell us about your project — we'll reply within 24 hours." />
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3"><MapPin size={15} className="text-crimson" /> Remote · India</div>
              <div>📧 Techyantrasoftwareagency@gmail.com</div>
              <div>📞 +91 8607492753 · 7248348002 · 9310619583</div>
              <div>📷 Instagram: @techyantra_</div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="p-6 md:p-8 rounded-2xl border border-border bg-foreground/[0.02] space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-crimson text-sm" data-testid="contact-name" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-crimson text-sm" data-testid="contact-email" />
                <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-crimson text-sm" data-testid="contact-phone" />
                <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-crimson text-sm" data-testid="contact-company" />
                <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                  <SelectTrigger className="rounded-xl bg-background border border-border" data-testid="contact-budget"><SelectValue placeholder="Project Budget" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< ₹10k">Under ₹10k</SelectItem>
                    <SelectItem value="₹10k - ₹25k">₹10k – ₹25k</SelectItem>
                    <SelectItem value="₹25k - ₹1L">₹25k – ₹1L</SelectItem>
                    <SelectItem value="₹1L+">₹1L+</SelectItem>
                    <SelectItem value="Not sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={form.project_type} onValueChange={(v) => setForm({ ...form, project_type: v })}>
                  <SelectTrigger className="rounded-xl bg-background border border-border" data-testid="contact-type"><SelectValue placeholder="Project Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="SaaS Product">SaaS Product</SelectItem>
                    <SelectItem value="AI Integration">AI Integration</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <textarea required rows={5} placeholder="Tell us about your project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-crimson text-sm" data-testid="contact-message" />
              <Button type="submit" disabled={submitting} className="w-full bg-crimson hover:bg-crimson-hover text-white rounded-full py-6 text-base font-medium btn-primary" data-testid="contact-submit">
                {submitting ? "Sending…" : "Send & Continue on WhatsApp"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
