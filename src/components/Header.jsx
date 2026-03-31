import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const baseBg = isHome && !scrolled
    ? "bg-transparent border-b border-primary-foreground/10"
    : scrolled
      ? "bg-primary/95 backdrop-blur-md shadow-md border-b border-primary/20"
      : "bg-primary border-b border-primary/10";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${baseBg}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between h-20 sm:h-24">

        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <span
            className="text-primary-foreground font-bold tracking-tight transition-colors duration-300 group-hover:text-accent"
            style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "28px" }}
          >
            QUINN
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-10">
          {[
            { label: "Home", to: "/" },
            { label: "About", to: "#" },
            { label: "Services", to: "/Services" },
            { label: "Contact", to: "/Contact" },
          ].map(({ label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`text-xs uppercase tracking-[0.15em] transition-colors duration-200 relative group ${active ? "text-accent" : "text-primary-foreground hover:text-accent"}`}
                style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center">
          <Link to="/Contact">
            <button
              className="relative overflow-hidden group text-xs uppercase tracking-[0.15em] text-accent border border-accent/60 px-6 py-2.5 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] hover:-translate-y-0.5"
              style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <button className="text-primary-foreground p-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-sm">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary border-l border-primary-foreground/10 w-[85vw] max-w-sm p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-8 py-6 border-b border-primary-foreground/10">
                <span
                  className="text-primary-foreground font-bold tracking-tight"
                  style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "24px" }}
                >
                  QUINN
                </span>
                <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col px-8 pt-10 gap-8">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "#" },
                  { label: "Services", to: "/Services" },
                  { label: "Insights", to: "#" },
                  { label: "Contact", to: "/Contact" },
                ].map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="text-primary-foreground hover:text-accent transition-colors text-sm tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto px-8 py-10 border-t border-primary-foreground/10 bg-primary-foreground/5">
                <Link to="/Contact" onClick={() => setOpen(false)}>
                  <button
                    className="w-full text-xs uppercase tracking-[0.2em] text-accent border border-accent/60 px-5 py-4 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                    style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}