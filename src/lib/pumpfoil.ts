import type { Lang } from "./i18n";

/**
 * Pumpfoil-Lernseite — gemeinsame Daten fuer Route, Sitemap und Tests.
 *
 * Angelegt am 02.10.2026. Bewusst OHNE Wert-Importe (nur `import type`):
 * Die Regeltests in tests/pumpfoil.test.ts laden diese Datei direkt mit
 * `node --test`, und Node loest die Pfad-Aliase und endungslosen Importe des
 * Anwendungscodes nicht auf. Alles, was Route, Sitemap und Test gemeinsam
 * brauchen, steht deshalb hier und nirgends doppelt.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WAS DIESE SEITE NICHT BEHAUPTET
 * ─────────────────────────────────────────────────────────────────────────────
 * Stand 02.10.2026 sind Lektionen bei Devin eine Planung, kein Angebot:
 * Angebot, Unterrichtsort, Start, Preis, Versicherung und Buchbarkeit sind
 * nicht bestaetigt. Daraus folgt:
 *   • kein Kursort — auch nicht Silvaplana (Trainingsrevier) und nicht der
 *     Wohnort; die Zielregion fragt Devin erst noch ab
 *   • keine Preise, Termine, Bewertungen, Oeffnungszeiten
 *   • keine Lehrqualifikation (im Vault ist keine belegt)
 *   • kein Course-, Event-, LocalBusiness- oder Offer-Markup
 *   • keine Dauer bis zum ersten Flug und kein Erfolgsversprechen
 * Die Tests pruefen diese Punkte im Quelltext der Seite.
 */

/** Kanonischer (deutscher) Pfad ohne Sprachpraefix — gilt fuer DE und EN. */
export const PUMPFOIL_PATH = "/pumpfoil";

/**
 * Echtes Datum der letzten inhaltlichen Aenderung dieser Seite.
 * Speist Sitemap (`lastModified`), Article-JSON-LD und den sichtbaren
 * Stand-Vermerk. Bei jeder Textaenderung von Hand nachfuehren.
 */
export const PUMPFOIL_UPDATED = "2026-10-02";

/** Titel-FRAGMENT (das Layout haengt " | Devin Hauser" an) und Beschreibung. */
export const PUMPFOIL_META: Record<Lang, { title: string; description: string }> = {
  de: {
    title: "Pumpfoil lernen: Der Einstieg für Anfänger",
    description:
      "Was Pumpfoil ist, was du mitbringen solltest, wie die ersten Versuche ablaufen, welche Fehler fast alle machen und was bei Material und Sicherheit zählt.",
  },
  en: {
    title: "Learn to Pump Foil: A Beginner's Guide",
    description:
      "What pump foiling is, what you need before you start, how the first attempts go, the mistakes almost everyone makes, and what matters for kit and safety.",
  },
};

/** Sichtbarer Name der Seite — Brotkrume und BreadcrumbList. */
export const PUMPFOIL_NAME: Record<Lang, string> = {
  de: "Pumpfoil lernen",
  en: "Learn to pump foil",
};

export type FaqItem = {
  q: string;
  a: string;
  /**
   * `true` = zusaetzlich als FAQPage-JSON-LD ausgeliefert. Fragen ohne
   * belastbare Antwort (Lerndauer) und die Frage nach Lektionen (Angebot
   * existiert noch nicht) stehen sichtbar auf der Seite, aber nicht im Markup.
   */
  structured: boolean;
};

