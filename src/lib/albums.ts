import fs from "node:fs";
import path from "node:path";
import type { Album, AlbumImage, RightsClass } from "./album-types";

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
    Array.isArray(a.images)
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

/** Menschliches Datum, stabil und ohne Locale-Überraschungen. */
export function formatAlbumDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthIndex = Number(month) - 1;
  if (!year || Number.isNaN(monthIndex) || !months[monthIndex]) return iso;
  return `${Number(day)} ${months[monthIndex]} ${year}`;
}

/** Kurzer, ehrlicher Hinweistext je Rechteklasse — wird im UI angezeigt. */
export function rightsNotice(album: Album): string {
  switch (album.rights) {
    case "own":
      return album.downloadAllowed
        ? "Photos by Devin Hauser. Free to download and share for personal use — please credit Devin Hauser. For commercial use, get in touch first."
        : "Photos by Devin Hauser. Viewing only — please get in touch before using any of these images.";
    case "licensed-use":
      return "Published with the photographer's permission. Viewing only — these images are not available for download or reuse.";
    case "restricted":
      return "Event media shown with permission. Viewing only — not available for download or reuse.";
  }
}
