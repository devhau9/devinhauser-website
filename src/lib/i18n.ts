/**
 * Zweisprachigkeit — Deutsch ist die Standardsprache.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DAS ROUTING-MODELL IN EINEM SATZ
 * ─────────────────────────────────────────────────────────────────────────────
 * Deutsch liegt ohne Praefix auf der Wurzel (`/`, `/media`, `/iqfoil`, …),
 * Englisch liegt exakt daneben unter `/en` (`/en`, `/en/media`, `/en/iqfoil`, …).
 *
 * Der KANONISCHE PFAD einer Seite ist in diesem Modul immer der deutsche Pfad
 * OHNE Praefix. Aus ihm wird jede Sprachvariante berechnet — es gibt bewusst
 * keine zweite Pfadliste, die auseinanderlaufen koennte.
 *
 * Technisch umgesetzt mit zwei Root-Layouts ueber Route Groups:
 *   src/app/(de)/layout.tsx   ->  <html lang="de">   bedient  /
 *   src/app/(en)/layout.tsx   ->  <html lang="en">   bedient  /en
 *
 * Warum zwei Root-Layouts und nicht ein einziges: `<html lang>` muss die
 * tatsaechliche Sprache des Dokuments nennen. Ein einzelnes Root-Layout kennt
 * den aktuellen Pfad nicht, ohne die gesamte Seite auf dynamisches Rendering
 * umzustellen — das waere ein hoher Preis fuer ein Attribut. Zwei Root-Layouts
 * loesen es statisch und ohne Laufzeitkosten.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * KEINE AUTOMATISCHE WEITERLEITUNG NACH BROWSERSPRACHE
 * ─────────────────────────────────────────────────────────────────────────────
 * Bewusste Entscheidung (Vorgabe 21.08.2026): Wer `/` aufruft, bekommt Deutsch —
 * auch mit englischem Browser. Eine automatische Umleitung nach `Accept-Language`
 * verhindert, dass jemand die andere Sprache ueberhaupt erreichen kann, ohne
 * gegen die Weiterleitung anzukaempfen, und sie zwaenge die gesamte Site in
 * dynamisches Rendering. Der Sprachwechsel ist sichtbar und manuell.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SCHREIBWEISE DEUTSCH
 * ─────────────────────────────────────────────────────────────────────────────
 * Schweizer Hochdeutsch. KEIN Eszett — durchgehend "ss" (Grosse, Strasse,
 * heisst, gemaess). Fachbegriffe der Klasse bleiben englisch und werden nicht
 * uebersetzt: iQFOiL, Wingfoil, Foil, Racing, Slalom, Marathon, Course Racing.
 * "iQFOiL" wird konsequent VOR "Wingfoil" genannt — es ist die Hauptdisziplin.
 */

export type Lang = "de" | "en";

export const LANGS: readonly Lang[] = ["de", "en"] as const;

/** Deutsch ist Standard. Diese Konstante ist die einzige Stelle, die das festlegt. */
export const DEFAULT_LANG: Lang = "de";

export const EN_PREFIX = "/en";

/** Sichtbare Bezeichnung im Sprachumschalter. */
export const LANG_LABEL: Record<Lang, string> = { de: "DE", en: "EN" };

/** Ausgeschriebener Name — fuer ARIA-Labels und `hreflang`-Titel. */
export const LANG_NAME: Record<Lang, string> = {
  de: "Deutsch",
  en: "English",
};

/** OpenGraph-Locale. Die englischen Texte sind in britischer Schreibung verfasst. */
export const OG_LOCALE: Record<Lang, string> = {
  de: "de_CH",
  en: "en_GB",
};

/**
 * Kanonischer (deutscher) Pfad -> Pfad in der gewuenschten Sprache.
 *
 * `localizedPath("/media", "en")` === "/en/media"
 * `localizedPath("/", "en")`      === "/en"
 * `localizedPath("/media", "de")` === "/media"
 */
export function localizedPath(canonicalPath: string, lang: Lang): string {
  const path = canonicalPath === "/" ? "" : canonicalPath;
  if (lang === "de") return path === "" ? "/" : path;
  return `${EN_PREFIX}${path}`;
}

