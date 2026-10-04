"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { ArrowRight, CheckCircle, Plus, Minus } from "lucide-react";

/* ── Design tokens (matches homepage) ── */
const F = "var(--font-inter), system-ui, sans-serif";
const ink   = "#0a0a0a";
const muted = "#6b7280";
const dim   = "#9ca3af";
const line  = "#e5e7eb";
const accent = "#0080e0";
const accentDark = "#006bbf";
const accentLight = "#40c0f0";
const dark  = "#0a0f1a";

/* ── CountUp (same as homepage) ── */
function CountUp({ to, suffix = "", prefix = "", duration = 1800, color, format }: { to: number; suffix?: string; prefix?: string; duration?: number; color: string; format?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  const display = format ? val.toLocaleString() : val;
  return <span ref={ref} style={{ fontSize: "inherit", fontWeight: "inherit", color, letterSpacing: "inherit", lineHeight: "inherit" }}>{prefix}{display}{suffix}</span>;
}

/* ── ScrollRevealText (same as homepage) ── */
function ScrollRevealText({ text, style, className, as = "p", revealedColor = ink }: { text: string; style?: React.CSSProperties; className?: string; as?: "p" | "h2" | "h3"; revealedColor?: string }) {
  const words = text.split(" ");
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const activeCount = Math.round(p * words.length);
      wordRefs.current.forEach((span, i) => {
        if (span) span.style.color = i < activeCount ? revealedColor : "#cbd0d6";
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    let attached = false;
    const gate = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !attached) {
        attached = true;
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else if (!entry.isIntersecting && attached) {
        attached = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }, { rootMargin: "35% 0px 35% 0px" });
    gate.observe(el);
    return () => {
      gate.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length, revealedColor]);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={containerRef} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} ref={(el: HTMLSpanElement | null) => { wordRefs.current[i] = el; }} style={{ color: "#cbd0d6", transition: "color 0.25s ease" }}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ── ScrollFadeOverlay (same as homepage) ── */
function ScrollFadeOverlay({ children, style, className }: { children?: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.opacity = String(1 - p);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    let attached = false;
    const gate = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !attached) {
        attached = true;
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else if (!entry.isIntersecting && attached) {
        attached = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }, { rootMargin: "35% 0px 35% 0px" });
    gate.observe(el);
    return () => {
      gate.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} className={className} style={{ ...style, transition: "opacity 0.1s linear" }}>{children}</div>;
}

/* ── Pains / solutions (cleaning-specific) ── */
const PAINS = [
  { title: "Leads that go nowhere", desc: "Tyre-kickers, wrong suburb, wrong job size. A lot of leads from generic marketing were never going to book in the first place." },
  { title: "Feast or famine weeks", desc: "Work comes from referrals and word of mouth, so the calendar swings between fully booked and dead quiet." },
  { title: "No idea what's working", desc: "Money goes into ads or directories every month with no clear picture of which leads actually became paying jobs." },
];

const SOLUTIONS = [
  { tag: "Step 4", title: "Ads built around lead quality", desc: "Campaigns targeted at people who actually need a clean booked, not broad reach for the sake of more enquiries." },
  { tag: "Step 5", title: "Every lead tracked through to a job", desc: "We don't just count enquiries. Each lead is followed through the pipeline so you know exactly which ones turned into real work." },
  { tag: "Step 6", title: "Real jobs, not vanity numbers", desc: "Queenstown Cleaning's 57 leads became 30 booked jobs last month. That's the number that matters, not clicks or impressions." },
];

const steps = [
  {
    num: "01",
    title: "Campaign Plan",
    desc: "We map out your offer, service area, budget and strategy before a dollar is spent. Everything starts with a clear plan to get your cleaning business in front of the right people.",
    checklist: ["Offer + pricing confirmed", "Service area defined", "Budget + targeting set"],
  },
  {
    num: "02",
    title: "Campaign Build",
    desc: "We turn the strategy into a complete campaign. From the copy and creative to the targeting and campaign structure, everything is built around getting you more booked cleans.",
    checklist: ["Ad copy written", "Creative produced", "Campaign structure built"],
  },
  {
    num: "03",
    title: "Approval",
    desc: "You review everything before it goes live. We make any final changes and make sure you are happy with how your business is being represented.",
    checklist: ["Creative reviewed", "Changes made if needed", "Final approval"],
  },
  {
    num: "04",
    title: "Launch",
    desc: "Your campaign goes live and your first enquiries start coming through. We monitor the numbers closely from day one so we can see what is working and what needs improving.",
    checklist: ["Campaign launched", "Lead tracking switched on", "Performance monitored"],
  },
];

/* ── Testimonials (cleaning businesses only) ── */
const testimonials = [
  {
    quote: "We used to rely on randomly boosted posts without much of a strategy behind them. Working with the team has completely changed that. We're now consistently booking higher-end cleaning jobs and getting much better-quality enquiries. The business is doing really well, and working with them has been great.",
    author: "Kris",
    company: "Katies Elite Cleaning, Tauranga",
    color: "#b45309",
  },
  {
    quote: "Before working with Lucky, almost all of our work came from word of mouth. Now we've got a proper website and ads bringing in enquiries as well, and it's made a real difference to how steady the work is.",
    author: "Linda",
    company: "Shines Clean, Hamilton",
    color: "#15803d",
  },
  {
    quote: "Lucky has been great to work with. He helped us bring in more cleaning jobs around Queenstown and made the whole process really easy. We've seen some great results and would definitely recommend LS Growth.",
    author: "Queenstown Cleaning",
    company: "Cleaning Services, Queenstown",
    color: "#2563eb",
  },
];

/* ── Case study carousel data (cleaning businesses only) ── */
const caseStudyShowcase = [
  {
    company: "Katies Elite Cleaning",
    headline: "How We Helped Katies Elite Cleaning Book Higher-End Jobs",
    logo: "/logos/katies-elite-cleaning.png",
    photo: "/katies-elite-cleaning-team.jpg",
    quote: "We used to rely on randomly boosted posts without much of a strategy behind them. Working with the team has completely changed that. We're now consistently booking higher-end cleaning jobs and getting much better-quality enquiries. The business is doing really well, and working with them has been great.",
    quoteHighlight: null as string | null,
    author: "Kris",
    authorTitle: "Katies Elite Cleaning, Tauranga",
  },
  {
    company: "Shines Clean",
    headline: "How We Helped Shines Clean Start Generating Leads Online",
    logo: "/logos/shines-clean.png",
    photo: "/shines-clean-linda.jpg",
    quote: "Before working with Lucky, almost all of our work came from word of mouth. Now we've got a proper website and ads bringing in enquiries as well, and it's made a real difference to how steady the work is.",
    quoteHighlight: null as string | null,
    author: "Linda",
    authorTitle: "Shines Clean, Hamilton",
  },
  {
    company: "Queenstown Cleaning",
    headline: "How We Helped Queenstown Cleaning Turn 57 Leads Into 30 Booked Jobs",
    logo: "/logos/queenstown-cleaning.png",
    photo: "/queenstown-cleaning-team.jpg",
    quote: "Lucky has been great to work with. He helped us bring in more cleaning jobs around Queenstown and made the whole process really easy. We've seen some great results and would definitely recommend LS Growth.",
    quoteHighlight: "30 booked jobs",
    author: "Queenstown Cleaning",
    authorTitle: "Cleaning Services, Queenstown",
  },
];

/* ── Services section data (cleaning businesses only) ── */
const serviceSlides = [
  {
    num: "01",
    tag: "Meta Ads",
    headlineStart: "We run ads that ",
    headlineHighlight: "keep your cleaning calendar full",
    accentColor: accent,
    visual: "/queenstown-ads.png",
    stat: { value: 30, prefix: "", suffix: " jobs", label: "Booked cleaning jobs from 57 leads in one month for Queenstown Cleaning" },
    quotes: [
      {
        quote: "Lucky has been great to work with. He helped us bring in more cleaning jobs around Queenstown and made the whole process really easy. We've seen some great results and would definitely recommend LS Growth.",
        quoteHighlight: null as string | null,
        author: "Queenstown Cleaning",
        authorTitle: "Cleaning Services, Queenstown",
      },
      {
        quote: "We used to rely on randomly boosted posts without much of a strategy behind them. Working with the team has completely changed that. We're now consistently booking higher-end cleaning jobs and getting much better-quality enquiries.",
        quoteHighlight: null as string | null,
        author: "Kris",
        authorTitle: "Katies Elite Cleaning, Tauranga",
      },
    ],
    cta: "See Our Ads Process",
  },
  {
    num: "02",
    tag: "Website Builds",
    headlineStart: "We build websites that ",
    headlineHighlight: "turn visitors into booked cleans",
    accentColor: accentDark,
    visual: "/img-website.avif",
    stat: null as { value: number; prefix?: string; suffix?: string; label: string } | null,
    quotes: [
      {
        quote: "Before working with Lucky, almost all of our work came from word of mouth. Now we've got a proper website and ads bringing in enquiries as well, and it's made a real difference to how steady the work is.",
        quoteHighlight: null as string | null,
        author: "Linda",
        authorTitle: "Shines Clean, Hamilton",
      },
      {
        quote: "We're now consistently booking higher-end cleaning jobs and getting much better-quality enquiries. The business is doing really well.",
        quoteHighlight: null as string | null,
        author: "Kris",
        authorTitle: "Katies Elite Cleaning, Tauranga",
      },
    ],
    cta: "See Our Web Process",
  },
  {
    num: "03",
    tag: "Organic Content",
    headlineStart: "We create content that ",
    headlineHighlight: "builds trust before they even call",
    accentColor: accentLight,
    visual: "/mockup-phone.avif",
    stat: null as { value: number; prefix?: string; suffix?: string; label: string } | null,
    quotes: [
      {
        quote: "He helped us bring in more cleaning jobs around Queenstown and made the whole process really easy. We've seen some great results.",
        quoteHighlight: null as string | null,
        author: "Queenstown Cleaning",
        authorTitle: "Cleaning Services, Queenstown",
      },
      {
        quote: "Now we've got a proper website and ads bringing in enquiries as well, and it's made a real difference to how steady the work is.",
        quoteHighlight: null as string | null,
        author: "Linda",
        authorTitle: "Shines Clean, Hamilton",
      },
    ],
    cta: "See Our Content Process",
  },
];

const faqs = [
  { q: "What types of cleaning businesses do you work with?", a: "Residential, commercial, and everything in between, across New Zealand and Australia. If your business relies on a steady flow of booked cleans, we can build a growth strategy around it." },
  { q: "How quickly will I see results?", a: "Most clients start seeing enquiries within the first 2–3 weeks. From there, we use the data to improve what is working, cut what isn't, and build toward a consistent flow of booked cleans." },
  { q: "Is everything done for me?", a: "Yes. We manage the process from generating demand through to lead follow-up and pipeline management, so you can stay focused on running the business and delivering the cleans." },
  { q: "What makes L&S Growth different for cleaning businesses?", a: "We're not here to simply run ads and send you a report at the end of the month. We track every lead through to a real, booked job, not just a number on a report, the way we did for Queenstown Cleaning, Katies Elite Cleaning and others." },
];

function QuoteText({ quote, highlight }: { quote: string; highlight?: string | null }) {
  if (!highlight) return <>{quote}</>;
  const idx = quote.indexOf(highlight);
  if (idx === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color: accentLight, fontWeight: 800 }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}
    </>
  );
}

