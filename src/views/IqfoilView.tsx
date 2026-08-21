import IqfoilDe from "@/views/iqfoil/IqfoilDe";
import IqfoilEn from "@/views/iqfoil/IqfoilEn";
import type { Lang } from "@/lib/i18n";

/**
 * IQFoil-Pillar-Page — Sprachweiche.
 *
 * WARUM ZWEI DATEIEN UND KEIN WÖRTERBUCH: Alle übrigen Bausteine dieser Site
 * (Hero, About, Partners …) halten ihre Texte in einem `Record<Lang, …>` — das
 * ist dort richtig, weil es um kurze, parallele Beschriftungen geht, die sich
 * zeilenweise gegenüberstellen lassen.
 *
 * Diese Seite ist etwas anderes: rund 27 KB redaktioneller Fliesstext mit
 * Zwischentiteln, Erfahrungskästen, Quellenmarkern und einem FAQ-Block. Prosa,
 * keine Beschriftungen. Beide Sprachen in EINE Komponente zu verschränken
 * hiesse, jeden Absatz doppelt in dieselbe Datei zu legen — mit dem Ergebnis,
 * dass jede spätere Textänderung eine Datei anfasst, in der die andere Sprache
 * unmittelbar daneben steht. Genau dort entstehen die Fehler: ein Absatz wird
 * deutsch korrigiert, die englische Entsprechung bleibt stehen, und niemand
 * sieht es, weil die Datei ohnehin unübersichtlich ist.
 *
 * Getrennte Dateien machen den Zustand sichtbar: Ein Diff auf IqfoilDe.tsx ist
 * eine deutsche Textänderung, ein Diff auf IqfoilEn.tsx eine englische. Der
 * Preis ist, dass Strukturänderungen zweimal gemacht werden müssen — dieser
 * Preis wird bewusst bezahlt, weil Struktur sich selten ändert und Text oft.
 *
 * Die Metadaten-Bausteine (Titel, Beschreibung) exportieren die beiden
 * Sprachdateien selbst; die Route baut daraus `metadata` und das JSON-LD.
 */
export default function IqfoilView({ lang }: { lang: Lang }) {
  return lang === "de" ? <IqfoilDe /> : <IqfoilEn />;
}
