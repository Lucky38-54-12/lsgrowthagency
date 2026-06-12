"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

export default function CleaningPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)", fontFamily: F, color: ink, overflowX: "hidden" }}>

      <style jsx>{`
        @media (max-width: 640px) {
          .cln-nav { padding: 0 16px !important; height: 64px !important; }
          .cln-logo { height: 48px !important; }
          .cln-links a.cln-link { display: none !important; }
          .cln-back-text { display: none !important; }
          .cln-back { padding: 12px !important; gap: 0 !important; }
          .cln-content { padding: 88px 16px 48px !important; }
          .cln-trust { gap: 14px !important; }
          .cln-cta-row { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="cln-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 48px", height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img className="cln-logo" src="/ls-growth-logo-new.png" alt="LS Growth" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
        </a>
        <div className="cln-links" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {[["Our Work","/#work"],["Services","/#services"],["How It Works","/#how"],["About","/#about"]].map(([l,h]) => (
            <a key={l} className="cln-link" href={h} style={{ fontSize: "13px", fontWeight: 600, color: ink, textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</a>
          ))}
          <a href="/" className="cln-back" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: ink, background: "transparent", borderRadius: "999px", padding: "12px 28px", textDecoration: "none", border: `2px solid ${ink}`, letterSpacing: "0.06em", textTransform: "uppercase" as const, flexShrink: 0 }}>
            <ArrowLeft style={{ width: "13px", height: "13px", flexShrink: 0 }} /> <span className="cln-back-text">Back to site</span>
          </a>
        </div>
      </nav>

      {/* Page content */}
      <div className="cln-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 40px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>For Cleaning Businesses</span>
          <h1 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "14px" }}>
            Real results, real cleaning businesses
          </h1>
          <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
            In the last 30 days we generated 57 new window cleaning and house cleaning enquiries for Queenstown Cleaning, working out at around $7 to $11 per lead, and 30 of those have already turned into booked, paying jobs.
          </p>
        </div>

        {/* Results screenshot */}
        <div style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
          <img
            src="/queenstown-ads.png"
            alt="Queenstown Cleaning ad results, last 30 days"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <p style={{ textAlign: "center", fontSize: "13px", color: muted, marginBottom: "56px" }}>
          Real numbers from Queenstown Cleaning's ad account, last 30 days
        </p>

        {/* Trust badges */}
        <div className="cln-trust" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "56px" }}>
          {[
            "No lock-in contracts",
            "Full setup handled for you",
            "Results within the first two weeks",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: muted }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>

        {/* Trusted beyond one business */}
        <div style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", padding: "44px 40px", textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "16px" }}>Trusted Beyond One Business</p>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: ink, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
            Queenstown Cleaning's owner liked the results enough to bring us on for two more of his cleaning businesses
          </h2>
          <p style={{ fontSize: "15px", color: muted, lineHeight: 1.7, maxWidth: "620px", margin: "0 auto 28px" }}>
            For both Jim's Cleaning and Fantastic Services, we built everything from scratch, the website, social media, ad campaigns and email systems, the same setup shown above.
          </p>
          <img src="/logos/logo-7.png" alt="Fantastic Services" style={{ height: "36px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
        </div>

        {/* CTA */}
        <div className="cln-cta-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
          <a href="/book" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "#fff", background: accent, borderRadius: "999px", padding: "16px 32px", textDecoration: "none", letterSpacing: "0.02em" }}>
            Book a Free 15 Minute Call <ArrowRight style={{ width: "14px", height: "14px" }} />
          </a>
          <a href="/" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: ink, background: "transparent", border: `2px solid ${ink}`, borderRadius: "999px", padding: "14px 30px", textDecoration: "none", letterSpacing: "0.02em" }}>
            See How It Works <ArrowUpRight style={{ width: "14px", height: "14px" }} />
          </a>
        </div>

      </div>

      {/* Footer strip */}
      <div style={{ borderTop: `1px solid ${line}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: muted, margin: 0 }}>© {new Date().getFullYear()} LS Growth · NZ &amp; AU</p>
        <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "13px", color: muted, textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
      </div>
    </div>
  );
}
