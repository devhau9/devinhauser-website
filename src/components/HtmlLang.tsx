"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * Stellt sicher, dass `<html lang>` die tatsaechliche Sprache nennt.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WOFUER DAS NOETIG IST — UND WOFUER NICHT
 * ─────────────────────────────────────────────────────────────────────────────
 * Auf allen normalen Seiten setzt bereits das Root-Layout `<html lang>`; dort
 * ist diese Komponente ein Nulldurchgang, der denselben Wert noch einmal
 * schreibt.
 *
 * Anders bei der Fehlerseite: Bei zwei Root-Layouts rendert Next.js eine
 * `not-found`-Seite in einer eigenen Fehlerhuelle (`<html id="__next_error__">`)
 * und verwirft dabei das `<html>`-Element der Seite — inklusive `lang`. Beim
 * Testlauf am 21.08.2026 hatte die 404-Seite dadurch als einzige Seite der Site
 * gar kein Sprachattribut. Ein Screenreader spricht eine solche Seite in der
 * zuletzt angenommenen Sprache vor: deutsche Saetze mit englischer Aussprache.
 *
 * Der Effekt laeuft NACH der Hydration und nicht waehrend des Renderns —
 * dadurch entsteht kein Hydration-Mismatch. Fuer Suchmaschinen aendert er
 * nichts (sie sehen das ausgelieferte HTML), was hier folgenlos ist: Die
 * Fehlerseite ist ohnehin `noindex`.
 */
export default function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
