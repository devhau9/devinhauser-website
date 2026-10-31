import fs from "node:fs";
import path from "node:path";
import type { LocalizedText } from "./album-types";

/**
 * Regatta- und Trainingsgeschichten (seit 31.10.2026).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WOZU EINE FESTE VORLAGE
 * ─────────────────────────────────────────────────────────────────────────────
 * Jede Geschichte hat denselben Bogen: Ziel → Herausforderung → Verlauf →
 * Resultat, dazu optional Bilder und ein Video. Eine feste Form heisst: Nach
 * einem Event muss nur eine JSON-Datei ausgefüllt werden, keine Seite gebaut.
 * Es gibt bewusst keinen Rhythmus — eine Geschichte pro wichtigem Event reicht.
 *
 * Die Regeln unten sind dieselben wie bei den Alben: Lieber eine Datei
 * ablehnen, als eine unbelegte Aussage öffentlich auszuliefern.
 */

export type StoryStatus = "draft" | "published";
export type StoryKind = "regatta" | "training";

export type StoryResult = {
  placement: number;
  field: number;
  scoring: LocalizedText;
  /** Offizielle Ergebnisliste — nie eine Meldeliste. */
  sourceUrl: string;
  sourceLabel: string;
};

export type StoryImage = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  credit: string;
};

export type Story = {
  slug: string;
  status: StoryStatus;
  kind: StoryKind;
  /** Stand des Textes (ISO). Steuert die Regel «kein vorweggenommenes Resultat». */
  updated: string;
  startDate: string;
  endDate?: string;
  discipline: LocalizedText;
  event: LocalizedText;
  location: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  goal?: LocalizedText;
  challenge?: LocalizedText;
  course?: LocalizedText;
  result: StoryResult | null;
  images: StoryImage[];
  video?: { youtubeId: string; title: string };
  /** Interne Belege. Wird nie ausgegeben. */
  notes?: string;
};

export const STORY_SECTIONS = ["goal", "challenge", "course"] as const;

/** Markierung für fehlenden Text — nur in Entwürfen erlaubt. */
export const MISSING = "[FEHLT NOCH]";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

function isLocalized(value: unknown): value is LocalizedText {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.de === "string" && v.de.trim() !== "" && typeof v.en === "string" && v.en.trim() !== "";
}

function hasMissing(text: LocalizedText | undefined): boolean {
  return !text || text.de.includes(MISSING) || text.en.includes(MISSING);
}

/** Das letzte Renndatum — ein eintägiges Event hat kein `endDate`. */
export function storyEnd(story: Pick<Story, "startDate" | "endDate">): string {
  return story.endDate ?? story.startDate;
}

/**
 * Prüft eine Geschichte. Gibt den ersten Fehler als Satz zurück oder `null`.
 */
