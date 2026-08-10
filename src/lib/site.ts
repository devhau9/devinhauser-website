/**
 * Zentrale Site-Konstanten.
 *
 * Vorher war SITE_URL an drei Stellen dupliziert (layout.tsx, sitemap.ts,
 * robots.ts) — mit dem in sitemap.ts selbst notierten [PRÜFEN]-Hinweis, dass
 * das eine spätere Aufräumarbeit sei. Diese Datei ist genau diese Aufräumarbeit:
 * eine Quelle, drei Verbraucher.
 *
 * WICHTIG — Domainform: Kanonisch ist die Nicht-www-Form `https://devinhauser.com`,
 * exakt wie bisher im Code verwendet. Das ist bewusst NICHT geändert worden:
 * Ein Wechsel auf www würde alle bestehenden Canonicals umschreiben und wäre
 * ohne Prüfung der tatsächlichen Host-Weiterleitung ein Risiko. Falls die
 * Produktion auf `www.` weiterleitet, ist der Wechsel hier eine Einzeiler-
 * Änderung — siehe Morning-Review-Punkt "Domainform".
 */

export const SITE_URL = "https://devinhauser.com";

export const SITE_NAME = "Devin Hauser";

export const SITE_TITLE =
  "Devin Hauser | Swiss IQFoil & Wingfoil Racing Athlete";

export const SITE_DESCRIPTION =
  "Devin Hauser is a Swiss IQFoil and Wingfoil racing athlete competing internationally since 2020, on a long-term journey towards the Olympic Games — combining international racing with self-produced photo and video content.";

/** Bestätigte offizielle Profile — dienen als sameAs-Signale. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/devin.hauser_/",
  "https://www.tiktok.com/@devin.hauser_",
  "https://www.youtube.com/@devin.hauser",
];

export const CONTACT_EMAIL = "devinhauser9@gmail.com";

/** Standard-Sharing-Bild. Absolute URL, weil einige Plattformen relative Pfade ignorieren. */
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

/** Hilfsfunktion für absolute URLs in strukturierten Daten. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Serialisiert strukturierte Daten sicher für ein `<script>`-Element.
 *
 * WARUM DAS NÖTIG IST — und warum `JSON.stringify` allein ein Fehler ist:
 * `JSON.stringify` maskiert `<` und `>` nicht. Enthält ein Feld irgendwo die
 * Zeichenfolge `</script`, beendet der HTML-Parser das Script-Element genau
 * dort — der Rest landet als echtes Markup im Dokument. Bei Feldern, die aus
 * einer Inhaltsdatei stammen (Albumtitel, Beschreibung, Bildunterschrift,
 * Credit), ist das keine Theorie, sondern der klassische Ausbruch aus einem
 * JSON-LD-Block. Ein versehentlich eingefügtes Stück HTML in einer Bildunter-
 * schrift würde ausgeführt.
 *
 * `<` ist innerhalb eines JSON-Strings exakt dasselbe Zeichen wie `<` —
 * die strukturierten Daten bleiben also unverändert gültig, nur der HTML-Parser
 * sieht kein `<` mehr.
 *
 * Diese Funktion ist die EINZIGE erlaubte Art, JSON-LD in diese Seite zu
 * schreiben. Kein direktes `JSON.stringify` in `dangerouslySetInnerHTML`.
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Letzte inhaltliche Überarbeitung der redaktionellen Seiten.
 *
 * Bewusst eine gepflegte Konstante und NICHT `new Date()`: Ein bei jedem Build
 * neu gesetztes Datum behauptet, der Inhalt habe sich geändert, obwohl nur neu
 * gebaut wurde. Beim Ändern eines Textes hier mitpflegen.
 */
export const CONTENT_UPDATED = "2026-08-10";

/**
 * schema.org Person — nur gesicherte, öffentlich belegbare Angaben.
 *
 * Bewusst NICHT enthalten: Geburtsdatum (steht nicht öffentlich auf der Seite),
 * Auszeichnungen, Resultate, Vereinsmitgliedschaften, Sponsoren. Es wird nichts
 * behauptet, was auf der Seite selbst nicht belegt ist.
 */
export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Devin Hauser",
  alternateName: "SUI-134",
  jobTitle: "IQFoil & Wingfoil Racing Athlete",
  description:
    "Swiss IQFoil and Wingfoil racing athlete. IQFoil is the Olympic windsurfing class.",
  nationality: { "@type": "Country", name: "Switzerland" },
  height: { "@type": "QuantitativeValue", value: 178, unitCode: "CMT" },
  homeLocation: {
    "@type": "Place",
    name: "Buchs ZH, Switzerland",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buchs ZH",
      addressCountry: "CH",
    },
  },
  url: SITE_URL,
  image: absoluteUrl("/images/about-portrait.jpg"),
  knowsAbout: [
    "IQFoil",
    "Wingfoil Racing",
    "Windsurfing",
    "Sailing",
    "Hydrofoiling",
  ],
  sameAs: SOCIAL_PROFILES,
};

/**
 * Bilder, die eine Nicht-„own"-Rechteklasse haben, dürfen NICHT als
 * Sharing-Vorschau ausgeliefert werden. Grund: Beim Teilen eines Links holen
 * sich Plattformen wie WhatsApp, Slack, LinkedIn oder X das Bild aktiv ab und
 * legen eine eigene Kopie auf ihren Servern an. Das ist Weiterverbreitung —
 * unabhängig davon, ob auf der Seite ein Download-Knopf steht. Für fremdes
 * Material wird deshalb das eigene Standardbild verwendet.
 */
export const SHARE_FALLBACK_IMAGE = DEFAULT_OG_IMAGE;

/** schema.org WebSite — macht die Site als benannte Entität erkennbar. */
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

/** BreadcrumbList-Helfer. Erwartet Paare aus Name und Pfad. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
