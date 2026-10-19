"use client";

import { useState } from "react";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const accentDark = "#006bbf";
const F = "var(--font-inter), system-ui, sans-serif";

export default function BuildingProofVideo() {
  const [contactPanelOpen, setContactPanelOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)", fontFamily: F, color: ink, overflowX: "hidden" }}>

      <style>{`
        .proof-nav-cta:hover { background: ${accentDark} !important; transform: translateY(-1px); }
        .proof-nav-cta { transition: all 0.15s ease; }
        @media (max-width: 640px) {
          .proof-nav { padding: 0 16px !important; }
          .proof-content { padding: 112px 16px 48px !important; }
        }
      `}</style>

      {/* Nav — mirrors the homepage nav, down to just the logo and a direct Book a Call link */}
      <nav className="proof-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,15,26,0.08)" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button onClick={() => setContactPanelOpen(true)} aria-label="Contact details" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #0080e0, #40c0f0)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", width: "16px" }}>
              <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "100%", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "70%", height: "2px", background: "#fff", borderRadius: "2px" }} />
            </div>
          </button>
          <a href="/book" className="proof-nav-cta" style={{ fontSize: "13px", fontWeight: 700, color: "#fff", background: accent, padding: "10px 20px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Book a Call
          </a>
        </div>
      </nav>

      {/* Contact details panel — same slide-out as the homepage nav */}
      {contactPanelOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 250 }}>
          <div onClick={() => setContactPanelOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "min(360px, 88vw)", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "8px 0 32px rgba(0,0,0,0.12)", padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
              <button onClick={() => setContactPanelOpen(false)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: ink, fontSize: "26px", lineHeight: 1, padding: "4px" }}>×</button>
              <img src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "26px", width: "auto", objectFit: "contain" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px", flex: 1 }}>
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

            <div style={{ borderTop: `1px solid ${line}`, paddingTop: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <a href="tel:02102820190" style={{ fontSize: "17px", fontWeight: 700, color: ink, textDecoration: "none" }}>021 028 20190</a>
              <a href="mailto:lucky@lsgrowth.agency" style={{ fontSize: "14px", color: muted, textDecoration: "none" }}>lucky@lsgrowth.agency</a>
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <div className="proof-content" style={{ maxWidth: "760px", margin: "0 auto", padding: "128px 40px 80px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>Real Client Result</span>
          <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: ink, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "14px" }}>
            Ray, Build It All
          </h1>
          <p style={{ fontSize: "16px", color: muted, lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
            Over $100k of renovation work booked in the first month. Ray talks you through one of the jobs he's doing right now off the back of it.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "340px", background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            <video
              controls
              poster="/videos/build-it-all-proof-thumb.jpg"
              style={{ width: "100%", display: "block" }}
            >
              <source src="/videos/build-it-all-proof.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

      </div>

      {/* Footer strip */}
      <div style={{ borderTop: `1px solid ${line}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: muted, margin: 0 }}>© {new Date().getFullYear()} L&S Growth Agency · NZ &amp; AU</p>
        <a href="mailto:lucky@lsgrowth.agency" style={{ fontSize: "13px", color: muted, textDecoration: "none" }}>lucky@lsgrowth.agency</a>
      </div>
    </div>
  );
}
