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
// abweicht.
const SITE_URL = "https://devinhauser.com";
const SITE_TITLE = "Devin Hauser — Swiss IQFoil & Wingfoil Racing Athlete";
const SITE_DESCRIPTION =
  "Offizielle Website von Devin Hauser, Schweizer IQFoil- und Wingfoil-Racing-Athlet. Sportliche Highlights, Ziele, Content und Sponsoring-Informationen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Devin Hauser",
    "IQFoil",
    "Wingfoil",
    "Wingfoil Racing",
    "Swiss Sailing",
    "Swiss Sailing Team",
    "Windsurfing Athlete",
    "Foil Racing Switzerland",
    "Sailing Sponsorship",
    "Swiss Watersports Athlete",
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
    <html lang="de" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-ink font-body text-paper antialiased">
        <GoogleAnalytics />
        <Navigation />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
