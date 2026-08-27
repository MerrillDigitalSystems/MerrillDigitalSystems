import type { Metadata, Viewport } from "next";
import { Barlow, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { orgGraph } from "@/lib/schema";

/**
 * Two faces, both self-hosted by next/font — no Google Fonts request leaves
 * the visitor's browser, which is what keeps the LCP headline from waiting on
 * a third-party round trip.
 *
 * Bricolage is variable on wght AND opsz. Only wght is loaded: the optical
 * size axis would otherwise ship a second set of instances for a difference
 * nothing on the site sets. `adjustFontFallback` is left on so the metric
 * override absorbs the swap instead of shifting the hero.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  // siteName and locale only — the image itself is resolved in buildMeta(),
  // because app/opengraph-image.tsx covers this segment alone and does not
  // cascade to the routes below it. See the note in lib/meta.ts.
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
    <html lang="en" className={`${bricolage.variable} ${barlow.variable}`}>
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
