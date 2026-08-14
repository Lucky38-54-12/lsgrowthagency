import type { Metadata } from "next";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to businesses using L&S Growth Agency's lead generation and AI qualification services.",
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

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: "14px", color: muted, marginBottom: "48px" }}>Last updated: {LAST_UPDATED}</p>

        <Section title="Who these terms cover">
          <p>
            These terms apply to any business ("client", "you") that engages L&S Growth ("we", "us", "our") for
            lead generation, cold outreach, AI-powered lead qualification, or the client portal at
            app.lsgrowth.agency. By using our services or the portal, you agree to these terms.
          </p>
        </Section>

        <Section title="What we provide">
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>An AI assistant that responds to and qualifies enquiries sent to your connected Facebook Page or Lead Ad forms</li>
            <li>Booking of qualified leads onto your connected Google Calendar</li>
            <li>Cold email and outreach campaign management</li>
            <li>A client portal showing your leads, pipeline, and campaign activity</li>
          </ul>
        </Section>

        <Section title="Connecting your accounts">
          <p>
            Where a service requires it, you authorize us to connect to your Facebook Page, Meta ad account,
            or Google Calendar on your behalf, using only the access needed to provide that service. You can
            revoke this access at any time by disconnecting the relevant account or contacting us — doing so
            may stop the affected service from working until reconnected.
          </p>
        </Section>

        <Section title="Your responsibilities">
          <p>
            You're responsible for the accuracy of the business information, services, and FAQs you provide us
            to configure the AI assistant, and for making sure you have the right to connect any Page, ad
            account, or calendar you give us access to.
          </p>
        </Section>

        <Section title="No liability for lost leads or bookings">
          <p>
            We take reasonable care to qualify and route leads accurately, but we don't guarantee that every
            enquiry will be captured, correctly qualified, or successfully booked — for example, a third-party
            outage (Meta, Google) or a lead simply not responding can affect this. We're not liable for lost
            business resulting from such issues.
          </p>
        </Section>

        <Section title="Cancellation">
          <p>
            You can stop using our services at any time. On request, we'll disconnect your accounts and delete
            your data as described in our{" "}
            <a href="/privacy" style={{ color: accent, textDecoration: "none" }}>Privacy Policy</a> and{" "}
            <a href="/data-deletion" style={{ color: accent, textDecoration: "none" }}>Data Deletion</a> pages.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms from time to time. Continued use of our services after an update means
            you accept the revised terms.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:lsgrowthagency.co@gmail.com" style={{ color: accent, textDecoration: "none" }}>
              lsgrowthagency.co@gmail.com
            </a>.
          </p>
        </Section>
      </main>
    </div>
  );
}
