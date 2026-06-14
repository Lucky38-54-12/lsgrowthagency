"use client";

import { useState, useEffect, Fragment } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle } from "lucide-react";

/* ── Design tokens (matches homepage) ── */
const F = "var(--font-inter), system-ui, sans-serif";
const ink   = "#0a0a0a";
const muted = "#6b7280";
const dim   = "#9ca3af";
const line  = "#e5e7eb";
const accent = "#0080e0";
const dark  = "#0a0f1a";

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

export default function CleaningPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        .nav-cta { position: relative; overflow: hidden; background: transparent; color: #fff; }
        .nav-cta::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%); background-size: 200% 100%; animation: nav-shimmer 2.6s ease-in-out infinite; border-radius: inherit; pointer-events: none; }
        .nav-cta:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); transition: all 0.15s; }

        @keyframes heroUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .hero-badge { animation: heroUp 0.5s ease 0.05s both; }
        .hero-h1    { animation: heroUp 0.55s ease 0.15s both; }
        .hero-sub   { animation: heroUp 0.55s ease 0.25s both; }
        .hero-ctas  { animation: heroUp 0.55s ease 0.35s both; }
        .hero-card  { animation: heroUp 0.6s ease 0.3s both; }

        @keyframes riseUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .lp-rise { opacity:0; }
        .lp-rise.lp-visible { animation: riseUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
        .lp-rise.d1.lp-visible { animation-delay:0.07s; }
        .lp-rise.d2.lp-visible { animation-delay:0.14s; }
        .lp-rise.d3.lp-visible { animation-delay:0.21s; }

        .footer-link { position:relative; transition:color 0.15s ease; text-decoration:none; }
        .footer-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:${accent}; transition:width 0.22s ease; }
        .footer-link:hover { color:${accent} !important; }
        .footer-link:hover::after { width:100%; }

        .cmp-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; font-size: 13px; line-height: 1.45; }
        .cmp-card { border-radius: 16px; transition: transform 0.2s ease; }

        @media (max-width: 640px) {
          .m-nav-links { display: none !important; }
          .m-nav-hamburger { display: flex !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 16px 0 0 !important; height: 72px !important; }
          .m-hero-content { padding: 110px 20px 40px !important; grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-hero-content h1 { font-size: 34px !important; }
          .hero-sub { font-size: 15px !important; }
          .m-pain-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-split-sticky { position: static !important; }
          .how-step-card { position: sticky !important; box-shadow: 0 12px 32px rgba(10,15,26,0.18) !important; }
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
          .m-trust-row { gap: 24px !important; }
          .m-trust-strip { flex-direction: column !important; align-items: flex-start !important; }
          .m-footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .m-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
          .btn { min-height: 44px !important; }
        }
      `}</style>

      {/* ── NAV (same as homepage) ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "88px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(5,10,18,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "background 0.3s ease, border-color 0.3s ease" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src="/ls-growth-logo-new.png" alt="LS Growth" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "40px", paddingRight: "40px" }}>
          <div className="m-nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {[["Our Work","/#work"],["Services","/#services"],["How It Works","/#how"],["About","/#about"]].map(([l,h]) => (
              <a key={h} href={h} className="nav-link" style={{ fontSize: "14px", fontWeight: 800, color: "rgba(255,255,255,0.92)", textDecoration: "none", whiteSpace: "nowrap" as const, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{l}</a>
            ))}
          </div>
          <a href="/book" className="nav-cta" style={{ fontSize: "14px", fontWeight: 800, borderRadius: "999px", padding: "12px 28px", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" as const, border: "2px solid rgba(255,255,255,0.9)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
            Book a Call <ArrowUpRight style={{ width: "14px", height: "14px" }} />
          </a>
          <button className="m-nav-hamburger" onClick={() => setNavOpen(true)} style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: "5px", width: "52px", height: "52px", background: accent, border: "none", borderRadius: "8px", cursor: "pointer", padding: "14px", flexShrink: 0 }}>
            <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "65%", height: "2px", background: "#fff", borderRadius: "2px" }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV DRAWER ── */}
      {navOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setNavOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "280px", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "56px", borderBottom: `1px solid ${line}` }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: ink }}>LS Growth</span>
              <button onClick={() => setNavOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: "22px", lineHeight: 1, padding: "4px" }}>×</button>
            </div>
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[["Our Work","/#work"],["Services","/#services"],["How It Works","/#how"],["About","/#about"]].map(([l,h]) => (
                <a key={h} href={h} onClick={() => setNavOpen(false)} style={{ display: "block", width: "100%", padding: "13px", background: "#f8fafc", border: `1px solid ${line}`, fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>{l}</a>
              ))}
              <a href="/book" onClick={() => setNavOpen(false)} style={{ display: "block", width: "100%", padding: "13px", background: accent, color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none", textAlign: "center" }}>Book a Call</a>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "560px", display: "flex", alignItems: "center", background: "linear-gradient(160deg, #04111f 0%, #0c3450 42%, #1c5d86 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", pointerEvents: "none" as const, background: "linear-gradient(180deg, rgba(4,17,31,0.55) 0%, transparent 100%)" }} />
        <div className="m-hero-content" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "150px 40px 90px", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "56px", alignItems: "center" }}>
          <div>
            <p className="hero-badge" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "24px", letterSpacing: "0.01em" }}>
              For Cleaning Businesses · NZ &amp; AU
            </p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "24px" }}>
              More booked jobs.<br />Not just more leads.
            </h1>
            <p className="hero-sub" style={{ fontSize: "18px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: "36px", maxWidth: "480px", fontWeight: 400 }}>
              We run ads targeted at people who actually need a clean booked, then track every lead through to a real, paying job, not just a number on a report.
            </p>
            <div className="hero-ctas" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="/book" className="btn btn-dark btn-hero" style={{ fontSize: "14px", padding: "12px 22px", borderRadius: "0" }}>
                Book a Free Call <ArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
              <a href="#proof" className="btn btn-outline" style={{ fontSize: "14px", padding: "11px 18px", borderRadius: "0" }}>
                See the Results
              </a>
            </div>
          </div>

          <div className="hero-card" style={{ display: "flex", flexDirection: "column" as const, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
            {[
              { big: "57", small: "New leads, last 30 days" },
              { big: "30", small: "Turned into booked jobs" },
              { big: "$7–$11", small: "Cost per lead" },
            ].map(({ big, small }, i) => (
              <div key={big} style={{ padding: "24px 28px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.14)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{small}</div>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#7cd4ff", letterSpacing: "-0.02em", whiteSpace: "nowrap" as const }}>{big}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="m-trust-strip" style={{ padding: "32px 40px", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" as const }}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: dim, letterSpacing: "0.06em", textTransform: "uppercase" as const, margin: 0, whiteSpace: "nowrap" as const }}>
          Trusted by cleaning businesses you know
        </p>
        <div className="m-trust-row" style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" as const }}>
          <img src="/logos/jims-cleaning.png" alt="Jim's Cleaning" style={{ height: "52px", width: "auto", objectFit: "contain", opacity: 0.8 }} />
          <img src="/logos/fantastic-services.png" alt="Fantastic Services" style={{ height: "52px", width: "auto", objectFit: "contain", opacity: 0.8 }} />
          <img src="/logos/queenstown-cleaning.png" alt="Queenstown Cleaning" style={{ height: "52px", width: "auto", objectFit: "contain", opacity: 0.8 }} />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: "100px 40px 80px" }}>
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
                  The exact system we run for Queenstown Cleaning, Jim's Cleaning and Fantastic Services.
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

      {/* ── WHAT SETS US APART ── */}
      <section style={{ padding: "0 40px 80px", borderTop: `1px solid ${line}`, paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px", maxWidth: "640px" }}>
            <div className="lp-rise" style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>What Sets Us Apart</div>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              It's not about more leads. It's about better ones.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              Here's what that actually looked like for Queenstown Cleaning last month.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
            <div className="m-bento-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "16px" }}>
              {[
                { value: "52%", scheme: "dark", text: "Of the 57 leads generated last month turned into real, booked cleaning jobs.", label: "Lead To Job Conversion" },
                { value: "$7–$11", scheme: "light", text: "What it costs to generate a single qualified cleaning lead through targeted ads.", label: "Cost Per Lead" },
              ].map(({ value, scheme, text, label }) => {
                const dark2 = scheme === "dark";
                return (
                  <div key={value} style={{ background: dark2 ? dark : "#f8fafc", border: dark2 ? "none" : `1px solid ${line}`, borderRadius: "0", padding: "40px 36px", minHeight: "220px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" as const }}>
                    <div style={{ fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: dark2 ? "#fff" : ink }}>{value}</div>
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
                { value: "30", scheme: "accent", text: "Booked, paying jobs from last month's campaign alone.", label: "Booked Jobs Last Month", hide: true },
                { value: "57", scheme: "light", text: "New leads generated in 30 days, each one tracked from click to job.", label: "New Leads In 30 Days", hide: false },
                { value: "3", scheme: "dark", text: "Cleaning businesses currently running this exact system with us.", label: "Businesses On This System", hide: true },
              ].map(({ value, scheme, text, label, hide }) => {
                const dark2 = scheme === "dark";
                const acc = scheme === "accent";
                const bg = acc ? accent : dark2 ? dark : "#f8fafc";
                const fg = acc || dark2 ? "#fff" : ink;
                const sub = acc ? "rgba(255,255,255,0.82)" : dark2 ? "rgba(255,255,255,0.7)" : muted;
                const lbl = acc ? "rgba(255,255,255,0.6)" : dark2 ? "rgba(255,255,255,0.4)" : dim;
                return (
                  <div key={value} className={hide ? "m-bento-hide" : ""} style={{ background: bg, border: !acc && !dark2 ? `1px solid ${line}` : "none", borderRadius: "0", padding: "36px 32px", minHeight: "240px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" as const }}>
                    <div style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: fg }}>{value}</div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: sub, lineHeight: 1.6, marginBottom: "14px" }}>{text}</p>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: lbl, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF / RESULTS ── */}
      <section id="proof" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #ffffff 0%, #eef5fb 55%, #ffffff 100%)", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, background: "radial-gradient(ellipse 50% 55% at 50% 35%, rgba(0,128,224,0.08) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ maxWidth: "680px" }}>
          <span className="lp-rise" style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#fff", border: `1px solid ${line}`, borderRadius: "0", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "20px" }}>Real Results</span>

          <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4.5vw,40px)", fontWeight: 800, color: ink, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "32px", maxWidth: "480px" }}>
            57 leads. 30 booked jobs. Last month.
          </h2>

          <p className="lp-rise d2" style={{ fontSize: "11px", fontWeight: 600, color: dim, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "12px", marginTop: "40px" }}>
            Live Ad Account &mdash; Queenstown Cleaning
          </p>
          <img src="/queenstown-ads.png" alt="Queenstown Cleaning ad results, last 30 days" className="lp-rise d2" style={{ width: "100%", height: "auto", display: "block", margin: "0 0 40px", border: `1px solid ${line}`, borderRadius: "0", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }} />

          <div className="lp-rise d3" style={{ borderLeft: `2px solid ${accent}`, padding: "2px 0 2px 24px", marginBottom: "32px" }}>
            <p style={{ fontSize: "16px", color: ink, lineHeight: 1.7 }}>
              Every one of those 30 jobs came from a lead that was actually looking for a clean in their area, not a tyre-kicker or a wrong-fit enquiry. The results were good enough that the owner brought us on for two more of his cleaning businesses, building everything from scratch: website, social media, ad campaigns and email systems.
            </p>
          </div>

          <div className="lp-rise d3" style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${line}`, padding: "8px 20px" }}>
              <img src="/logos/queenstown-cleaning.png" alt="Queenstown Cleaning" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${line}`, padding: "8px 20px" }}>
              <img src="/logos/jims-cleaning.png" alt="Jim's Cleaning" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${line}`, padding: "8px 20px" }}>
              <img src="/logos/fantastic-services.png" alt="Fantastic Services" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section style={{ background: "transparent", padding: "96px 40px", borderTop: `1px solid ${line}` }}>
        <div className="cmp-stack" style={{ maxWidth: "1020px", margin: "0 auto", background: "transparent", borderRadius: "28px", padding: "64px 56px" }}>
          <div style={{ textAlign: "center" as const, marginBottom: "56px" }}>
            <p className="lp-rise" style={{ fontSize: "12px", fontWeight: 600, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>· Why LS Growth?</p>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Most cleaning ads get you enquiries.<br />We get you booked jobs.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "15px", color: muted, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
              Ads without follow-through is half a system. Tracking without action is just a number on a report.<br />We do the whole job, from the first click to the booked job.
            </p>
          </div>

          <div className="cmp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: "16px", alignItems: "start" }}>

            {/* Left — The Old Way */}
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

            {/* Centre — LS Growth (highlighted) */}
            <div className="lp-rise d1 cmp-card cmp-center" style={{ background: "rgba(0,128,224,0.05)", border: `1.5px solid ${accent}`, borderRadius: "16px", padding: "32px 28px", position: "relative" as const }}>
              <div style={{ position: "absolute" as const, top: "-13px", left: "50%", transform: "translateX(-50%)", background: accent, color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "4px 14px" }}>
                The Complete System
              </div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px" }}>&nbsp;</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <img src="/ls-growth-logo-new.png" alt="LS Growth" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>LS Growth</h3>
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

            {/* Right — The DIY Route */}
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

      {/* ── CTA ── */}
      <section style={{ background: "transparent", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
                <a href="mailto:lsgrowthagency.co@gmail.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: ink, background: "transparent", border: `1px solid ${line}`, borderRadius: "0", padding: "14px 28px", textDecoration: "none", fontFamily: F }}>
                  Send a Message
                </a>
                <a href="mailto:lsgrowthagency.co@gmail.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", color: dim, textDecoration: "none" }}>
                  lsgrowthagency.co@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "transparent", borderTop: `1px solid ${line}`, padding: "48px 40px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div className="m-footer-grid" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "32px", flexWrap: "wrap" as const, gap: "24px" }}>
            <img src="/ls-growth-logo-new.png" alt="LS Growth" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" as const }}>
              <a href="/" className="footer-link" style={{ fontSize: "14px", color: muted }}>Home</a>
              <a href="/#services" className="footer-link" style={{ fontSize: "14px", color: muted }}>Services</a>
              <a href="/book" className="footer-link" style={{ fontSize: "14px", color: muted }}>Book a Call</a>
              <a href="mailto:lsgrowthagency.co@gmail.com" className="footer-link" style={{ fontSize: "14px", color: muted }}>lsgrowthagency.co@gmail.com</a>
            </div>
          </div>
          <div className="m-footer-bottom" style={{ borderTop: `1px solid ${line}`, padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "13px", color: dim }}>© {new Date().getFullYear()} LS Growth. All rights reserved.</p>
            <p style={{ fontSize: "13px", color: dim }}>NZ &amp; AU Local Service Businesses</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
