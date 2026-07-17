import Image from "next/image";

const RESULTS = [
  {
    year: "20XX",
    event: "Platzhalter-Wettkampf 1",
    placement: "Platz [X] von [Y]",
  },
  {
    year: "20XX",
    event: "Platzhalter-Wettkampf 2",
    placement: "Platz [X] von [Y]",
  },
  {
    year: "20XX",
    event: "Platzhalter-Wettkampf 3",
    placement: "Platz [X] von [Y]",
  },
  {
    year: "20XX",
    event: "Platzhalter-Wettkampf 4",
    placement: "Platz [X] von [Y]",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="section-pad bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1.2fr,1fr] md:items-start md:gap-16 lg:gap-24">
        <div>
          <p className="eyebrow mb-5">Sportliche Highlights</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            RESULTATE
          </h2>
          <p className="mt-5 max-w-md text-sm italic leading-relaxed text-graphite">
            Platzhalter: Die verifizierte Resultat-Datenbank wird aus Kapitel
            6 der Wissensdatenbank übernommen, sobald sie dort geprüft und
            freigegeben ist.
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
                <span className="flex-1 px-0 text-ink sm:px-8">
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
            <p className="mt-3 italic leading-relaxed text-graphite">
              Platzhalter: nächste Regatten/Meisterschaften folgen, sobald
              Saisonkalender bestätigt ist.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/highlights-iqfoil-cadiz.jpg"
            alt="Devin Hauser bei den IQFoil International Games in Cádiz"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-[28%_48%]"
          />
        </div>
      </div>
    </section>
  );
}
