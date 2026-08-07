import Image from "next/image";

// Steckbrief-Felder: Struktur vom 18.07.2026, Werte von Devin am 18.07.2026
// bestätigt. Sponsors-Feld entfernt, Home durch Location + Home Spot ersetzt.
const STECKBRIEF = [
  { label: "Nationality", value: "Swiss" },
  { label: "Age", value: "18" },
  { label: "Sports", value: "IQFoil, Wingfoil" },
  { label: "Height", value: "178 cm" },
  { label: "Weight", value: "87 kg" },
  // Praezisiert 07.08.2026 gemaess Entscheid D1 = C ("from Buchs ZH, Switzerland").
  { label: "Location", value: "Buchs ZH, Switzerland" },
  { label: "Home Spot", value: "Silvaplana" },
  { label: "Sail Number", value: "SUI-134" },
  { label: "Club", value: "RVZS / DRCS" },
];

export default function About() {
  return (
    <section id="ueber-mich" className="section-pad border-b border-hairline bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">About</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          ABOUT ME
        </h2>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
          {/* About-Text: bewusst EINE konsistente Textebene (keine grosse/fette
              Intro-Typografie), kurz (3 knappe Absätze), persönlich, Ich-Form,
              Englisch, kein fixes Olympia-Jahr. Athlet zuerst, Creator als
              Differenzierungsfaktor. */}
          <div className="min-w-0">
            <p className="max-w-lg leading-relaxed text-ink">
              I&apos;m Devin Hauser, a Swiss IQFoil and Wingfoil racing athlete
              competing internationally since 2020. I grew up on the water, and
              racing has shaped my life ever since.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink">
              I&apos;ve raced my way from national events into international World
              and European Championship fleets, and I&apos;m now stepping up into
              senior competition. Alongside the racing, I create my own photo,
              video and drone content — documenting the journey myself.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink">
              My long-term goal is to represent Switzerland at the Olympic Games,
              and every step is part of that road.
            </p>

            <div className="relative mt-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/about-portrait.jpg"
                alt="Portrait of Devin Hauser"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Profile Card: rechts daneben (responsive: darunter). Werte bestätigt. */}
          <div className="min-w-0">
            <div className="card-surface p-8 sm:p-10">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Profile
              </p>
              <dl className="space-y-5">
                {STECKBRIEF.map((item) => (
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
