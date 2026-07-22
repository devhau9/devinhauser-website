import Image from "next/image";

// Resultate aus content/de/04-resultate.md übernommen ("bereits bekannt aus
// früheren Unterlagen") — [PRÜFEN]: beide Resultate laut Notiz vor
// öffentlicher Verwendung nochmals von Devin bestätigen lassen, bevor die
// Seite live geht. Keine weiteren Resultate erfunden oder ergänzt.
const RESULTS = [
  {
    year: "2025",
    event: "IQFoil International Games, Cádiz (U19)",
    placement: "16. von 45",
  },
  {
    year: "2023",
    event: "Campione (U17)",
    placement: "8. von 42",
  },
];

// Bestätigte kommende Wettkämpfe aus content/de/04-resultate.md (kein
// [PRÜFEN] in der Quelle — im Gegensatz zu den Resultaten oben als
// gesichert markiert).
const UPCOMING_EVENTS = [
  {
    name: "IQFoil Senior World Championship",
    location: "Weymouth, England",
    when: "Anfang September 2026",
  },
  {
    name: "IQFoil U23 World Championship",
    location: "Puck, Polen",
    when: "Ende September 2026",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="section-pad bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1.2fr,1fr] md:items-start md:gap-16 lg:gap-24">
        <div className="min-w-0">
          <p className="eyebrow mb-5">Sportliche Highlights</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            RESULTATE
          </h2>
          <p className="mt-5 max-w-md text-sm italic leading-relaxed text-graphite">
            Weitere internationale Resultate werden hier laufend ergänzt.
          </p>

          {/* Racing-Timing-Ästhetik: Ergebnisse in Mono-Schrift wie auf einer
              Regatta-Anzeigetafel, jetzt auf hellem Grund mit hauchfeinen
              Trennlinien statt schwerer dunkler Fläche. */}
          <div className="mt-12 divide-y divide-hairline border-y border-hairline">
            {RESULTS.map((result) => (
              <div
                key={result.event}
                className="flex flex-col gap-2 py-6 font-mono text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-graphite/70">{result.year}</span>
                <span className="min-w-0 flex-1 px-0 text-ink sm:px-8">
                  {result.event}
                </span>
                <span className="text-red">{result.placement}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Nächste Wettkämpfe
            </h3>
            <ul className="mt-3 space-y-1.5 leading-relaxed text-graphite">
              {UPCOMING_EVENTS.map((event) => (
                <li key={event.name}>
                  {event.name} — {event.location} ({event.when})
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/highlights-iqfoil-cadiz.jpg"
            alt="Devin Hauser bei den IQFoil International Games in Cádiz"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-[28%_48%]"
          />
        </div>
      </div>
    </section>
  );
}
