import type { MetadataRoute } from "next";

// [PRÜFEN] SITE_URL an eine gemeinsame Konstante mit layout.tsx anzugleichen
// wäre eine spätere Aufräumarbeit (aktuell an zwei Stellen gepflegt, da
// sitemap.ts und layout.tsx unabhängige Next.js-Einstiegspunkte sind, die
// keine Server-Component-Werte teilen können, ohne eine gemeinsame
// lib-Datei einzuführen — bewusst nicht angefasst, um die bestehende
// Struktur nicht unnötig zu verändern).
const SITE_URL = "https://devinhauser.com";

// Statische Routenliste — bewusst einfach gehalten, da die Seite aktuell
// aus einer festen, kleinen Anzahl Seiten besteht (One-Page-Hauptseite +
// Legal-Seiten). /partner-portal ist absichtlich NICHT enthalten, da diese
// Seite über robots-Metadata auf noindex gesetzt ist (siehe
// src/app/partner-portal/page.tsx) und daher nicht in der Sitemap gelistet
// werden soll.
const ROUTES = ["", "/privacy-policy", "/imprint", "/copyright"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "yearly",
    priority: route === "" ? 1 : 0.3,
  }));
}
