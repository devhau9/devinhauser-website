/**
 * Zentrale Site-Konstanten.
 *
 * Vorher war SITE_URL an drei Stellen dupliziert (layout.tsx, sitemap.ts,
 * robots.ts) — mit dem in sitemap.ts selbst notierten [PRÜFEN]-Hinweis, dass
 * das eine spätere Aufräumarbeit sei. Diese Datei ist genau diese Aufräumarbeit:
 * eine Quelle, drei Verbraucher.
 *
 * WICHTIG — Domainform: Kanonisch ist seit dem 19.08.2026 die www-Form
 * `https://www.devinhauser.com` (Entscheid Devin, Launch-Sprint 19.08.2026).
 * Die Apex-Domain `devinhauser.com` und der stabile vercel.app-Produktions-
 * host leiten per 308 hierher — siehe redirects() in next.config.mjs.
 * Voraussetzung im Vercel-Dashboard: beide Domains dem Projekt zugewiesen,
 * `www.devinhauser.com` als Primärdomain. Preview-Deployments sind von den
 * Redirects nicht betroffen (exakte Host-Matches, kein Wildcard).
 */

import { OG_LOCALE, localizedPath, type Lang } from "./i18n";

export const SITE_URL = "https://www.devinhauser.com";

export const SITE_NAME = "Devin Hauser";

/**
 * Titel und Beschreibung je Sprache.
 *
 * Beide Fassungen sind eigenstaendig formuliert, nicht Wort fuer Wort
 * uebersetzt: Ein deutscher Seitentitel, der wie eine Uebersetzung klingt,
 * verliert genau die Suchbegriffe, wegen derer er existiert. „IQFoil" und
 * „Wingfoil Racing" bleiben in beiden Sprachen unveraendert — es sind
 * Klassenbezeichnungen, keine uebersetzbaren Woerter.
 */
export const SITE_TITLE: Record<Lang, string> = {
  de: "Devin Hauser | IQFoil- und Wingfoil-Racer aus der Schweiz",
  en: "Devin Hauser | Swiss IQFoil & Wingfoil Racing Athlete",
};

export const SITE_DESCRIPTION: Record<Lang, string> = {
  de: "Devin Hauser ist IQFoil- und Wingfoil-Racer aus der Schweiz, seit 2020 international im Einsatz und auf dem langen Weg zu den Olympischen Spielen — internationales Racing verbunden mit selbst produzierten Foto- und Videoinhalten.",
  en: "Devin Hauser is a Swiss IQFoil and Wingfoil racing athlete competing internationally since 2020, on a long-term journey towards the Olympic Games — combining international racing with self-produced photo and video content.",
};

/** Schluesselwoerter je Sprache — bewusst kurz und ohne Wiederholungen. */
export const SITE_KEYWORDS: Record<Lang, string[]> = {
  de: [
    "Devin Hauser",
    "IQFoil",
    "IQFoil Schweiz",
    "Windsurfen Schweiz",
    "Wingfoil Racing",
    "Schweizer Windsurfer",
    "SUI-134",
    "Silvaplana",
  ],
  en: [
    "Devin Hauser",
    "IQFoil",
    "Swiss IQFoil athlete",
    "Swiss windsurfing athlete",
    "Wingfoil racing",
    "Swiss wingfoil athlete",
    "SUI-134",
    "Silvaplana",
  ],
};

export { OG_LOCALE };

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
export const CONTENT_UPDATED = "2026-08-19";

/**
 * schema.org Person — nur gesicherte, öffentlich belegbare Angaben.
 *
 * Bewusst NICHT enthalten: Geburtsdatum (steht nicht öffentlich auf der Seite),
 * Auszeichnungen, Resultate, Vereinsmitgliedschaften, Sponsoren. Es wird nichts
 * behauptet, was auf der Seite selbst nicht belegt ist.
 */
const PERSON_DESCRIPTION: Record<Lang, string> = {
  de: "IQFoil- und Wingfoil-Racer aus der Schweiz. IQFoil ist die olympische Windsurf-Klasse.",
  en: "Swiss IQFoil and Wingfoil racing athlete. IQFoil is the Olympic windsurfing class.",
};

const PERSON_JOB_TITLE: Record<Lang, string> = {
  de: "IQFoil- und Wingfoil-Racer",
  en: "IQFoil & Wingfoil Racing Athlete",
};

/**
 * schema.org Person.
 *
 * Die `@id` ist in BEIDEN Sprachen dieselbe (`{SITE_URL}/#person`) — es gibt
 * einen Devin Hauser, nicht zwei. Nur die sprachabhaengigen Textfelder
 * wechseln. Zwei verschiedene @id-Werte wuerden Suchmaschinen zwei Personen
 * melden und das Signal halbieren, das diese Auszeichnung erzeugen soll.
 *
 * Bewusst NICHT enthalten: Geburtsdatum (steht nicht oeffentlich auf der
 * Seite), Auszeichnungen, Resultate, Vereinsmitgliedschaften, Sponsoren. Es
 * wird nichts behauptet, was auf der Seite selbst nicht belegt ist.
 */
export function personJsonLd(lang: Lang) {
  return {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Devin Hauser",
  alternateName: "SUI-134",
  jobTitle: PERSON_JOB_TITLE[lang],
  description: PERSON_DESCRIPTION[lang],
  nationality: { "@type": "Country", name: "Switzerland" },
  height: { "@type": "QuantitativeValue", value: 178, unitCode: "CMT" },
  // Öffentliche Ortsangabe seit 19.08.2026 bewusst auf Stadt-/Regionsebene
  // (Entscheid Devin: keine Wohngemeinde, keine Privatadresse auf der Website).
  homeLocation: {
    "@type": "Place",
    name: "Zurich, Switzerland",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zurich",
      addressCountry: "CH",
    },
  },
  url: absoluteUrl(localizedPath("/", lang)),
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
}

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
export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION[lang],
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

/**
 * BreadcrumbList-Helfer. Erwartet Paare aus Name und BEREITS SPRACHRICHTIGEM
 * Pfad — die Brotkrume der englischen Fassung muss auf `/en/...` zeigen, sonst
 * beschreibt das Markup einen Weg, den es auf dieser Seite nicht gibt.
 */
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
