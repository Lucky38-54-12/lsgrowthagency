import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "500", "700", "800"] });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["400", "500", "600"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: {
    default: "L&S Growth Agency",
    template: "%s — L&S Growth Agency",
  },
  description: "Done-for-you lead generation and client acquisition system for local service businesses in NZ & AU.",
  openGraph: {
    siteName: "L&S Growth Agency",
    title: "L&S Growth Agency",
    description: "Done-for-you lead generation and client acquisition system for local service businesses in NZ & AU.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
      </head>
      <body suppressHydrationWarning>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1232946588357959');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1232946588357959&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
