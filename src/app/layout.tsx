import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Devin Hauser — Swiss IQFoil & Wingfoil Racing Athlete",
  description:
    "Offizielle Website von Devin Hauser, Schweizer IQFoil- und Wingfoil-Racing-Athlet. Sportliche Highlights, Ziele, Content und Sponsoring-Informationen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-ink font-body text-paper antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
