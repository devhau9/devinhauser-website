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

/**
 * Ein redaktioneller Text in beiden Sprachen.
 *
 * DE und EN teilen sich denselben BILDBESTAND — es gibt keine zweite Kopie
 * einer Datei und keinen zweiten Ordner. Nur die Beschriftung wechselt. Genau
 * deshalb sitzt die Zweisprachigkeit am Textfeld und nicht am Album.
 *
 * Beide Sprachen sind Pflicht. Ein optionales `en` würde in der Praxis
 * bedeuten, dass die englische Galerie irgendwann deutsche Alt-Texte
 * ausliefert — und ein Alt-Text in der falschen Sprache ist schlechter als
 * ein umständlicher in der richtigen.
 */
export type LocalizedText = { de: string; en: string };

export type AlbumImage = {
  /** Pfad unterhalb von /public, z. B. "/media/silvaplana-2026-08-09/01.jpg" */
  src: string;
  /** Beschreibender Alt-Text je Sprache. Pflichtfeld — kein Keyword-Stuffing. */
  alt: LocalizedText;
  width: number;
  height: number;
  caption?: LocalizedText;
  /** Überschreibt `photographer` des Albums für dieses eine Bild. */
  photographer?: string;
  /** Überschreibt den Album-Credit, falls ein einzelnes Bild von jemand anderem stammt. */
  credit?: string;
  /**
   * Rechteklasse dieses einen Bildes.
   *
   * KANN NUR EINSCHRÄNKEN, NIE ERWEITERN. Ein Album der Klasse "own" darf ein
   * einzelnes Bild auf "licensed-use" oder "restricted" heben; umgekehrt darf
   * ein Bild in einem "restricted"-Album sich nicht selbst zu "own" erklären.
   * Der Loader weist solche Alben ab, statt die Angabe stillschweigend zu
   * ignorieren — siehe `albums.ts`.
   *
   * Damit wird ein gemischtes Eventalbum möglich: eigene Bilder plus einzelne
   * Aufnahmen eines Eventfotografen, jede mit der richtigen Klasse und dem
   * richtigen Credit, in EINEM Album.
   */
  rights?: RightsClass;
  /**
   * Optionale, separat erzeugte Download-Datei (z. B. längere Kante 2560 px).
   * Fehlt sie, wird `src` als Download angeboten.
   */
  downloadSrc?: string;
  /** Überschreibt die Album-Voreinstellung — kann nur einschränken, nie erweitern. */
  downloadAllowed?: boolean;
};

/**
 * Video innerhalb eines Eventalbums — SCHEMA-VORBEREITUNG, in V1 ungenutzt.
 *
 * Bewusst dieselbe Rechte- und Credit-Systematik wie beim Bild, damit später
 * kein zweites Regelwerk entsteht. Es gibt heute keinen Player, keinen
 * Import und keine Anzeige: Der Loader akzeptiert das Feld, die Oberfläche
 * ignoriert es. So kann Devin Videos ins Manifest schreiben, bevor die
 * Darstellung gebaut ist, ohne dass ein halbfertiger Player online geht.
 *
 * Wenn die Anzeige kommt, gilt: `poster` wird geladen, das Video selbst erst
 * auf Klick. Kein Autoplay, kein schwerer Initial-Download.
 */
export type AlbumVideo = {
  /** Lokaler Pfad unter /public oder externe URL. */
  src: string;
  /** Standbild, das ohne Nutzeraktion geladen werden darf. */
  poster: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  credit?: string;
  rights?: RightsClass;
};

export type Album = {
  slug: string;
  /** ISO-Datum, z. B. "2026-08-09" */
  date: string;
  title: LocalizedText;
  location: string;
  /** z. B. "IQFoil", "Wingfoil", "Drone" */
  sport: string;
  description: LocalizedText;
  /** Wer hat fotografiert. Bei eigenen Bildern: "Devin Hauser". */
  photographer: string;
  /** Wie der Credit anzuzeigen ist, z. B. "Photo: Devin Hauser". */
  credit: string;
  rights: RightsClass;
  /** Album-Voreinstellung. Wirkt nur zusammen mit rights === "own". */
  downloadAllowed: boolean;
  coverImage: string;
  images: AlbumImage[];
  /** Schema-Vorbereitung, siehe `AlbumVideo`. In V1 nicht dargestellt. */
  videos?: AlbumVideo[];
  tags?: string[];
  /**
   * Kennzeichnet ein Album als „Best of"-tauglich.
   *
   * Bewusst ein Flag an den bestehenden Eventalben statt eines zweiten,
   * duplizierten Albums: Ein „Best of" mit eigenen Dateien würde denselben
   * Bildbestand ein zweites Mal ins Repository legen und bei jeder Korrektur
   * auseinanderlaufen. Wird in V1 noch nicht ausgewertet.
   */
  featured?: boolean;
  /** Album vorbereiten, aber noch nicht indexieren lassen. */
  noindex?: boolean;
};
