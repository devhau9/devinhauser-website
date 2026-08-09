// Kompakte Results-Section für die Personal-Brand-Homepage: KEINE vollständige
// Resultat-Datenbank. Ziel ist der 10–15-Sekunden-Eindruck (internationale
// Erfahrung, mehrere WM/EM, starke Einzelresultate, nationale Podestplätze).
// Die vollständige Historie bleibt intern in der Resultate-Masterliste /
// Obsidian.
//
// Die 4 Kennzahlen sind exakt aus 02 Sport & Resultate/Resultate Masterliste.md
// berechnet (Herleitung im Chat dokumentiert):
//   5  World Championship Starts = 3 IQFoil (Silvaplana 22, Brest 25, Portimão 25)
//                                  + 2 Wingfoil (2020, 2021). World Cups NICHT gezählt.
//   7  European Championship Starts = 6 IQFoil (Brest 22, Torbole 23, Embrun,
//                                  Sardinia 25, Sfera Cavallo 25, Portimão 26)
//                                  + 1 Wingfoil (2024). Zählt Teilnahmen/Starts.
//   6+ National Podium Finishes = 6 klare Top-3 an SWS-Events (Cremia 23, Urnersee 24,
//                                  Walensee 24, St. Prex 24 Overall, St. Prex 24 U19,
//                                  Cremia 25) + 2. im U19-Jahresranking 24 -> "6+".
//   2  World Championship Top-5 = nur die beiden Wingfoil-WMs (2020 5., 2021 5.).
// Bewusst KEINE "International Podiums"-Karte (Wert wäre 0).

const INTRO = "COMPETING INTERNATIONALLY SINCE 2020";

const STATS = [
  { value: "5", label: "World Championship Starts" },
  { value: "7", label: "European Championship Starts" },
  { value: "6+", label: "National Podium Finishes" },
  { value: "2", label: "World Championship Top-5 Finishes" },
];

type SelectedResult = {
  placement: string;
  suffix?: string;
  event: string;
  context: string;
};

// Handverlesene Auswahl (Reihenfolge von Devin vorgegeben). Nur gesicherte
// Resultate aus der Masterliste, keine erfundenen Zahlen.
const SELECTED_RESULTS: SelectedResult[] = [
  { placement: "5th", event: "IQFoil International Games", context: "Silvaplana 2025 · Senior" },
  { placement: "5th", event: "Wingfoil World Championship", context: "2020 · Men" },
  { placement: "5th", event: "Wingfoil World Championship", context: "2021 · U16" },
  { placement: "8th", event: "IQFoil International Games", context: "Campione 2023 · U17" },
  { placement: "16th", suffix: "of 45", event: "IQFoil International Games", context: "Cádiz 2025 · U19" },
  { placement: "2nd", suffix: "Overall", event: "Swiss Windsurfing", context: "St. Prex 2024" },
  { placement: "6th", event: "Wingfoil European Championship", context: "2024 · U19" },
];

export default function Highlights() {
  return (
    <section id="highlights" className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Results</p>
        <h2 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
          {INTRO}
        </h2>

        {/* Vier grosse Statistik-Karten — der schnelle Eindruck. */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat) => (
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
            Im Vault ist SailingEnergy-Material durchgehend und ausdruecklich als
            NICHT freigegeben gefuehrt ("Gruppe A"). Ein oeffentlich
            ausgeliefertes Bild mit fremdem Copyright-Vermerk ist ein reales
            Rechterisiko, kein theoretisches — deshalb entfernt statt nur
            markiert. Die Sektion laeuft jetzt einspaltig, was ihr nicht
            schadet: die Resultatliste ist der Inhalt.
            Wiederherstellen mit einem freigegebenen Bild ist eine
            Einzeiler-Aenderung — siehe Morning Review. */}
        <div className="mt-16">
          <div className="min-w-0">
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Selected Results
            </h3>
            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              {SELECTED_RESULTS.map((r) => (
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
              A selection — the full competition history is kept internally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
