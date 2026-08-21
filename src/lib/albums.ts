import fs from "node:fs";
import path from "node:path";
import type { Album, AlbumImage, RightsClass } from "./album-types";
import type { Lang } from "./i18n";

/**
 * Media Library — Datenmodell, Rechtemodell und Laden der Alben.
 *
 * Bewusst KEINE Datenbank und kein CMS. Ein Album ist eine einzelne JSON-Datei
 * unter `content/albums/`. Album hinzufügen heisst: Bilder nach
 * `public/media/<slug>/` legen, eine JSON-Datei schreiben, bauen. Kein Code.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DAS RECHTEMODELL IST DER KERN DIESER DATEI — bitte vor Änderungen lesen.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Es werden drei Rechteklassen unterschieden, und sie sind NICHT austauschbar:
 *
 *   "own"           Devin hat es selbst aufgenommen. Nur hier ist ein
 *                   öffentlicher Download überhaupt möglich.
 *
 *   "licensed-use"  Ein Dritter hat es aufgenommen, Devin darf es VERWENDEN
 *                   (z. B. Andreas Furger, Tobias Meier). Nutzungserlaubnis für
 *                   Devin ist NICHT dasselbe wie das Recht, die Datei an
 *                   beliebige Dritte weiterzugeben. Anzeigen ja, Download nein.
 *
 *   "restricted"    Event-, Klassen- oder Agenturmaterial (z. B. SailingEnergy).
 *                   Weder Download noch Veröffentlichung ohne ausdrückliche,
 *                   schriftlich vorliegende Freigabe.
 *
 * Die Funktion `canDownload()` erzwingt das im Code. Selbst wenn in einer
 * JSON-Datei versehentlich `"downloadAllowed": true` bei einem Album der Klasse
 * "licensed-use" oder "restricted" steht, gibt sie `false` zurück. Das ist
 * Absicht: Ein Tippfehler in einer Inhaltsdatei darf niemals dazu führen, dass
 * fremdes Material zum Download angeboten wird.
 */

export type { Album, AlbumImage, RightsClass };

const ALBUMS_DIR = path.join(process.cwd(), "content", "albums");

const RIGHTS_VALUES: RightsClass[] = ["own", "licensed-use", "restricted"];

/**
 * Prüft ein einzelnes Bild.
 *
 * Warum das nötig ist: `Array.isArray(a.images)` allein akzeptiert
 * `[null, 42, "text"]`. Der erste Zugriff auf `image.src` in `downloadHref()`
 * oder in `next/image` wirft dann eine TypeError — und zwar währenddessen die
 * Seite statisch vorgeneriert wird. Damit bricht der GESAMTE Build, also genau
 * das, was die Fehlerbehandlung unten verhindern soll. Ein kaputtes Album muss
 * als kaputt erkannt und übersprungen werden, bevor es irgendwo ankommt.
 */
function isAlbumImage(value: unknown): value is AlbumImage {
  if (typeof value !== "object" || value === null) return false;
  const i = value as Partial<AlbumImage>;
  return (
    typeof i.src === "string" &&
    i.src.length > 0 &&
    typeof i.alt === "string" &&
    typeof i.width === "number" &&
    Number.isFinite(i.width) &&
    typeof i.height === "number" &&
    Number.isFinite(i.height)
  );
}

/**
 * Slugs werden zu URL-Segmenten und zu Ordnernamen unter /public/media.
 * Erlaubt sind deshalb nur Kleinbuchstaben, Ziffern und Bindestriche — das
 * schliesst Pfadanteile wie "../" und alles Kodierte von vornherein aus.
 */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isAlbum(value: unknown): value is Album {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Partial<Album>;
  return (
    typeof a.slug === "string" &&
    typeof a.title === "string" &&
    typeof a.date === "string" &&
    typeof a.location === "string" &&
    typeof a.sport === "string" &&
    typeof a.description === "string" &&
    typeof a.photographer === "string" &&
    typeof a.credit === "string" &&
    typeof a.rights === "string" &&
    RIGHTS_VALUES.includes(a.rights as RightsClass) &&
    typeof a.downloadAllowed === "boolean" &&
    typeof a.coverImage === "string" &&
    SLUG_PATTERN.test(a.slug) &&
    Array.isArray(a.images) &&
    a.images.length > 0 &&
    a.images.every(isAlbumImage)
  );
}

/**
 * Liest alle Alben zur Build-Zeit. Fehlerhafte Dateien werden übersprungen und
 * auf der Konsole gemeldet — ein kaputtes Album darf nie den ganzen Build und
 * damit die ganze Website blockieren.
 */
export function getAllAlbums(): Album[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(ALBUMS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    // Ordner existiert noch nicht — das ist ein gültiger Zustand (keine Alben).
    return [];
  }

  const albums: Album[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(ALBUMS_DIR, file), "utf8");
      const parsed: unknown = JSON.parse(raw);
      if (!isAlbum(parsed)) {
        console.warn(`[albums] Übersprungen (Schema unvollständig): ${file}`);
        continue;
      }
      albums.push(parsed);
    } catch (error) {
      console.warn(`[albums] Übersprungen (nicht lesbar): ${file}`, error);
    }
  }

  // Neueste zuerst — bewusst die einzige Sortierung in V1.
  return albums.sort((a, b) => b.date.localeCompare(a.date));
}

/** Alben, die öffentlich gelistet und indexiert werden dürfen. */
export function getPublicAlbums(): Album[] {
  return getAllAlbums().filter((album) => !album.noindex);
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return getAllAlbums().find((album) => album.slug === slug);
}

