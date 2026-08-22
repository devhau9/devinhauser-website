import fs from "node:fs";
import path from "node:path";
import type {
  Album,
  AlbumImage,
  LocalizedText,
  PhotographerKind,
  RightsClass,
} from "./album-types";
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
 *   "restricted"    Event-, Klassen- oder Agenturmaterial ohne vorliegende
 *                   Freigabe. Weder Download noch Veröffentlichung.
 *
 * Die Einstufung von Agenturmaterial als "restricted" ist die Vorsichtsregel
 * für den Fall FEHLENDER Information, keine Feststellung über eine konkrete
 * Datei. Liegt eine schriftliche Freigabe des Rechteinhabers vor, gehört das
 * Material nach "licensed-use" — so steht Sailing-Energy-Material in
 * `silvaplana-2025` (Freigabe vom 22.08.2026). Der Unterschied ist genau ein
 * Hinweissatz im Frontend; `canDownload()` liefert in beiden Fällen `false`.
 *
 * Die Funktion `canDownload()` erzwingt das im Code. Selbst wenn in einer
 * JSON-Datei versehentlich `"downloadAllowed": true` bei einem Album der Klasse
 * "licensed-use" oder "restricted" steht, gibt sie `false` zurück. Das ist
 * Absicht: Ein Tippfehler in einer Inhaltsdatei darf niemals dazu führen, dass
 * fremdes Material zum Download angeboten wird.
 */

export type { Album, AlbumImage, LocalizedText, PhotographerKind, RightsClass };

