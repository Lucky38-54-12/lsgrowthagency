import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ray, Build It All — proof",
};

export default function BuildingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
