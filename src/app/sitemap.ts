import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublicAlbums } from "@/lib/albums";
import { LANGS, localizedPath } from "@/lib/i18n";

/**
 * Sitemap — beide Sprachen, mit gegenseitigen `alternate`-Verweisen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WAS SICH GEGENUEBER DER EINSPRACHIGEN FASSUNG AENDERT
 * ─────────────────────────────────────────────────────────────────────────────
 * Jede Seite erscheint jetzt ZWEIMAL — einmal `/pfad`, einmal `/en/pfad` — und
 * jeder Eintrag nennt ueber `alternates.languages` beide Fassungen plus
 * `x-default`. Google verlangt fuer eine funktionierende Sprachzuordnung, dass
 * die Verweise WECHSELSEITIG sind: Die deutsche Seite muss die englische
 * nennen und umgekehrt. Ein einseitiger Verweis wird stillschweigend ignoriert
 * — der haeufigste Grund, warum hreflang „nicht funktioniert".
 *
 * Dieselben Angaben stehen zusaetzlich als `<link rel="alternate">` im
 * Seitenkopf (siehe src/lib/metadata.ts). Beides zusammen ist Absicht und kein
 * Versehen: Der Seitenkopf wirkt sofort, die Sitemap auch fuer Seiten, die
 * noch nicht gecrawlt wurden.
 *
 * ZWEI DINGE, DIE BEWUSST GLEICH GEBLIEBEN SIND:
 *
 * 1. `lastModified` ist NICHT `new Date()`. Ein bei jedem Build neu gesetztes
 *    Aenderungsdatum sagt Suchmaschinen bei jedem Deploy, dass sich ALLE Seiten
 *    geaendert haetten — auch wenn sich nichts geaendert hat. Das entwertet das
 *    Signal. Stattdessen: ein gepflegtes Datum je Route, bei Alben das
 *    tatsaechliche Albumdatum.
 *
 * 2. /partner-portal bleibt draussen (per Metadata auf `noindex`), /media
 *    erscheint erst, sobald mindestens ein Album existiert.
 */

type Entry = {
  /** Kanonischer (deutscher) Pfad ohne Sprachpraefix. */
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC_ENTRIES: Entry[] = [
  { path: "/", lastModified: "2026-08-21", changeFrequency: "monthly", priority: 1 },
  { path: "/iqfoil", lastModified: "2026-08-21", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", lastModified: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
  { path: "/imprint", lastModified: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
  { path: "/copyright", lastModified: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
];

/** Wechselseitige Sprachverweise fuer einen kanonischen Pfad. */
function alternates(path: string) {
  return {
    languages: {
      de: `${SITE_URL}${localizedPath(path, "de")}`,
      en: `${SITE_URL}${localizedPath(path, "en")}`,
      "x-default": `${SITE_URL}${localizedPath(path, "de")}`,
    },
  };
}

function expand(entry: Entry): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${SITE_URL}${localizedPath(entry.path, lang)}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: alternates(entry.path),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const albums = getPublicAlbums();
  const entries: MetadataRoute.Sitemap = STATIC_ENTRIES.flatMap(expand);

  if (albums.length > 0) {
    entries.push(
      ...expand({
        path: "/media",
        lastModified: albums[0].date,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    );

    for (const album of albums) {
      entries.push(
        ...expand({
          path: `/media/${album.slug}`,
          lastModified: album.date,
          changeFrequency: "yearly",
          priority: 0.6,
        })
      );
    }
  }

  return entries;
}