/** Zweisprachigen Text in der gewuenschten Sprache lesen. */
export function localized(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

const ALBUMS_DIR = path.join(process.cwd(), "content", "albums");

const RIGHTS_VALUES: RightsClass[] = ["own", "licensed-use", "restricted"];

const PHOTOGRAPHER_KINDS: PhotographerKind[] = ["person", "organization"];

/** Beide Sprachen vorhanden und nicht leer. */
function isLocalizedText(value: unknown): value is LocalizedText {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Partial<LocalizedText>;
  return (
    typeof t.de === "string" &&
    t.de.trim().length > 0 &&
    typeof t.en === "string" &&
    t.en.trim().length > 0
  );
}

/**
 * Wie streng eine Rechteklasse ist. Höher = strenger.
 *
 * Damit wird „einschränken" zu einem Vergleich statt zu einer Fallunter-
 * scheidung: Ein Bild darf seine Klasse nur auf einen Wert setzen, der
 * mindestens so streng ist wie die des Albums.
 */
const RIGHTS_RANK: Record<RightsClass, number> = {
  own: 0,
  "licensed-use": 1,
  restricted: 2,
};

/**
 * Hauptschalter für öffentliche Downloads.
 *
 * V1 der Galerie zeigt nur an. Ein Presse-/Downloadbereich soll später
 * getrennt vom normalen Galeriesystem entstehen — nicht über dieses Flag,
 * sondern über einen eigenen, geschützten Weg. Bis dahin bleibt es `false`.
 */
const DOWNLOADS_ENABLED = false;

/**
 * Die tatsächlich geltende Rechteklasse eines Bildes.
 *
 * Ohne eigene Angabe gilt die des Albums. Mit eigener Angabe gilt die
 * STRENGERE der beiden — selbst wenn eine Inhaltsdatei etwas anderes
 * behauptet. Der Loader weist solche Dateien zwar ohnehin ab; diese Funktion
 * ist die zweite Sicherung, damit eine gelockerte Klasse auch dann nicht
 * durchkommt, wenn sie auf einem anderen Weg hier ankommt.
 */
export function effectiveRights(album: Album, image?: AlbumImage): RightsClass {
  const own = image?.rights;
  if (!own) return album.rights;
  return RIGHTS_RANK[own] >= RIGHTS_RANK[album.rights] ? own : album.rights;
}

/**
 * Der Credit, der für ein Bild gilt — Bildangabe vor Albumangabe.
 * Rohwert, ohne Anzeigelogik.
 */
function rawCredit(album: Album, image?: AlbumImage): string {
  return (image?.credit ?? album.credit ?? "").trim();
}

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
  if (i.rights !== undefined && !RIGHTS_VALUES.includes(i.rights)) return false;
  if (i.caption !== undefined && !isLocalizedText(i.caption)) return false;
  if (i.credit !== undefined && typeof i.credit !== "string") return false;
  if (i.photographer !== undefined && typeof i.photographer !== "string") {
    return false;
  }
  return (
    typeof i.src === "string" &&
    i.src.length > 0 &&
    isLocalizedText(i.alt) &&
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

/**
 * Prüft ein Album und nennt bei Ablehnung den GENAUEN Grund.
 *
 * Rückgabe `null` heisst gültig. Alles andere ist die Fehlermeldung, die im
 * Build erscheint. Ein boolescher Rückgabewert war hier zu wenig: „Schema
 * unvollständig" hilft niemandem, der um 23 Uhr ein Album nachträgt.
 *
 * Exportiert, damit die Regeln prüfbar sind, ohne dafür Album-Dateien auf die
 * Platte zu schreiben — siehe `tests/albums.test.ts`.
 */
export function albumProblem(value: unknown): string | null {
  if (typeof value !== "object" || value === null) return "kein Objekt";
  const a = value as Partial<Album>;

  if (typeof a.slug !== "string" || !SLUG_PATTERN.test(a.slug)) {
    return "`slug` fehlt oder enthält unerlaubte Zeichen (nur a–z, 0–9, -)";
  }
  if (!isLocalizedText(a.title)) return "`title` braucht { de, en }, beide nicht leer";
  if (!isLocalizedText(a.description)) {
    return "`description` braucht { de, en }, beide nicht leer";
  }
  if (typeof a.date !== "string") return "`date` fehlt";
  if (typeof a.location !== "string") return "`location` fehlt";
  if (typeof a.sport !== "string") return "`sport` fehlt";
  if (typeof a.photographer !== "string") return "`photographer` fehlt";
  if (
    a.photographerKind !== undefined &&
    !PHOTOGRAPHER_KINDS.includes(a.photographerKind)
  ) {
    // Bewusst eine Ablehnung und keine stille Korrektur: Ein Tippfehler wie
    // "Person" oder "org" wuerde sonst dazu fuehren, dass das Album zwar
    // erscheint, im JSON-LD aber ohne Urheber dasteht — ein Fehler, den
    // niemand bemerkt, weil die Seite normal aussieht.
    return "`photographerKind` muss person | organization sein (oder ganz fehlen)";
  }
  if (typeof a.credit !== "string") return "`credit` fehlt";
  if (typeof a.rights !== "string" || !RIGHTS_VALUES.includes(a.rights)) {
    return "`rights` muss own | licensed-use | restricted sein";
  }
  if (typeof a.downloadAllowed !== "boolean") return "`downloadAllowed` fehlt";
  if (typeof a.coverImage !== "string") return "`coverImage` fehlt";
  if (!Array.isArray(a.images) || a.images.length === 0) {
    return "`images` fehlt oder ist leer";
  }

  for (let n = 0; n < a.images.length; n += 1) {
    const image = a.images[n];
    if (!isAlbumImage(image)) {
      return `Bild ${n + 1}: Pflichtfelder fehlen oder haben den falschen Typ (src, alt {de,en}, width, height)`;
    }

    // Regel 1 — ein Bild darf die Album-Rechteklasse nur VERSCHÄRFEN.
    if (image.rights && RIGHTS_RANK[image.rights] < RIGHTS_RANK[a.rights]) {
      return `Bild ${n + 1} (${image.src}): rights "${image.rights}" ist lockerer als das Album ("${a.rights}"). Ein Bild darf nur einschränken.`;
    }

    // Regel 2 — alles ausser eigenem Material braucht einen Credit.
    const effective = image.rights ?? a.rights;
    const credit = (image.credit ?? a.credit).trim();
    if (effective !== "own" && credit.length === 0) {
      return `Bild ${n + 1} (${image.src}): Rechteklasse "${effective}" ohne Credit. Fremdmaterial braucht einen nicht-leeren Credit — sonst würde es fälschlich Devin zugeschrieben.`;
    }
  }

  // Dieselbe Credit-Regel auf Albumebene, damit ein Fremdalbum gar nicht erst
  // ohne Credit existieren kann.
  if (a.rights !== "own" && a.credit.trim().length === 0) {
    return `Album-Rechteklasse "${a.rights}" ohne \`credit\`. Fremdmaterial braucht einen nicht-leeren Credit.`;
  }

  return null;
}

/**
 * Liest alle Alben zur Build-Zeit. Fehlerhafte Dateien werden übersprungen und
 * auf der Konsole gemeldet — ein kaputtes Album darf nie den ganzen Build und
 * damit die ganze Website blockieren.
 */
export function getAllAlbums(): Album[] {
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(ALBUMS_DIR)
      // Punktdateien ausschliessen. Konkreter Anlass: Das Repository liegt auf
      // einem exFAT-Volume, und macOS legt dort neben jeder geschriebenen
      // Datei einen AppleDouble-Sidecar `._<name>` für die erweiterten
      // Attribute an. `._silvaplana-2025.json` endet auf ".json" und landete
      // deshalb im Loader, wo es bei JSON.parse scheiterte — mit einer
      // Warnung pro Album und Build. Das ist nicht bloss Lärm: Wer sich
      // daran gewöhnt, dass `[albums]`-Meldungen normal sind, übersieht die
      // Meldung, die ein tatsächlich kaputtes Album ankündigt.
      //
      // Ein Album, dessen Name mit einem Punkt beginnt, gibt es nicht — der
      // Slug muss ohnehin mit [a-z0-9] anfangen.
      .filter((f) => !f.startsWith(".") && f.endsWith(".json"));
  } catch {
    // Ordner existiert noch nicht — das ist ein gültiger Zustand (keine Alben).
    return [];
  }

  const albums: Album[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(ALBUMS_DIR, file), "utf8");
      const parsed: unknown = JSON.parse(raw);
      const problem = albumProblem(parsed);
      if (problem !== null) {
        console.error(`[albums] ABGELEHNT — ${file}: ${problem}`);
        continue;
      }
      albums.push(parsed as Album);
    } catch (error) {
      console.warn(`[albums] Übersprungen (nicht lesbar): ${file}`, error);
    }
  }

  // Neueste zuerst — bewusst die einzige Sortierung in V1.
  return albums.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Alben, die öffentlich gelistet und indexiert werden dürfen.
 *
 * Massgeblich für Sitemap und für die Frage, ob /media selbst indexiert wird.
 * `noindex`-Alben sind hier NIE enthalten — auch nicht in der Vorschau.
 */
