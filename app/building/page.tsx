const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const accentDark = "#006bbf";
const F = "var(--font-inter), system-ui, sans-serif";

export const metadata = {
  title: "Ray, Build It All — proof",
};

export default function BuildingProofVideo() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)", fontFamily: F, color: ink, overflowX: "hidden" }}>

      <style>{`
        .proof-nav-link { position: relative; transition: color 0.15s ease; }
        .proof-nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: ${accent}; transition: width 0.2s ease; }
        .proof-nav-link:hover { color: ${accent} !important; }
        .proof-nav-link:hover::after { width: 100%; }
        .proof-nav-cta:hover { background: ${accentDark} !important; transform: translateY(-1px); }
        .proof-nav-cta { transition: all 0.15s ease; }
        @media (max-width: 640px) {
          .proof-nav { padding: 0 16px !important; }
          .proof-nav-links { display: none !important; }
          .proof-content { padding: 112px 16px 48px !important; }
        }
      `}</style>

      {/* Nav — mirrors the homepage nav, with the lead form swapped for a direct Book a Call link */}
      <nav className="proof-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,15,26,0.08)" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src="/ls-growth-logo-wordmark.png" alt="L&S Growth" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div className="proof-nav-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {[["Our Work", "/#work"], ["How It Works", "/#how"]].map(([l, h]) => (
              <a key={h} href={h} className="proof-nav-link" style={{ fontSize: "14px", fontWeight: 500, color: ink, textDecoration: "none", whiteSpace: "nowrap" }}>{l}</a>
            ))}
          </div>
          <a href="/book" className="proof-nav-cta" style={{ fontSize: "13px", fontWeight: 700, color: "#fff", background: accent, padding: "10px 20px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Book a Call
          </a>
        </div>
      </nav>

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

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href="/book"
            style={{ display: "inline-block", background: accent, color: "#fff", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em" }}
          >
            Book a quick 15 min chat
          </a>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ borderTop: `1px solid ${line}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: muted, margin: 0 }}>© {new Date().getFullYear()} L&S Growth Agency · NZ &amp; AU</p>
        <a href="mailto:lsgrowthagency.co@gmail.com" style={{ fontSize: "13px", color: muted, textDecoration: "none" }}>lsgrowthagency.co@gmail.com</a>
      </div>
    </div>
  );
}
