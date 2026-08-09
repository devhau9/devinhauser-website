import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  PERSON_JSON_LD,
  WEBSITE_JSON_LD,
} from "@/lib/site";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// SEO-/Social-Konstanten liegen seit 10.08.2026 zentral in src/lib/site.ts.
// Vorher war SITE_URL an drei Stellen dupliziert (layout, sitemap, robots) —
// mit einem [PRÜFEN]-Hinweis in sitemap.ts, dass genau das aufzuräumen sei.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Unterseiten setzen ihren eigenen vollständigen Titel; das Template
    // greift nur, wenn eine Seite nur ein Fragment liefert.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Devin Hauser",
    "IQFoil",
    "Swiss IQFoil athlete",
    "Swiss windsurfing athlete",
    "Wingfoil racing",
    "Swiss wingfoil athlete",
    "SUI-134",
    "Silvaplana",
  ],
  authors: [{ name: "Devin Hauser", url: SITE_URL }],
  creator: "Devin Hauser",
  publisher: "Devin Hauser",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-ink font-body text-paper antialiased">
        {/* Person und WebSite als getrennte, verknüpfte Entitäten (@id).
            Das hilft Suchmaschinen, die Seite als offizielle Website einer
            benannten Person zu erkennen — genau der Punkt, an dem es am
            10.08.2026 gehapert hat: devinhauser.com war mit einem veralteten
            Titel und nur einer URL indexiert. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest2 focus:text-ink"
        >
          Skip to content
        </a>
        <Navigation />
        <div id="main-content">{children}</div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
