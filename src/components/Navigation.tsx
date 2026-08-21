import NavigationBar from "@/components/NavigationBar";
import { localizedPath, navLinks, type Lang } from "@/lib/i18n";

/**
 * Navigation — Serverteil.
 *
 * Baut die Linkliste fuer die aktive Sprache und reicht sie an die interaktive
 * Kopfzeile weiter. Die Trennung ist bewusst: Das Menue braucht Zustand
 * (offen/zu), Fokusverwaltung und `usePathname` fuer den Sprachumschalter —
 * alles Client-Sachen. Die Linkliste dagegen ist reine Ableitung aus der
 * Sprache und gehoert auf den Server.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM „GALERIE" JETZT IMMER IN DER NAVIGATION STEHT
 * ─────────────────────────────────────────────────────────────────────────────
 * Vorher erschien der Eintrag erst, sobald das erste freigegebene Album
 * existierte — an dieselbe Bedingung geknuepft wie die Indexierung. Die Vorgabe
 * vom 21.08.2026 verlangt Galerie als festen Navigationspunkt, getrennt von
 * Social Media. Der Eintrag steht deshalb dauerhaft; die Galerieseite hat einen
 * ehrlichen, uebersetzten Leerzustand („Die ersten Alben entstehen gerade").
 *
 * Die INDEXIERUNG bleibt an der alten Bedingung: Solange kein Album existiert,
 * ist /media auf `noindex` und nicht in der Sitemap. Sichtbar in der Navigation
 * und sichtbar im Google-Index sind zwei verschiedene Fragen — eine leere Seite
 * darf verlinkt sein, aber sie gehoert nicht in den Index.
 */
export default function Navigation({ lang }: { lang: Lang }) {
  return (
    <NavigationBar
      lang={lang}
      links={navLinks(lang, localizedPath("/media", lang))}
      homeHref={localizedPath("/", lang)}
    />
  );
}
