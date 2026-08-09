/**
 * Typen der Media Library — bewusst in einer eigenen Datei OHNE Node-Imports.
 *
 * Grund: `src/lib/albums.ts` importiert `node:fs`, weil es Alben zur Build-Zeit
 * von der Platte liest. Eine Client-Komponente darf niemals in eine Modulkette
 * geraten, die `node:fs` enthält. Typen sind zwar reine Compile-Zeit-Artefakte,
 * aber es ist sicherer, sie gar nicht erst aus einem Node-Modul zu importieren,
 * als sich auf das korrekte Wegoptimieren zu verlassen.
 */

export type RightsClass = "own" | "licensed-use" | "restricted";

export type AlbumImage = {
  /** Pfad unterhalb von /public, z. B. "/media/silvaplana-2026-08-09/01.jpg" */
  src: string;
  /** Beschreibender Alt-Text. Pflichtfeld — kein Keyword-Stuffing. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Überschreibt den Album-Credit, falls ein einzelnes Bild von jemand anderem stammt. */
  credit?: string;
  /**
   * Optionale, separat erzeugte Download-Datei (z. B. längere Kante 2560 px).
   * Fehlt sie, wird `src` als Download angeboten.
   */
  downloadSrc?: string;
  /** Überschreibt die Album-Voreinstellung — kann nur einschränken, nie erweitern. */
  downloadAllowed?: boolean;
};

export type Album = {
  slug: string;
  /** ISO-Datum, z. B. "2026-08-09" */
  date: string;
  title: string;
  location: string;
  /** z. B. "IQFoil", "Wingfoil", "Drone" */
  sport: string;
  description: string;
  /** Wer hat fotografiert. Bei eigenen Bildern: "Devin Hauser". */
  photographer: string;
  /** Wie der Credit anzuzeigen ist, z. B. "Photo: Devin Hauser". */
  credit: string;
  rights: RightsClass;
  /** Album-Voreinstellung. Wirkt nur zusammen mit rights === "own". */
  downloadAllowed: boolean;
  coverImage: string;
  images: AlbumImage[];
  tags?: string[];
  featured?: boolean;
  /** Album vorbereiten, aber noch nicht indexieren lassen. */
  noindex?: boolean;
};