/**
 * Die einzige Stelle, an der über einen Download entschieden wird.
 *
 * Regel: Download nur bei eigenem Material. Ein Bild darf die Album-Erlaubnis
 * einschränken, aber niemals erweitern.
 */
export function canDownload(album: Album, image?: AlbumImage): boolean {
  if (album.rights !== "own") return false;
  if (!album.downloadAllowed) return false;
  if (image && image.downloadAllowed === false) return false;
  return true;
}

/** Enthält das Album mindestens ein herunterladbares Bild? */
export function albumHasDownloads(album: Album): boolean {
  return album.images.some((image) => canDownload(album, image));
}

export function downloadHref(image: AlbumImage): string {
  return image.downloadSrc ?? image.src;
}

/**
 * Credit-Zeile eines Bildes, so wie sie ausgeliefert werden darf.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DIE REGEL, DIE HIER ERZWUNGEN WIRD (Entscheid Devin, 20.08.2026)
 * ─────────────────────────────────────────────────────────────────────────────
 * Ein Fotografen-Credit darf nur stehen, wenn im Rechte-Manifest BELEGT ist,
 * welche PERSON fotografiert hat. Im Manifest V1.1 lautet die Quelle des
 * eigenen Bestands „Familie Hauser" — das ist keine Person, sondern ein
 * Haushalt. Die daraus abgeleitete Zeile „Photo: Hauser" behauptet eine
 * Urheberschaft, die nirgends belegt ist, und ist deshalb ausdruecklich
 * untersagt. Zulaessig ist die sachliche Herkunftszeile:
 *   „Bild: Archiv Devin Hauser" / „Image: Devin Hauser archive".
 *
 * Warum das im CODE steht und nicht nur in einer Anleitung: Die Credit-Zeile
 * kommt aus einer JSON-Inhaltsdatei. Ein Album, das jemand spaeter in zwei
 * Minuten anlegt, wuerde die Regel sonst genau dann verletzen, wenn niemand
 * mehr an sie denkt. Hier wird der verbotene Wortlaut abgefangen und durch die
 * korrekte Herkunftszeile ersetzt — dieselbe Logik wie bei `canDownload()`:
 * ein Tippfehler in einer Inhaltsdatei darf keine Rechtsaussage erzeugen.
 *
 * Ein VOLLSTAENDIGER Personenname bleibt selbstverstaendlich erlaubt und
 * unveraendert — „Photo: Tobias Meier", „Photo: Marc Weiler",
 * „Photo: Devin Hauser".
 */
const UNDOCUMENTED_CREDIT = /^photo\s*[:\-–]?\s*hauser\.?$/i;

const ARCHIVE_LINE: Record<Lang, string> = {
  de: "Bild: Archiv Devin Hauser",
  en: "Image: Devin Hauser archive",
};

export function displayCredit(raw: string, lang: Lang): string {
  const value = raw.trim();
  if (value.length === 0 || UNDOCUMENTED_CREDIT.test(value)) {
    return ARCHIVE_LINE[lang];
  }
  return value;
}

/**
 * Kurzer, ehrlicher Hinweistext je Rechteklasse — wird im UI angezeigt.
 *
 * WORTWAHL IST HIER EINE EHRLICHKEITSFRAGE. Die frühere Formulierung lautete
 * „not available for download or reuse". Das war zu viel versprochen: Jedes
 * angezeigte Bild liegt zwangsläufig unter einer öffentlichen URL, sonst wäre
 * es nicht sichtbar. Wer „Bild speichern" wählt, bekommt dieselbe Datei, die
 * ein Download-Knopf geliefert hätte. Eine statisch ausgelieferte Website kann
 * das technisch nicht verhindern — und eine Zusage, die die Technik nicht
 * hält, ist schlechter als gar keine. Der Text bittet deshalb um etwas, statt
 * eine Unmöglichkeit zu behaupten. Was der Code tatsächlich verhindert:
 * angebotene Downloads, Sharing-Vorschaubilder und die Anmeldung der Dateien
 * bei der Bildersuche.
 */
const RIGHTS_NOTICE: Record<Lang, Record<RightsClass | "own-nodownload", string>> = {
  de: {
    own: "Fotos von Devin Hauser. Für den privaten Gebrauch frei zum Herunterladen und Teilen — bitte Devin Hauser nennen. Für kommerzielle Nutzung vorher kurz melden.",
    "own-nodownload":
      "Fotos aus dem Archiv von Devin Hauser. Hier zum Anschauen gezeigt — bitte vor jeder Verwendung kurz anfragen.",
    "licensed-use":
      "Veröffentlicht mit Erlaubnis des Fotografen. Bitte diese Bilder nicht weiterverwenden oder erneut veröffentlichen — dafür zuerst den Fotografen fragen.",
    restricted:
      "Eventmaterial, gezeigt mit Erlaubnis. Bitte diese Bilder nicht weiterverwenden oder erneut veröffentlichen — dafür zuerst den Rechteinhaber fragen.",
  },
  en: {
    own: "Photos by Devin Hauser. Free to download and share for personal use — please credit Devin Hauser. For commercial use, get in touch first.",
    "own-nodownload":
      "Photos from Devin Hauser's archive. Shown here for viewing — please get in touch before using any of these images.",
    "licensed-use":
      "Published with the photographer's permission. Please don't reuse or republish these images — ask the photographer first.",
    restricted:
      "Event media shown with permission. Please don't reuse or republish these images — ask the rights holder first.",
  },
};

export function rightsNotice(album: Album, lang: Lang): string {
  const table = RIGHTS_NOTICE[lang];
  if (album.rights === "own") {
    return album.downloadAllowed ? table.own : table["own-nodownload"];
  }
  return table[album.rights];
}
