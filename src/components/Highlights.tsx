import { SECTION_ID, type Lang } from "@/lib/i18n";
import { brandText } from "@/components/BrandText";

// Kompakte Ergebnis-Sektion für die Personal-Brand-Startseite: KEINE
// vollständige Resultat-Datenbank. Ziel ist der 10–15-Sekunden-Eindruck
// (internationale Erfahrung, mehrere WM/EM, starke Einzelresultate, nationale
// Podestplätze). Die vollständige Historie bleibt intern in der
// Resultate-Masterliste / Obsidian.
//
// ─────────────────────────────────────────────────────────────────────────────
// FAKTENKORREKTUR 22.08.2026 — GEGEN DEN KANONISCHEN FACT FREEZE
// ─────────────────────────────────────────────────────────────────────────────
// Massgeblich ist "10 Public Website Fact Freeze.md" im REVIEW-Ordner, nicht
// eine Herleitung im Code. Regel dieses Gates: Eine Zahl gilt NICHT als
// belegt, weil sie sich aus einer Liste zusammenzaehlen laesst.
//
// ENTFERNT — Resultatzeilen:
//   Wingfoil-WM 2020, 5.        2020 fand keine Wingfoil-WM statt.
//   Wingfoil-WM 2021 U16, 5.    war eine EM, ohne veroeffentlichte Platzierung.
//   Wingfoil-EM 2024 U19, 6.    Ort und Teilnehmerzahl in der Masterliste
//                               als "ZU PRUEFEN" gefuehrt, kein Haekchen in
//                               der Verifikationstabelle. Gleiche Gruppe wie
//                               die beiden Zeilen darueber.
//
// ENTFERNT — der komplette Kennzahlenblock:
//   "5 WM-Teilnahmen" · "2 WM-Top-5" · "7 EM-Teilnahmen"
//   · "6+ Nationale Podestplaetze"
//   Alle vier sind Zusammenzaehlungen. Der Vault haelt ausdruecklich fest,
//   dass die aggregierten Zahlen der Website "nirgends hergeleitet" sind.
//   Es wurde KEIN Ersatzwert eingesetzt — auch nicht die rechnerisch
//   naheliegenden 3 oder 6. Lieber keine Zahl als eine ungepruefte.
//
// KORRIGIERT:
//   Silvaplana 2025   Feldgroesse "von 13" ergaenzt; DE-Kategorie von
//                     "Elite" auf "Senior" angeglichen (EN sagte bereits
//                     Senior, die Verifikation fuehrt "Senior").
//   Campione 2023     Feldgroesse "von 42" ergaenzt.
//   St. Prex 2024     ERSETZT. Verifiziert ist nicht ein Einzelevent in
//                     St. Prex, sondern das Swiss-Windsurfing-JAHRESRANKING
//                     2024: 2. von 12 im U19 und 4. von 39 gesamt. Die alte
//                     Zeile vermischte beides und nannte den 2. Rang
//                     faelschlich "Gesamt".
//
// NICHT ERGAENZT: Die vier weiteren verifizierten Resultate (Brest 37/149,
// Torbole 18/73, Arzachena 32/100, Portimao 69/95). Ob die Liste auf alle
// acht waechst, ist Devins Entscheidung A2 aus "11 Devin Quick Decisions.md"
// — nicht die des Codes.
//
// ─────────────────────────────────────────────────────────────────────────────
// ERGAENZUNG 02.09.2026 — SCHWEIZERMEISTERSCHAFT SILVAPLANA 2026
// ─────────────────────────────────────────────────────────────────────────────
// Zwei Zeilen neu, beide direkt in der offiziellen Ergebnisquelle geprueft
// (manage2sail, Event 2d6d3d67-4c05-4f02-8f42-e6786f26ba34, "SM / SC Windsurf
// 2026", Endstand veroeffentlicht 01.09.2026 18:03):
//   Wertung "iQFOiL"   27 Gemeldete, SUI 134 auf Rang 2
//   Wertung "Overall"  45 Gemeldete, SUI 134 auf Rang 3
// Swiss Sailing bestaetigt in der Verbandsmeldung "Devin Hauser (SUI 134)" auf
// Rang 3 der Overall-Wertung. Kein bestehendes Resultat wurde entfernt.
//
// KEIN TITEL: "Vize-Schweizermeister" steht hier bewusst NICHT. Swiss Sailing
// nennt als Schweizermeister Loic Huguenin (SUI 91) und als Zweiten Justas
// Katkus (SUI 60); Devin ist Dritter. Die manage2sail-Wertung "iQFOiL" ist
// zudem eine GEMISCHTE Materialwertung — Inversin, Liebig, Favre, Grosso und
// Coldebella stehen darin — und damit nicht die Titelwertung "iQFOiL Herren".
// Rang 2 ist also ein belegter Rang, aber kein belegter Titel.
//
// ÜBERSETZUNG: Es wurde ausschliesslich die Beschriftung übersetzt. Zahlen,
// Platzierungen, Orte, Jahre und Kategorien sind unverändert aus der
// Masterliste übernommen — es kommt kein einziges neues oder gerundetes
// Resultat hinzu.