export function getPublicAlbums(): Album[] {
  return getAllAlbums().filter((album) => !album.noindex);
}

/**
 * Lokale Review-Vorschau: zeigt auch `noindex`-Alben in den Listenansichten.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM ES DIESEN SCHALTER GIBT
 * ─────────────────────────────────────────────────────────────────────────────
 * Ein Album mit `noindex: true` ist fertig gebaut, aber noch nicht freigegeben
 * — bei silvaplana-2025 und cremia-2026 fehlt Devins Textfreigabe. Seine
 * Detailseite existiert (`generateStaticParams()` nutzt `getAllAlbums()`),
 * aber die Galerie-Übersicht zeigte den Leerzustand: „Die ersten Alben
 * entstehen gerade". Damit liess sich die fertige Galerie lokal nicht
 * ansehen und nicht beurteilen.
 *
 * Die Übersicht deshalb dauerhaft auf `getAllAlbums()` umzustellen wäre der
 * falsche Weg: Beim nächsten Deploy stünden nicht freigegebene Alben
 * öffentlich auf der Startseite. Genau das soll `noindex` verhindern.
 *
 * Also ein ausdrücklicher, standardmässig AUSGESCHALTETER Schalter. Ohne
 * `GALLERY_PREVIEW=1` verhält sich die Website exakt wie vorher — ein
 * versehentlicher Produktionsbuild kann nichts veröffentlichen, weil er den
 * Schalter nicht gesetzt hat. Mit dem Schalter sieht Devin lokal die
 * vollständige Galerie, sichtbar als Review gekennzeichnet.
 *
 * Was der Schalter NICHT tut: Er ändert weder `robots`-Angaben noch die
 * Sitemap. Ein Vorschaualbum bleibt in jedem Fall `noindex`.
 */
export function galleryPreviewEnabled(): boolean {
  return process.env.GALLERY_PREVIEW === "1";
}

/**
 * Alben für die Listenansichten (Galerie-Übersicht, Startseiten-Teaser).
 *
 * Ohne Vorschaumodus identisch mit `getPublicAlbums()`.
 */
export function getListedAlbums(): Album[] {
  return galleryPreviewEnabled() ? getAllAlbums() : getPublicAlbums();
}

