import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from "./site";
import { OG_LOCALE, alternatesFor, localizedPath, type Lang } from "./i18n";

type PageMetadataArgs = {
  lang: Lang;
  /** Kanonischer (deutscher) Pfad OHNE Sprachpraefix, z. B. "/media". */
  path: string;
  /** Nur das Titel-FRAGMENT — das Root-Layout haengt " | Devin Hauser" an. */
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /**
   * Setzt den Titel absolut, ohne " | Devin Hauser" anzuhaengen.
   * Nur fuer die Startseite gedacht — deren Titel enthaelt den Namen bereits.
   */
  absoluteTitle?: boolean;
};

/**
 * Einheitliche Seiten-Metadaten fuer beide Sprachen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WAS DIESE FUNKTION VERHINDERT
 * ─────────────────────────────────────────────────────────────────────────────
 * Bei zwei Sprachen und acht Seiten gaebe es sechzehn Stellen, an denen
 * `canonical`, `hreflang`, `og:url` und `og:locale` von Hand zusammenpassen
 * muessten. Erfahrungsgemaess passen sie es nach der dritten Aenderung nicht
 * mehr: Ein vergessenes `hreflang` faellt in keinem Build auf und in keinem
 * Test — nur in der Search Console, Wochen spaeter.
 *
 * Hier wird alles aus EINEM kanonischen Pfad abgeleitet:
 *   canonical  ->  /media    bzw.  /en/media
 *   hreflang   ->  beide Fassungen + x-default auf die deutsche
 *   og:url     ->  absolute Adresse der jeweiligen Sprachfassung
 *   og:locale  ->  de_CH bzw. en_GB
 *
 * ALLE Adressen entstehen relativ und werden von `metadataBase`
 * (https://www.devinhauser.com) absolut gemacht. Damit kann in keiner
 * Vorschau-Umgebung versehentlich ein vercel.app-Host in einem canonical- oder
 * og:url-Tag landen — der klassische Weg, wie ein Preview-Deployment im Index
 * mit der Produktionsseite konkurriert.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noindex = false,
  absoluteTitle = false,
}: PageMetadataArgs): Metadata {
  const url = `${SITE_URL}${localizedPath(path, lang)}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(path, lang),
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      locale: OG_LOCALE[lang],
      title,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt ?? title }],
    },
    // Ohne eigenen twitter-Block erbt eine Seite den generischen aus dem
    // Layout. Derselbe Link saehe dann auf LinkedIn/WhatsApp (OpenGraph)
    // anders aus als auf X/Slack/iMessage (Twitter Card) — zwei widersprechende
    // Vorschauen desselben Inhalts.
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/**
 * Metadaten des Root-Layouts je Sprache.
 *
 * Enthaelt alles, was fuer JEDE Seite dieser Sprachfassung gilt: metadataBase,
 * Titel-Vorlage, Standardbeschreibung, Urheberangaben und die Robots-Regeln.
 * Einzelne Seiten ueberschreiben davon nur, was sie wirklich betrifft.
 *
 * REGEL FUER ALLE UNTERSEITEN: nur das Titel-FRAGMENT setzen, ohne
 * " | Devin Hauser" und ohne " — Devin Hauser". Next.js ersetzt `%s` durch den
 * Titel der Unterseite. Eine Seite, die ihren Markennamen selbst anhaengt,
 * erzeugt deshalb "Impressum | Devin Hauser | Devin Hauser". Das war beim
 * Einfuehren dieses Templates am 10.08.2026 auf allen acht Unterseiten der Fall
 * und ist durch keinen Build-Fehler sichtbar geworden — nur im Browser-Tab und
 * in der Google-Ergebnisliste. Die Startseite umgeht die Vorlage bewusst ueber
 * `absoluteTitle`, weil ihr Titel den Namen bereits enthaelt.
 */
export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE[lang],
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION[lang],
    keywords: SITE_KEYWORDS[lang],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: alternatesFor("/", lang),
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedPath("/", lang)}`,
      siteName: SITE_NAME,
      title: SITE_TITLE[lang],
      description: SITE_DESCRIPTION[lang],
      locale: OG_LOCALE[lang],
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: SITE_TITLE[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE[lang],
      description: SITE_DESCRIPTION[lang],
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
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
}
