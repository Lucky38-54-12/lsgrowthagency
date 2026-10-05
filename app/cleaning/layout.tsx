import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Generation & Ads for Cleaning Businesses",
  description:
    "We help cleaning businesses in NZ & AU book more jobs with targeted Meta ads, conversion-tracked websites, and content that turns enquiries into real, booked cleans.",
  openGraph: {
    title: "More Booked Cleaning Jobs. Not Just More Leads. — L&S Growth",
    description:
      "Targeted Meta ads, conversion tracking, and websites built to turn enquiries into booked cleaning jobs. See how we took Queenstown Cleaning from 57 leads to 30 booked jobs in a month.",
  },
};

export default function CleaningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
