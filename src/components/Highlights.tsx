import { SECTION_ID, type Lang } from "@/lib/i18n";

// Kompakte Ergebnis-Sektion für die Personal-Brand-Startseite: KEINE
// vollständige Resultat-Datenbank. Ziel ist der 10–15-Sekunden-Eindruck
// (internationale Erfahrung, mehrere WM/EM, starke Einzelresultate, nationale
// Podestplätze). Die vollständige Historie bleibt intern in der
// Resultate-Masterliste / Obsidian.
//
// Die 4 Kennzahlen sind exakt aus 02 Sport & Resultate/Resultate Masterliste.md
// berechnet (Herleitung im Chat dokumentiert):
//   5  WM-Teilnahmen = 3 IQFoil (Silvaplana 22, Brest 25, Portimão 25)
//                      + 2 Wingfoil (2020, 2021). World Cups NICHT gezählt.
//   7  EM-Teilnahmen = 6 IQFoil (Brest 22, Torbole 23, Embrun, Sardinia 25,
//                      Sfera Cavallo 25, Portimão 26) + 1 Wingfoil (2024).
//   6+ Nationale Podestplätze = 6 klare Top-3 an SWS-Events (Cremia 23,
//                      Urnersee 24, Walensee 24, St. Prex 24 Overall,
//                      St. Prex 24 U19, Cremia 25) + 2. im U19-Jahresranking 24.
//   2  WM-Top-5 = nur die beiden Wingfoil-WMs (2020 5., 2021 5.).
// Bewusst KEINE "Internationale Podestplätze"-Karte (Wert wäre 0).
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
    stats: { value: string; label: string }[];
    selectedHeading: string;
    results: SelectedResult[];
    note: string;
  }
> = {
  de: {
    eyebrow: "Ergebnisse",
    intro: "SEIT 2020 INTERNATIONAL IM EINSATZ",
    stats: [
      { value: "5", label: "WM-Teilnahmen" },
      { value: "7", label: "EM-Teilnahmen" },
      { value: "6+", label: "Nationale Podestplätze" },
      { value: "2", label: "WM-Platzierungen in den Top 5" },
    ],
    selectedHeading: "Ausgewählte Resultate",
    results: [
      { placement: "5.", event: "IQFoil International Games", context: "Silvaplana 2025 · Elite" },
      { placement: "5.", event: "Wingfoil-Weltmeisterschaft", context: "2020 · Herren" },
      { placement: "5.", event: "Wingfoil-Weltmeisterschaft", context: "2021 · U16" },
      { placement: "8.", event: "IQFoil International Games", context: "Campione 2023 · U17" },
      { placement: "16.", suffix: "von 45", event: "IQFoil International Games", context: "Cádiz 2025 · U19" },
      { placement: "2.", suffix: "Gesamt", event: "Swiss Windsurfing", context: "St. Prex 2024" },
      { placement: "6.", event: "Wingfoil-Europameisterschaft", context: "2024 · U19" },
    ],
    note: "Eine Auswahl — die vollständige Wettkampfhistorie wird intern geführt.",
  },
  en: {
    eyebrow: "Results",
    intro: "COMPETING INTERNATIONALLY SINCE 2020",
    stats: [
      { value: "5", label: "World Championship Starts" },
      { value: "7", label: "European Championship Starts" },
      { value: "6+", label: "National Podium Finishes" },
      { value: "2", label: "World Championship Top-5 Finishes" },
    ],
    selectedHeading: "Selected Results",
    results: [
      { placement: "5th", event: "IQFoil International Games", context: "Silvaplana 2025 · Senior" },
      { placement: "5th", event: "Wingfoil World Championship", context: "2020 · Men" },
      { placement: "5th", event: "Wingfoil World Championship", context: "2021 · U16" },
      { placement: "8th", event: "IQFoil International Games", context: "Campione 2023 · U17" },
      { placement: "16th", suffix: "of 45", event: "IQFoil International Games", context: "Cádiz 2025 · U19" },
      { placement: "2nd", suffix: "Overall", event: "Swiss Windsurfing", context: "St. Prex 2024" },
      { placement: "6th", event: "Wingfoil European Championship", context: "2024 · U19" },
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

        {/* Vier grosse Kennzahl-Karten — der schnelle Eindruck. */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {c.stats.map((stat) => (
            <div key={stat.label} className="card-surface p-6 sm:p-8">
              <p className="font-display text-5xl leading-none tracking-wide text-red sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-widest2 text-graphite/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

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
                    {r.suffix ? (
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest2 text-graphite/60">
                        {r.suffix}
                      </span>
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-body text-base text-ink">
                      {r.event}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs uppercase tracking-widest2 text-graphite/60">
                      {r.context}
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
