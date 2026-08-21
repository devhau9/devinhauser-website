import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Die Metadaten muessen HIER stehen, nicht in `not-found.tsx`.
 *
 * Next.js erzeugt Titel und Robots-Regeln aus der ROUTE, die bedient wird.
 * Bedient wird diese Auffangroute; `not-found.tsx` ist nur die Darstellung,
 * die danach greift. Ein `export const metadata` dort bleibt wirkungslos —
 * beim Testlauf am 21.08.2026 trug die Fehlerseite deshalb den allgemeinen
 * Seitentitel und war nicht auf `noindex` gesetzt.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Auffangroute fuer nicht vorhandene Adressen der englischen Fassung.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM ES DIESE DATEI BRAUCHT
 * ─────────────────────────────────────────────────────────────────────────────
 * Seit die Site zwei Root-Layouts hat (siehe src/lib/i18n.ts), kann Next.js bei
 * einer voellig unbekannten Adresse nicht entscheiden, WELCHES der beiden
 * Layouts die Fehlerseite umschliessen soll — und liefert deshalb seine
 * eingebaute, englische Standard-404-Seite aus: ohne Navigation, ohne
 * Fusszeile, ohne `lang`-Attribut und ohne eine einzige Moeglichkeit
 * weiterzuklicken. Genau das war beim ersten Testlauf am 21.08.2026 der Fall.
 *
 * Diese Auffangroute nimmt jede sonst unbekannte Adresse entgegen, rendert also
 * INNERHALB des Sprachlayouts, und ruft dann `notFound()` auf. Damit greift
 * `not-found.tsx` derselben Gruppe: die uebersetzte Fehlerseite mit Kopfzeile,
 * Fusszeile und fuenf sinnvollen Zielen — und weiterhin mit HTTP-Status 404,
 * nicht 200. Eine Fehlerseite mit Status 200 waere eine „Soft 404" und der
 * schlechtestmoegliche Ausgang: Suchmaschinen wuerden die Seite indexieren.
 *
 * Reihenfolge der Aufloesung: Statische Segmente gehen Catch-all-Segmenten vor,
 * deshalb faengt diese Datei ausschliesslich das ab, wofuer es keine echte
 * Route gibt.
 */
export default function CatchAll() {
  notFound();
}
