import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grupolegalgor.com"),
  title: {
    default: "LegalGor — Asesoría Contable, Tributaria y Legal",
    template: "%s · LegalGor",
  },
  description:
    "LegalGor brinda servicios contables, tributarios y legales para empresarios y emprendedores en Venezuela: declaraciones, constitución de compañías, libros legales y trámites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
