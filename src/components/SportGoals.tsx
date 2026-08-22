import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

/**
 * Disziplinen — IQFoil zuerst, Wingfoil Racing danach.
 *
 * Die Reihenfolge ist eine Positionierungsentscheidung, keine Gestaltungsfrage:
 * IQFoil ist die Hauptdisziplin und die olympische Klasse. Sie steht deshalb in
 * dieser Sektion, in der Navigation, im Hero-Untertitel und in allen Texten vor
 * Wingfoil.
 *
 * Das Wingfoil-Bild ist die weboptimierte 344-KB-Fassung von
 * „wingfoil cremia IT.jpg"; das ~50-MB-Original bleibt unverändert und ist per
 * .gitignore ausgeschlossen. `object-center`: Das feste 4:3-Fenster beschneidet
 * das 3:2-Foto nur minimal horizontal, Athlet und Wing bleiben auf Desktop und
 * Mobile vollständig sichtbar.
 */

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    iqfoil: { title: string; text: string; alt: string };
    wingfoil: { title: string; text: string; alt: string };
  }
> = {
  de: {
    eyebrow: "Disziplinen",
    heading: "DISZIPLINEN",
    iqfoil: {
      title: "IQFoil Racing",
      text: "IQFoil ist meine Hauptdisziplin und die olympische Windsurf-Klasse. Ich starte international in der Elite-Kategorie. Es geht um Speed, Taktik und Kondition.",
      alt: "Devin Hauser beim IQFoil-Racing",
    },
    wingfoil: {
      title: "Wingfoil Racing",
      text: "Wingfoil fahre ich seit Jahren. Es ist eine zweite Art zu racen und hält mich auf dem Foil in Übung. Neben IQFoil starte ich damit international.",
      alt: "Devin Hauser beim Wingfoil Racing mit dem ENSIS-Wing in Cremia",
    },
  },
  en: {
    eyebrow: "Disciplines",
    heading: "DISCIPLINES",
    iqfoil: {
      title: "IQFoil Racing",
      text: "IQFoil is my main competitive discipline and the Olympic windsurfing class. I compete internationally in the senior fleet. It comes down to speed, tactics and fitness.",
      alt: "Devin Hauser racing IQFoil",
    },
    wingfoil: {
      title: "Wingfoil Racing",
      text: "I've been wingfoiling for years. It is a second way to race and keeps me sharp on the foil. Alongside IQFoil I compete in it internationally.",
      alt: "Devin Hauser wingfoil racing with the ENSIS wing in Cremia",
    },
  },
};

export default function SportGoals({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section id={SECTION_ID.disciplines} className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>

        {/* IQFoil — Bild links, Text rechts. */}
        <div className="mt-10 grid items-center gap-10 sm:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:col-span-7">
            <Image
              src="/images/iqfoil-action.jpg"
              alt={c.iqfoil.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0 md:col-span-5">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              {c.iqfoil.title}
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              {c.iqfoil.text}
            </p>
          </div>
        </div>

        {/* Wingfoil Racing — gespiegelt (Bild rechts auf Desktop). */}
        <div className="mt-24 grid items-center gap-10 sm:mt-32 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:order-2 md:col-span-7">
            <Image
              src="/images/wingfoil-cremia-ensis.jpg"
              alt={c.wingfoil.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0 md:order-1 md:col-span-5">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              {c.wingfoil.title}
            </h3>
            <p className="mt-5 max-w-sm leading-relaxed text-graphite">
              {c.wingfoil.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
