import { useState, useRef, useEffect } from "react";
import { ArrowRight, MapPin, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", matter: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary relative overflow-hidden min-h-[45vh] flex flex-col justify-end">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" style={{ animation: "floatA 7s ease-in-out infinite" }} />
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-accent/6 rounded-full blur-[80px]" style={{ animation: "floatB 9s ease-in-out 3s infinite" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
          {/* Decorative lines */}
          <div className="absolute right-1/4 top-0 bottom-0 w-px bg-primary-foreground/10" />
          <div className="absolute right-1/3 top-0 h-1/2 w-px bg-primary-foreground/6" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-16 pt-32" style={{ animation: "heroFadeIn 0.9s ease-out both" }}>
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Get in touch.</p>
          <h1
            className="text-primary-foreground leading-tight"
            style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Every angle, every path,<br />airtight answers.
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-12 sm:gap-20">

            {/* Contact info */}
            <div className="sm:col-span-2">
              <AnimatedElement>
                <p className="text-muted-foreground text-sm leading-relaxed mb-10" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                  Whether you’re navigating a complex international transaction, responding to an IRS notice, or simply trying to understand your exposure — we’re ready to help. Reach out and we’ll respond within one business day.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Email</p>
                      <a href="mailto:contact@quinnglobaltax.com" className="text-foreground text-sm hover:text-accent transition-colors duration-200" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                        contact@quinnglobaltax.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Location</p>
                      <p className="text-foreground text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Chicago, IL — serving clients globally</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Response Time</p>
                      <p className="text-foreground text-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Within one business day</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              {/* Divider */}
              <AnimatedElement delay={200}>
                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>A Note on Confidentiality</p>
                  <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                    Submitting this form does not create an attorney-client relationship. All inquiries are treated with strict confidentiality.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            {/* Form */}
            <div className="sm:col-span-3">
              <AnimatedElement delay={150}>
                {submitted ? (
                  <div className="bg-secondary p-10 sm:p-14 flex flex-col items-start gap-4" style={{ minHeight: "400px" }}>
                    <div className="w-10 h-px bg-accent mb-6" />
                    <h2
                      className="text-foreground leading-tight"
                      style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(24px, 3vw, 36px)" }}
                    >
                      Message received.
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                      Thank you for reaching out. We'll review your inquiry and be in touch within one business day.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", matter: "", message: "" }); }}
                      className="mt-6 text-accent text-sm uppercase tracking-wide hover:underline"
                      style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Full Name *</Label>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-accent"
                          style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Email Address *</Label>
                        <Input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-accent"
                          style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Company / Entity</Label>
                        <Input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company name (optional)"
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground/50"
                          style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Matter Type</Label>
                        <Input
                          name="matter"
                          value={form.matter}
                          onChange={handleChange}
                          placeholder="e.g. International tax, M&A, IRS"
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground/50"
                          style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Tell Us About Your Situation *</Label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Briefly describe your tax or legal matter..."
                        className="bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 resize-none focus:ring-accent"
                        style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative overflow-hidden group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-3 text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                    </button>
                  </form>
                )}
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom quote */}
      <section className="bg-secondary py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/8 rounded-full blur-[60px]" />
        </div>
        <AnimatedElement>
          <div className="max-w-3xl mx-auto px-6 sm:px-12 text-center">
            <p
              className="text-foreground leading-relaxed"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(18px, 2.5vw, 28px)" }}
            >
              "We give clients the caliber of a global team with the clarity and access of a trusted advisor."
            </p>
            <p className="text-muted-foreground text-xs mt-4 uppercase tracking-widest" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
              Quinn Global Tax Law
            </p>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}