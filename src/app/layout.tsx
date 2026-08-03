import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

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

// SEO/Social-Metadata bewusst zentral hier gepflegt, analog zur bestehenden
// GA_MEASUREMENT_ID-Konvention. SITE_URL nutzt die laut README registrierte
// Domain devinhauser.com — [PRÜFEN] falls die Domain bei Go-Live doch
// abweicht. Description bewusst natürlich formuliert (kein Keyword-Stuffing);
// die Keywords decken die wichtigsten Personal-Brand-Suchbegriffe ab.
const SITE_URL = "https://devinhauser.com";
const SITE_TITLE = "Devin Hauser | Swiss IQFoil & Wingfoil Racing Athlete";
const SITE_DESCRIPTION =
  "Devin Hauser is a Swiss IQFoil and Wingfoil racing athlete competing internationally since 2020, on a long-term journey towards the Olympic Games — combining international racing with self-produced photo and video content.";

// Confirmed social profiles (identisch zu SocialMedia.tsx / Footer.tsx) —
// dienen als sameAs-Signale für die strukturierten Daten.
const SOCIAL_PROFILES = [
  "https://www.instagram.com/devin.hauser_/",
  "https://www.tiktok.com/@devin.hauser_",
  "https://www.youtube.com/@devin.hauser",
];

// Strukturierte Daten (schema.org Person). Nur gesicherte Angaben — Name,
// Nationalität, Disziplinen, Website, offizielle Social-Profile. Keine
// erfundenen Daten.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Devin Hauser",
  jobTitle: "IQFoil & Wingfoil Racing Athlete",
  nationality: "Swiss",
  url: SITE_URL,
  knowsAbout: ["IQFoil", "Wingfoil Racing", "Sailing"],
  sameAs: SOCIAL_PROFILES,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
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
    siteName: "Devin Hauser",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
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
    images: ["/images/og-image.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <GoogleAnalytics />
        <Navigation />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
