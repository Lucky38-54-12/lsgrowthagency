"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { ArrowRight, CheckCircle, Plus, Minus } from "lucide-react";

/* ── CountUp component ── */
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

/* ── Design tokens ── */
const F = "var(--font-inter), system-ui, sans-serif";
const ink   = "#0a0a0a";
const muted = "#6b7280";
const dim   = "#9ca3af";
const line  = "#e5e7eb";
const accent = "#0080e0";
const accentDark = "#006bbf";
const accentLight = "#40c0f0";
const dark  = "#0a0f1a";

/* ── ScrollRevealText: words darken progressively as the block scrolls up the viewport ── */
function ScrollRevealText({ text, style, className }: { text: string; style?: React.CSSProperties; className?: string }) {
  const words = text.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const activeCount = Math.round(progress * words.length);
  return (
    <p ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ color: i < activeCount ? ink : "#cbd0d6", transition: "color 0.3s ease" }}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/* ── Connected tool logos ── */
function MetaLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect width="48" height="48" rx="11" fill="#0866FF" />
      <path d="M31.6 24.4h-4.2v13h-5.4v-13h-3v-4.6h3v-3.3c0-4 1.9-6.5 6.6-6.5h4v4.6h-2.5c-1.9 0-2 .7-2 2v3.2h4.6l-.5 4.6z" fill="#fff" />
    </svg>
  );
}
function GCalLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="8" width="40" height="36" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="1" />
      <path d="M4 12a4 4 0 0 1 4-4h6v9H4z" fill="#1A73E8" />
      <path d="M44 12a4 4 0 0 0-4-4h-6v9h10z" fill="#1A73E8" />
      <rect x="4" y="17" width="40" height="6" fill="#EA4335" />
      <text x="24" y="37" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#3C4043">18</text>
    </svg>
  );
}
function GmailLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect width="48" height="48" rx="11" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      <path d="M9 15h30v18a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V15z" fill="#F5F5F5" />
      <path d="M9 15l15 11 15-11" fill="none" stroke="#EA4335" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M9 15v18M39 15v18" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function SheetsLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M12 4h16l8 8v28a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="#0F9D58" />
      <path d="M28 4l8 8h-8V4z" fill="#0B8043" />
      <rect x="14" y="19" width="20" height="15" fill="#fff" />
      <path d="M14 24h20M14 29h20M21.3 19v15M27 19v15" stroke="#0F9D58" strokeWidth="1.4" />
    </svg>
  );
}
function SlackLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect width="48" height="48" rx="11" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      <g>
        <rect x="14" y="8" width="5" height="14" rx="2.5" fill="#36C5F0" />
        <rect x="14" y="24" width="5" height="14" rx="2.5" fill="#2EB67D" />
        <rect x="8" y="29" width="14" height="5" rx="2.5" fill="#ECB22E" />
        <rect x="24" y="29" width="14" height="5" rx="2.5" fill="#E01E5A" />
        <rect x="29" y="24" width="5" height="14" rx="2.5" fill="#36C5F0" />
        <rect x="29" y="6" width="5" height="14" rx="2.5" fill="#E01E5A" />
        <rect x="26" y="8" width="14" height="5" rx="2.5" fill="#2EB67D" />
        <rect x="10" y="14" width="14" height="5" rx="2.5" fill="#ECB22E" />
      </g>
    </svg>
  );
}

function SparkIcon({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect width="48" height="48" rx="11" fill={accent} />
      <path d="M24 9l3.4 10.6L38 23l-10.6 3.4L24 37l-3.4-10.6L10 23l10.6-3.4z" fill="#fff" />
    </svg>
  );
}

/* ── Connections: animated step sequence ── */
const connectSteps = [
  {
    title: "Connections",
    desc: "We connect straight into your ads, your inbox and your calendar — all linked under your own accounts, nothing new to log into.",
    tools: [MetaLogo, GmailLogo, GCalLogo, SheetsLogo, SlackLogo],
  },
  {
    title: "Qualification",
    desc: "Every lead gets checked in seconds by AI that never sleeps, never forgets, and never leaves someone waiting on a reply.",
    tools: [MetaLogo, GmailLogo, SparkIcon],
  },
  {
    title: "Booking",
    desc: "A qualified lead doesn't wait for a callback. It books itself straight onto your calendar, in a slot you're actually free.",
    tools: [GCalLogo],
  },
  {
    title: "Integrated",
    desc: "None of it needs babysitting. Ads, AI, calendar and follow-up all run together, quietly, in the background.",
    tools: [MetaLogo, GmailLogo, GCalLogo, SheetsLogo, SlackLogo, SparkIcon],
  },
];

