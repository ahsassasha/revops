import { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

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

const faqs = [
  { q: "Do you work with individuals as well as businesses?", a: "Yes. We work with high-net-worth individuals, entrepreneurs, executives, and businesses at every stage — from startups to multinational enterprises." },
  { q: "Can you handle matters in multiple countries simultaneously?", a: "Absolutely. Cross-border complexity is our specialty. We coordinate across jurisdictions to deliver integrated strategies that hold up in every country involved." },
  { q: "How quickly can you respond to a tax emergency or IRS notice?", a: "Urgent matters receive priority attention. For time-sensitive IRS notices or impending deadlines, we typically respond within 24 hours with an initial assessment." },
  { q: "What makes Quinn different from a Big Four accounting firm?", a: "Integration. At Quinn, tax law and legal strategy are unified under one roof, not siloed. You get faster answers, fewer handoffs, and strategies that actually fit together — at significantly lower overhead." },
  { q: "Do you charge a percentage of taxes saved?", a: "No, and we never will. We believe charging a percentage of savings creates misaligned incentives. Our fees are based on the value and complexity of the work, not outcomes." },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    base44.entities.Service.list().then(setServices).catch(() => {});
  }, []);

  const staticFallback = [
    { number: "1", title: "International & Cross-Border Tax Planning", description: "Comprehensive strategies for multinational structures, foreign tax credits, treaty optimization, and global compliance frameworks designed to minimize exposure across jurisdictions.", category: "tax" },
    { number: "2", title: "M&A, Corporate & Transactional Tax", description: "End-to-end tax counsel for mergers, acquisitions, restructurings, and complex transactions — from due diligence through closing and post-merger integration.", category: "corporate" },
    { number: "3", title: "IRS & State Tax Controversy", description: "Aggressive representation in audits, appeals, and litigation before the IRS, Tax Court, and state revenue agencies. We protect your rights at every level.", category: "controversy" },
    { number: "4", title: "Compliance & Filing", description: "Accurate, timely preparation of individual, corporate, trust, and partnership returns across all jurisdictions — built on precision, not approximation.", category: "compliance" },
    { number: "5", title: "Estate & Wealth Transfer Planning", description: "Trust structures, gifting strategies, and succession planning designed to protect and transfer wealth across generations with minimal tax friction.", category: "estate" },
    { number: "6", title: "Private Client & Family Office", description: "Holistic tax and legal advisory for high-net-worth individuals, executives, and family offices with complex, multi-asset portfolios.", category: "private" },
  ];
  const items = services.length > 0 ? services : staticFallback;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary relative overflow-hidden min-h-[45vh] flex flex-col justify-end">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" style={{ animation: "floatA 7s ease-in-out infinite" }} />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/6 rounded-full blur-[80px]" style={{ animation: "floatB 9s ease-in-out 2s infinite" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-16 pt-32" style={{ animation: "heroFadeIn 0.9s ease-out both" }}>
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>What we offer.</p>
          <h1
            className="text-primary-foreground leading-tight"
            style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Our Services
          </h1>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <AnimatedElement className="mb-12">
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
              Sophisticated enough for high-stakes transactions. Nimble enough for everyday clarity. Every service is designed to reduce risk, cut friction, and give you confidence in every decision.
            </p>
          </AnimatedElement>

          <div className="divide-y divide-border">
            {items.map((service, index) => (
              <AnimatedElement key={service.id || index} delay={index * 70}>
                <div className="group py-8 sm:py-10 hover:bg-secondary transition-all duration-300 px-4 -mx-4 cursor-pointer">
                  <div className="flex items-start gap-6 sm:gap-10">
                    <span className="text-accent text-sm mt-1 w-4 shrink-0" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>{service.number}</span>
                    <div className="flex-1">
                      <h2
                        className="text-foreground text-xl sm:text-2xl leading-tight mb-3 group-hover:text-accent transition-colors duration-300"
                        style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}
                      >
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-border group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="bg-secondary py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" style={{ animation: "floatC 9s ease-in-out 4s infinite" }} />
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <AnimatedElement>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {[
                { title: "Integrated", body: "Tax and legal strategy unified under one roof — no handoffs, no gaps, no conflicting advice." },
                { title: "Global", body: "Clients in dozens of countries across every time zone. Complex cross-border matters are our everyday work." },
                { title: "Fixed Fees", body: "We will never charge a percentage of your tax savings. Our fees reflect the work, not the outcome." },
              ].map((card, i) => (
                <div key={i} className="bg-secondary p-8 sm:p-10">
                  <h3
                    className="text-foreground text-2xl sm:text-3xl mb-4"
                    style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <AnimatedElement>
            <p className="text-accent text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Common Questions</p>
            <h2
              className="text-foreground mb-12"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 43px)" }}
            >
              Frequently Asked Questions
            </h2>
          </AnimatedElement>
          <div className="divide-y divide-border">
            {faqs.map((faq, index) => (
              <AnimatedElement key={index} delay={index * 60}>
                <div className="py-6">
                  <button
                    className="w-full flex items-center justify-between text-left gap-4 group"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span
                      className="text-foreground group-hover:text-accent transition-colors duration-300 text-sm sm:text-base leading-snug"
                      style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    {openFaq === index
                      ? <Minus className="w-4 h-4 text-accent shrink-0" />
                      : <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                    }
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaq === index ? "max-h-48 mt-4" : "max-h-0"}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/12 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <AnimatedElement>
            <h2
              className="text-primary-foreground leading-tight"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              Ready to protect what's yours?
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Link to="/Contact">
              <button className="relative overflow-hidden group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3 text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.5)] hover:-translate-y-0.5 shrink-0">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <span style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Contact Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}