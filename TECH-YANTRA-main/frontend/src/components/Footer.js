import { useState } from "react";
import { toast } from "sonner";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import Logo from "@/components/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Subscribed! We'll be in touch.");
      setEmail("");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally { setBusy(false); }
  };

  return (
    <footer className="relative mt-32 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <Logo size={48} />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-tight">TECH YANTRA</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Software Agency</span>
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tighter font-black leading-[0.95]">
            Engineering ideas <br/> into <span className="text-crimson">intelligent software.</span>
          </h2>
          <p className="mt-6 text-foreground/70 max-w-md">Subscribe to our newsletter — product playbooks, engineering essays and the occasional case study.</p>
          <form onSubmit={subscribe} className="mt-6 flex gap-2 max-w-md" data-testid="newsletter-form">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 px-4 py-3 rounded-full bg-foreground/5 border border-border focus:outline-none focus:border-crimson text-sm" data-testid="newsletter-input" />
            <button type="submit" disabled={busy} className="px-5 py-3 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson-hover disabled:opacity-60 btn-primary" data-testid="newsletter-submit">
              {busy ? "..." : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#about" className="hover:text-crimson transition">About</a></li>
              <li><a href="/careers" className="hover:text-crimson transition">Careers</a></li>
              <li><a href="/blog" className="hover:text-crimson transition">Blog</a></li>
              <li><a href="/#contact" className="hover:text-crimson transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#services" className="hover:text-crimson transition">Custom Software</a></li>
              <li><a href="/#services" className="hover:text-crimson transition">Mobile Apps</a></li>
              <li><a href="/#services" className="hover:text-crimson transition">AI Integration</a></li>
              <li><a href="/#services" className="hover:text-crimson transition">UI/UX Design</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Reach Us</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Mail size={13} className="text-crimson" /><a href="mailto:Techyantrasoftwareagency@gmail.com" className="hover:text-crimson break-all">Techyantrasoftwareagency@gmail.com</a></li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-crimson" /><a href="tel:+918607492753" className="hover:text-crimson">+91 8607492753</a></li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-crimson" /><a href="tel:+917248348002" className="hover:text-crimson">+91 7248348002</a></li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-crimson" /><a href="tel:+919310619583" className="hover:text-crimson">+91 9310619583</a></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a aria-label="Instagram" href="https://instagram.com/techyantra_" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-crimson hover:text-crimson transition"><Instagram size={14} /></a>
              <a aria-label="LinkedIn" href="#" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-crimson hover:text-crimson transition"><Linkedin size={14} /></a>
              <a aria-label="GitHub" href="#" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-crimson hover:text-crimson transition"><Github size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Tech Yantra Software Agency. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="/login" className="hover:text-foreground" data-testid="footer-login-link">Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
