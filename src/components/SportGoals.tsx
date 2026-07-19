import Image from "next/image";

export default function SportGoals() {
  return (
    <section id="sport-ziele" className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Disciplines</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          DISCIPLINES
        </h2>

        {/* IQFoil — Bild links, Text rechts. Bild zuerst im DOM, damit es auf
            Mobile immer als Erstes erscheint. Abstand zur Überschrift bewusst
            kompakter als der Abstand zwischen den beiden Disziplin-Reihen. */}
        <div className="mt-10 grid items-center gap-10 sm:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:col-span-7">
            <Image
              src="/images/iqfoil-action.jpg"
              alt="Devin Hauser beim IQFoil-Racing"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              IQFoil
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              Olympic windsurfing at its most demanding — pure technique,
              power and precision on the water. Every start is a fight
              against wind, board and the clock.
            </p>
          </div>
        </div>

        {/* Wingfoil Racing — gespiegelt: Bild bleibt im DOM zuerst (Mobile),
            wird auf Desktop per order- Klassen nach rechts verschoben. */}
        <div className="mt-24 grid items-center gap-10 sm:mt-32 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:order-2 md:col-span-7">
            <Image
              src="/images/wingfoil-action-cremia.jpg"
              alt="Devin Hauser beim Wingfoil Racing in Cremia"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-[42%_50%]"
            />
          </div>
          <div className="md:order-1 md:col-span-5">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              Wingfoil Racing
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              Wing, board and foil moving as one — fast, technical and
              still evolving. This is where I test myself against the
              best in the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
