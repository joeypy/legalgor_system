import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "LegalGor - Usuario",
    template: "%s · LegalGor - Usuario",
  },
  robots: { index: false, follow: false },
};

export default function PlataformaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
