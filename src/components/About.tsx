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
      "Ich bin Devin Hauser, iQFOiL- und Wingfoil-Racer aus der Schweiz. Mit sieben Jahren stand ich zum ersten Mal auf einem Windsurfbrett. Seitdem zieht es mich so oft wie möglich aufs Wasser. Ob iQFOiL, Wingfoil, Windsurfen, Pumpfoil, Kitesurfen oder Parawing: Ich probiere alles aus, was fliegt, gleitet und mich schneller macht.",
      "Angefangen habe ich bei nationalen Nachwuchsregatten. Danach kamen die ersten internationalen Wettkämpfe, Europa- und Weltmeisterschaften. Nach zwei Jahren in der U17 und zwei Jahren in der U19 starte ich inzwischen international in der U23- und Senior-Kategorie.",
      "Neben dem Sport interessiere ich mich für Fotografie, Film, Video-Editing, Shootings, Webdesign und künstliche Intelligenz. Ich baue meine Personal Brand Schritt für Schritt auf und möchte zeigen, wie viel Arbeit hinter dem internationalen Leistungssport steckt.",
      "Mein langfristiges Ziel ist es, die Schweiz an den Olympischen Spielen zu vertreten. Dafür trainiere ich jeden Tag hart, gebe mein Bestes und glaube daran, dass ich dieses Ziel erreichen kann.",
    ],
    portraitAlt: "Porträt von Devin Hauser",
    profile: "Steckbrief",
    facts: [
      { label: "Nationalität", value: "Schweiz" },
      { label: "Jahrgang", value: "2007" },
      { label: "Sportarten", value: "iQFOiL, Wingfoil" },
      { label: "Grösse", value: "178 cm" },
      { label: "Gewicht", value: "87 kg" },
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
      "I\u2019m Devin Hauser, an iQFOiL and Wingfoil racer from Switzerland. I first stepped onto a windsurf board at the age of seven. Since then, I have wanted to spend as much time on the water as possible. Whether it is iQFOiL, Wingfoil, windsurfing, pump foiling, kitesurfing or parawinging, I enjoy everything that flies, glides and helps me become faster.",
      "I started in national youth regattas before progressing to international competitions, European Championships and World Championships. After two years in U17 and two years in U19, I now compete internationally in the U23 and senior fleets.",
      "Away from racing, I am interested in photography, filmmaking, video editing, shoots, web design and artificial intelligence. I am building my personal brand step by step and want to show the work behind international high-performance sport.",
      "My long-term goal is to represent Switzerland at the Olympic Games. I train hard every day, give my best and believe that I can achieve this goal.",
    ],
    portraitAlt: "Portrait of Devin Hauser",
    profile: "Profile",
    facts: [
      { label: "Nationality", value: "Swiss" },
      { label: "Born", value: "2007" },
      { label: "Sports", value: "iQFOiL, Wingfoil" },
      { label: "Height", value: "178 cm" },
      { label: "Weight", value: "87 kg" },
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
              vier knappe Absätze, Ich-Form, Athlet zuerst, kein fixes
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
