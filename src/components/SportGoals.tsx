import Image from "next/image";

export default function SportGoals() {
  return (
    <section id="sport-ziele" className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Disciplines</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          DISCIPLINES
        </h2>

        {/* IQFoil — Bild links, Text rechts. Text: Rolle in Devins Karriere
            (Hauptdisziplin), nicht Wikipedia-Erklärung. Ich-Form, kein Jahr. */}
        <div className="mt-10 grid items-center gap-10 sm:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:col-span-7">
            <Image
              src="/images/iqfoil-action.jpg"
              alt="Devin Hauser racing IQFoil"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="md:col-span-5 min-w-0">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              IQFoil Racing
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              IQFoil is my main competitive discipline and the Olympic
              windsurfing class. I compete internationally in the senior fleet,
              combining speed, tactics and physical performance as I work
              towards the highest level of the sport.
            </p>
          </div>
        </div>

        {/* Wingfoil Racing — gespiegelt (Bild rechts auf Desktop). Neues,
            weboptimiertes ENSIS-Wing-Bild (aus "wingfoil cremia IT.jpg";
            Original ~50 MB bleibt unverändert und ist per .gitignore
            ausgeschlossen, ausgeliefert wird die 344-KB-Version). object-center:
            das feste 4:3-Fenster beschneidet das 3:2-Foto nur minimal
            horizontal, Athlet + Wing bleiben auf Desktop und Mobile voll
            sichtbar. */}
        <div className="mt-24 grid items-center gap-10 sm:mt-32 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:order-2 md:col-span-7">
            <Image
              src="/images/wingfoil-cremia-ensis.jpg"
              alt="Devin Hauser wingfoil racing with the ENSIS wing in Cremia"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="md:order-1 md:col-span-5 min-w-0">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              Wingfoil Racing
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              Wingfoil has been part of my journey for years and gives me a
              different way to race, progress and push myself on the foil.
              Alongside IQFoil, I compete internationally and continue developing
              as a complete foil athlete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
