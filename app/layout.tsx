import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";

import { siteConfig } from "@/lib/site";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = "https://grupolegalgor.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LegalGor",
    template: "%s · LegalGor",
  },
  description:
    "Asesoría contable, tributaria y legal en Venezuela para empresarios y emprendedores: declaraciones, constitución de compañías, libros legales y trámites.",
  applicationName: "LegalGor",
  keywords: [
    "asesoría contable",
    "tributaria",
    "legal",
    "Venezuela",
    "SENIAT",
    "constitución de compañías",
    "LegalGor",
  ],
  authors: [{ name: "LegalGor" }],
  creator: "LegalGor",
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: siteUrl,
    siteName: "LegalGor",
    title: "LegalGor",
    description:
      "Asesoría contable, tributaria y legal para empresarios y emprendedores en Venezuela.",
    images: [{ url: "/brand/logo-horizontal.png", width: 1001, height: 1001 }],
  },
  twitter: {
    card: "summary",
    title: "LegalGor",
    description:
      "Asesoría contable, tributaria y legal para empresarios y emprendedores en Venezuela.",
    images: ["/brand/logo-horizontal.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/brand/logo-icon.svg",
    apple: "/brand/logo-vertical.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-horizontal.png`,
    image: `${siteUrl}/brand/logo-horizontal.png`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Chacao",
      addressRegion: "Miranda",
      addressCountry: "VE",
    },
    sameAs: [siteConfig.contact.instagram],
  };

  return (
    <html
      lang="es"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
