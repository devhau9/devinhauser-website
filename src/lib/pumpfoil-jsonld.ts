import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";
import { localizedPath, type Lang } from "@/lib/i18n";
import {
  PUMPFOIL_FAQ,
  PUMPFOIL_META,
  PUMPFOIL_NAME,
  PUMPFOIL_PATH,
  PUMPFOIL_UPDATED,
} from "@/lib/pumpfoil";

/**
 * Strukturierte Daten der Pumpfoil-Lernseite — genau drei Bloecke:
 *
 *   Article         Die Seite ist ein Ratgebertext von Devin (Autor und
 *                   Herausgeber = die Person-Entitaet aus dem Layout).
 *   BreadcrumbList  Startseite > Pumpfoil lernen, sprachrichtig.
 *   FAQPage         Nur die Fragen mit `structured: true` — wortgleich mit der
 *                   sichtbaren FAQ. Lerndauer und Lektionen bleiben draussen.
 *
 * BEWUSST NICHT: Course, CourseInstance, Event, LocalBusiness,
 * SportsActivityLocation, Offer, Product, Review, AggregateRating,
 * openingHours, priceRange. Stand 02.10.2026 existiert kein Angebot — Markup
 * dafuer wuerde Suchmaschinen etwas melden, das es nicht gibt. Der Regeltest
 * tests/pumpfoil.test.ts prueft genau das.
 */
export function pumpfoilJsonLd(lang: Lang): Record<string, unknown>[] {
  const meta = PUMPFOIL_META[lang];
  const url = `${SITE_URL}${localizedPath(PUMPFOIL_PATH, lang)}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    image: absoluteUrl("/images/og-image.jpg"),
    datePublished: PUMPFOIL_UPDATED,
    dateModified: PUMPFOIL_UPDATED,
    inLanguage: lang,
    about: [
      { "@type": "Thing", name: lang === "de" ? "Pumpfoil" : "Pump foiling" },
      { "@type": "Thing", name: "Hydrofoiling" },
    ],
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: lang === "de" ? "Startseite" : "Home", path: localizedPath("/", lang) },
    { name: PUMPFOIL_NAME[lang], path: localizedPath(PUMPFOIL_PATH, lang) },
  ]);

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PUMPFOIL_FAQ[lang]
      .filter((item) => item.structured)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };

  return [article, breadcrumb, faq];
}
