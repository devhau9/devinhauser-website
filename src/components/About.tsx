import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

/**
 * Über mich.
 *
 * Steckbrief-Struktur vom 18.07.2026, Werte von Devin bestätigt.
 * Öffentliche Ortsangabe seit 19.08.2026 auf Stadt-/Regionsebene
 * (Entscheid Devin: keine Wohngemeinde, keine Privatadresse auf der Website).
 * „Born: 2007" statt eines Alters — eine Altersangabe wird am 16.11.2026 von
 * selbst falsch, der Jahrgang bleibt dauerhaft richtig.
 *
 * Die WERTE des Steckbriefs sind grösstenteils sprachneutral (Zahlen, SUI-134,
 * Vereinskürzel). Übersetzt werden die Beschriftungen und die drei Werte, die
 * echte Wörter sind: Nationalität, Sportarten, Standort.
 */

type Fact = { label: string; value: string };

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    portraitAlt: string;
    profile: string;
    facts: Fact[];
  }
> = {
  de: {
    eyebrow: "Über mich",
    heading: "ÜBER MICH",
    paragraphs: [
      "Ich bin Devin Hauser, IQFoil- und Wingfoil-Racer aus der Schweiz. Seit mehreren Jahren fahre ich internationale Regatten. Ich bin auf dem Wasser aufgewachsen, und das Racing prägt mein Leben seither.",
      "Von nationalen Regatten habe ich mich in internationale WM- und EM-Felder gefahren und steige jetzt in die Elite-Kategorie auf. Neben dem Racing fotografiere und filme ich selbst. Was dabei entsteht, zeigt vor allem die Tage zwischen den Läufen: Material, Anreise, Trainingsblöcke.",
      "Mein langfristiges Ziel ist es, die Schweiz an den Olympischen Spielen zu vertreten. Bis dahin zählt jede internationale Regatta, die ich fahre.",
    ],
    portraitAlt: "Porträt von Devin Hauser",
    profile: "Steckbrief",
    facts: [
      { label: "Nationalität", value: "Schweiz" },
      { label: "Jahrgang", value: "2007" },
      { label: "Sportarten", value: "IQFoil, Wingfoil" },
      { label: "Grösse", value: "178 cm" },
      { label: "Gewicht", value: "rund 87 kg" },
      { label: "Standort", value: "Zürich, Schweiz" },
      { label: "Training im Sommer", value: "Silvaplanersee" },
      { label: "Segelnummer", value: "SUI-134" },
      { label: "Verein", value: "RVZS / DRCS" },
    ],
  },
  en: {
    eyebrow: "About",
    heading: "ABOUT ME",
    paragraphs: [
      "I'm Devin Hauser, a Swiss IQFoil and Wingfoil racing athlete. I have been racing internationally for several years. I grew up on the water, and racing has shaped my life ever since.",
      "I've raced my way from national events into international World and European Championship fleets, and I'm now stepping up into senior competition. Alongside racing I shoot photo and video myself. Most of what comes out of it shows the days between the races: gear, travel, training blocks.",
      "My long-term goal is to represent Switzerland at the Olympic Games. Until then, every international regatta counts.",
    ],
    portraitAlt: "Portrait of Devin Hauser",
    profile: "Profile",
    facts: [
      { label: "Nationality", value: "Swiss" },
      { label: "Born", value: "2007" },
      { label: "Sports", value: "IQFoil, Wingfoil" },
      { label: "Height", value: "178 cm" },
      { label: "Weight", value: "approx. 87 kg" },
      { label: "Location", value: "Zurich, Switzerland" },
      { label: "Summer training", value: "Lake Silvaplana" },
      { label: "Sail Number", value: "SUI-134" },
      { label: "Club", value: "RVZS / DRCS" },
    ],
  },
};

export default function About({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section
      id={SECTION_ID.about}
      className="section-pad border-b border-hairline bg-white"
    >
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
          {/* Bewusst EINE konsistente Textebene (keine grosse Intro-Typografie),
              drei knappe Absätze, Ich-Form, Athlet zuerst, kein fixes
              Olympia-Jahr. */}
          <div className="min-w-0">
            {c.paragraphs.map((text, index) => (
              <p
                key={text.slice(0, 24)}
                className={`max-w-lg leading-relaxed text-ink ${index > 0 ? "mt-4" : ""}`}
              >
                {text}
              </p>
            ))}

            <div className="relative mt-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/about-portrait.jpg"
                alt={c.portraitAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="card-surface p-8 sm:p-10">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                {c.profile}
              </p>
              <dl className="space-y-5">
                {c.facts.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      {item.label}
                    </dt>
                    <dd className="text-right font-body text-base text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