export function storyProblem(value: unknown): string | null {
  if (typeof value !== "object" || value === null) return "kein Objekt";
  const s = value as Record<string, unknown>;

  if (typeof s.slug !== "string" || !SLUG.test(s.slug)) return "slug ungültig";
  if (s.status !== "draft" && s.status !== "published") return "status muss draft oder published sein";
  if (s.kind !== "regatta" && s.kind !== "training") return "kind muss regatta oder training sein";
  for (const key of ["updated", "startDate"] as const) {
    if (typeof s[key] !== "string" || !ISO_DATE.test(s[key] as string)) return `${key} ist kein Datum (JJJJ-MM-TT)`;
  }
  if (s.endDate !== undefined && (typeof s.endDate !== "string" || !ISO_DATE.test(s.endDate))) {
    return "endDate ist kein Datum (JJJJ-MM-TT)";
  }
  for (const key of ["discipline", "event", "location", "title", "summary"] as const) {
    if (!isLocalized(s[key])) return `${key} fehlt in DE oder EN`;
  }
  for (const key of STORY_SECTIONS) {
    if (s[key] !== undefined && !isLocalized(s[key])) return `${key} fehlt in DE oder EN`;
  }

  const story = s as unknown as Story;

  // Kein vorweggenommenes Resultat: Ein Text, der vor dem Eventende
  // geschrieben wurde, kann kein Endresultat kennen.
  if (story.result !== null) {
    if (story.updated < storyEnd(story)) return "Resultat eingetragen, bevor das Event zu Ende ist";
    const r = story.result as Record<string, unknown>;
    if (!Number.isInteger(r.placement) || !Number.isInteger(r.field)) return "Resultat: Rang und Feldgrösse als ganze Zahlen";
    if ((r.placement as number) < 1 || (r.placement as number) > (r.field as number)) return "Resultat: Rang ausserhalb des Feldes";
    if (!isLocalized(r.scoring)) return "Resultat: Wertung fehlt";
    if (typeof r.sourceUrl !== "string" || !r.sourceUrl.startsWith("https://")) return "Resultat: offizielle Quelle (https) fehlt";
    if (typeof r.sourceLabel !== "string" || r.sourceLabel.trim() === "") return "Resultat: Name der Quelle fehlt";
  }

  if (!Array.isArray(story.images)) return "images muss eine Liste sein";
  for (const img of story.images) {
    if (typeof img?.src !== "string" || !img.src.startsWith("/")) return "Bild: src muss mit / beginnen";
    if (!fs.existsSync(path.join(PUBLIC_DIR, img.src))) return `Bild fehlt unter public: ${img.src}`;
    if (!Number.isInteger(img.width) || !Number.isInteger(img.height)) return `Bild ohne Masse: ${img.src}`;
    if (!isLocalized(img.alt)) return `Bild ohne Alt-Text: ${img.src}`;
    if (typeof img.credit !== "string" || img.credit.trim() === "" || img.credit.includes(MISSING)) {
      return `Bild ohne geklärten Credit: ${img.src}`;
    }
  }

  if (story.video !== undefined) {
    if (!YOUTUBE_ID.test(story.video?.youtubeId ?? "")) return "Video: youtubeId ungültig";
    if (typeof story.video.title !== "string" || story.video.title.trim() === "") return "Video: Titel fehlt";
    // Das Vorschaubild muss von dieser Website kommen (kein Abruf bei YouTube
    // vor dem Klick) — deshalb dient das erste Bild der Geschichte als Poster.
    if (story.images.length === 0) return "Video braucht ein eigenes Vorschaubild (erstes Bild)";
  }

  if (story.status === "published") {
    for (const key of ["title", "summary", ...STORY_SECTIONS] as const) {
      if (hasMissing(story[key])) return `veröffentlicht, aber «${key}» fehlt oder ist ${MISSING}`;
    }
    if (story.kind === "regatta" && story.result === null) return "veröffentlichte Regatta ohne Resultat";
  }

  return null;
}

/** Alle gültigen Geschichten, neueste zuerst. Ungültige werden gemeldet und übersprungen. */
export function getAllStories(): Story[] {
  let files: string[] = [];
  try {
    // Punktdateien ausschliessen: macOS legt auf dem exFAT-Volume `._*`-Sidecars an.
    files = fs.readdirSync(STORIES_DIR).filter((f) => !f.startsWith(".") && f.endsWith(".json"));
  } catch {
    return [];
  }
  const stories: Story[] = [];
  for (const file of files) {
    try {
      const parsed: unknown = JSON.parse(fs.readFileSync(path.join(STORIES_DIR, file), "utf8"));
      const problem = storyProblem(parsed);
      if (problem !== null) {
        console.error(`[stories] ABGELEHNT — ${file}: ${problem}`);
        continue;
      }
      stories.push(parsed as Story);
    } catch (error) {
      console.warn(`[stories] Übersprungen (nicht lesbar): ${file}`, error);
    }
  }
  return stories.sort((a, b) => b.startDate.localeCompare(a.startDate));
}

/**
 * Lokale Vorschau für Entwürfe — standardmässig AUS, wie `GALLERY_PREVIEW`.
 * Ein Produktionsbuild ohne den Schalter erzeugt für Entwürfe gar keine Seite.
 */
export function storyPreviewEnabled(): boolean {
  return process.env.STORY_PREVIEW === "1";
}

/** Veröffentlichte Geschichten — die einzigen, die in die Sitemap dürfen. */
export function getPublishedStories(): Story[] {
  return getAllStories().filter((s) => s.status === "published");
}

/** Geschichten, für die eine Seite gebaut wird. */
export function getVisibleStories(): Story[] {
  return storyPreviewEnabled() ? getAllStories() : getPublishedStories();
}

export function getStoryBySlug(slug: string): Story | undefined {
  return getVisibleStories().find((s) => s.slug === slug);
}

export function storyPath(slug: string): string {
  return `/stories/${slug}`;
}
