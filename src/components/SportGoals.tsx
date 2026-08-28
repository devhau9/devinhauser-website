import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

/**
 * Disziplinen — iQFOiL zuerst, Wingfoil Racing danach.
 *
 * Die Reihenfolge ist eine Positionierungsentscheidung, keine Gestaltungsfrage:
 * iQFOiL ist die Hauptdisziplin und die olympische Klasse. Sie steht deshalb in
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
    iqfoil: { title: string; paragraphs: string[]; alt: string };
    wingfoil: { title: string; paragraphs: string[]; alt: string };
  }
> = {
  de: {
    eyebrow: "Disziplinen",
    heading: "DISZIPLINEN",
    iqfoil: {
      title: "iQFOiL Racing",
      paragraphs: [
        "iQFOiL ist die olympische Windsurfklasse. Bei Paris 2024 feierte die Klasse ihr olympisches Debüt und löste das RS:X als olympische Windsurf-Ausrüstung ab.",
        "Ich starte inzwischen international in der U23- und Senior-Kategorie.",
        "iQFOiL ist eine One-Design-Klasse mit standardisiertem Material. Dadurch stehen das richtige Setup, das Tuning, der Speed sowie die Leistung des Fahrers besonders im Mittelpunkt. Gute Starts, saubere Manöver, Taktik, Strategie, Fitness und mentale Stärke können über ein Rennen entscheiden.",
      ],
      alt: "Devin Hauser beim iQFOiL-Racing",
    },
    wingfoil: {
      title: "Wingfoil Racing",
      paragraphs: [
        "Ich habe früh mit dem Wingfoilen begonnen und war bereits in den ersten Jahren der internationalen Wingfoil-Regatten dabei. Das Material und das Fahrgefühl unterscheiden sich vom iQFOiL, das Grundprinzip im Racing ist aber ähnlich: Ein festgelegter Kurs wird so schnell und taktisch klug wie möglich absolviert.",
        "Wingfoil Racing ist für mich auch eine wertvolle Ergänzung zum iQFOiL-Training. Starts, Speed, Manöver, Taktik und Entscheidungen unter Druck spielen in beiden Disziplinen eine wichtige Rolle. Wenn es mein Trainings- und Regattaplan erlaubt, fahre ich deshalb gerne ausgewählte Wingfoil-Racing-Events.",
      ],
      alt: "Devin Hauser beim Wingfoil Racing mit dem ENSIS-Wing in Cremia",
    },
  },
  en: {
    eyebrow: "Disciplines",
    heading: "DISCIPLINES",
    iqfoil: {
      title: "iQFOiL Racing",
      paragraphs: [
        "iQFOiL is the Olympic windsurfing class. The equipment made its Olympic debut at Paris 2024, replacing the RS:X as the Olympic windsurfing equipment.",
        "I now compete internationally in the U23 and senior fleets.",
        "iQFOiL is a one-design class with standardised equipment. This puts a strong focus on setup, tuning, speed and the performance of the athlete. Starts, manoeuvres, tactics, strategy, fitness and mental strength can all decide a race.",
      ],
      alt: "Devin Hauser racing iQFOiL",
    },
    wingfoil: {
      title: "Wingfoil Racing",
      paragraphs: [
        "I started wingfoiling early and was already racing during the first years of international Wingfoil competition. The equipment and feeling are different from iQFOiL, but the basic racing principle is similar: complete a set course as quickly and tactically as possible.",
        "Wingfoil Racing is also a valuable addition to my iQFOiL training. Starts, speed, manoeuvres, tactics and decision-making under pressure are important in both disciplines. Whenever my training and racing schedule allows, I enjoy competing in selected Wingfoil Racing events.",
      ],
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

        {/* iQFOiL — Bild links, Text rechts. */}
        <div className="mt-10 grid items-center gap-10 sm:mt-12 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:col-span-6">
            <Image
              src="/images/iqfoil-action.jpg"
              alt={c.iqfoil.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0 md:col-span-6">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              {c.iqfoil.title}
            </h3>
            {c.iqfoil.paragraphs.map((text, index) => (
              <p
                key={text.slice(0, 24)}
                className={`max-w-md leading-relaxed text-graphite ${index === 0 ? "mt-5" : "mt-4"}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Wingfoil Racing — gespiegelt (Bild rechts auf Desktop). */}
        <div className="mt-24 grid items-center gap-10 sm:mt-32 md:grid-cols-12 md:gap-14">
          <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl md:order-2 md:col-span-6">
            <Image
              src="/images/wingfoil-cremia-ensis.jpg"
              alt={c.wingfoil.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0 md:order-1 md:col-span-6">
            <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              {c.wingfoil.title}
            </h3>
            {c.wingfoil.paragraphs.map((text, index) => (
              <p
                key={text.slice(0, 24)}
                className={`max-w-md leading-relaxed text-graphite ${index === 0 ? "mt-5" : "mt-4"}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
