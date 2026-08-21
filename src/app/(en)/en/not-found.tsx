import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import NotFoundView from "@/views/NotFoundView";

const LANG = "en" as const;

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Fehlerseite der englischen Fassung — mit eigenem Dokumentgeruest.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM HIER `RootShell` STEHT UND NICHT NUR DER INHALT
 * ─────────────────────────────────────────────────────────────────────────────
 * Bei zwei Root-Layouts umschliesst Next.js eine `not-found`-Seite auf
 * Gruppenebene NICHT mit dem Layout dieser Gruppe — es rendert sie in einer
 * eigenen Fehlerhuelle (`<html id="__next_error__">`). Beim Testlauf am
 * 21.08.2026 kam dabei eine Seite ohne `lang`-Attribut, ohne Navigation und
 * ohne Fusszeile heraus: eine Sackgasse, und fuer Screenreader eine Seite ohne
 * angegebene Sprache.
 *
 * Deshalb bringt diese Datei das Geruest selbst mit — dieselbe `RootShell`, die
 * auch die beiden Layouts verwenden. Es gibt weiterhin nur EINE Geruestdatei;
 * sie wird hier nur ein zweites Mal aufgerufen.
 *
 * Der HTTP-Status bleibt 404: Die Auffangroute `[...notfound]` ruft
 * `notFound()` auf, statt eine Seite mit Status 200 auszuliefern. Eine
 * Fehlerseite mit Status 200 waere eine „Soft 404" — Suchmaschinen wuerden sie
 * indexieren.
 */
export default function NotFound() {
  return (
    <RootShell lang={LANG}>
      <NotFoundView lang={LANG} />
    </RootShell>
  );
}
