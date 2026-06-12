"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Phone, Inbox, Clock3, Megaphone, Timer, CalendarCheck } from "lucide-react";

/* ── Design tokens (matches homepage) ── */
const F = "var(--font-inter), system-ui, sans-serif";
const ink   = "#0a0a0a";
const muted = "#6b7280";
const dim   = "#9ca3af";
const line  = "#e5e7eb";
const accent = "#0080e0";
const dark  = "#0a0f1a";

const PAINS = [
  { icon: Phone, title: "Calls go to voicemail", desc: "And most people calling a cleaning company just move to the next one on Google." },
  { icon: Inbox, title: "Enquiries sit for hours", desc: "By the time someone replies to a Facebook message or web form, the job's already booked elsewhere." },
  { icon: Clock3, title: "Slow weeks, no warning", desc: "Work comes from word of mouth and referrals, so the calendar is either too full or too empty." },
];

const SOLUTIONS = [
  { icon: Megaphone, tag: "Step 1", title: "Ads that bring in real jobs", desc: "Targeted Facebook & Instagram campaigns aimed at people who need a clean booked this week, not just browsers." },
  { icon: Timer, tag: "Step 2", title: "Every lead contacted in under 60 seconds", desc: "Automated instant follow-up means no enquiry sits in an inbox overnight. We chase it down so you don't have to." },
  { icon: CalendarCheck, tag: "Step 3", title: "Jobs land straight on your calendar", desc: "By the time it reaches you, the lead is qualified and ready to book, no back and forth, no chasing quotes." },
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

        @media (max-width: 640px) {
          .m-nav-links { display: none !important; }
          .m-nav-hamburger { display: flex !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 16px 0 0 !important; height: 72px !important; }
          .m-hero-content { padding: 48px 20px 40px !important; grid-template-columns: 1fr !important; gap: 32px !important; }
          .m-hero-content h1 { font-size: 34px !important; }
          .hero-sub { font-size: 15px !important; }
          .m-pain-grid { grid-template-columns: 1fr !important; }
          .m-solution-grid { grid-template-columns: 1fr !important; }
          .m-proof-stats { grid-template-columns: 1fr !important; }
          .m-proof-stats > div { border-right: none !important; border-bottom: 1px solid ${line} !important; }
          .m-proof-stats > div:last-child { border-bottom: none !important; }
          .m-trust-row { gap: 24px !important; }
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

      {/* ── HERO (split: text / proof card) ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "640px", display: "flex", alignItems: "center", background: "linear-gradient(160deg, #04111f 0%, #0c3450 42%, #1c5d86 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", pointerEvents: "none" as const, background: "linear-gradient(180deg, rgba(4,17,31,0.55) 0%, transparent 100%)" }} />
        <div className="m-hero-content" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "150px 40px 100px", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "56px", alignItems: "center" }}>
          <div>
            <p className="hero-badge" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "24px", letterSpacing: "0.01em" }}>
              For Cleaning Businesses · NZ &amp; AU
            </p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "24px", maxWidth: "640px" }}>
              Stop losing cleaning jobs to slow follow-up.
            </h1>
            <p className="hero-sub" style={{ fontSize: "18px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: "36px", maxWidth: "480px", fontWeight: 400 }}>
              Most cleaning businesses lose work simply because nobody replies fast enough. We run the ads, answer every enquiry in under 60 seconds, and get the job on your calendar.
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

          <div className="hero-card" style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden" }}>
            <img src="/cleaning-team.jpg" alt="LS Growth cleaning client team" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ padding: "44px 40px", borderBottom: `1px solid ${line}` }}>
        <p style={{ textAlign: "center" as const, fontSize: "12px", fontWeight: 500, color: dim, letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "24px" }}>
          Trusted by cleaning businesses you know
        </p>
        <div className="m-trust-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", flexWrap: "wrap" as const }}>
          <span style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.01em", opacity: 0.7 }}>Jim's Cleaning</span>
          <img src="/logos/logo-7.png" alt="Fantastic Services" style={{ height: "32px", width: "auto", objectFit: "contain", opacity: 0.7 }} />
          <span style={{ fontSize: "22px", fontWeight: 800, color: ink, letterSpacing: "-0.01em", opacity: 0.7 }}>Queenstown Cleaning</span>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: "100px 40px 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, maxWidth: "680px", margin: "0 auto 56px" }}>
            <span className="lp-rise" style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "0", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>The Problem</span>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Sound familiar?
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              These are the three things quietly costing cleaning businesses jobs every single week.
            </p>
          </div>
          <div className="m-pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {PAINS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`lp-rise${i === 1 ? " d1" : i === 2 ? " d2" : ""}`} style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "0", padding: "32px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "0", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Icon style={{ width: "20px", height: "20px", color: "#dc2626" }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: ink, letterSpacing: "-0.01em", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: muted, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section style={{ padding: "0 40px 80px", borderTop: `1px solid ${line}`, paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, maxWidth: "680px", margin: "0 auto 56px" }}>
            <span className="lp-rise" style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "0", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>The Solution</span>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Here's what changes
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7 }}>
              The exact system we run for Queenstown Cleaning, Jim's Cleaning and Fantastic Services.
            </p>
          </div>
          <div className="m-solution-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {SOLUTIONS.map(({ icon: Icon, tag, title, desc }, i) => (
              <div key={title} className={`lp-rise${i === 1 ? " d1" : i === 2 ? " d2" : ""}`} style={{ background: i === 1 ? dark : "#f8fafc", border: i === 1 ? "none" : `1px solid ${line}`, borderRadius: "0", padding: "32px", display: "flex", flexDirection: "column" as const }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "0", background: i === 1 ? "rgba(255,255,255,0.1)" : "#fff", border: i === 1 ? "none" : `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Icon style={{ width: "20px", height: "20px", color: i === 1 ? "#7cd4ff" : accent }} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: i === 1 ? "rgba(255,255,255,0.45)" : dim, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "8px" }}>{tag}</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: i === 1 ? "#fff" : ink, letterSpacing: "-0.01em", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: i === 1 ? "rgba(255,255,255,0.65)" : muted, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF / RESULTS ── */}
      <section id="proof" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #ffffff 0%, #eef5fb 55%, #ffffff 100%)", padding: "80px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" as const, background: "radial-gradient(ellipse 50% 55% at 50% 35%, rgba(0,128,224,0.08) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
            <span className="lp-rise" style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#fff", border: `1px solid ${line}`, borderRadius: "0", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>Real Results</span>
            <h2 className="lp-rise d1" style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "10px" }}>
              57 leads. 30 booked jobs. Last month.
            </h2>
            <p className="lp-rise d2" style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
              This is the live ad account for Queenstown Cleaning, one of the businesses we run this system for.
            </p>
          </div>

          <img src="/queenstown-ads.png" alt="Queenstown Cleaning ad results, last 30 days" className="lp-rise d2" style={{ width: "100%", maxWidth: "920px", height: "auto", display: "block", margin: "0 auto 24px", border: `1px solid ${line}`, borderRadius: "0", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }} />

          <div className="lp-rise d3 m-proof-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `1px solid ${line}`, borderRadius: "0", overflow: "hidden", background: "#fff", maxWidth: "760px", margin: "0 auto 48px" }}>
            {[
              { big: "57", small: "New leads in 30 days" },
              { big: "30", small: "Turned into booked jobs" },
              { big: "$7–$11", small: "Cost per lead" },
            ].map(({ big, small }, i) => (
              <div key={big} style={{ padding: "24px 22px", textAlign: "center" as const, borderRight: i < 2 ? `1px solid ${line}` : "none" }}>
                <div style={{ fontSize: "28px", fontWeight: 800, color: accent, letterSpacing: "-0.02em", marginBottom: "6px" }}>{big}</div>
                <div style={{ fontSize: "13px", color: muted, lineHeight: 1.4 }}>{small}</div>
              </div>
            ))}
          </div>

          {/* Trusted beyond one business */}
          <div className="lp-rise" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "0", padding: "40px", textAlign: "center" as const }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "16px" }}>Trusted Beyond One Business</p>
            <h3 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: ink, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "14px", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
              Queenstown Cleaning's owner liked the results enough to bring us on for two more of his cleaning businesses
            </h3>
            <p style={{ fontSize: "15px", color: muted, lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
              For both Jim's Cleaning and Fantastic Services, we built everything from scratch, the website, social media, ad campaigns and email systems, the same system shown above.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "90px 40px", borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" as const }}>
          <h2 className="lp-rise" style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 800, color: ink, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Want results like this for your business?
          </h2>
          <p className="lp-rise d1" style={{ fontSize: "16px", color: muted, lineHeight: 1.7, marginBottom: "32px" }}>
            Free 30-minute strategy call. We'll look at what's working for cleaning businesses like Queenstown Cleaning, Jim's Cleaning and Fantastic Services, and map out what it'd look like for you.
          </p>
          <a href="/book" className="lp-rise d2 btn btn-dark" style={{ fontSize: "14px", padding: "13px 28px" }}>
            Book a Free Call <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>
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
