import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
      />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top section */}
        <div className="py-16 sm:py-20 border-b border-primary-foreground/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Brand column */}
            <div className="sm:col-span-1">
              <Link to="/">
                <span
                  className="text-primary-foreground font-bold text-2xl tracking-tight block mb-4"
                  style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}
                >
                  QUINN
                </span>
              </Link>
              <p
                className="text-accent leading-tight mb-6"
                style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(22px, 3vw, 32px)" }}
              >
                Protect<br />what's yours.
              </p>
              <p className="text-primary-foreground/50 text-xs leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                Global tax and legal experts simplifying complexity so you can focus on what matters most.
              </p>
            </div>

            {/* Navigation column */}
            <div>
              <p className="text-primary-foreground/40 text-xs uppercase tracking-[0.2em] mb-6" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                Navigation
              </p>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                >
                  Home
                </Link>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                >
                  About
                </a>
                <Link
                  to="/Services"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                >
                  Services
                </Link>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                >
                  Insights
                </a>
                <Link
                  to="/Contact"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Services column */}
            <div>
              <p className="text-primary-foreground/40 text-xs uppercase tracking-[0.2em] mb-6" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                Services
              </p>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>International Tax Planning</a>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>M&amp;A &amp; Transactional Tax</a>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>IRS Tax Controversy</a>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Compliance &amp; Filing</a>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Estate Planning</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-primary-foreground/40 text-xs"
            style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
          >
            © 2025 Quinn Global Tax Law. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-primary-foreground/40 text-xs hover:text-primary-foreground/70 transition-colors duration-200"
              style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-primary-foreground/40 text-xs hover:text-primary-foreground/70 transition-colors duration-200"
              style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-primary-foreground/40 text-xs hover:text-primary-foreground/70 transition-colors duration-200"
              style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
            >
              Attorney Advertising
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}