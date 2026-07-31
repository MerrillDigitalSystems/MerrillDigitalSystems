import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { orgGraph } from "@/lib/schema";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Custom Software & Web Design Utah | Merrill Digital Systems",
    // Only reaches routes that DON'T go through buildMeta() — that helper sets
    // title.absolute precisely to skip this, because its callers already end
    // their titles with the brand. If you set a page title by hand, leave the
    // brand off and let this append it once. scripts/check-titles.mjs fails
    // the build if a brand ever ends up in there twice.
    template: "%s | Merrill Digital Systems",
  },
  description:
    "Custom software and websites built around how your business actually works — ops hubs, field service platforms, apps, and more. You own the code outright.",
  authors: [{ name: SITE.legalName }],
  robots: { index: true, follow: true },
  // The share image comes from app/opengraph-image.tsx — naming it here would
  // override the file convention and every route would need to repeat it.
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f3f2f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgGraph()} />
        <Analytics />
      </body>
    </html>
  );
}