function CaseStudyCarousel({ onCtaClick }: { onCtaClick: () => void }) {
  const [index, setIndex] = useState(0);
  const study = caseStudyShowcase[index];
  const go = (dir: number) => setIndex((i) => (i + dir + caseStudyShowcase.length) % caseStudyShowcase.length);

  return (
    <section className="cs-section" style={{ position: "relative", overflow: "hidden", background: "#0a0a0a", padding: "90px 40px 60px" }}>
      <div aria-hidden className="cs-ready" style={{ position: "absolute", left: "-8px", top: "-14px", writingMode: "vertical-rl" as const, whiteSpace: "nowrap", fontSize: "clamp(56px,9vw,120px)", fontWeight: 800, letterSpacing: "0.04em", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.14)", fontFamily: "var(--font-sora), sans-serif", pointerEvents: "none" as const, zIndex: 0 }}>
        READY
      </div>
      <div aria-hidden className="cs-ready" style={{ position: "absolute", right: "-8px", bottom: "-14px", writingMode: "vertical-rl" as const, whiteSpace: "nowrap", fontSize: "clamp(56px,9vw,120px)", fontWeight: 800, letterSpacing: "0.04em", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.14)", fontFamily: "var(--font-sora), sans-serif", pointerEvents: "none" as const, zIndex: 0 }}>
        TO WIN?
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto" }}>
        <div className="cs-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "56px" }}>
          <h2 key={`h-${index}`} className="cs-fade cs-headline" style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(24px,3.2vw,36px)", fontWeight: 800, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.01em", maxWidth: "680px" }}>
            {study.headline}
          </h2>
          <div key={`l-${index}`} className="cs-fade cs-logo" style={{ minWidth: "200px", height: "160px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {study.logo ? (
              <img src={study.logo} alt={study.company} style={{ maxHeight: "160px", maxWidth: "360px", objectFit: "contain" }} />
            ) : (
              <div style={{ padding: "8px 16px", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.03em" }}>
                {study.company.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div key={`b-${index}`} className="cs-fade cs-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1fr", gap: "56px", alignItems: "center" }}>
          <div className="cs-content" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            <div style={{ position: "relative" }}>
              <span aria-hidden style={{ position: "absolute", top: "-38px", left: "-8px", fontSize: "90px", fontWeight: 800, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "Georgia, serif", pointerEvents: "none" as const }}>&ldquo;</span>
              <p style={{ position: "relative", fontSize: "19px", color: "rgba(255,255,255,0.9)", lineHeight: 1.55, fontWeight: 500, marginBottom: "22px" }}>
                <QuoteText quote={study.quote} highlight={study.quoteHighlight} />
              </p>
            </div>
            <p style={{ fontSize: "15px", color: "#fff", fontWeight: 700, marginBottom: "26px" }}>
              {study.author} <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>&nbsp;|&nbsp; {study.authorTitle}</span>
            </p>
            <div className="cs-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={onCtaClick} className="cs-btn" style={{ fontSize: "14px", fontWeight: 700, padding: "16px 28px", background: accentLight, color: "#04202e", border: "none" }}>
                Let's Talk
              </button>
            </div>
          </div>
          <div className="cs-photo" style={{ position: "relative", aspectRatio: "4/3", background: "#151515", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {study.photo ? (
              <img src={study.photo} alt={study.company} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Photo — {study.company}</span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "40px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {caseStudyShowcase.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show case study ${i + 1}`}
                style={{ width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", background: i === index ? "#fff" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => go(-1)} aria-label="Previous case study" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ←
            </button>
            <button onClick={() => go(1)} aria-label="Next case study" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              →
            </button>
          </div>
        </div>
      </div>
      <style suppressHydrationWarning>{`
        .cs-btn { display: inline-flex; align-items: center; font-family: ${F}; text-decoration: none; cursor: pointer; transition: transform 0.16s ease, box-shadow 0.22s ease; }
        .cs-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
        .cs-fade { animation: cs-fade-in 0.4s ease; }
        @keyframes cs-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 780px) {
          .cs-ready { display: none !important; }
          .cs-section { padding: 56px 20px 40px !important; }
          .cs-header { margin-bottom: 28px !important; }
          .cs-logo { justify-content: flex-start !important; min-width: 0 !important; height: 56px !important; }
          .cs-logo img { max-height: 56px !important; max-width: 150px !important; }
          .cs-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .cs-photo { order: -1; aspect-ratio: 4/3.2 !important; }
          .cs-buttons .cs-btn { flex: 0 0 auto !important; }
        }
      `}</style>
    </section>
  );
}

export default function CleaningPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [contactPanelOpen, setContactPanelOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState<"idle"|"sending"|"done"|"error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", message: "" });
  const [contactTab, setContactTab] = useState<"book"|"message">("book");
  const [reviewPage, setReviewPage] = useState(0);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://formspree.io/f/xgvkwqob", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      setFormState(res.ok ? "done" : "error");
    } catch { setFormState("error"); }
  };

  useEffect(() => {
    if (!formOpen || contactTab !== "book") return;
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      (window as any).Calendly?.initInlineWidgets?.();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, [formOpen, contactTab]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("lp-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".lp-rise").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: F, color: ink, background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)" }}>
      <style suppressHydrationWarning>{`
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: ${F}; font-size: 14px; font-weight: 600;
          letter-spacing: -0.01em; text-decoration: none; cursor: pointer;
          border: none; transition: background-position 0.32s ease, color 0.32s ease, box-shadow 0.22s ease, transform 0.16s ease, border-color 0.32s ease;
          background-size: 200% 100%; background-position: right;
        }
        .btn svg { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .btn:hover svg { transform: translateX(3px); }
        .btn:hover { transform: translateY(-1px); }
        .btn-dark { background-image: linear-gradient(to right, #fff 50%, ${accent} 50%); color: #fff; border: 1.5px solid ${accent}; }
        .btn-dark:hover { background-position: left; color: ${accent}; }
        .btn-outline { background-image: linear-gradient(to top, #fff 50%, transparent 50%); background-size: 100% 200%; background-position: top; color: #fff; border: 1.5px solid rgba(255,255,255,0.32); }
        .btn-outline:hover { background-position: bottom; color: ${dark}; border-color: #fff; }
        .btn-hero { animation: pulse-blue 2.4s ease-in-out infinite; }
        .btn-hero:hover { animation: none; box-shadow: 0 6px 24px rgba(0,128,224,0.4); }
        @keyframes pulse-blue { 0%,100% { box-shadow: 0 0 0 0 rgba(0,128,224,0.35); } 50% { box-shadow: 0 0 0 8px rgba(0,128,224,0); } }

        .nav-link { position:relative; transition:color 0.15s ease; }
        .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:${accent}; transition:width 0.2s ease; }
        .nav-link:hover { color:${accent} !important; }
        .nav-link:hover::after { width:100%; }

        @keyframes nav-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .nav-cta { position: relative; overflow: hidden; }
        .nav-cta::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%); background-size: 200% 100%; animation: nav-shimmer 2.6s ease-in-out infinite; border-radius: inherit; pointer-events: none; }
        .nav-cta:hover { background: ${accentDark} !important; transform: translateY(-1px); transition: all 0.15s; }

        @keyframes heroUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .hero-badge { animation: heroUp 0.5s ease 0.05s both; }
        .hero-h1    { animation: heroUp 0.55s ease 0.15s both; }
        .hero-sub   { animation: heroUp 0.55s ease 0.25s both; }
        .hero-ctas  { animation: heroUp 0.55s ease 0.35s both; }
        .hero-note  { animation: heroUp 0.55s ease 0.42s both; }

        @keyframes riseUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .lp-rise { opacity:0; }
        .lp-rise.lp-visible { animation: riseUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
        .lp-rise.d1.lp-visible { animation-delay:0.07s; }
        .lp-rise.d2.lp-visible { animation-delay:0.14s; }
        .lp-rise.d3.lp-visible { animation-delay:0.21s; }
        .lp-rise.d4.lp-visible { animation-delay:0.28s; }

        .footer-link { position:relative; transition:color 0.15s ease; text-decoration:none; }
        .footer-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:${accent}; transition:width 0.22s ease; }
        .footer-link:hover { color:${accent} !important; }
        .footer-link:hover::after { width:100%; }

        .cmp-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; font-size: 13px; line-height: 1.45; }
        .cmp-card { border-radius: 16px; transition: transform 0.2s ease; }

        .trusted-mask {
          position: relative; overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        .trusted-track { display: flex; align-items: center; width: max-content; gap: 80px; animation: trusted-slide 30s linear infinite; }
        .trusted-mask:hover .trusted-track { animation-play-state: paused; }
        @keyframes trusted-slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .rev-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .rev-quote { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }

        @media (max-width: 980px) {
          .m-testi-grid { grid-template-columns: repeat(2,1fr) !important; }
        }

        @media (max-width: 720px) {
          .rev-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 700px) {
          nav { padding: 0 20px !important; }
          .m-nav-links { gap: 18px !important; }
        }

        @media (max-width: 640px) {
          .m-nav-links { display: none !important; }
          .m-nav-hamburger { display: flex !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 16px !important; height: 60px !important; }
          .nav-logo { height: 34px !important; }
          .m-hero-section { min-height: auto !important; }
          .m-hero-content { padding: 110px 20px 50px !important; }
          .m-hero-content h1 { font-size: clamp(28px, 7.5vw, 38px) !important; }
          .hero-sub { font-size: 15px !important; }
          .m-hero-stats { grid-template-columns: 1fr !important; max-width: 100% !important; margin-top: 28px !important; padding-top: 24px !important; }
          .m-hero-stats > div { border-left: none !important; padding: 16px 0 !important; border-top: 1px solid rgba(255,255,255,0.14) !important; }
          .m-hero-stats > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .m-pain-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-split-sticky { position: static !important; }
          .how-step-card { position: sticky !important; box-shadow: 0 12px 32px rgba(10,15,26,0.18) !important; padding: 24px 20px !important; }
          .how-step-card-0 { top: 84px !important; }
          .how-step-card-1 { top: 104px !important; }
          .how-step-card-2 { top: 124px !important; }
          .how-step-gap { height: 20px !important; }
          .m-bento-row { grid-template-columns: 1fr !important; }
          .m-bento-hide { display: none !important; }
          .cmp-grid { grid-template-columns: 1fr !important; }
          .cmp-center { order: -1; }
          .cmp-stack { padding: 32px 20px !important; border-radius: 20px !important; }
          .m-cta-stack { grid-template-columns: 1fr !important; gap: 24px !important; }
          .m-service-row { padding: 56px 20px !important; }
          .m-service-quotes { flex-direction: column !important; }
          .m-service-quotes > div { max-width: 100% !important; margin-left: 0 !important; text-align: left !important; }
          .m-service-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-service-row .m-service-visual, .m-service-row .m-service-copy { order: unset !important; }
          .m-how-sticky { position: static !important; top: auto !important; }
          .m-how-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .m-faq-sticky { position: static !important; }
          .m-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .m-footer-top { flex-direction: column !important; }
          .m-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
          .btn { min-height: 44px !important; }
        }
      `}</style>

      {/* ── NAV (same as homepage) ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,15,26,0.08)", transform: "translateZ(0)" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img className="nav-logo" src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div className="m-nav-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {[["Our Work","#work"],["How It Works","#how"]].map(([l,h]) => (
              <a key={h} href={h} className="nav-link" style={{ fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", whiteSpace: "nowrap" as const }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button onClick={() => setContactPanelOpen(true)} aria-label="Contact details" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #0080e0, #40c0f0)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "3px", width: "16px" }}>
                <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
                <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
                <span style={{ display: "block", width: "70%", height: "2px", background: "#fff", borderRadius: "2px" }} />
              </div>
            </button>
            <button onClick={() => setFormOpen(true)} className="nav-cta" style={{ fontSize: "13px", fontWeight: 700, color: "#fff", background: accent, borderRadius: "0", padding: "10px 18px", border: "none", cursor: "pointer", fontFamily: F, display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" as const }}>
              Let's Talk
            </button>
            <button className="m-nav-hamburger" onClick={() => setNavOpen(true)} style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: "4px", width: "44px", height: "44px", background: accent, border: "none", borderRadius: "0", cursor: "pointer", padding: "11px", flexShrink: 0 }}>
              <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "65%", height: "2px", background: "#fff", borderRadius: "2px" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV DRAWER ── */}
      {navOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setNavOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "280px", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "56px", borderBottom: `1px solid ${line}` }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: ink }}>L&S Growth</span>
              <button onClick={() => setNavOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: "22px", lineHeight: 1, padding: "4px" }}>×</button>
            </div>
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[["Our Work","#work"],["How It Works","#how"]].map(([l,h]) => (
                <a key={h} href={h} onClick={() => setNavOpen(false)} style={{ display: "block", width: "100%", padding: "13px", background: "#f8fafc", border: `1px solid ${line}`, fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>{l}</a>
              ))}
              <button onClick={() => { setNavOpen(false); setFormOpen(true); }} style={{ display: "block", width: "100%", padding: "13px", background: accent, color: "#fff", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: F, textAlign: "center" as const, boxSizing: "border-box" as const }}>Let's Talk</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LEFT CONTACT DETAILS PANEL ── */}
      {contactPanelOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 250 }}>
          <div onClick={() => setContactPanelOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "min(360px, 88vw)", background: "#fff", display: "flex", flexDirection: "column" as const, boxShadow: "8px 0 32px rgba(0,0,0,0.12)", padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
              <button onClick={() => setContactPanelOpen(false)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: ink, fontSize: "26px", lineHeight: 1, padding: "4px" }}>×</button>
              <img src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "26px", width: "auto", objectFit: "contain" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: "28px", flex: 1 }}>
              {[
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584135511815", color: "#1877F2", icon: <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /> },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/111303114/", color: "#0A66C2", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" /> },
                { label: "Instagram", href: "https://www.instagram.com/lsgrowthagency/", color: ink, icon: null },
              ].map(({ label, href, color, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none", color: ink, fontSize: "19px", fontWeight: 700 }}>
                  {label === "Instagram" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ width: "26px", height: "26px", flexShrink: 0 }}>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.7" fill={color} stroke="none" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill={color} style={{ width: "26px", height: "26px", flexShrink: 0 }}>{icon}</svg>
                  )}
                  {label}
                </a>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${line}`, paddingTop: "24px", display: "flex", flexDirection: "column" as const, gap: "6px" }}>
              <a href="tel:02102820190" style={{ fontSize: "17px", fontWeight: 700, color: ink, textDecoration: "none" }}>021 028 20190</a>
              <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "14px", color: muted, textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT FORM MODAL ── */}
      {formOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div onClick={() => setFormOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(6px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: contactTab === "book" ? "640px" : "460px", background: "#fff", borderRadius: "4px", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", overflowY: "auto" as const, maxHeight: "92vh" }}>
            <div style={{ padding: "32px 32px 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "0.04em", textTransform: "uppercase" as const, margin: 0 }}>Let's Talk</h2>
                <button onClick={() => setFormOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: "22px", lineHeight: 1, padding: "0 0 0 16px", flexShrink: 0 }}>×</button>
              </div>
              <p style={{ fontSize: "14px", color: muted, lineHeight: 1.6, margin: "0 0 20px" }}>
                {contactTab === "book" ? "Grab a free 15-minute slot straight off the calendar." : "Fill in your details and we'll be in touch within 24 hours."}
              </p>
              <div style={{ width: "3px", height: "40px", background: accent, position: "absolute" as const, left: 0, top: "32px", borderRadius: "0 2px 2px 0" }} />
              <div style={{ display: "flex", gap: "0", borderBottom: `1px solid ${line}`, marginBottom: "0" }}>
                {[["book","Book a Time"],["message","Send a Message"]].map(([key, label]) => (
                  <button key={key} onClick={() => setContactTab(key as "book"|"message")} style={{ flex: 1, padding: "12px 8px", background: "none", border: "none", borderBottom: contactTab === key ? `2px solid ${accent}` : "2px solid transparent", color: contactTab === key ? ink : muted, fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: "0.04em" }}>{label}</button>
                ))}
              </div>
            </div>
            {contactTab === "book" ? (
              <div style={{ padding: "24px 24px 24px" }}>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/lsgrowthagency-co/30min?hide_gdpr_banner=1&primary_color=0080e0"
                  style={{ minWidth: "280px", width: "100%", height: "600px" }}
                />
              </div>
            ) : (
            <div style={{ padding: "24px 32px 32px" }}>
              {formState === "done" ? (
                <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "16px", padding: "40px 0", textAlign: "center" as const }}>
                  <CheckCircle style={{ width: "48px", height: "48px", color: accent }} />
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: ink, margin: 0 }}>Message sent!</h3>
                  <p style={{ fontSize: "14px", color: muted, margin: 0 }}>We'll be in touch within 24 hours.</p>
                  <button onClick={() => { setFormOpen(false); setFormState("idle"); setFormData({ name: "", phone: "", business: "", message: "" }); }} style={{ fontSize: "13px", color: accent, background: "none", border: "none", cursor: "pointer", fontFamily: F, textDecoration: "underline" }}>Close</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: "18px" }}>
                  {[
                    { label: "YOUR NAME", key: "name", type: "text", placeholder: "e.g. John Smith", required: true },
                    { label: "PHONE NUMBER", key: "phone", type: "tel", placeholder: "e.g. 021 123 4567" },
                    { label: "BUSINESS TYPE", key: "business", type: "text", placeholder: "e.g. Residential Cleaning, Commercial Cleaning" },
                  ].map(({ label, key, type, placeholder, required }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: ink, letterSpacing: "0.08em", marginBottom: "8px" }}>{label}</label>
                      <input type={type} required={required} placeholder={placeholder} value={formData[key as keyof typeof formData]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${line}`, borderRadius: "4px", fontSize: "14px", fontFamily: F, color: ink, outline: "none", background: "#fff", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: ink, letterSpacing: "0.08em", marginBottom: "8px" }}>MESSAGE</label>
                    <textarea rows={4} placeholder="Tell us about your cleaning business and what you're looking to achieve..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${line}`, borderRadius: "4px", fontSize: "14px", fontFamily: F, color: ink, outline: "none", background: "#fff", resize: "none" as const, boxSizing: "border-box" as const }} />
                  </div>
                  {formState === "error" && <p style={{ fontSize: "13px", color: "#dc2626", margin: 0 }}>Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={formState === "sending"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", background: formState === "sending" ? "#94a3b8" : accent, color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: 700, fontFamily: F, cursor: formState === "sending" ? "not-allowed" : "pointer", letterSpacing: "0.04em" }}>
                    {formState === "sending" ? "Sending..." : "Send message →"}
                  </button>
                </form>
              )}
            </div>
            )}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="m-hero-section" style={{ position: "relative", overflow: "hidden", minHeight: "620px", display: "flex", alignItems: "center", background: "#04111f" }}>
        <video autoPlay muted loop playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", pointerEvents: "none" as const, background: "linear-gradient(180deg, rgba(4,17,31,0.6) 0%, transparent 100%)" }} />
        <div className="m-hero-content" style={{ position: "relative", zIndex: 1, padding: "150px 40px 90px", width: "100%" }}>
          <div style={{ maxWidth: "700px" }}>
            <p className="hero-badge" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "24px", letterSpacing: "0.01em" }}>
              For Cleaning Businesses · NZ &amp; AU
            </p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(40px, 5.6vw, 84px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "18px" }}>
              More booked{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                cleaning jobs
                <svg viewBox="0 0 220 14" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: "-0.14em", width: "100%", height: "0.22em" }}>
                  <path d="M2 9 C 60 2, 160 2, 218 9" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>.<br />Not just more leads.
            </h1>
            <p className="hero-sub" style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "28px", maxWidth: "480px" }}>
              We run ads targeted at people who actually need a clean booked, then track every lead through to a real, paying job, not just a number on a report.
            </p>
            <div className="hero-ctas" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              <a href="/book" className="btn btn-dark btn-hero" style={{ fontSize: "14px", padding: "12px 22px", borderRadius: "0" }}>
                Book a Free Call <ArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
              <a href="#work" className="btn btn-outline" style={{ fontSize: "14px", padding: "11px 18px", borderRadius: "0" }}>
                See the Results
              </a>
            </div>
            <p className="hero-note" style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Free 30-min strategy call · No obligation</p>
          </div>

          <div className="m-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(255,255,255,0.14)", marginTop: "44px", paddingTop: "28px", maxWidth: "780px" }}>
            {[
              { big: "57", small: "New leads, last 30 days" },
              { big: "30", small: "Turned into booked jobs" },
              { big: "$7–$11", small: "Cost per lead" },
            ].map(({ big, small }, i) => (
              <div key={big} style={{ paddingLeft: i === 0 ? 0 : "32px", paddingRight: "24px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)" }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#7cd4ff", letterSpacing: "-0.02em", marginBottom: "6px", whiteSpace: "nowrap" as const }}>{big}</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (cleaning businesses only) ── */}
      <CaseStudyCarousel onCtaClick={() => setFormOpen(true)} />

      {/* ── BUILD STATEMENT ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "transparent", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const }}>
          <div style={{ position: "absolute", top: "-10%", left: "-6%", width: "42%", paddingBottom: "42%", borderRadius: "50%", background: "rgba(0,128,224,0.16)", filter: "blur(70px)" }} />
          <div style={{ position: "absolute", bottom: "-14%", right: "-8%", width: "46%", paddingBottom: "46%", borderRadius: "50%", background: "rgba(64,192,240,0.14)", filter: "blur(80px)" }} />
        </div>
        <div style={{ position: "relative", minHeight: "56vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
          <div style={{ position: "relative", maxWidth: "980px", textAlign: "center" as const }}>
            <ScrollRevealText
              as="h2"
              text="You're here because you want booked cleaning jobs, not leads that go nowhere."
              style={{ fontSize: "clamp(32px,6vw,64px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}
              revealedColor={accent}
            />
            <ScrollFadeOverlay style={{ position: "absolute", inset: "-20% -10%", pointerEvents: "none" as const }}>
              <div style={{ position: "absolute", top: "8%", left: "6%", width: "30%", paddingBottom: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.85)", filter: "blur(28px)" }} />
              <div style={{ position: "absolute", top: "38%", right: "4%", width: "34%", paddingBottom: "22%", borderRadius: "50%", background: "rgba(255,255,255,0.8)", filter: "blur(32px)" }} />
              <div style={{ position: "absolute", bottom: "6%", left: "22%", width: "36%", paddingBottom: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.75)", filter: "blur(30px)" }} />
            </ScrollFadeOverlay>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: "0 40px 80px", borderTop: `1px solid ${line}`, paddingTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="m-pain-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "64px", alignItems: "start" }}>
            <div className="m-split-sticky lp-rise" style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column" as const, gap: "24px" }}>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "20px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, display: "inline-block" }} />
                  The Problem
                </span>
                <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
                  Sound familiar?
                </h2>
                <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "380px" }}>
                  These are the three things quietly costing cleaning businesses jobs every single week.
                </p>
              </div>
            </div>
            <div>
              {PAINS.map(({ title, desc }, i) => (
                <Fragment key={title}>
                  <div className={`lp-rise how-step-card how-step-card-${i}`} style={{ position: "sticky" as const, top: `${110 + i * 28}px`, zIndex: i + 1, display: "flex", gap: "28px", alignItems: "flex-start", background: "#fff", border: `1px solid ${line}`, boxShadow: "0 24px 64px rgba(10,15,26,0.14)", padding: "36px 40px" }}>
                    <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: "#dc2626", letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: ink, letterSpacing: "-0.01em", marginBottom: "10px" }}>{title}</h3>
                      <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                  {i < PAINS.length - 1 && <div aria-hidden className="how-step-gap" style={{ height: "40px" }} />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section style={{ padding: "0 40px 80px", borderTop: `1px solid ${line}`, paddingTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="m-pain-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "64px", alignItems: "start" }}>
            <div className="m-split-sticky lp-rise" style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column" as const, gap: "24px" }}>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "20px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, display: "inline-block" }} />
                  The Solution
                </span>
                <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
                  Here's what changes
                </h2>
                <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "380px" }}>
                  The exact system we run for Queenstown Cleaning, Katies Elite Cleaning and Shines Clean.
                </p>
              </div>
            </div>
            <div>
              {SOLUTIONS.map(({ tag, title, desc }, i) => {
                const dark2 = i === 1;
                return (
                  <Fragment key={title}>
                    <div className={`lp-rise how-step-card how-step-card-${i}`} style={{ position: "sticky" as const, top: `${110 + i * 28}px`, zIndex: i + 1, display: "flex", gap: "28px", alignItems: "flex-start", background: dark2 ? dark : "#fff", border: dark2 ? "none" : `1px solid ${line}`, boxShadow: dark2 ? "0 24px 64px rgba(10,15,26,0.24)" : "0 24px 64px rgba(10,15,26,0.14)", padding: "36px 40px" }}>
                      <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: dark2 ? "#7cd4ff" : accent, letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>{String(i + 4).padStart(2, "0")}</div>
                      <div>
                        <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: dark2 ? "rgba(255,255,255,0.45)" : dim, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "8px" }}>{tag}</span>
                        <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: dark2 ? "#fff" : ink, letterSpacing: "-0.01em", marginBottom: "10px" }}>{title}</h3>
                        <p style={{ fontSize: "14px", color: dark2 ? "rgba(255,255,255,0.65)" : muted, lineHeight: 1.7 }}>{desc}</p>
                      </div>
                    </div>
                    {i < SOLUTIONS.length - 1 && <div aria-hidden className="how-step-gap" style={{ height: "40px" }} />}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT TRANSFORMATION: QUEENSTOWN CLEANING ── */}
      <section style={{ padding: "0 40px 80px", borderTop: `1px solid ${line}`, paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px", maxWidth: "680px" }}>
            <div className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>Client Transformation</div>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              How we helped transform Queenstown Cleaning from zero to 30 booked jobs.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              Queenstown Cleaning had no online presence and relied on word of mouth. In one month, we built them a website, got targeted ads live, and turned that into 57 tracked leads and 30 real, booked jobs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "center", textAlign: "center" as const }}>
            <div className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>Straight From The Source</div>
            <h3 className="lp-rise d1" style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "28px", maxWidth: "520px" }}>
              Hear it from our client yourself.
            </h3>
            <video
              className="lp-rise d2"
              controls
              playsInline
              preload="metadata"
              poster="/testimonials/aman-case-study-poster.jpg"
              style={{ width: "100%", maxWidth: "340px", aspectRatio: "9/16", borderRadius: "16px", background: "#000", boxShadow: "0 24px 64px rgba(10,15,26,0.18)" }}
            >
              <source src="/testimonials/aman-case-study.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK (PROCESS) ── */}
      <section id="how" style={{ background: "transparent", borderTop: `1px solid ${line}`, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="m-how-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "64px", alignItems: "start" }}>
            <div className="m-how-sticky lp-rise" style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column" as const, gap: "24px" }}>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "20px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, display: "inline-block" }} />
                  Process
                </span>
                <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
                  The L&S Growth <em style={{ fontStyle: "italic", fontWeight: 600, color: accent }}>Process</em>
                </h2>
                <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "380px" }}>
                  Four steps. Fully managed. Running quietly in the background while you're out on the clean.
                </p>
              </div>
            </div>

            <div>
              {steps.map(({ num, title, desc, checklist }, i) => (
                <Fragment key={num}>
                  <div className="lp-rise how-step-card" style={{ position: "sticky" as const, top: `${110 + i * 28}px`, zIndex: i + 1, background: "#fff", border: `1px solid ${line}`, boxShadow: "0 24px 64px rgba(10,15,26,0.14)", padding: "36px 40px", display: "flex", gap: "28px", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: accent, letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>{num}</div>
                    <div>
                      <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "10px" }}>{title}</h3>
                      <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7, marginBottom: "18px" }}>{desc}</p>
                      <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                        {checklist.map(item => (
                          <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: ink }}>
                            <CheckCircle style={{ width: "15px", height: "15px", color: accent, flexShrink: 0 }} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i < steps.length - 1 && <div aria-hidden style={{ height: "40px" }} />}
                </Fragment>
              ))}

              <div aria-hidden style={{ height: "40px" }} />
              <a
                href="/book"
                className="lp-rise how-step-card"
                style={{ position: "sticky" as const, top: `${110 + steps.length * 28}px`, zIndex: steps.length + 2, textDecoration: "none", display: "flex", gap: "28px", alignItems: "flex-start", background: accent, border: `1px solid ${accent}`, boxShadow: "0 24px 64px rgba(10,15,26,0.18)", padding: "36px 40px" }}
              >
                <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>5</div>
                <div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "10px" }}>Ready to Grow?</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "6px" }}>You know your business. We know how to put it in front of more of the right customers.</p>
                  <p style={{ fontSize: "14px", color: "#fff", fontWeight: 600, lineHeight: 1.7, marginBottom: "18px" }}>Book a free 15 minute call and let's fill your pipeline with booked cleans.</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 18px" }}>
                    Book a Call <ArrowRight style={{ width: "12px", height: "12px" }} />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── hidden for now ── */}
      {false && (
      <section id="services" style={{ background: "transparent", borderTop: `1px solid ${line}`, padding: "100px 40px", overflow: "clip" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, maxWidth: "720px", margin: "0 auto 56px" }}>
            <p className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "16px" }}>Our Services</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Everything your cleaning business needs to turn enquiries into booked jobs.
            </h2>
          </div>
        {serviceSlides.map(({ num, tag, headlineStart, headlineHighlight, accentColor, visual, stat, quotes, cta }, i) => (
          <div
            key={num}
            className="m-service-row lp-rise"
            style={{ position: "sticky" as const, top: `${90 + i * 26}px`, zIndex: i + 1, marginBottom: i < serviceSlides.length - 1 ? "40px" : 0, background: "#fff", border: `1px solid ${line}`, boxShadow: "0 24px 64px rgba(10,15,26,0.14)", padding: "56px" }}
          >
            <div className="m-service-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
              <div className="m-service-visual lp-rise d1" style={{ order: i % 2 === 0 ? 1 : 2, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "400px" }}>
                <img src={visual} alt={tag} style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "10px", filter: tag === "Meta Ads" ? "drop-shadow(0 20px 44px rgba(0,30,60,0.2))" : "none", border: tag === "Meta Ads" ? `1px solid ${line}` : "none" }} />
              </div>

              <div className="m-service-copy" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <span className="lp-rise" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, color: accentColor, letterSpacing: "0.04em", marginBottom: "20px" }}>
                  <span style={{ width: "24px", height: "1px", background: accentColor, display: "inline-block" }} /> {tag.toUpperCase()}
                </span>
                <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,3.6vw,46px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px" }}>
                  {headlineStart}<em style={{ fontStyle: "italic", fontWeight: 700, color: accentColor }}>{headlineHighlight}</em>
                </h2>

                {stat && (
                  <div className="lp-rise d2" style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "clamp(30px,3.6vw,44px)", fontWeight: 900, color: accentColor, letterSpacing: "-0.03em", lineHeight: 1 }}><CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} format color={accentColor} /></div>
                    <div style={{ fontSize: "12px", color: muted, marginTop: "6px", maxWidth: "320px", lineHeight: 1.4 }}>{stat.label}</div>
                  </div>
                )}

                <div className="lp-rise d3 m-service-quotes" style={{ display: "flex", justifyContent: "space-between", gap: "28px", flexWrap: "wrap" as const, marginBottom: "28px" }}>
                  <div style={{ maxWidth: "230px" }}>
                    <div style={{ color: dim, fontSize: "11px", letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                    <p style={{ fontSize: "13px", color: ink, lineHeight: 1.6, marginBottom: "10px" }}>
                      "<QuoteText quote={quotes[0].quote} highlight={quotes[0].quoteHighlight} />"
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: muted }}>{quotes[0].author} — {quotes[0].authorTitle}</p>
                  </div>

                  <div style={{ maxWidth: "230px", marginLeft: "auto", textAlign: "right" as const }}>
                    <div style={{ color: dim, fontSize: "11px", letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                    <p style={{ fontSize: "13px", color: ink, lineHeight: 1.6, marginBottom: "10px" }}>
                      "<QuoteText quote={quotes[1].quote} highlight={quotes[1].quoteHighlight} />"
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: muted }}>{quotes[1].author} — {quotes[1].authorTitle}</p>
                  </div>
                </div>

                <a href="#how" className="lp-rise d4 btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: accentColor, background: "transparent", border: `1px solid ${accentColor}`, padding: "12px 22px" }}>
                  {cta} <ArrowRight style={{ width: "13px", height: "13px" }} />
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>
      </section>
      )}

      {/* ── COMPARISON ── */}
      <section style={{ background: "transparent", padding: "96px 40px", borderTop: `1px solid ${line}` }}>
        <div className="cmp-stack" style={{ maxWidth: "1020px", margin: "0 auto", background: "transparent", borderRadius: "28px", padding: "64px 56px" }}>
          <div style={{ textAlign: "center" as const, marginBottom: "56px" }}>
            <p className="lp-rise" style={{ fontSize: "12px", fontWeight: 600, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>· Why L&S Growth?</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(24px,3.6vw,46px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Most cleaning ads get enquiries.<br />We get you booked jobs.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "15px", color: muted, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
              Ads without follow-through is half a system.<br />We do the whole job, from first click to booked job.
            </p>
          </div>

          <div className="cmp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: "16px", alignItems: "start" }}>
            <div className="lp-rise cmp-card" style={{ background: "#f8fafc", border: `1px solid ${line}`, borderRadius: "16px", padding: "44px 32px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>The Old Way</p>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "28px", lineHeight: 1.15 }}>Generic Ads</h3>
              {[
                "Broad targeting, anyone and everyone",
                "No idea which leads became jobs",
                "Tyre-kickers mixed in with real buyers",
                "Pay per click, not per result",
                "You're left guessing what worked",
              ].map(t => (
                <div key={t} className="cmp-row" suppressHydrationWarning>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <circle cx="8" cy="8" r="7" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5"/>
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: muted }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="lp-rise d1 cmp-card cmp-center" style={{ background: "rgba(0,128,224,0.05)", border: `1.5px solid ${accent}`, borderRadius: "16px", padding: "32px 28px", position: "relative" as const }}>
              <div style={{ position: "absolute" as const, top: "-13px", left: "50%", transform: "translateX(-50%)", background: accent, color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "4px 14px" }}>
                The Complete System
              </div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>&nbsp;</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <img src="/ls-growth-logo-new.png" alt="L&S Growth" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>L&S Growth</h3>
              </div>
              {[
                "Ads targeted at people ready to book a clean",
                "Every lead tracked through to a job",
                "$7–$11 per lead, real numbers",
                "57 leads, 30 booked jobs last month",
                "One system across ads, tracking and reporting",
              ].map(t => (
                <div key={t} className="cmp-row" suppressHydrationWarning>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <circle cx="8" cy="8" r="7" stroke="rgba(0,128,224,0.5)" strokeWidth="1.5"/>
                    <path d="M5 8.5l2.5 2.5L11 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: ink, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="lp-rise d2 cmp-card" style={{ background: "#f8fafc", border: `1px solid ${line}`, borderRadius: "16px", padding: "44px 32px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>The DIY Route</p>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "28px", lineHeight: 1.15 }}>Doing It Yourself</h3>
              {[
                "You're guessing which platforms to use",
                "No tracking from lead to job",
                "Budget spent without clear return",
                "Time spent on ads instead of cleaning",
                "Hard to know what's actually working",
              ].map(t => (
                <div key={t} className="cmp-row" suppressHydrationWarning>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <circle cx="8" cy="8" r="7" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5"/>
                    <path d="M8 5v4M8 10.5v.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: muted }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" as const, marginTop: "48px" }}>
            <a href="/book" className="lp-rise btn btn-dark" style={{ fontSize: "14px", padding: "13px 28px" }}>
              Get more booked jobs <ArrowRight style={{ width: "13px", height: "13px" }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (cleaning businesses only) ── */}
      <section id="work" style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "100px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto 48px" }}>
          <h2 className="lp-rise" style={{ fontSize: "clamp(30px,4.2vw,46px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            What cleaning businesses say<br />about working with us
          </h2>
        </div>

        {(() => {
          const pageSize = 2;
          const pageCount = Math.ceil(testimonials.length / pageSize);
          const page = ((reviewPage % pageCount) + pageCount) % pageCount;
          const pageItems = testimonials.slice(page * pageSize, page * pageSize + pageSize);
          return (
            <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
              <div key={page} className="rev-grid">
                {pageItems.map(({ quote, author, company, color }) => (
                  <div key={author} style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "10px", padding: "28px 28px 24px", display: "flex", flexDirection: "column" as const }}>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={accent}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="rev-quote" style={{ fontSize: "15px", color: ink, lineHeight: 1.6, marginBottom: "18px" }}>{quote}</p>
                    <div style={{ marginTop: "auto" }}>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: ink }}>{author}</div>
                      <div style={{ fontSize: "12.5px", color: muted }}>{company}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "32px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setReviewPage(p => p - 1)} aria-label="Previous reviews" style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${line}`, background: "#fff", color: ink, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ←
                  </button>
                  <button onClick={() => setReviewPage(p => p + 1)} aria-label="Next reviews" style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${line}`, background: "#fff", color: ink, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    →
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ── TRUSTED BY (cleaning logos only) ── */}
      <section style={{ background: "transparent", padding: "70px 0", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto 40px", textAlign: "center" as const, padding: "0 40px" }}>
          <h3 className="lp-rise" style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 800, color: accent, letterSpacing: "-0.01em" }}>
            Working with great cleaning businesses like yours
          </h3>
        </div>
        <div className="trusted-mask lp-rise">
          <div className="trusted-track">
            {[...Array(2)].flatMap((_, dup) =>
              [
                { src: "/logos/queenstown-cleaning.png", alt: "Queenstown Cleaning" },
                { src: "/logos/jims-cleaning.png", alt: "Jim's Cleaning" },
                { src: "/logos/fantastic-services.png", alt: "Fantastic Services" },
                { src: "/logos/katies-elite-cleaning.png", alt: "Katies Elite Cleaning" },
              ].map(({ src, alt }) => (
                <div key={`${dup}-${src}`} aria-hidden={dup === 1 || undefined} style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={src} alt={dup === 0 ? alt : ""} style={{ height: "100%", width: "auto", maxWidth: "220px", objectFit: "contain", opacity: 0.6, filter: "grayscale(100%)", transition: "opacity 0.2s, filter 0.2s" }} onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = "grayscale(0%)"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.filter = "grayscale(100%)"; }} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "100px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,128,224,0.14) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" as const }} />
        <div className="m-faq-grid" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>
          <div className="m-faq-sticky lp-rise">
            <p style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "0.04em", marginBottom: "20px" }}>
              <span style={{ width: "3px", height: "16px", background: accent, display: "inline-block" }} />
              FAQ
            </p>
            <h2 style={{ fontSize: "clamp(30px,3.8vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Got Questions? We've Got Answers!
            </h2>
          </div>
          <div>
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="lp-rise" style={{ borderBottom: `1px solid ${line}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: F }}>
                  <span style={{ flex: 1, fontSize: "18px", fontWeight: 600, color: ink, lineHeight: 1.4 }}>{q}</span>
                  <div style={{ flexShrink: 0, width: "26px", height: "26px", border: `1px solid ${openFaq===i ? accent : line}`, display: "flex", alignItems: "center", justifyContent: "center", background: openFaq===i ? accent : "transparent", transition: "all 0.15s" }}>
                    {openFaq===i ? <Minus style={{ width: "11px", height: "11px", color: "#fff" }} /> : <Plus style={{ width: "11px", height: "11px", color: muted }} />}
                  </div>
                </button>
                {openFaq===i && <div style={{ paddingBottom: "22px", fontSize: "14px", color: muted, lineHeight: 1.8 }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #d6e8f5 0%, #eaf3fb 55%, #f6fafd 100%)", padding: "110px 40px" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 20% 40%, #000 30%, transparent 90%)", maskImage: "radial-gradient(ellipse 70% 80% at 20% 40%, #000 30%, transparent 90%)" }} />
        <div style={{ position: "absolute", top: "-10%", right: "-6%", width: "40%", paddingBottom: "40%", borderRadius: "50%", background: "rgba(0,128,224,0.14)", filter: "blur(70px)", pointerEvents: "none" as const }} />
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ maxWidth: "700px" }}>
            <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(34px,5.2vw,58px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "22px" }}>
              Ready to fill your pipeline with <span style={{ color: accent }}>booked cleans?</span>
            </h2>
            <p style={{ fontSize: "17px", color: muted, lineHeight: 1.6, marginBottom: "36px", maxWidth: "560px" }}>
              Book a free 30-minute call. We'll walk through your current lead flow and show you exactly where the gaps are. No obligation.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column" as const, gap: "10px" }}>
              {["No lock-in contracts", "Full setup handled for you", "Results within the first two weeks"].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: muted }}>
                  <CheckCircle style={{ width: "14px", height: "14px", color: accent, flexShrink: 0 }} />{item}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
              <a href="/book" className="btn btn-dark" style={{ fontSize: "14px", padding: "16px 28px" }}>
                Book a Free Call <ArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
              <button onClick={() => setFormOpen(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: ink, background: "#fff", border: `1px solid ${line}`, padding: "14px 28px", fontFamily: F, cursor: "pointer" }}>
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "linear-gradient(160deg, #04111f 0%, #0c3450 100%)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "72px 40px 40px" }}>
          <div className="m-footer-top" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "40px", flexWrap: "wrap" as const, marginBottom: "48px" }}>
            <img src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "34px", width: "auto", objectFit: "contain" }} />
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }} />

          <div className="m-footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", padding: "40px 0" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "20px" }}>Navigation</p>
              {[["Home","/"],["Our Work","#work"],["How It Works","#how"],["Book a Call","/book"]].map(([l,h]) => (
                <a key={l} href={h} className="footer-link" style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "12px" }}>{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "20px" }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
                <a href="tel:02102820190" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>021 028 20190</a>
                <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>New Zealand & Australia</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "20px" }}>Follow</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
                <a href="https://www.facebook.com/profile.php?id=61584135511815" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Facebook</a>
                <a href="https://www.linkedin.com/company/111303114/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>LinkedIn</a>
                <a href="https://www.instagram.com/lsgrowthagency/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Instagram</a>
              </div>
            </div>
          </div>

          <div className="m-footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "24px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "12px" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}>© {new Date().getFullYear()} L&S Growth Agency. All rights reserved.</p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>NZ &amp; AU Cleaning Businesses</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