function ConnectionsAnimated() {
  const [active, setActive] = useState(0);
  const skyRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = sky.clientWidth, h = sky.clientHeight;
    const els = chipRefs.current.filter(Boolean) as HTMLDivElement[];
    const total = els.length;
    const DROP_GAP = 380;

    if (reduceMotion) {
      els.forEach((el, i) => {
        const ch = el.offsetHeight, cw = el.offsetWidth;
        el.style.opacity = "1";
        el.style.transform = `translate(${(w - cw) / 2}px,${(h - ch - 12) - i * (ch * 0.45)}px) rotate(0deg)`;
      });
      const t = setTimeout(() => setActive(a => (a + 1) % connectSteps.length), total * DROP_GAP + 2600);
      return () => clearTimeout(t);
    }

    type Body = { el: HTMLDivElement; w: number; h: number; x: number; y: number; vx: number; vy: number; rot: number; vrot: number; settled: boolean };
    const bodies: Body[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    els.forEach((el, i) => {
      const t = setTimeout(() => {
        const cw = el.offsetWidth, ch = el.offsetHeight;
        const margin = 8;
        const maxX = Math.max(margin, w - cw - margin);
        const x = margin + Math.random() * (maxX - margin);
        bodies.push({ el, w: cw, h: ch, x, y: -ch - 10, vx: (Math.random() - 0.5) * 0.5, vy: 0, rot: (Math.random() - 0.5) * 16, vrot: (Math.random() - 0.5) * 1.6, settled: false });
      }, i * DROP_GAP);
      timers.push(t);
    });

    let raf: number;
    function tick() {
      bodies.forEach(b => {
        if (b.settled) return;
        b.vy += 0.55; b.y += b.vy; b.x += b.vx; b.rot += b.vrot;
        if (b.x < 4) { b.x = 4; b.vx *= -0.4; }
        if (b.x + b.w > w - 4) { b.x = w - 4 - b.w; b.vx *= -0.4; }
        let floor = h - 10;
        bodies.forEach(o => {
          if (o === b || !o.settled) return;
          const overlapX = b.x < o.x + o.w && b.x + b.w > o.x;
          if (overlapX && o.y < floor) floor = o.y;
        });
        if (b.y + b.h >= floor) {
          b.y = floor - b.h;
          b.vy = -b.vy * 0.3;
          b.vrot *= 0.5;
          if (Math.abs(b.vy) < 1.2) {
            b.vy = 0; b.vx = 0; b.vrot = 0; b.settled = true;
            b.rot = Math.max(-8, Math.min(8, b.rot));
          }
        }
        b.el.style.opacity = "1";
        b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.rot}deg)`;
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const t = setTimeout(() => setActive(a => (a + 1) % connectSteps.length), total * DROP_GAP + 3000);
    timers.push(t);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [active]);

  return (
    <section style={{ background: "#fff", padding: "100px 40px", borderTop: `1px solid ${line}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="m-connect-grid" style={{ display: "grid", gridTemplateColumns: "1fr 620px", gap: "48px", alignItems: "center" }}>
          <div>
            <div className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "20px" }}>
              How It All Works Together
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "4px" }}>
              {connectSteps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActive(i)}
                    style={{
                      display: "flex", alignItems: "baseline", gap: "16px",
                      textAlign: "left" as const, background: "none", border: "none", cursor: "pointer",
                      padding: "10px 0", font: "inherit",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontFamily: "ui-monospace,monospace", color: isActive ? accent : dim, transition: "color 0.4s", flexShrink: 0, minWidth: "22px" }}>
                      0{i + 1}
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: "clamp(22px,2.6vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: isActive ? ink : dim, transition: "color 0.4s" }}>
                        {s.title}
                      </span>
                      <span
                        style={{
                          display: "block", fontSize: "15px", color: muted, lineHeight: 1.65, maxWidth: "440px",
                          marginTop: isActive ? "10px" : "0", maxHeight: isActive ? "120px" : "0", opacity: isActive ? 1 : 0,
                          overflow: "hidden", transition: "all 0.4s ease",
                        }}
                      >
                        {s.desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={skyRef} className="m-connect-scatter" style={{ position: "relative", width: "620px", height: "480px", flexShrink: 0 }}>
            {connectSteps[active].tools.map((Logo, i) => (
              <div
                key={`${active}-${i}`}
                ref={el => { chipRefs.current[i] = el; }}
                style={{ position: "absolute", top: 0, left: 0, opacity: 0, filter: "drop-shadow(0 14px 24px rgba(10,15,26,0.16))" }}
              >
                <Logo size={connectSteps[active].tools.length > 4 ? 96 : 128} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Data ── */
const bentoCards = [
  { num: 70, suffix: "%+", label: "Leads Lost to No Follow-Up", desc: "Most local service businesses respond to less than 30% of enquiries within the first hour. The rest go cold and book someone else.", bg: dark, textColor: "#fff", dimColor: "rgba(255,255,255,0.25)", descColor: "rgba(255,255,255,0.55)", span: "1/8" },
  { num: 60, suffix: "s",  label: "Our Response Time",          desc: "Our system contacts every new lead within 60 seconds. Before they've even scrolled to your competitor.", bg: "#fff",  textColor: ink, dimColor: dim, descColor: muted, span: "8/13", border: true },
  { num: 5,  suffix: "min",label: "Until a Lead Goes Cold",     desc: "Prospects make a decision fast. If you don't reach them first, someone else will. Automation closes that window.", bg: "#f8fafc", textColor: ink, dimColor: dim, descColor: muted, span: "1/5", border: true },
  { num: 3,  suffix: "×",  label: "More Booked Jobs",          desc: "Clients running our full system (ads, instant response, follow-up) book 3x more jobs from the same enquiry volume.", bg: "#fff", textColor: ink, dimColor: dim, descColor: muted, span: "5/10", border: true },
  { num: 700,suffix: "+",  label: "Admin Hours Saved/Client",  desc: "Manual follow-up, chasing quotes, updating spreadsheets. Our CRM and automations handle all of it.", bg: dark, textColor: "#fff", dimColor: "rgba(255,255,255,0.25)", descColor: "rgba(255,255,255,0.5)", span: "10/13" },
];

const steps = [
  {
    num: "01",
    title: "Generate Demand",
    desc: "No more relying on referrals or slow weeks. You get a steady flow of people actively looking for your service.",
    bullets: ["Paid Media", "Facebook Ads", "Instagram Ads"],
  },
  {
    num: "02",
    title: "Instant Response",
    desc: "Leads get contacted immediately. So you don't lose jobs to the guy who replies first.",
    bullets: ["SMS within 30 seconds", "AI voice call", "24/7 coverage"],
  },
  {
    num: "03",
    title: "Automated Follow-Up",
    desc: "Most jobs are lost after the first message. We keep following up so your leads don't go cold.",
    bullets: ["Multi-step sequences", "SMS + Email", "Smart timing"],
  },
  {
    num: "04",
    title: "Pipeline Management",
    desc: "No more missed calls or forgotten enquiries. Every lead is tracked and handled properly.",
    bullets: ["CRM dashboard", "Pipeline stages", "Mobile app"],
  },
];

const testimonials = [
  {
    quote: "Great experience working with L&S Growth. Got over $80K in booked jobs in just a couple of months. Perfect for a trade business without a dedicated marketing team.",
    author: "Thomas Cooper",
    company: "Cooper Electrical",
    color: "#0080e0",
  },
  {
    quote: "We gave L&S Growth a shot with zero expectations. Within a month they'd achieved what other agencies couldn't do in almost a year. Highly recommend.",
    author: "Luis Luigi",
    company: "GoPro Plumbing",
    color: "#16a34a",
  },
  {
    quote: "An absolute powerhouse with the ad campaigns. Goes above and beyond for every client and the results speak for themselves.",
    author: "Kale Black",
    company: "Construction Team",
    color: "#7c3aed",
  },
  {
    quote: "L&S Growth has been really helpful for our business, sending us a steady stream of leads. We had a great campaign running for months. Really recommend them.",
    author: "Julian Da Costa",
    company: "Da Costa Builders",
    color: "#ea580c",
  },
  {
    quote: "Great guy, great service, great all-round brand.",
    author: "Jay Shadlock",
    company: "Shadlock Roofing",
    color: "#0891b2",
  },
  {
    quote: "The workload taken off us by them calling and qualifying the leads, then booking them straight in for quotes, has been amazing. We just don't have time to do it ourselves. Highly recommend.",
    author: "Andrew Weasley",
    company: "Weasley Landscaping",
    color: "#be123c",
  },
  {
    quote: "To be honest, we were a little sceptical they'd deliver what they said. But we tried them anyway, and they delivered more leads than what was promised. No hesitation recommending them.",
    author: "Vienna Woods",
    company: "Woods Joinery",
    color: "#9333ea",
  },
  {
    quote: "They've been a huge help in getting us more clients this year. The campaigns they put together have had great success with the leads generated.",
    author: "Sam Nguyen",
    company: "SSP Electrical",
    color: "#0d9488",
  },
];

const caseStudies = [
  {
    company: "Perl Electrical",
    result: "Reduced time-wasting enquiries by clarifying job types and starting prices.",
    gradient: "linear-gradient(165deg, #1a140f 0%, #6b4a35 55%, #c79b7c 100%)",
  },
  {
    company: "SSP Electrical",
    result: "Filtered out low-intent enquiries to improve booking consistency.",
    gradient: "linear-gradient(165deg, #0a1410 0%, #1f3b30 55%, #5c8a73 100%)",
  },
  {
    company: "Common Ground Electrical",
    result: "Improved enquiry quality by focusing messaging on higher-value work.",
    gradient: "linear-gradient(165deg, #10141a 0%, #2c3a4d 55%, #6f8aa8 100%)",
  },
  {
    company: "Fantastic Services",
    result: "Filtered out low-intent enquiries to improve booking consistency.",
    gradient: "linear-gradient(165deg, #141014 0%, #3d2c47 55%, #8a6f9e 100%)",
  },
];

const faqs = [
  { q: "What types of businesses do you work with?",         a: "We work exclusively with local service businesses in New Zealand and Australia: trades, construction, landscaping, home services, and similar. If you rely on local enquiries to generate jobs, we can help." },
  { q: "How quickly will I see results?",                    a: "Most clients see qualified bookings within the first two weeks of campaigns going live. Results compound over the first 60–90 days as our follow-up sequences warm up and retargeting audiences build." },
  { q: "Is this fully done-for-you?",                       a: "Yes. We handle everything: ad creative, targeting, landing pages, automation setup, CRM configuration, and ongoing management. You focus on delivering the work and we fill your pipeline." },
  { q: "What makes you different from a regular agency?",   a: "We don't just run ads. We manage your entire lead generation: ads, instant response, follow-up, and pipeline tracking. Most agencies stop at getting you traffic. We focus on getting you booked jobs." },
  { q: "Do I need to provide anything?",                    a: "Just a few details about your services, target area, and ideal customer. We handle everything else: creative, copy, targeting, automation, and setup." },
  { q: "What happens after the initial setup?",             a: "We manage and optimise everything on an ongoing basis. You get monthly reporting on leads, bookings, and ROI, plus a direct line to your account manager for anything that comes up." },
];

/* ── Counter hook ── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState<"idle"|"sending"|"done"|"error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", message: "" });
  const [howHeight, setHowHeight] = useState(980);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data && e.data.type === "lsgrowth-demo-height" && typeof e.data.height === "number") {
        setHowHeight(e.data.height);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

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
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("lp-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".lp-rise").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const s: React.CSSProperties = { fontFamily: F };

  return (
    <div style={{ ...s, color: ink, background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)" }}>
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

        .btn-dark {
          background-image: linear-gradient(to right, #fff 50%, ${accent} 50%);
          color: #fff; border: 1.5px solid ${accent};
        }
        .btn-dark:hover { background-position: left; color: ${accent}; }

        .btn-outline {
          background-image: linear-gradient(to top, #fff 50%, transparent 50%);
          background-size: 100% 200%; background-position: top;
          color: #fff; border: 1.5px solid rgba(255,255,255,0.32);
        }
        .btn-outline:hover { background-position: bottom; color: ${dark}; border-color: #fff; }

        .btn-hero { animation: pulse-blue 2.4s ease-in-out infinite; }
        .btn-hero:hover { animation: none; box-shadow: 0 6px 24px rgba(0,128,224,0.4); }
        @keyframes pulse-blue { 0%,100% { box-shadow: 0 0 0 0 rgba(0,128,224,0.35); } 50% { box-shadow: 0 0 0 8px rgba(0,128,224,0); } }

        @keyframes shimmer { 0% { left:-80%; } 100% { left:160%; } }
        .btn-nav {
          background: ${accent}; color: #fff; border: 1.5px solid ${accent};
          position: relative; overflow: hidden;
          transition: color 0.22s ease, box-shadow 0.22s ease, transform 0.16s ease;
        }
        .btn-nav::after { content:''; position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); animation:shimmer 2.4s ease-in-out infinite; }
        .btn-nav:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(0,128,224,0.35); }
        .btn-nav svg { transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .btn-nav:hover svg { transform:translateX(3px); }

        .nav-link { position:relative; transition:color 0.15s ease; }
        .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:${accent}; transition:width 0.2s ease; }
        .nav-link:hover { color:${accent} !important; }
        .nav-link:hover::after { width:100%; }

        @keyframes heroUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nav-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .nav-cta {
          position: relative;
          overflow: hidden;
        }
        .nav-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
          background-size: 200% 100%;
          animation: nav-shimmer 2.6s ease-in-out infinite;
          border-radius: inherit;
          pointer-events: none;
        }
        .nav-cta:hover { background: ${accentDark} !important; transform: translateY(-1px); transition: all 0.15s; }
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
        .lp-rise.d5.lp-visible { animation-delay:0.35s; }

        .step-col:hover { border-right-color: rgba(10,10,10,0.25) !important; }

        .footer-link { position:relative; transition:color 0.15s ease; text-decoration:none; }
        .footer-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:${accent}; transition:width 0.22s ease; }
        .footer-link:hover { color:${accent} !important; }
        .footer-link:hover::after { width:100%; }

        @media (max-width: 700px) {
          nav { padding: 0 20px !important; }
          .m-nav-links { gap: 18px !important; }
        }

        @media (max-width: 980px) {
          .m-testi-grid { grid-template-columns: repeat(2,1fr) !important; }
        }

        @media (max-width: 640px) {
          .m-nav-links { display: none !important; }
          .m-nav-hamburger { display: flex !important; }
          .btn-nav { display: none !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 16px !important; height: 60px !important; }
          .nav-logo { height: 34px !important; }
          .m-hero-content { padding: 100px 20px 40px !important; }
          .m-hero-stats { grid-template-columns: 1fr !important; max-width: 100% !important; margin-top: 32px !important; padding-top: 24px !important; }
          .m-hero-stats > div { border-left: none !important; padding: 16px 0 !important; border-top: 1px solid rgba(255,255,255,0.14) !important; }
          .m-hero-stats > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .m-trusted-row > div { border-right: none !important; border-bottom: 1px solid ${line}; min-width: calc(50% - 0px) !important; }
          .m-trusted-row > div:last-child { border-bottom: none !important; }
          .m-hero-content h1 { font-size: 34px !important; }
          .hero-sub { font-size: 15px !important; }
          .m-calendar-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .m-calendar-phone { display: flex !important; justify-content: center !important; margin-top: 32px !important; }
          .m-calendar-phone img { height: 220px !important; }
          .m-calendar-stats { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .m-calendar-stats > div { border-right: none !important; border-bottom: 1px solid ${line} !important; }
          .m-calendar-stats > div:last-child { border-bottom: none !important; }
          .m-build-grid { grid-template-columns: 1fr !important; }
          .m-how-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-how-sticky { position: static !important; top: auto !important; }
          .how-step-card { position: static !important; padding: 28px 24px !important; box-shadow: 0 12px 32px rgba(10,15,26,0.14) !important; }
          .m-bento-row { grid-template-columns: 1fr !important; }
          .m-bento-hide { display: none !important; }
          .m-solution-split { display: none !important; }
          .m-solution-split > div { border-right: none !important; border-bottom: 1px solid ${line} !important; }
          .m-solution-split > div:last-child { border-bottom: none !important; }
          .m-case-grid { grid-template-columns: 1fr !important; }
          .m-testi-grid { grid-template-columns: 1fr !important; }
          .m-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .m-faq-sticky { position: static !important; }
          .m-connect-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-connect-scatter { width: 100% !important; height: 260px !important; margin-top: 8px !important; }
          .m-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .m-footer-brand { grid-column: 1/-1 !important; }
          .m-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .m-cta-stack { grid-template-columns: 1fr !important; gap: 24px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          footer  { padding-left: 20px !important; padding-right: 20px !important; }
          .btn { min-height: 44px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,15,26,0.08)", transform: "translateZ(0)" }}>
        {/* Logo — far left */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img className="nav-logo" src="/ls-growth-logo-trimmed.png" alt="L&S Growth" style={{ height: "42px", width: "auto", objectFit: "contain" }} />
        </a>
        {/* Right side — links, CTA, hamburger grouped together */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div className="m-nav-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {[["Our Work","#work"],["Services","#services"],["How It Works","#how"],["About","#about"],["Play & Win","/play"]].map(([l,h]) => (
              <a key={h} href={h} className="nav-link" style={{ fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", whiteSpace: "nowrap" as const }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a href="/book" className="nav-cta" style={{ fontSize: "13px", fontWeight: 700, color: "#fff", background: accent, borderRadius: "0", padding: "10px 18px", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" as const }}>
              Talk To Us
            </a>
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
              {[["Our Work","#work"],["Services","#services"],["How It Works","#how"],["About","#about"],["Play & Win","/play"]].map(([l,h]) => (
                <a key={h} href={h} onClick={() => setNavOpen(false)} style={{ display: "block", width: "100%", padding: "13px", background: "#f8fafc", border: `1px solid ${line}`, fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>{l}</a>
              ))}
              <button onClick={() => { setNavOpen(false); setFormOpen(true); }} style={{ display: "block", width: "100%", padding: "13px", background: "#f1f5f9", border: `1px solid ${line}`, color: ink, fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: F, textAlign: "center" as const, boxSizing: "border-box" as const }}>Send a Message</button>
              <a href="/book" onClick={() => setNavOpen(false)} style={{ display: "block", width: "100%", padding: "13px", background: accent, color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none", textAlign: "center" }}>Book a Call</a>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT FORM MODAL ── */}
      {formOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div onClick={() => setFormOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(6px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: "460px", background: "#fff", borderRadius: "4px", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", overflowY: "auto" as const, maxHeight: "92vh" }}>
            {/* Header */}
            <div style={{ padding: "32px 32px 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "0.04em", textTransform: "uppercase" as const, margin: 0 }}>Get in Touch</h2>
                <button onClick={() => setFormOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: "22px", lineHeight: 1, padding: "0 0 0 16px", flexShrink: 0 }}>×</button>
              </div>
              <p style={{ fontSize: "14px", color: muted, lineHeight: 1.6, margin: "0 0 24px" }}>Fill in your details and we'll be in touch within 24 hours.</p>
              <div style={{ width: "3px", height: "40px", background: accent, position: "absolute" as const, left: 0, top: "32px", borderRadius: "0 2px 2px 0" }} />
            </div>

            {/* Body */}
            <div style={{ padding: "0 32px 32px" }}>
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
                    { label: "BUSINESS TYPE", key: "business", type: "text", placeholder: "e.g. Plumbing, Electrical, Landscaping" },
                  ].map(({ label, key, type, placeholder, required }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: ink, letterSpacing: "0.08em", marginBottom: "8px" }}>{label}</label>
                      <input type={type} required={required} placeholder={placeholder} value={formData[key as keyof typeof formData]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${line}`, borderRadius: "4px", fontSize: "14px", fontFamily: F, color: ink, outline: "none", background: "#fff", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: ink, letterSpacing: "0.08em", marginBottom: "8px" }}>MESSAGE</label>
                    <textarea rows={4} placeholder="Tell us about your business and what you're looking to achieve..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${line}`, borderRadius: "4px", fontSize: "14px", fontFamily: F, color: ink, outline: "none", background: "#fff", resize: "none" as const, boxSizing: "border-box" as const }} />
                  </div>
                  {formState === "error" && <p style={{ fontSize: "13px", color: "#dc2626", margin: 0 }}>Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={formState === "sending"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", background: formState === "sending" ? "#94a3b8" : accent, color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: 700, fontFamily: F, cursor: formState === "sending" ? "not-allowed" : "pointer", letterSpacing: "0.04em" }}>
                    {formState === "sending" ? "Sending..." : "Send message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "680px", display: "flex", alignItems: "center", background: "linear-gradient(160deg, #04111f 0%, #0c3450 42%, #1c5d86 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", pointerEvents: "none" as const, background: "linear-gradient(180deg, rgba(4,17,31,0.55) 0%, transparent 100%)" }} />
        <div className="m-hero-content" style={{ position: "relative", zIndex: 1, padding: "150px 40px 110px", width: "100%" }}>
          <div style={{ maxWidth: "640px" }}>
            <p className="hero-badge" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "24px", letterSpacing: "0.01em" }}>
              Your growth partner · NZ & AU
            </p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(48px, 5.5vw, 82px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px" }}>
              We bring the work.<br />You do what you do best.
            </h1>
            <div className="hero-ctas" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              <a href="/book" className="btn btn-dark btn-hero" style={{ fontSize: "14px", padding: "12px 22px", borderRadius: "0" }}>
                Book a Free Call <ArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
              <button onClick={() => setFormOpen(true)} className="btn btn-outline" style={{ fontSize: "14px", padding: "11px 18px", borderRadius: "0", cursor: "pointer", fontFamily: F }}>
                Send a Message
              </button>
            </div>
            <p className="hero-note" style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Free 30-min strategy call · No obligation</p>
          </div>

          <div className="m-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(255,255,255,0.14)", marginTop: "56px", paddingTop: "32px", maxWidth: "780px" }}>
            {[
              { to: 350000, prefix: "$", suffix: "+", format: true, label: "Added in client revenue" },
              { to: 300, prefix: "", suffix: "+", format: false, label: "Qualified consultations/month" },
              { to: 700, prefix: "", suffix: "+", format: false, label: "Admin hours removed" },
            ].map(({ to, prefix, suffix, format, label }, i) => (
              <div key={label} style={{ paddingLeft: i === 0 ? 0 : "32px", paddingRight: "24px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)" }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#7cd4ff", letterSpacing: "-0.02em", marginBottom: "6px" }}><CountUp to={to} prefix={prefix} suffix={suffix} format={format} color="#7cd4ff" /></div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section style={{ position: "relative", padding: "24px 0", overflow: "hidden", background: "transparent" }}>
        <style suppressHydrationWarning>{`
          .m-trusted-track { animation: trusted-marquee 32s linear infinite; }
          .m-trusted-item { padding: 0 40px; }
          .m-trusted-track img { height: 40px; width: auto; opacity: 0.85; filter: grayscale(100%); flex-shrink: 0; }
          .m-trusted-track img.m-trusted-big { height: 56px; }
          .m-trusted-mask:hover .m-trusted-track { animation-play-state: paused; }
          @keyframes trusted-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (max-width: 640px) {
            .m-trusted-item { padding: 0 22px; }
            .m-trusted-track img { height: 26px; }
            .m-trusted-track img.m-trusted-big { height: 36px; }
          }
        `}</style>
        <div style={{ borderTop: "1px solid #cbd5e1", borderBottom: "1px solid #cbd5e1", padding: "30px 0" }}>
          <div
            className="m-trusted-mask"
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%)",
            }}
          >
            <div className="m-trusted-track" style={{ display: "flex", alignItems: "stretch", width: "max-content" }}>
              {[...Array(2)].flatMap((_, dup) =>
                [
                  { src: "/logos/logo-1.png", alt: "We Do Electrical", w: 331, h: 122 },
                  { src: "/logos/logo-2.png", alt: "Common Ground Electrical", w: 142, h: 173 },
                  { src: "/logos/logo-3.png", alt: "PERL Electrical Christchurch East & CBD", w: 341, h: 129 },
                  { src: "/logos/logo-4.png", alt: "SSP Electrical", w: 261, h: 71 },
                  { src: "/logos/logo-5.png", alt: "CN-Electrical", w: 362, h: 86 },
                  { src: "/logos/logo-6.png", alt: "PERL Electrical Christchurch South", w: 346, h: 136 },
                  { src: "/logos/logo-7.png", alt: "Fantastic Services", w: 352, h: 136 },
                  { src: "/logos/logo-8.png", alt: "Queenstown Cleaning Services", w: 200, h: 200, big: true },
                  { src: "/logos/logo-9.png", alt: "Jim's Cleaning", w: 200, h: 200, big: true },
                ].map(({ src, alt, w, h, big }) => (
                  <div key={`${dup}-${src}`} className="m-trusted-item" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <img src={src} alt={dup === 0 ? alt : ""} aria-hidden={dup === 1 || undefined} width={w} height={h} className={big ? "m-trusted-big" : undefined} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── AT L&S GROWTH ── */}
      <section style={{ background: "transparent", padding: "90px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "880px" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: ink, marginBottom: "22px", fontFamily: F }}>At L&S Growth</p>
          <ScrollRevealText
            text="We build and run the whole system: ads that pull in the right people, instant follow-up so nothing goes cold, qualified leads booked straight into your calendar, and a dashboard showing exactly what it's all earning you. You do the work, we grow the pipeline."
            style={{ fontSize: "clamp(22px,3.2vw,36px)", fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.01em", fontFamily: "var(--font-fraunces), Georgia, serif" }}
          />
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #ffffff 0%, #eef5fb 55%, #ffffff 100%)", padding: "40px 40px 32px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, background: "radial-gradient(ellipse 50% 55% at 50% 35%, rgba(0,128,224,0.08) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", textAlign: "center" as const }}>
          <span className="lp-rise" style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#fff", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>Results</span>
          <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "10px", maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
            A few results from previous lead-gen campaigns
          </h2>
          <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7, marginBottom: "16px" }}>
            Unlock a ton of new leads, without having to pay a fortune.
          </p>
          <img src="/results-mockup.png" alt="Dashboard showing leads, cost per lead, and ad spend results for Queenstown Cleaning, SSP Electrical, and Perl Electrical campaigns" className="lp-rise d3" style={{ width: "100%", maxWidth: "920px", height: "auto", display: "block", margin: "0 auto" }} />
        </div>

        <iframe
          src="/process-demo.html"
          title="The L&#38;S Growth Pipeline, from form to quoted job"
          loading="lazy"
          scrolling="no"
          className="lp-rise d3"
          style={{ position: "relative", display: "block", width: "100%", height: `${howHeight}px`, border: "none", overflow: "hidden", marginTop: "40px" }}
        />

        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", textAlign: "center" as const }}>
          <a href="/book" className="lp-rise d3 btn btn-dark" style={{ fontSize: "14px", padding: "13px 28px", marginTop: "28px" }}>
            Get Results Like This <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>
        </div>
      </section>

      {/* ── HOW WE WORK (SPLIT) ── hidden for now ── */}
      {false && (
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
                  Four steps. Fully managed. Running quietly in the background while you're out on the job.
                </p>
              </div>

            </div>

            <div>
              {steps.map(({ num, title, desc, bullets }, i) => (
                <Fragment key={num}>
                  <div
                    className="lp-rise how-step-card"
                    style={{
                      position: "sticky" as const,
                      top: `${110 + i * 28}px`,
                      zIndex: i + 1,
                      background: "#fff",
                      border: `1px solid ${line}`,
                      boxShadow: "0 24px 64px rgba(10,15,26,0.14)",
                      padding: "36px 40px",
                      display: "flex",
                      gap: "28px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: accent, letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>{num}</div>
                    <div>
                      <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "10px" }}>{title}</h3>
                      <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7, marginBottom: "18px" }}>{desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px" }}>
                        {bullets.map(b => (
                          <span key={b} style={{ fontSize: "12px", fontWeight: 500, color: muted, background: "#f8fafc", border: `1px solid ${line}`, padding: "6px 14px" }}>{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i < steps.length - 1 && <div aria-hidden style={{ height: "40px" }} />}
                </Fragment>
              ))}

              {/* Get in Touch card */}
              <div aria-hidden style={{ height: "40px" }} />
              <a
                href="/book"
                className="lp-rise how-step-card"
                style={{
                  position: "sticky" as const,
                  top: `${110 + steps.length * 28}px`,
                  zIndex: steps.length + 2,
                  textDecoration: "none",
                  display: "flex",
                  gap: "28px",
                  alignItems: "flex-start",
                  background: accent,
                  border: `1px solid ${accent}`,
                  boxShadow: "0 24px 64px rgba(10,15,26,0.18)",
                  padding: "36px 40px",
                }}
              >
                <div style={{ fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0 }}>5</div>
                <div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "10px" }}>Get in Touch</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "18px" }}>Have a vision? Let's make a plan. Book a free 30-minute call and take the first step toward a full pipeline.</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 18px" }}>
                    Book a Call <ArrowRight style={{ width: "12px", height: "12px" }} />
                  </span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* ── CALENDAR PROMISE ── hidden for now ── */}
      {false && (
      <section style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "100px 40px 80px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)" }} />
        <div className="m-calendar-grid" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "64px", alignItems: "center" }}>
          <div>
            <span className="lp-rise" style={{ display: "inline-block", fontSize: "13px", fontWeight: 500, color: muted, background: "#f8fafc", border: `1px solid ${line}`, padding: "8px 16px", marginBottom: "28px" }}>
              Client acquisition, fully handled
            </span>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "24px", maxWidth: "640px" }}>
              We fill your calendar.<br />You focus on the work.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "480px", marginBottom: "36px" }}>
              From first outreach to signed quote, we manage every step of getting you clients so you never have to chase leads again.
            </p>
            <a href="/book" className="lp-rise d3 btn btn-dark" style={{ fontSize: "14px", padding: "13px 26px", marginBottom: "48px" }}>
              Book a Call <ArrowRight style={{ width: "13px", height: "13px" }} />
            </a>
            <div className="lp-rise d4 m-calendar-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `1px solid ${line}`, maxWidth: "560px" }}>
              {[
                { big: "100%", small: "Done for you" },
                { big: "3 steps", small: "Contact → consult → close" },
                { big: "Higher ROI", small: "Predictable pipeline" },
              ].map(({ big, small }, i) => (
                <div key={big} style={{ padding: "24px 22px", borderRight: i < 2 ? `1px solid ${line}` : "none" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: accent, letterSpacing: "-0.02em", marginBottom: "6px" }}>{big}</div>
                  <div style={{ fontSize: "12px", color: muted, lineHeight: 1.4 }}>{small}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-rise d1 m-calendar-phone" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/mockup-phone.avif" alt="" style={{ width: "auto", maxWidth: "260px", height: "360px", objectFit: "contain", filter: "drop-shadow(0 16px 48px rgba(0,128,224,0.18))" }} />
          </div>
        </div>
      </section>
      )}

      {/* ── WHAT WE BUILD FOR YOU ── */}
      <section id="services" style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)" }} />
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, maxWidth: "720px", margin: "0 auto 56px" }}>
            <p className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "16px" }}>Our Services</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              We help local service businesses turn enquiries into booked jobs.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.65 }}>
              We focus on enquiry quality, so you spend less time chasing and more time working.
            </p>
          </div>
          <div className="m-build-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {[
              {
                tag: "Qualified Leads",
                title: "Bring In High-Intent Enquiries",
                desc: "Targeted campaigns designed to attract people ready to buy, not just browse.",
                tags: ["Meta Ads", "Local Targeting"],
                visual: <img src="/img-qualified-leads.avif" alt="Qualified Leads" style={{ width: "auto", maxWidth: "200px", height: "200px", objectFit: "contain", filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.2))" }} />,
              },
              {
                tag: "Instant Response",
                title: "Turn Enquiries Into Booked Jobs",
                desc: "We respond instantly and follow up until they book, so you don't lose work.",
                tags: ["Booking System", "Automated Follow-Up"],
                visual: <img src="/mockup-phone.avif" alt="" style={{ width: "auto", maxWidth: "150px", height: "230px", objectFit: "contain", filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.35))" }} />,
              },
              {
                tag: "Website",
                title: "Filter & Qualify Before They Enquire",
                desc: "Simple pages that attract the right people and push the wrong ones away.",
                tags: ["Conversion-Focused", "Mobile Optimised"],
                visual: <img src="/img-website.avif" alt="Website" style={{ width: "auto", maxWidth: "200px", height: "200px", objectFit: "contain", filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.2))" }} />,
              },
            ].map(({ tag, title, desc, tags, visual }, i) => (
              <div key={tag} className={`lp-rise${i === 1 ? " d1" : i === 2 ? " d2" : ""}`} style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", overflow: "hidden", padding: "0 0 36px", display: "flex", flexDirection: "column" as const }}>
                <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${line}`, marginBottom: "32px", background: "#f8fafc" }}>
                  {visual}
                </div>
                <div style={{ padding: "0 32px", display: "flex", flexDirection: "column" as const, flex: 1 }}>
                  <span style={{ display: "inline-block", alignSelf: "flex-start", fontSize: "11px", fontWeight: 600, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, border: `1px solid ${accent}55`, padding: "5px 12px", marginBottom: "20px" }}>
                    {tag}
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "12px" }}>{title}</h3>
                  <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7, marginBottom: "24px" }}>{desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px", marginTop: "auto" }}>
                    {tags.map(t => (
                      <span key={t} style={{ fontSize: "12px", color: muted, background: "#f8fafc", border: `1px solid ${line}`, padding: "6px 14px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF: NOT JUST ANOTHER MARKETING COMPANY ── */}
      <section style={{ background: "transparent", padding: "0 40px 100px", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px", maxWidth: "640px" }}>
            <div className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>What Sets Us Apart</div>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              Marketing companies get you leads. We make sure they turn into money.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              You've probably paid for leads before and watched most of them go nowhere. Not because the leads were bad, but because nobody owned what happened next. That's the part we run.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
            <div className="m-bento-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "16px" }}>
              {[
                { value: "3X", num: 3, suffix: "X", scheme: "dark", text: "More revenue from the same ad spend, without spending a cent more on ads.", label: "More Revenue From The Same Ad Spend" },
                { value: "60s", num: 60, suffix: "s", scheme: "light", text: "Most jobs go to whoever replies first. We make sure that's always you, every time.", label: "Average First Response Time" },
              ].map(({ value, num, suffix, scheme, text, label }) => {
                const dark2 = scheme === "dark";
                return (
                  <div key={value} style={{ background: dark2 ? dark : "#f8fafc", border: dark2 ? "none" : `1px solid ${line}`, padding: "40px 36px", minHeight: "240px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" as const }}>
                    <div style={{ fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}><CountUp to={num} suffix={suffix} color={dark2 ? "#fff" : ink} /></div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: dark2 ? "rgba(255,255,255,0.7)" : muted, lineHeight: 1.6, marginBottom: "16px", maxWidth: "360px" }}>{text}</p>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: dark2 ? "rgba(255,255,255,0.4)" : dim, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="m-bento-row" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.3fr 0.85fr", gap: "16px" }}>
              {[
                { value: "5–7", num: null, suffix: "", scheme: "accent", text: "Automated touchpoints before a lead is ever written off as cold.", label: "Follow-Ups Per Lead", hide: true },
                { value: "100%", num: 100, suffix: "%", scheme: "light", text: "Every enquiry logged, tracked and visible in your dashboard. Nothing slips through the cracks.", label: "Of Leads Tracked & Managed", hide: false },
                { value: "24/7", num: null, suffix: "", scheme: "dark", text: "Your pipeline keeps working nights, weekends and public holidays.", label: "Coverage, Not Office Hours", hide: true },
              ].map(({ value, num, suffix, scheme, text, label, hide }) => {
                const dark2 = scheme === "dark";
                const acc = scheme === "accent";
                const bg = acc ? accent : dark2 ? dark : "#f8fafc";
                const fg = acc || dark2 ? "#fff" : ink;
                const sub = acc ? "rgba(255,255,255,0.82)" : dark2 ? "rgba(255,255,255,0.7)" : muted;
                const lbl = acc ? "rgba(255,255,255,0.6)" : dark2 ? "rgba(255,255,255,0.4)" : dim;
                return (
                  <div key={value} className={hide ? "m-bento-hide" : ""} style={{ background: bg, border: !acc && !dark2 ? `1px solid ${line}` : "none", padding: "36px 32px", minHeight: "260px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" as const }}>
                    <div style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {num !== null ? <CountUp to={num} suffix={suffix} color={fg} /> : <span style={{ color: fg }}>{value}</span>}
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: sub, lineHeight: 1.6, marginBottom: "14px" }}>{text}</p>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: lbl, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="m-solution-split" style={{ border: `1px solid ${line}`, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "40px 44px", borderRight: `1px solid ${line}` }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>The Solution</div>
                <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>The Full Growth System, Done For You</h3>
                <p style={{ fontSize: "13px", color: muted, lineHeight: 1.7, marginBottom: "24px" }}>Winning trade and home service businesses don't just run ads. They have a system behind them: instant response, real follow-up, qualified bookings, and numbers that show what it's all earning. Most owners don't have time to build that. So we build it and run it for you, made specifically for trades and home services in NZ and AU.</p>
                <a href="/book" className="btn btn-dark" style={{ fontSize: "13px", padding: "10px 18px" }}>
                  See what your pipeline could earn <ArrowRight style={{ width: "12px", height: "12px" }} />
                </a>
              </div>
              <div style={{ padding: "40px 44px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>100% Done For You</div>
                <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>You Do the Work. We Fill Your Pipeline.</h3>
                <p style={{ fontSize: "13px", color: muted, lineHeight: 1.7 }}>Ads, landing pages, follow-up, CRM, and reporting. We manage everything end-to-end so you can focus on the jobs, not chasing the leads.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNECTIONS ── */}
      <ConnectionsAnimated />

      {/* ── COMPARISON ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "96px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)" }} />
        <style suppressHydrationWarning>{`
          .cmp-card { border-radius: 16px; transition: transform 0.2s ease; }
          .cmp-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; font-size: 13px; line-height: 1.45; }
          @media (max-width: 640px) {
            .cmp-grid { grid-template-columns: 1fr !important; }
            .cmp-center { order: -1; }
            .cmp-stack { padding: 32px 20px !important; border-radius: 20px !important; }
          }
        `}</style>
        <div
          className="cmp-stack"
          style={{
            position: "relative",
            maxWidth: "1020px",
            margin: "0 auto",
            background: "transparent",
            borderRadius: "28px",
            padding: "64px 56px",
          }}
        >

          {/* Header */}
          <div style={{ textAlign: "center" as const, marginBottom: "56px" }}>
            <p className="lp-rise" style={{ fontSize: "12px", fontWeight: 600, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>· Why L&S Growth?</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Most agencies get you leads.<br />We get you booked jobs.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "15px", color: muted, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
              Ads without follow-up is half a system. A CRM without execution is just another tool.<br />We do the whole job.
            </p>
          </div>

          {/* Three columns */}
          <div className="cmp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: "16px", alignItems: "start" }}>

            {/* Left — The Old Way */}
            <div className="lp-rise cmp-card" style={{ background: "#f8fafc", border: `1px solid ${line}`, borderRadius: "16px", padding: "44px 32px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>The Old Way</p>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "28px", lineHeight: 1.15 }}>Ads Agency</h3>
              {[
                "Runs your ads, nothing else",
                "No follow-up system",
                "Leads go cold in minutes",
                "No CRM or pipeline",
                "You do all the chasing",
                "Blames you when leads don't convert",
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

            {/* Centre — L&S Growth (highlighted) */}
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
                "Hyper-local Meta ads, built for you",
                "60-second automated response",
                "Multi-step SMS & email follow-up",
                "Full CRM pipeline, managed",
                "We chase leads, you book jobs",
                "One system, one team, one outcome",
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

            {/* Right — The DIY Route */}
            <div className="lp-rise d2 cmp-card" style={{ background: "#f8fafc", border: `1px solid ${line}`, borderRadius: "16px", padding: "44px 32px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>The DIY Route</p>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", marginBottom: "28px", lineHeight: 1.15 }}>Doing It Yourself</h3>
              {[
                "You build and run your own ads",
                "You set up the automations",
                "You manage the pipeline daily",
                "Takes months to get right",
                "Still leaking leads constantly",
                "Not your job, and it shows",
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

          {/* CTA */}
          <div style={{ textAlign: "center" as const, marginTop: "48px" }}>
            <a href="/book" className="btn btn-dark" style={{ fontSize: "14px", padding: "13px 28px" }}>
              Get more booked jobs <ArrowRight style={{ width: "13px", height: "13px" }} />
            </a>
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="work" style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "100px 0", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)" }} />
        <style suppressHydrationWarning>{`
          .testi-card { width: 360px; flex-shrink: 0; }
          .testi-row { gap: 20px; }
          .testi-row-1 { animation: testi-scroll-left 70s linear infinite; }
          .testi-row-2 { animation: testi-scroll-right 70s linear infinite; }
          .testi-mask:hover .testi-row-1, .testi-mask:hover .testi-row-2 { animation-play-state: paused; }
          @keyframes testi-scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes testi-scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          @media (max-width: 640px) {
            .testi-card { width: 280px; }
          }
        `}</style>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center" as const, maxWidth: "640px", margin: "0 auto 56px" }}>
            <p className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>Client Results</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              Don't just take our word for it.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              Real businesses, real results. Here's what it's like working with us.
            </p>
          </div>
        </div>

        {[0, 1].map(rowIndex => {
          const rowItems = testimonials.slice(rowIndex * 4, rowIndex * 4 + 4);
          return (
            <div
              key={rowIndex}
              className="testi-mask"
              style={{
                position: "relative",
                overflow: "hidden",
                marginBottom: rowIndex === 0 ? "20px" : 0,
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              }}
            >
              <div className={`testi-row testi-row-${rowIndex + 1}`} style={{ display: "flex", width: "max-content" }}>
                {[...Array(2)].flatMap((_, dup) =>
                  rowItems.map(({ quote, author, company, color }) => (
                    <div key={`${dup}-${author}`} className="testi-card" aria-hidden={dup === 1 || undefined} style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", padding: "28px 26px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" as const }}>
                      <p style={{ fontSize: "14px", color: ink, lineHeight: 1.65, letterSpacing: "-0.005em", marginBottom: "24px" }}>{quote}</p>
                      <div>
                        <div style={{ height: "1px", background: line, marginBottom: "18px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>
                            {author.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: ink, letterSpacing: "-0.01em" }}>{author}</div>
                            <div style={{ fontSize: "12px", color: muted }}>{company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "transparent", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div className="m-faq-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>
          <div className="m-faq-sticky lp-rise" style={{ position: "sticky", top: "80px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>FAQs</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              We've Got the Answers You're Looking For
            </h2>
            <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7, marginBottom: "28px" }}>
              Get answers to common questions about our services.
            </p>
            <a href="/book" className="btn btn-dark" style={{ fontSize: "13px", padding: "10px 18px" }}>
              Contact Us <ArrowRight style={{ width: "12px", height: "12px" }} />
            </a>
          </div>
          <div>
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="lp-rise" style={{ borderBottom: `1px solid ${line}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: F }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: dim, minWidth: "22px" }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ flex: 1, fontSize: "15px", fontWeight: 500, color: ink, lineHeight: 1.4 }}>{q}</span>
                  <div style={{ flexShrink: 0, width: "26px", height: "26px", border: `1px solid ${openFaq===i ? accent : line}`, display: "flex", alignItems: "center", justifyContent: "center", background: openFaq===i ? accent : "transparent", transition: "all 0.15s" }}>
                    {openFaq===i ? <Minus style={{ width: "11px", height: "11px", color: "#fff" }} /> : <Plus style={{ width: "11px", height: "11px", color: muted }} />}
                  </div>
                </button>
                {openFaq===i && <div style={{ paddingLeft: "38px", paddingBottom: "18px", fontSize: "14px", color: muted, lineHeight: 1.8 }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: "relative", overflow: "hidden", background: "transparent", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)" }} />
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="lp-rise" style={{ border: `1px solid ${line}`, borderRadius: "16px", padding: "64px 48px", background: "#fff", position: "relative" as const, overflow: "hidden" }}>
            <div className="m-cta-stack" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" as const }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "16px" }}>Get Started</div>
                <h2 style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 800, color: ink, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "16px" }}>Ready to fill<br />your pipeline?</h2>
                <p style={{ fontSize: "15px", color: muted, lineHeight: 1.7, maxWidth: "440px", marginBottom: "32px" }}>
                  Book a free 30-minute call. We'll walk through your current lead flow and show you exactly where the gaps are. No obligation.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                  {["No lock-in contracts", "Full setup handled for you", "Results within the first two weeks"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: muted }}>
                      <CheckCircle style={{ width: "14px", height: "14px", color: accent, flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px", minWidth: "260px" }}>
                <a href="/book" className="btn btn-dark" style={{ fontSize: "14px", padding: "16px 28px", justifyContent: "center", borderRadius: "0" }}>
                  Book a Free Call <ArrowRight style={{ width: "14px", height: "14px" }} />
                </a>
                <button onClick={() => setFormOpen(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: ink, background: "transparent", border: `1px solid ${line}`, borderRadius: "0", padding: "14px 28px", cursor: "pointer", fontFamily: F }}>
                  Send a Message
                </button>
                <a href="mailto:lsgrowthagency.co@gmail.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", color: dim, textDecoration: "none" }}>
                  lsgrowthagency.co@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section id="about" style={{ padding: "100px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <h2 className="lp-rise" style={{ fontSize: "40px", fontWeight: 800, color: ink, letterSpacing: "-0.03em", marginBottom: "48px" }}>
            Meet the team.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
            <div className="lp-rise" style={{ width: "340px" }}>
              <img
                src="/team-lucky.jpg"
                alt="Lucky Singh"
                style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", borderRadius: "4px", marginBottom: "24px", filter: "grayscale(1) contrast(1.05)" }}
              />
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: ink, letterSpacing: "-0.01em", marginBottom: "2px" }}>Lucky Singh</h3>
              <p style={{ fontSize: "15px", color: muted, marginBottom: "16px" }}>Founder</p>
              <div style={{ display: "flex", gap: "14px" }}>
                <a href="mailto:lsgrowthagency.co@gmail.com" aria-label="Email Lucky Singh" style={{ color: muted, display: "flex" }} onMouseEnter={e => (e.currentTarget.style.color = ink)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/lucky-singh-0ba328287/" target="_blank" rel="noopener noreferrer" aria-label="Lucky Singh on LinkedIn" style={{ color: muted, display: "flex" }} onMouseEnter={e => (e.currentTarget.style.color = ink)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "transparent", borderTop: `1px solid ${line}`, padding: "60px 40px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div className="m-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "48px", paddingBottom: "48px" }}>
            <div className="lp-rise m-footer-brand" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "6px" }}>
                  Built for NZ & AU<br />service businesses.
                </h3>
                <p style={{ fontSize: "16px", color: muted, marginBottom: "28px" }}>Done-for-you lead generation.</p>
              </div>
              <img src="/ls-growth-logo-trimmed.png" alt="L&S Growth" style={{ height: "44px", width: "auto", objectFit: "contain", alignSelf: "flex-start" }} />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: ink, marginBottom: "20px" }}>Navigation</p>
              {[["Home","#"],["Our Work","#work"],["Services","#services"],["How It Works","#how"]].map(([l,h]) => (
                <a key={l} href={h} style={{ display: "block", fontSize: "14px", color: muted, textDecoration: "none", marginBottom: "12px", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = ink)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: ink, marginBottom: "20px" }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a href="tel:02102820190" style={{ fontSize: "14px", color: muted, textDecoration: "none" }}>021 028 20190</a>
                <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "14px", color: muted, textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
                <span style={{ fontSize: "14px", color: muted }}>New Zealand & Australia</span>
              </div>
            </div>
          </div>
          <div className="m-footer-bottom" style={{ borderTop: `1px solid ${line}`, padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "13px", color: dim }}>© {new Date().getFullYear()} L&S Growth. All rights reserved.</p>
            <p style={{ fontSize: "13px", color: dim }}>NZ & AU Local Service Businesses</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
