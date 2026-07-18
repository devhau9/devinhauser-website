import Image from "next/image";

// Steckbrief-Felder: Struktur vom 18.07.2026, Werte von Devin am 18.07.2026
// bestätigt. Sponsors-Feld entfernt, Home durch Location + Home Spot ersetzt.
const STECKBRIEF = [
  { label: "Nationality", value: "Swiss" },
  { label: "Age", value: "18" },
  { label: "Sports", value: "IQFoil, Wingfoil" },
  { label: "Height", value: "178 cm" },
  { label: "Weight", value: "87 kg" },
  { label: "Location", value: "Zurich, Switzerland" },
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
          {/* Text + Porträt: Text zuerst, Foto darunter (responsive) */}
          <div>
            <p className="max-w-md text-balance leading-relaxed text-graphite">
              I'm Devin Hauser, a Swiss IQFoil athlete competing internationally
              at the highest level. My biggest goal is to compete at the
              Olympic Games. Outside of training and competition, I enjoy
              creating content and building my personal brand. I believe that
              small improvements every day lead to big results over time.
            </p>

            <div className="relative mt-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/about-portrait.jpg"
                alt="Porträt von Devin Hauser"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Steckbrief: eigenständiger Block rechts daneben (responsive:
              darunter). Alle Werte aktuell Platzhalter. */}
          <div>
            <div className="card-surface p-8 sm:p-10">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Steckbrief
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
