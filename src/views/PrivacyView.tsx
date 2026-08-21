import PrivacyDe from "@/views/legal/PrivacyDe";
import PrivacyEn from "@/views/legal/PrivacyEn";
import type { Lang } from "@/lib/i18n";

/**
 * Datenschutzerklärung — eine Sprachweiche, zwei vollständige Fassungen.
 *
 * WARUM ZWEI DATEIEN UND KEIN COPY-OBJEKT: Alle übrigen Seiten dieser Site
 * halten ihre Texte in einem `Record<Lang, …>` beieinander, weil es dort um
 * Beschriftungen geht — kurze, austauschbare Wortpaare. Eine
 * Datenschutzerklärung ist kein Etikett, sondern Fliesstext: ganze Absätze,
 * deren Sätze aufeinander aufbauen und deren Aufbau sich zwischen den
 * Sprachen nicht eins zu eins deckt.
 *
 * Beide Sprachen in einer Komponente zu verschränken hiesse, jede spätere
 * juristische Korrektur an zwei ineinander verwobenen Stellen derselben Datei
 * vorzunehmen. Genau dort entsteht der Fehler, der hier am teuersten ist: eine
 * halb aktualisierte Rechtsseite, auf der die eine Sprache etwas anderes
 * verspricht als die andere. Getrennte Dateien machen die Änderung sichtbar
 * unvollständig, solange sie nur in einer Sprache erfolgt ist — und eine
 * sichtbar offene Aufgabe ist besser als eine unsichtbar falsche Aussage.
 *
 * Die Abschnittsmarker im JSX sind in beiden Fassungen identisch (englisch
 * nummeriert), damit sich die Dateien Abschnitt für Abschnitt nebeneinander
 * vergleichen lassen.
 */
export default function PrivacyView({ lang }: { lang: Lang }) {
  return lang === "de" ? <PrivacyDe /> : <PrivacyEn />;
}
