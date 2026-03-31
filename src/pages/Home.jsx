import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Quote } from "lucide-react";
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
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className || ""}`}>
      {children}
    </div>
  );
};

function HeroSection() {
  return (
    <section className="relative w-full flex flex-col pt-0">
      {/* Top Visual Half (Dark Background Image) */}
      <div className="relative h-[65vh] w-full bg-primary overflow-hidden z-0">
        <img
          src="https://media.base44.com/images/private/screenshots/69cb505ae959e37ecd8e22db/96c90d65f_20260331_044208.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1cm46YXBwOjU4OGQ5ZTIzMjViYTQ5Mzk4ZDg0ZjhjNzM0ZGM3OWE5Iiwic3ViIjoidXJuOmFwcDo1ODhkOWUyMzI1YmE0OTM5OGQ4NGY4YzczNGRjNzlhOSIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sImlhdCI6MTc3NDkzMjExOCwiZXhwIjoxNzc0OTM5MzE4LCJqdGkiOiI5ZjBlMjAwYS0wODAzLTQ1ZWQtYjQzMi00YTMzODk4ZmRmMzQiLCJvYmoiOltbeyJwYXRoIjoiL3ByaXZhdGUvc2NyZWVuc2hvdHMvNjljYjUwNWFlOTU5ZTM3ZWNkOGUyMmRiLzk2YzkwZDY1Zl8yMDI2MDMzMV8wNDQyMDguanBnIn1dXX0.tDUBozrlOkXuI_8PMdRWEBL9DRTfz2QbJdS-u0FkjsI"
          alt="Abstract aerial topo"
          className="w-full h-full object-cover object-top opacity-50 mix-blend-luminosity"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/95 mix-blend-multiply" />
        
        {/* Glow orbs & Patterns */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" style={{ animation: "floatA 10s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" style={{ animation: "floatB 12s ease-in-out 2s infinite" }} />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

        {/* Floating Accent Lines (Decorative) */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 Q 400 100 800 400 T 1800 300" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="5 5" style={{ animation: "floatC 15s linear infinite" }} />
        </svg>

        {/* Small floating label overlapping the transition */}
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 flex justify-start max-w-7xl mx-auto z-20 translate-y-1/2">
          <div className="bg-background px-6 py-2 rounded-t-xl rounded-br-xl shadow-lg border border-border flex items-center gap-3">
             <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
             <span className="text-foreground/80 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Protect what's yours.</span>
          </div>
        </div>
      </div>

      {/* Bottom Content Half (Light Cream Background) */}
      <div className="relative z-10 bg-background w-full pt-20 pb-24 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start">
          <div style={{ animation: "heroFadeIn 1s ease-out 0.2s both" }} className="w-full lg:w-2/3">
            <h1
              className="text-foreground leading-[0.85] tracking-tight"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(54px, 8vw, 120px)" }}
            >
              We live in tax law so you don't get lost in it.
            </h1>
          </div>

          <div style={{ animation: "heroFadeIn 1s ease-out 0.4s both" }} className="w-full lg:w-1/3 mt-8 lg:mt-4">
            <div className="bg-card shadow-2xl p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-[40px] group-hover:bg-accent/20 transition-colors duration-500" />
              
              <p className="text-card-foreground/80 text-sm md:text-base leading-relaxed mb-8 relative z-10" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                We're global tax and legal experts simplifying tax complexity so you can focus on what matters most.
              </p>
              
              <Link to="/Contact">
                <button className="relative overflow-hidden inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.5)] active:scale-95">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
                  <span style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }} className="relative z-10">Contact Us</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ services }) {
  const staticFallback = [
    { number: "1", title: "International & Cross-Border Tax Planning", description: "Comprehensive strategies for multinational structures, foreign tax credits, treaty optimization." },
    { number: "2", title: "M&A, Corporate & Transactional Tax", description: "End-to-end tax counsel for mergers, acquisitions, restructurings, and complex transactions." },
    { number: "3", title: "IRS & State Tax Controversy", description: "Aggressive representation in audits, appeals, and litigation." },
    { number: "4", title: "Compliance & Filing", description: "Accurate, timely preparation across all jurisdictions." },
  ];
  const items = services.length > 0 ? services : staticFallback;

  return (
    <section className="bg-primary py-24 sm:py-32 relative overflow-hidden border-t border-primary-foreground/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <AnimatedElement>
          <div className="mb-20 flex flex-col md:flex-row md:items-start justify-between gap-10 border-b border-primary-foreground/10 pb-16">
            <div className="flex items-center gap-3 md:w-1/4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-accent text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>What we offer.</p>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-primary-foreground leading-tight text-3xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}>
                Sophisticated enough for high-stakes transactions. Nimble enough for everyday clarity. Our complete <span className="text-primary-foreground/40">range</span>
              </h2>
            </div>
          </div>
        </AnimatedElement>

        <div className="flex flex-col">
          {items.slice(0, 4).map((service, index) => (
            <AnimatedElement key={service.id || index} delay={index * 100}>
              <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-10 cursor-pointer hover:bg-primary-foreground/5 transition-all duration-500 border-b border-primary-foreground/10 px-4 -mx-4 rounded-lg">
                <div className="flex items-center gap-8 sm:gap-16 w-full">
                  <span 
                    className="text-accent text-4xl sm:text-5xl font-light w-12 shrink-0 group-hover:scale-110 transition-transform duration-500" 
                    style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}
                  >
                    {service.number}
                  </span>
                  <h3
                    className="text-primary-foreground text-xl sm:text-3xl leading-snug group-hover:text-white transition-colors duration-300 flex-1 text-right sm:text-left"
                    style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement delay={400}>
          <div className="mt-16 flex justify-start">
            <Link to="/Services">
              <button className="group inline-flex items-center gap-3 bg-accent/10 border border-accent/50 text-accent px-8 py-4 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]">
                <span style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative bg-background py-24 sm:py-32 px-6 sm:px-12 overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--foreground))_1px,_transparent_1px)] bg-[length:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <AnimatedElement className="lg:col-span-7 relative w-full h-[500px] lg:h-[700px] rounded-none shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
          <img 
            src="https://media.base44.com/files/public/69cb505ae959e37ecd8e22db/1b6091e6e_cdn_prod_website-files_com_68fb117613f6fd72a7cd01f9_about-bg_235aaa59.avif" 
            alt="Mountains" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </AnimatedElement>

        <AnimatedElement delay={200} className="lg:col-span-5 lg:-ml-24 relative z-20">
          <div className="bg-card p-10 sm:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-foreground/60 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                About Quinn Global Tax Law
              </p>
            </div>
            
            <h2
              className="text-foreground leading-[1.1] mb-8"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(32px, 4vw, 48px)" }}
            >
              The only partner you need to navigate every angle of a transaction.
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-10 text-sm sm:text-base" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
              Most big firms split tax and legal into separate operations. At Quinn, they're integrated from the start. That means fewer people, faster answers, and strategies that actually fit together. We give clients the caliber of a global team with the clarity and access of a trusted advisor.
            </p>
            
            <a href="#">
              <button className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_10px_40px_hsl(var(--accent)/0.4)] hover:-translate-y-1 active:scale-95">
                <span style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "$100\nMillion+", label: "Taxes Saved" },
    { value: "6+\nYears", label: "Client Relationship Average" },
    { value: "Global\nClients", label: "Everywhere Except Antarctica" },
    { value: "10+\nIndustries", label: "Served So Far" },
  ];
  return (
    <section className="bg-background py-24 sm:py-32 relative overflow-hidden border-t border-border/50">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-secondary/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
            <h2
              className="text-foreground leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(50px, 8vw, 110px)" }}
            >
              Outsized<br/>Value.
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed lg:text-right" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
              Complex issues merit careful time and strategy—simpler ones, efficient execution. At Quinn, you get big-firm rigor without big-firm overhead. Many clients realize savings far above our fee; we do not and will not charge a percentage of tax saved.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start lg:min-h-[400px]">
          {stats.map((stat, index) => (
            <AnimatedElement key={index} delay={index * 150} className={`w-full ${index === 0 ? "lg:mt-0" : index === 1 ? "lg:mt-12" : index === 2 ? "lg:mt-24" : "lg:mt-36"}`}>
              <div className="bg-card border border-border/60 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden h-[280px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-[20px] group-hover:bg-accent/15 transition-colors duration-500" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-3 h-3 border-t border-r border-accent" />
                </div>
                
                <h3
                  className="text-foreground whitespace-pre-line leading-[1.1] group-hover:text-accent transition-colors duration-500"
                  style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(32px, 3.5vw, 42px)" }}
                >
                  {stat.value}
                </h3>
                
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-muted-foreground text-xs tracking-wide uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ testimonials }) {
  const staticFallback = [
    {
      quote: "Aran handled everything from my company sale to annual tax filings with incredible precision. He saved us a ton on state taxes and gave me total peace of mind knowing he's both a lawyer and a CPA — he's one of the few people I fully trust to represent my best interests.",
      author_name: "Marshall Haas",
      author_title: "Entrepreneur",
      company: "",
    },
    {
      quote: "Quinn GTL navigated an incredibly complex cross-border acquisition for us. Their integrated approach saved us months of back-and-forth between separate advisors and delivered a cleaner deal.",
      author_name: "Priya Mehta",
      author_title: "CEO",
      company: "Meridian Capital Partners",
    },
    {
      quote: "When we received an IRS notice on our foreign tax credits, we were terrified. Aran resolved it completely — and identified additional planning opportunities we hadn't considered.",
      author_name: "David Chen",
      author_title: "CFO",
      company: "Apex Technologies Inc.",
    },
  ];
  const items = testimonials.length > 0 ? testimonials : staticFallback;
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="bg-primary py-24 sm:py-32 relative overflow-hidden border-y border-primary-foreground/10">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
        <AnimatedElement>
          <div className="flex items-center gap-4 mb-16">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-primary-foreground/60 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Client Perspective</p>
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-12 -left-8 w-24 h-24 text-primary-foreground/5 -z-10 rotate-180" />
            <blockquote
              className="text-primary-foreground leading-tight mb-16"
              style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(24px, 4vw, 42px)" }}
            >
              "{current.quote}"
            </blockquote>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-primary-foreground/10 pt-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-accent font-bold" style={{ fontFamily: "'Seasonmix', system-ui, sans-serif" }}>
                 {current.author_name.charAt(0)}
               </div>
               <div>
                 <div className="text-primary-foreground text-base tracking-wide" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>{current.author_name}</div>
                 <div className="text-primary-foreground/50 text-xs mt-1 uppercase tracking-widest" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                   {current.author_title}{current.company ? ` • ${current.company}` : ""}
                 </div>
               </div>
            </div>
            
            <div className="flex gap-4 items-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === active ? "bg-accent w-12" : "bg-primary-foreground/20 w-4 hover:bg-primary-foreground/40"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function InsightsSection({ insights }) {
  const staticFallback = [
    { title: "IRS vs. HMRC: Who You Should Really Be Worried About", excerpt: "When clients operate across the US and UK, they often assume the IRS is the more fearsome regulator. The data tells a different story.", author: "Aran P. Quinn, CPA, Esq., LL.M", category: "Controversy", read_time: "7 min read" },
    { title: "The Hidden Tax Traps in Cross-Border M&A Deals", excerpt: "For deals crossing jurisdictions, the real risk lies in withholding taxes and transfer pricing disputes that surface post-close.", author: "Aran P. Quinn, CPA, Esq., LL.M", category: "M&A Tax", read_time: "9 min read" },
    { title: "What the OECD Pillar Two Rules Mean for Mid-Market Companies", excerpt: "The global minimum tax is no longer just a large-company problem. Here's what businesses need to understand now.", author: "Aran P. Quinn, CPA, Esq., LL.M", category: "International Tax", read_time: "11 min read" },
  ];
  const items = insights.length > 0 ? insights : staticFallback;

  return (
    <section className="bg-secondary/30 py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <AnimatedElement>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-border pb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Featured Insight</p>
              </div>
              <h2
                className="text-foreground leading-[1.1]"
                style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                Relevant and ready to apply guidance on the issues shaping tax, law, and business.
              </h2>
            </div>
            <a href="#">
              <button className="group inline-flex items-center justify-center w-32 h-32 rounded-full border border-border bg-background hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <div className="flex flex-col items-center gap-2 text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                  <span>View All</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </button>
            </a>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map((insight, index) => (
            <AnimatedElement key={insight.id || index} delay={index * 150}>
              <div className="bg-background border border-border p-8 sm:p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-[25px] group-hover:bg-accent/15 transition-colors duration-500" />
                
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="bg-secondary px-3 py-1 text-foreground text-[10px] tracking-[0.15em] uppercase rounded-sm" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>{insight.category}</span>
                    <span className="text-muted-foreground text-xs" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>{insight.read_time}</span>
                  </div>
                  <h3
                    className="text-foreground leading-[1.2] mb-5 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(20px, 2vw, 26px)" }}
                  >
                    {insight.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
                    {insight.excerpt}
                  </p>
                </div>
                
                <div className="mt-10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                     <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground text-xs uppercase tracking-wide group-hover:text-accent transition-colors" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>Read Article</span>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[70vh]">
      {/* Left Cream Half */}
      <div className="w-full md:w-1/2 bg-background p-12 md:p-24 flex flex-col justify-center relative">
        <AnimatedElement>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-foreground/50 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }}>
              Contact Quinn Global Tax Law
            </p>
          </div>
          
          <h2
            className="text-foreground leading-[0.9] tracking-tight mb-12 max-w-xl"
            style={{ fontFamily: "'Seasonmix', system-ui, sans-serif", fontSize: "clamp(48px, 6vw, 90px)" }}
          >
            Every angle,<br />every path,<br />airtight answers.
          </h2>
          
          <Link to="/Contact">
            <button className="relative overflow-hidden group inline-flex items-center gap-4 bg-accent text-accent-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_15px_40px_hsl(var(--accent)/0.4)] hover:-translate-y-1">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite] bg-[length:200%_100%]" />
              <span style={{ fontFamily: "'Neuemontreal', system-ui, sans-serif" }} className="relative z-10">Contact Us</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </Link>
        </AnimatedElement>
      </div>
      
      {/* Right Dark Half with abstract design */}
      <div className="w-full md:w-1/2 bg-primary relative overflow-hidden min-h-[400px]">
        {/* Abstract shapes matching the screenshot's right side (curved golden lines on dark) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-full h-full stroke-accent/40 fill-none stroke-[0.5]" preserveAspectRatio="xMidYMid slice">
             <path d="M 0 250 Q 150 250 250 150 T 500 50" style={{ animation: "floatC 20s linear infinite alternate" }} />
             <path d="M 100 500 Q 250 350 350 250 T 500 400" style={{ animation: "floatC 25s linear infinite alternate-reverse" }} />
             <path d="M 250 0 L 250 500" className="stroke-accent/20 stroke-1 stroke-dasharray-[4_4]" />
             <path d="M 0 250 L 500 250" className="stroke-accent/20 stroke-1 stroke-dasharray-[4_4]" />
             
             {/* Abstract grid blocks */}
             <rect x="150" y="150" width="100" height="100" className="stroke-accent/30 stroke-1 fill-accent/5" />
             <circle cx="350" cy="250" r="40" className="stroke-accent/30 stroke-1" />
          </svg>
        </div>
        
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" style={{ animation: "floatB 10s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [insights, setInsights] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    base44.entities.Service.list().then(setServices).catch(() => {});
    base44.entities.Insight.list().then(setInsights).catch(() => {});
    base44.entities.Testimonial.list().then(setTestimonials).catch(() => {});
  }, []);

  return (
    <div className="bg-background min-h-screen selection:bg-accent selection:text-accent-foreground">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        @keyframes floatC { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.05); } }
        @keyframes heroFadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 100% { background-position: -200% 0; } }
        @keyframes spin { 0% { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}} />
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection />
      <StatsSection />
      <TestimonialSection testimonials={testimonials} />
      <InsightsSection insights={insights} />
      <CtaSection />
    </div>
  );
}