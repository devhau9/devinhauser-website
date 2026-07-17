import Image from "next/image";

const FACTS = [
  { label: "Geburtsdatum", value: "16.11.2007" },
  { label: "Geburtsort", value: "Buchs ZH, Schweiz" },
  {
    label: "Trainingsbasis",
    value: "Silvaplana (Sommer) & internationale Trainingslager (u. a. Gardasee, Comersee)",
  },
  { label: "Segelnummer", value: "SUI-134" },
];

export default function About() {
  return (
    <section id="ueber-mich" className="section-pad border-b border-hairline bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:items-start md:gap-16 lg:gap-24">
        <div>
          <p className="eyebrow mb-5">Über mich</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            WER ICH BIN
          </h2>

          <p className="mt-8 max-w-md text-balance italic leading-relaxed text-graphite">
            Platzhalter: Hier steht bald Devins persönliche Geschichte —
            wie alles mit dem Windsurfen 2014 begann, wie daraus die
            Leidenschaft für IQFoil und Wingfoil Racing wurde, und was ihn
            antreibt. Dieser Text wird aus Kapitel 2 der Wissensdatenbank
            übernommen, sobald er dort ausgearbeitet ist.
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-hairline pt-10 sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/about-portrait.jpg"
            alt="Porträt von Devin Hauser"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
