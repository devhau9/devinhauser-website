import PumpfoilDe from "@/views/pumpfoil/PumpfoilDe";
import PumpfoilEn from "@/views/pumpfoil/PumpfoilEn";
import type { Lang } from "@/lib/i18n";

/**
 * Pumpfoil-Lernseite — Sprachweiche.
 *
 * Gleiches Muster wie IqfoilView (siehe dort, warum zwei Sprachdateien statt
 * eines Woerterbuchs): redaktioneller Fliesstext, je Sprache eine Datei. Die
 * gemeinsamen Daten — Pfad, Datum, Metadaten, FAQ, Lektionsstand — liegen in
 * src/lib/pumpfoil.ts und werden von beiden Dateien gelesen.
 */
export default function PumpfoilView({ lang }: { lang: Lang }) {
  return lang === "de" ? <PumpfoilDe /> : <PumpfoilEn />;
}