export const PUMPFOIL_FAQ: Record<Lang, FaqItem[]> = {
  de: [
    {
      q: "Brauche ich Wind oder Wellen?",
      a: "Nein. Beim Pumpfoil kommt der Antrieb allein aus deiner Pumpbewegung. Ruhiges, flaches Wasser ist für den Einstieg sogar am besten.",
      structured: true,
    },
    {
      q: "Kann ich Pumpfoil ohne Vorerfahrung lernen?",
      a: "Ja, wenn du sicher schwimmen kannst und eine gewisse Grundfitness mitbringst. Erfahrung auf einem Board hilft beim Gleichgewicht, ist aber keine Bedingung.",
      structured: true,
    },
    {
      q: "Wie lange dauert es, bis ich fliege?",
      a: "Das ist sehr unterschiedlich und hängt von Erfahrung, Fitness, Material und Anleitung ab. Eine seriöse allgemeine Zahl gibt es dafür nicht.",
      structured: false,
    },
    {
      q: "Brauche ich einen Steg?",
      a: "Für den Einstieg ist ein Steg der übliche Weg. Starts vom Ufer oder aus tiefem Wasser sind möglich, aber anspruchsvoller. Nutze nur Stege, auf denen das erlaubt ist.",
      structured: true,
    },
    {
      q: "Ist Pumpfoil gefährlich?",
      a: "Das grösste Risiko ist das Foil selbst: harte Flügel mit scharfen Kanten unter dem Board. Genug Wassertiefe, Abstand zu anderen, Helm und Prallschutzweste senken das Risiko.",
      structured: true,
    },
    {
      q: "Kann ich bei dir Lektionen buchen?",
      a: "Noch nicht. Angebot, Ort, Start und Preis sind noch nicht festgelegt. Wenn du Interesse hast, schreib mir eine E-Mail.",
      structured: false,
    },
  ],
  en: [
    {
      q: "Do I need wind or waves?",
      a: "No. In pump foiling, the only propulsion is your own pumping. Calm, flat water is actually the best place to start.",
      structured: true,
    },
    {
      q: "Can I learn to pump foil without any experience?",
      a: "Yes, as long as you are a confident swimmer and reasonably fit. Experience on any kind of board helps with balance, but it is not a requirement.",
      structured: true,
    },
    {
      q: "How long does it take before I fly?",
      a: "It varies a lot and depends on experience, fitness, equipment and coaching. There is no honest general figure for it.",
      structured: false,
    },
    {
      q: "Do I need a dock?",
      a: "A dock is the usual way to start. Starting from the shore or from deep water is possible but harder. Only use docks where this is allowed.",
      structured: true,
    },
    {
      q: "Is pump foiling dangerous?",
      a: "The biggest risk is the foil itself: hard wings with sharp edges under the board. Enough water depth, distance from others, a helmet and an impact vest reduce the risk.",
      structured: true,
    },
    {
      q: "Can I book lessons with you?",
      a: "Not yet. The offer, location, start date and price have not been decided. If you are interested, send me an email.",
      structured: false,
    },
  ],
};

/**
 * Was zu den geplanten Lektionen heute feststeht — naemlich nichts davon.
 * Die Reihenfolge ist die der offenen Fakten im Auftrag vom 02.10.2026.
 */
export const LESSON_STATUS: Record<Lang, { label: string; value: string }[]> = {
  de: [
    { label: "Angebot", value: "in Planung, noch nicht festgelegt" },
    { label: "Ort", value: "noch offen" },
    { label: "Start", value: "noch offen" },
    { label: "Preis", value: "noch offen" },
    { label: "Versicherung", value: "wird vor dem Start geklärt" },
    { label: "Buchung", value: "noch nicht möglich" },
  ],
  en: [
    { label: "Offer", value: "being planned, not yet decided" },
    { label: "Location", value: "not decided" },
    { label: "Start", value: "not decided" },
    { label: "Price", value: "not decided" },
    { label: "Insurance", value: "to be settled before any start" },
    { label: "Booking", value: "not possible yet" },
  ],
};

const LESSON_MAIL: Record<Lang, { subject: string; body: string }> = {
  de: {
    subject: "Interesse an Pumpfoil-Lektionen",
    body: [
      "Hallo Devin",
      "",
      "ich interessiere mich für Pumpfoil-Lektionen bei dir.",
      "",
      "Region, in der ich lernen möchte: ",
      "Meine Erfahrung auf dem Wasser: ",
      "Wann ich grundsätzlich Zeit hätte: ",
      "",
      "Gruss",
    ].join("\n"),
  },
  en: {
    subject: "Interest in pump foil lessons",
    body: [
      "Hi Devin,",
      "",
      "I'm interested in pump foil lessons with you.",
      "",
      "Region where I'd like to learn: ",
      "My experience on the water: ",
      "When I would generally be available: ",
      "",
      "Best regards",
    ].join("\n"),
  },
};

/**
 * mailto-Link mit vorausgefuelltem Betreff und drei Leitfragen. Es wird nichts
 * uebertragen, bevor die Person selbst in ihrem Mailprogramm auf Senden
 * drueckt — kein Formular, keine Buchung, keine Datenerfassung auf der Seite.
 */
export function lessonMailto(email: string, lang: Lang): string {
  const mail = LESSON_MAIL[lang];
  return `mailto:${email}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;
}
