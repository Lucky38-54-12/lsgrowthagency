"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

export default function BookPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)", fontFamily: F, color: ink }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: "14px", left: 0, right: 0, zIndex: 50, padding: "0 32px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", background: "#1a5c78", borderRadius: "14px", height: "64px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0 10px 0 20px", boxShadow: "0 2px 20px rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <img src="/ls-growth-logo-long.png" alt="LS Growth" style={{ height: "64px", width: "auto", objectFit: "contain" }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[["Our Work","/#work"],["Services","/#services"],["How It Works","/#how"],["About","/#about"]].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.85)", textDecoration: "none", whiteSpace: "nowrap" }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#1a5c78", background: "#fff", borderRadius: "8px", padding: "10px 20px", textDecoration: "none", border: "2px solid #fff" }}>
              <ArrowLeft style={{ width: "13px", height: "13px" }} /> Back to site
            </a>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 40px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>Free Strategy Call</span>
          <h1 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: ink, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "14px" }}>
            Book a Free 30-Minute Call
          </h1>
          <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
            We'll walk through your current lead flow and show you exactly where the gaps are. No obligation.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "48px" }}>
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

        {/* Calendly embed */}
        <div style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/lsgrowthagency-co/30min?hide_gdpr_banner=1&primary_color=0080e0"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>

      </div>

      {/* Footer strip */}
      <div style={{ borderTop: `1px solid ${line}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
        <p style={{ fontSize: "13px", color: muted, margin: 0 }}>© {new Date().getFullYear()} LS Growth · NZ &amp; AU</p>
        <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "13px", color: muted, textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
      </div>
    </div>
  );
}
