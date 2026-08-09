import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublicAlbums } from "@/lib/albums";

/**
 * Sitemap.
 *
 * Zwei Änderungen gegenüber der Fassung vom 03.08.2026:
 *
 * 1. SITE_URL kommt jetzt aus src/lib/site.ts statt aus einer lokalen Kopie —
 *    das war der [PRÜFEN]-Punkt, der hier selbst notiert war.
 *
 * 2. `lastModified` ist nicht mehr `new Date()`. Ein bei jedem Build neu
 *    gesetztes Änderungsdatum sagt Suchmaschinen bei jedem Deploy, dass sich
 *    ALLE Seiten geändert haben — auch wenn sich nichts geändert hat. Das
 *    entwertet das Signal. Stattdessen: ein gepflegtes Datum je Route, und bei
 *    Alben das tatsächliche Albumdatum.
 *
 * /partner-portal bleibt bewusst draussen (die Seite ist per Metadata auf
 * noindex gesetzt). /media erscheint nur, sobald mindestens ein Album
 * existiert — eine leere Galerie im Index wäre eine Thin Page.
 */

type Entry = {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC_ENTRIES: Entry[] = [
  { path: "", lastModified: "2026-08-10", changeFrequency: "monthly", priority: 1 },
  { path: "/iqfoil", lastModified: "2026-08-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", lastModified: "2026-08-03", changeFrequency: "yearly", priority: 0.3 },
  { path: "/imprint", lastModified: "2026-08-03", changeFrequency: "yearly", priority: 0.3 },
  { path: "/copyright", lastModified: "2026-08-03", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const albums = getPublicAlbums();

  const entries: MetadataRoute.Sitemap = STATIC_ENTRIES.map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  if (albums.length > 0) {
    entries.push({
      url: `${SITE_URL}/media`,
      lastModified: new Date(albums[0].date),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const album of albums) {
      entries.push({
        url: `${SITE_URL}/media/${album.slug}`,
        lastModified: new Date(album.date),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