/**
 * Die `author`-Angabe für das JSON-LD eines Albums — oder `null`.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DER FEHLER, DEN DIESE FUNKTION BEHEBT (gefunden 23.08.2026)
 * ─────────────────────────────────────────────────────────────────────────────
 * `AlbumView.tsx` schrieb fest `author: { "@type": "Person", name:
 * album.photographer }`. Für silvaplana-2025 steht in `photographer` der Wert
 * „Sailing Energy" — eine Bildagentur. Die Seite hat also maschinenlesbar
 * behauptet, eine Organisation sei eine natürliche Person.
 *
 * Strukturierte Daten sind eine Tatsachenbehauptung gegenüber Suchmaschinen,
 * kein Gestaltungsdetail. Deshalb wird hier nicht geraten:
 *
 *   `photographerKind: "person"`        → Person
 *   `photographerKind: "organization"`  → Organization
 *   Feld fehlt / Name leer              → gar kein `author`
 *
 * Der letzte Fall ist der wichtige. Es gibt keine Namensheuristik — weder
 * „enthält zwei Wörter" noch „endet auf AG/GmbH". Wer keine belegte Zuordnung
 * hat, macht keine Aussage. Ein fehlender `author` ist gültiges schema.org;
 * ein falscher ist eine Falschangabe.
 */
export type AlbumAuthorJsonLd = {
  "@type": "Person" | "Organization";
  name: string;
};

export function albumAuthorJsonLd(album: Album): AlbumAuthorJsonLd | null {
  const name = album.photographer.trim();
  if (name.length === 0) return null;
  switch (album.photographerKind) {
    case "person":
      return { "@type": "Person", name };
    case "organization":
      return { "@type": "Organization", name };
    default:
      return null;
  }
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
  // ───────────────────────────────────────────────────────────────────────────
  // V1 IST EINE REINE ANZEIGE-GALERIE (Entscheid 22.08.2026)
  // ───────────────────────────────────────────────────────────────────────────
  // Solange kein Presse-/Downloadbereich existiert, wird KEIN Download
  // angeboten — auch nicht für eigenes Material. Diese eine Zeile ist die
  // Sperre. Sie steht bewusst ganz oben und vor jeder anderen Prüfung, damit
  // keine Inhaltsdatei und keine spätere Ergänzung sie umgehen kann.
  //
  // Zum Aktivieren später: diese Zeile entfernen. Dann greift wieder die
  // vollständige Regel darunter — und die hat sich nicht geändert.
  if (!DOWNLOADS_ENABLED) return false;

  if (effectiveRights(album, image) !== "own") return false;
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
 * Credit eines einzelnen Bildes, rechtebewusst.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DER FEHLER, DEN DIESE FUNKTION VERHINDERT (gefunden 22.08.2026)
 * ─────────────────────────────────────────────────────────────────────────────
 * `displayCredit()` allein ersetzt einen leeren Credit durch „Bild: Archiv
 * Devin Hauser" — unabhängig von der Rechteklasse. Bei eigenem Material ist
 * das genau richtig. Bei einem Bild der Klasse "licensed-use" oder
 * "restricted" wäre es eine FALSCHE URHEBERZUSCHREIBUNG: Die Aufnahme eines
 * fremden Fotografen bekäme Devins Archivzeile.
 *
 * Der Loader lässt so ein Album gar nicht erst durch (siehe `albumProblem`).
 * Diese Funktion ist die zweite Sicherung an der Anzeigestelle: Für alles
 * ausser eigenem Material gibt es die Archivzeile nie, sondern nur einen
 * echten Credit — oder gar keinen.
 */
export function imageCredit(
  album: Album,
  image: AlbumImage,
  lang: Lang
): string | null {
  const credit = rawCredit(album, image);
  if (effectiveRights(album, image) === "own") {
    return displayCredit(credit, lang);
  }
  return credit.length > 0 ? credit : null;
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

export function rightsNotice(album: Album, lang: Lang, image?: AlbumImage): string {
  const table = RIGHTS_NOTICE[lang];
  const effective = effectiveRights(album, image);
  if (effective === "own") {
    return canDownload(album, image) ? table.own : table["own-nodownload"];
  }
  return table[effective];
}

/**
 * Welche Rechteklassen kommen in diesem Album tatsächlich vor?
 *
 * Ein gemischtes Eventalbum — eigene Bilder plus einzelne Aufnahmen eines
 * Eventfotografen — braucht mehr als einen Hinweistext. Diese Funktion liefert
 * die vorkommenden Klassen in der Reihenfolge von locker nach streng, damit
 * die Oberfläche je Klasse genau einen Hinweis zeigen kann statt einen
 * pauschalen, der für die Hälfte der Bilder falsch wäre.
 */
export function rightsClassesInAlbum(album: Album): RightsClass[] {
  const found = new Set<RightsClass>();
  for (const image of album.images) {
    found.add(effectiveRights(album, image));
  }
  return [...found].sort((a, b) => RIGHTS_RANK[a] - RIGHTS_RANK[b]);
}
