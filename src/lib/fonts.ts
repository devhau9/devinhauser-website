import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Schriften — bewusst in einer eigenen Datei.
 *
 * Seit die Site zwei Root-Layouts hat (deutsch und englisch, siehe
 * src/lib/i18n.ts), gaebe es sonst zwei Stellen, an denen dieselben drei
 * Schriften geladen werden. `next/font` erzeugt daraus zwar keine doppelten
 * Netzwerkanfragen, aber zwei Definitionen laufen bei der ersten Aenderung
 * auseinander — und ein Layout mit anderer Schrift faellt in keinem Build auf.
 *
 * Praktischer Nebeneffekt: Der Verifikations-Container hat keinen Zugang zu
 * fonts.googleapis.com. Er tauscht fuer den Testlauf genau DIESE eine Datei
 * gegen `fonts.container.ts.txt` aus (siehe verify.sh) — das echte Layout
 * bleibt dabei unberuehrt.
 */

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

export const fontClassNames = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