/**
 * Beliebiger Pfad -> { lang, canonicalPath }.
 *
 * Gegenstueck zu `localizedPath`. Wird vom Sprachumschalter gebraucht, der aus
 * dem AKTUELLEN Pfad den gleichwertigen Pfad der anderen Sprache berechnen muss.
 * "/en" und "/en/" ergeben beide { lang: "en", canonicalPath: "/" }.
 */
export function splitLangPath(pathname: string): {
  lang: Lang;
  canonicalPath: string;
} {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (clean === EN_PREFIX) return { lang: "en", canonicalPath: "/" };
  if (clean.startsWith(`${EN_PREFIX}/`)) {
    return { lang: "en", canonicalPath: clean.slice(EN_PREFIX.length) };
  }
  return { lang: "de", canonicalPath: clean === "" ? "/" : clean };
}

/**
 * Adresse einer Sektion der Startseite in der gewuenschten Sprache.
 *
 * `sectionHref("de", "partner")` === "/#partner"
 * `sectionHref("en", "partner")` === "/en#partner"
 *
 * Klein, aber wichtig: Die naive Schreibweise `${localizedPath("/", lang)}#id`
 * ergibt auf Deutsch "/#id" (richtig) und auf Englisch "/en#id" (richtig) —
 * bricht aber sofort, sobald jemand `localizedPath("/", lang)` durch einen
 * Wert mit Schraegstrich am Ende ersetzt. Eine Funktion an einer Stelle ist
 * billiger als dieselbe Verkettung an acht Stellen.
 */
export function sectionHref(lang: Lang, id: string): string {
  const base = localizedPath("/", lang);
  return base === "/" ? `/#${id}` : `${base}#${id}`;
}

/** Die jeweils andere Sprache. */
export function otherLang(lang: Lang): Lang {
  return lang === "de" ? "en" : "de";
}

/**
 * `alternates`-Block fuer die Next.js-Metadata einer Seite.
 *
 * Erzeugt canonical + hreflang fuer beide Sprachen + `x-default`.
 *
 * WARUM `x-default` AUF DEUTSCH ZEIGT: `x-default` benennt die Fassung, die
 * ausgeliefert werden soll, wenn keine Sprachvariante zur Nutzerpraeferenz
 * passt. Da `/` die deutsche Fassung ist und die Site keine automatische
 * Sprachweiche hat, ist die deutsche Fassung genau diese Standardfassung.
 * Zeigte `x-default` auf `/en`, wuerde Google fuer alle uebrigen Sprachraeume
 * eine Seite anbieten, die es unter dieser Adresse gar nicht gibt.
 *
 * Die Pfade sind relativ — `metadataBase` (https://www.devinhauser.com) macht
 * sie absolut. Damit kann hier niemals versehentlich ein vercel.app-Host landen.
 */
