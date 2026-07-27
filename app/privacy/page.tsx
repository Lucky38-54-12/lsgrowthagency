import type { Metadata } from "next";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Privacy Policy — L&S Growth",
  description: "How L&S Growth collects, uses, and protects data for our clients and their leads.",
};

const LAST_UPDATED = "6 July 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: ink, marginBottom: "12px" }}>{title}</h2>
      <div style={{ fontSize: "15px", lineHeight: 1.7, color: muted }}>{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: "14px", color: muted, marginBottom: "48px" }}>Last updated: {LAST_UPDATED}</p>

        <Section title="Who we are">
          <p>
            L&S Growth ("we", "us", "our") provides lead generation, cold outreach, and AI-powered lead
            qualification services to local service businesses ("clients") in New Zealand and Australia.
            This policy explains what data we collect, why, and how it's handled — both for our clients
            and for the people who message our clients' businesses.
          </p>
        </Section>

        <Section title="What we collect">
          <p style={{ marginBottom: "12px" }}>Depending on which of our services a business uses, we may collect:</p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>Messages sent to a client's Facebook Page or Messenger inbox, so our AI can respond to and qualify the enquiry</li>
            <li>Contact details a lead provides during that conversation (e.g. name, email, phone, job details, location)</li>
            <li>Publicly available business contact information we use to run cold outreach campaigns on a client's behalf (e.g. business name, email, phone)</li>
            <li>Email open/click activity on outreach emails, used to measure campaign performance</li>
            <li>Calendar availability and booking details, when a client connects their Google Calendar so qualified leads can be booked directly</li>
          </ul>
        </Section>

        <Section title="How we use it">
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>To respond to and qualify enquiries sent to a client's Facebook Page, using an AI assistant configured with that client's business information</li>
            <li>To book qualified leads directly onto a client's calendar</li>
            <li>To run and track cold email and outreach campaigns for our clients</li>
            <li>To generate reporting and analytics for our clients about their leads and campaign performance</li>
            <li>To improve and troubleshoot our own systems</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            We do not sell personal data, and we do not use lead or client data for advertising purposes.
          </p>
        </Section>

        <Section title="Third parties we use">
          <p style={{ marginBottom: "12px" }}>
            We rely on the following third-party services to operate. Data may pass through them as part of
            normal operation:
          </p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li><strong>Meta (Facebook Messenger Platform)</strong> — to receive and reply to messages sent to a client's connected Facebook Page</li>
            <li><strong>Anthropic (Claude)</strong> — the AI model used to read and respond to lead conversations</li>
            <li><strong>Google (Calendar, OAuth)</strong> — to book appointments on a client's calendar</li>
            <li><strong>Supabase</strong> — our database provider, used to securely store lead and client data</li>
            <li><strong>Resend</strong> — for sending outreach and transactional email</li>
          </ul>
        </Section>

        <Section title="Data retention">
          <p>
            We retain conversation and lead data for as long as a client's account is active, so they can
            review their lead history. If a client stops working with us, we delete their data on request.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            If you've messaged one of our clients' businesses and want your data removed, contact us at the
            email below and we'll action it — for you directly or by passing the request to the relevant
            business.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy or a data request? Email us at{" "}
            <a href="mailto:lsgrowthagency.co@gmail.com" style={{ color: accent, textDecoration: "none" }}>
              lsgrowthagency.co@gmail.com
            </a>.
          </p>
        </Section>
      </main>
    </div>
  );
}