type SelectedResult = {
  placement: string;
  suffix?: string;
  event: string;
  context: string;
};

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    intro: string;
    selectedHeading: string;
    results: SelectedResult[];
    note: string;
  }
> = {
  de: {
    eyebrow: "Ergebnisse",
    intro: "SEIT MEHREREN JAHREN FAHRE ICH INTERNATIONALE REGATTEN",
    selectedHeading: "Ausgewählte Resultate",
    results: [
      { placement: "2.", suffix: "von 27", event: "Schweizermeisterschaft Silvaplana 2026", context: "iQFOiL" },
      { placement: "3.", suffix: "von 45", event: "Schweizermeisterschaft Silvaplana 2026", context: "Overall" },
      { placement: "5.", suffix: "von 13", event: "iQFOiL International Games", context: "Silvaplana 2025 · Senior" },
      { placement: "8.", suffix: "von 42", event: "iQFOiL International Games", context: "Campione 2023 · U17" },
      { placement: "16.", suffix: "von 45", event: "iQFOiL International Games", context: "Cádiz 2025 · U19" },
      { placement: "2.", suffix: "von 12", event: "Swiss Windsurfing Jahresranking", context: "2024 · U19" },
      { placement: "4.", suffix: "von 39", event: "Swiss Windsurfing Jahresranking", context: "2024 · Gesamt" },
    ],
    note: "Eine Auswahl — die vollständige Wettkampfhistorie wird intern geführt.",
  },
  en: {
    eyebrow: "Results",
    intro: "I HAVE BEEN COMPETING INTERNATIONALLY FOR SEVERAL YEARS",
    selectedHeading: "Selected Results",
    results: [
      { placement: "2nd", suffix: "of 27", event: "Swiss Championship Silvaplana 2026", context: "iQFOiL" },
      { placement: "3rd", suffix: "of 45", event: "Swiss Championship Silvaplana 2026", context: "Overall" },
      { placement: "5th", suffix: "of 13", event: "iQFOiL International Games", context: "Silvaplana 2025 · Senior" },
      { placement: "8th", suffix: "of 42", event: "iQFOiL International Games", context: "Campione 2023 · U17" },
      { placement: "16th", suffix: "of 45", event: "iQFOiL International Games", context: "Cádiz 2025 · U19" },
      { placement: "2nd", suffix: "of 12", event: "Swiss Windsurfing annual ranking", context: "2024 · U19" },
      { placement: "4th", suffix: "of 39", event: "Swiss Windsurfing annual ranking", context: "2024 · Overall" },
    ],
    note: "A selection — the full competition history is kept internally.",
  },
};

export default function Highlights({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section id={SECTION_ID.results} className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
          {c.intro}
        </h2>

        {/* Ausgewählte starke Resultate.
            10.08.2026 — BILD ENTFERNT, RECHTEGRUND:
            Hier stand /images/highlights-iqfoil-cadiz.jpg. Die EXIF-Daten der
            Datei weisen sie eindeutig als Fremdmaterial aus:
              Artist    = "SAILING ENERGY"
              Copyright = "© Sailing Energy / iQFOiL ..."
            Im Vault ist SailingEnergy-Material durchgehend und ausdrücklich als
            NICHT freigegeben geführt („Gruppe A"). Ein öffentlich
            ausgeliefertes Bild mit fremdem Copyright-Vermerk ist ein reales
            Rechterisiko, kein theoretisches — deshalb entfernt statt nur
            markiert. Die Sektion läuft jetzt einspaltig, was ihr nicht
            schadet: die Resultatliste ist der Inhalt. */}
        <div className="mt-16">
          <div className="min-w-0">
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.selectedHeading}
            </h3>
            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              {c.results.map((r) => (
                <div
                  key={`${r.placement}-${r.event}-${r.context}`}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="w-20 shrink-0 sm:w-24">
                    <span className="font-display text-2xl tracking-wide text-red sm:text-3xl">
                      {r.placement}
                    </span>
                    {/* 22.08.2026: vorher `text-[10px]`. Der Zusatz trägt eine
                        Information — „16." allein sagt nichts, „16. von 45"
                        sagt alles — und muss deshalb auch auf dem Telefon
                        lesbar sein. Jetzt 12px, dieselbe Grösse wie die
                        Ereigniszeile rechts. Die Rangfolge bleibt: Die
                        Platzierung darüber steht in 24px Display-Schrift
                        (sm:30px), der Zusatz gedämpft in Mono. */}
                    {r.suffix ? (
                      <span className="mt-0.5 block font-mono text-xs uppercase tracking-widest2 text-graphite/60">
                        {r.suffix}
                      </span>
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-body text-base text-ink">
                      {r.event}
                    </span>
                    {/* `brandText`: Die Kontextzeile steht per CSS in
                        Versalien. Aus „iQFOiL" wuerde dabei „IQFOIL" — die
                        Schreibweise der Klasse ist aber verbindlich, deshalb
                        wird nur dieser eine Token davon ausgenommen. */}
                    <span className="mt-0.5 block font-mono text-xs uppercase tracking-widest2 text-graphite/60">
                      {brandText(r.context)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic leading-relaxed text-graphite">
              {c.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
