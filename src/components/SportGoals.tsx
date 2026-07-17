import Image from "next/image";

const DISCIPLINES = [
  {
    name: "IQFoil",
    image: "/images/iqfoil-action.jpg",
    alt: "Devin Hauser beim IQFoil-Racing",
    objectPosition: "object-center",
    description:
      "Platzhalter: kurze, laienverständliche Erklärung der olympischen Windsurf-Foil-Klasse IQFoil — was sie technisch besonders macht und warum sie olympisch ist.",
  },
  {
    name: "Wingfoil Racing",
    image: "/images/wingfoil-action-cremia.jpg",
    alt: "Devin Hauser beim Wingfoil Racing in Cremia",
    objectPosition: "object-[42%_50%]",
    description:
      "Platzhalter: kurze, laienverständliche Erklärung von Wingfoil Racing — Unterschied zu IQFoil, was den Reiz dieser Disziplin ausmacht.",
  },
];

const GOALS = [
  {
    timeframe: "Saison 2026",
    text: "Platzhalter: konkrete Ziele für die laufende Saison, sobald aus der Wissensdatenbank bestätigt.",
  },
  {
    timeframe: "2027",
    text: "Platzhalter: mittelfristige Ziele.",
  },
  {
    timeframe: "Langfristig",
    text: "Platzhalter: Olympia LA 2028 und darüber hinaus.",
  },
];

export default function SportGoals() {
  return (
    <section id="sport-ziele" className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Sport &amp; Ziele</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          DISZIPLINEN UND ZIELE
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {DISCIPLINES.map((discipline) => (
            <div key={discipline.name} className="card-surface overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={discipline.image}
                  alt={discipline.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`object-cover ${discipline.objectPosition}`}
                />
              </div>
              <div className="p-9">
                <h3 className="font-display text-2xl tracking-wide text-ink">
                  {discipline.name}
                </h3>
                <p className="mt-4 italic leading-relaxed text-graphite">
                  {discipline.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-hairline pt-12">
          <h3 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            Ziele
          </h3>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {GOALS.map((goal) => (
              <div key={goal.timeframe}>
                <p className="font-display text-lg tracking-wide text-ink">
                  {goal.timeframe}
                </p>
                <p className="mt-2 italic leading-relaxed text-graphite">
                  {goal.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
