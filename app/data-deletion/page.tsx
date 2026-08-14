import type { Metadata } from "next";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Data Deletion",
  description: "How to request deletion of your data from L&S Growth Agency.",
};

const LAST_UPDATED = "9 August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: ink, marginBottom: "12px" }}>{title}</h2>
      <div style={{ fontSize: "15px", lineHeight: 1.7, color: muted }}>{children}</div>
    </section>
  );
}

export default function DataDeletionPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: F, color: ink }}>
      <nav style={{ borderBottom: `1px solid ${line}`, padding: "20px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <img src="/ls-growth-logo-trimmed.png" alt="L&S Growth" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
          </a>
          <a href="/" style={{ fontSize: "14px", fontWeight: 500, color: accent, textDecoration: "none" }}>← Back to site</a>
        </div>
      </nav>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px 120px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: ink, marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Data Deletion
        </h1>
        <p style={{ fontSize: "14px", color: muted, marginBottom: "48px" }}>Last updated: {LAST_UPDATED}</p>

        <Section title="Who this applies to">
          <p>
            This page covers anyone whose data we hold — whether you're a client business using our services,
            or someone who messaged one of our clients' Facebook Pages, filled in a Lead Ad form, or otherwise
            had a conversation qualified by our AI assistant.
          </p>
        </Section>

        <Section title="How to request deletion">
          <p>
            Email{" "}
            <a href="mailto:lsgrowthagency.co@gmail.com" style={{ color: accent, textDecoration: "none" }}>
              lsgrowthagency.co@gmail.com
            </a>{" "}
            with the subject line "Data deletion request" and let us know:
          </p>
          <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>Whether you're a client business or someone who messaged/enquired with one of our clients</li>
            <li>The business (client) involved, if you're a lead or enquirer</li>
            <li>The best contact details to identify your records (name, email, or phone number used)</li>
          </ul>
        </Section>

        <Section title="What happens next">
          <p>
            We'll confirm receipt within 5 business days and complete the deletion within 30 days. This
            removes your conversation history, extracted contact details, and any associated lead or booking
            records from our systems. Some minimal records may be kept where required for legal or accounting
            reasons (e.g. invoicing history for a client business).
          </p>
        </Section>

        <Section title="Deleting via Facebook">
          <p>
            If you'd rather remove your data through Facebook directly, you can do so from your Facebook
            account's Settings → Apps and Websites → remove L&S Growth's connected app, which revokes our
            access to any further messages. To also delete data already collected, use the email request
            above.
          </p>
        </Section>

        <Section title="Related">
          <p>
            See our{" "}
            <a href="/privacy" style={{ color: accent, textDecoration: "none" }}>Privacy Policy</a> for what we
            collect and why, and our{" "}
            <a href="/terms" style={{ color: accent, textDecoration: "none" }}>Terms of Service</a> for how our
            services work.
          </p>
        </Section>
      </main>
    </div>
  );
}
