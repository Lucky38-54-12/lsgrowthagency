import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["700", "800"] });

export const metadata: Metadata = {
  title: "LS Growth — More Jobs. Less Chasing.",
  description: "Done-for-you lead generation and client acquisition system for local service businesses in NZ & AU.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