export function alternatesFor(canonicalPath: string, lang: Lang) {
  return {
    canonical: localizedPath(canonicalPath, lang),
    languages: {
      de: localizedPath(canonicalPath, "de"),
      en: localizedPath(canonicalPath, "en"),
      "x-default": localizedPath(canonicalPath, "de"),
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────────
   NAVIGATION
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Anker-Ids sind in BEIDEN Sprachen identisch (und historisch deutsch).
 *
 * Das ist kein Schoenheitsfehler, sondern Absicht: Der Sprachumschalter kann
 * damit den Hash unveraendert mitnehmen. Wer auf `/#partner` steht und auf EN
 * wechselt, landet auf `/en#partner` — auf derselben Sektion. Mit uebersetzten
 * Ids muesste dafuer eine zweite Zuordnungstabelle gepflegt werden, die beim
 * ersten Umbenennen still auseinanderlaeuft.
 */
export const SECTION_ID = {
  hero: "hero",
  about: "ueber-mich",
  disciplines: "sport-ziele",
  goals: "goals",
  results: "highlights",
  social: "social-media",
  gallery: "galerie",
  sponsoring: "sponsoring",
  partners: "partner",
  contact: "kontakt",
  newsletter: "newsletter",
} as const;

export type NavLink = {
  /** Fertiger href inklusive Sprachpraefix. */
  href: string;
  label: string;
  /** Nur fuer den Kontakt-Eintrag: wird als roter Knopf dargestellt. */
  cta?: boolean;
};

type NavKey =
  | "home"
  | "about"
  | "results"
  | "social"
  | "gallery"
  | "partners"
  | "contact";

const NAV_LABEL: Record<Lang, Record<NavKey, string>> = {
  de: {
    home: "Startseite",
    about: "Über mich",
    results: "Ergebnisse",
    social: "Social Media",
    gallery: "Galerie",
    partners: "Partner",
    contact: "Kontakt",
  },
  en: {
    home: "Home",
    about: "About",
    results: "Results",
    social: "Social Media",
    gallery: "Gallery",
    partners: "Partners",
    contact: "Contact",
  },
};

/**
 * Die Navigationsliste einer Sprache.
 *
 * `galleryHref` wird von aussen hereingereicht: Ob die Galerie auf die
 * Media-Library-Seite (`/media`) oder auf den Galerie-Teaser der Startseite
 * (`/#galerie`) zeigt, haengt davon ab, ob bereits ein freigegebenes Album
 * existiert. Diese Entscheidung braucht Dateisystemzugriff und darf deshalb
 * nicht in diesem Modul stehen — es wird auch von Client-Komponenten
 * importiert und muss frei von `node:fs` bleiben.
 */
export function navLinks(lang: Lang, galleryHref: string): NavLink[] {
  const L = NAV_LABEL[lang];
  return [
    { href: localizedPath("/", lang), label: L.home },
    { href: sectionHref(lang, SECTION_ID.about), label: L.about },
    { href: sectionHref(lang, SECTION_ID.results), label: L.results },
    { href: sectionHref(lang, SECTION_ID.social), label: L.social },
    { href: galleryHref, label: L.gallery },
    { href: sectionHref(lang, SECTION_ID.partners), label: L.partners },
    { href: sectionHref(lang, SECTION_ID.contact), label: L.contact, cta: true },
  ];
}

/* ────────────────────────────────────────────────────────────────────────────
   GEMEINSAME OBERFLAECHENTEXTE
   ────────────────────────────────────────────────────────────────────────── */

export const UI: Record<
  Lang,
  {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    primaryNavLabel: string;
    languageSwitchLabel: string;
    switchTo: (name: string) => string;
    currentLanguage: (name: string) => string;
    breadcrumbLabel: string;
    newTab: string;
  }
> = {
  de: {
    skipToContent: "Zum Inhalt springen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    menuLabel: "Hauptmenü",
    primaryNavLabel: "Hauptnavigation",
    languageSwitchLabel: "Sprache",
    switchTo: (name) => `Auf ${name} wechseln`,
    currentLanguage: (name) => `Aktuelle Sprache: ${name}`,
    breadcrumbLabel: "Brotkrumennavigation",
    newTab: "öffnet in einem neuen Tab",
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Main menu",
    primaryNavLabel: "Main navigation",
    languageSwitchLabel: "Language",
    switchTo: (name) => `Switch to ${name}`,
    currentLanguage: (name) => `Current language: ${name}`,
    breadcrumbLabel: "Breadcrumb",
    newTab: "opens in a new tab",
  },
};

/* ────────────────────────────────────────────────────────────────────────────
   DATUM
   ────────────────────────────────────────────────────────────────────────── */

const MONTHS: Record<Lang, string[]> = {
  de: [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

/**
 * ISO-Datum -> lesbares Datum, bewusst ohne `Intl`/`toLocaleDateString`.
 *
 * Grund: Diese Funktion laeuft sowohl beim Vorgenerieren auf dem Build-Server
 * als auch im Browser. `toLocaleDateString` haengt von der ICU-Datenlage der
 * jeweiligen Umgebung ab — unterschiedliche Ausgaben auf Server und Client
 * ergeben einen Hydration-Mismatch. Eine feste Tabelle ist langweilig und
 * genau deshalb richtig.
 */
export function formatDate(iso: string, lang: Lang): string {
  const [year, month, day] = iso.split("-");
  const monthIndex = Number(month) - 1;
  const names = MONTHS[lang];
  if (!year || Number.isNaN(monthIndex) || !names[monthIndex]) return iso;
  return lang === "de"
    ? `${Number(day)}. ${names[monthIndex]} ${year}`
    : `${Number(day)} ${names[monthIndex]} ${year}`;
}
