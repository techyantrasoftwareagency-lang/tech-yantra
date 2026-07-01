import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#portfolio", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4" data-testid="navbar">
      <div className="mx-auto max-w-7xl">
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl ${theme === "dark" ? "glass-dark" : "glass-light"}`}>
          <Link to="/" className="flex items-center gap-2.5 group" data-testid="logo-link">
            <Logo size={40} />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] tracking-tight">TECH YANTRA</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Software Agency</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                className="px-3 py-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
                data-testid={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-crimson/60 transition" data-testid="theme-toggle" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => nav(user.role === "admin" ? "/admin" : "/dashboard")} data-testid="nav-dashboard-btn">
                  {user.role === "admin" ? "Admin" : "Dashboard"}
                </Button>
                <Button variant="outline" size="sm" onClick={logout} data-testid="nav-logout-btn">Logout</Button>
              </>
            ) : (
              <a href={loc.pathname === "/" ? "#contact" : "/#contact"} className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson-hover transition btn-primary" data-testid="nav-cta-btn">
                Start a Project <ArrowUpRight size={14} />
              </a>
            )}
            <button className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-border" onClick={() => setOpen(!open)} data-testid="mobile-menu-btn" aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {open && (
          <div className={`md:hidden mt-2 rounded-2xl p-4 ${theme === "dark" ? "glass-dark" : "glass-light"}`}>
            {links.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-foreground/80 hover:text-crimson">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
