import Image from "next/image";

// Bewusst zeitlos gehalten: kein LA 2028, keine konkrete Jahreszahl beim
// Olympia-Ziel selbst, damit die Aussage über mehrere Olympiazyklen hinweg
// gültig bleibt.
const TIMELINE = [
  { period: "2026", text: "Building international experience" },
  { period: "2027", text: "Competing among the world's best" },
  { period: "Future", text: "Olympic ambition" },
];

export default function Goals() {
  return (
    <section id="goals" className="relative overflow-hidden">
      {/* Grosses Hintergrundbild mit dunklem Overlay. Höhe bewusst
          kompakter als eine volle Bildschirmhöhe gehalten, damit kein
          unnötig grosser leerer Bereich entsteht. */}
      <div className="relative flex min-h-[75vh] items-end bg-ink">
        {/* Bildausschnitt bewusst leicht nach oben verschoben, damit mehr vom
            Segel und Athleten sichtbar wird (statt object-center). Desktop und
            Mobile getrennt positioniert. ERSTE SCHÄTZUNG — von Devin visuell auf
            localhost zu bestätigen, da das Bild in dieser Session technisch
            nicht sichtbar war. */}
        {/* 10.08.2026: `priority` entfernt. Diese Sektion liegt weit unterhalb
            des ersten Bildschirms; ein zweites priorisiertes Bild konkurriert
            beim Seitenaufbau direkt mit dem Hero-Bild um Bandbreite und
            verschlechtert damit genau die Kennzahl (LCP), die das Hero-Bild
            verbessern soll. Ohne `priority` laedt Next.js das Bild lazy, sobald
            es in die Naehe des Viewports kommt. */}
        <Image
          src="/images/DSCF0515.jpg"
          alt="Devin Hauser racing IQFoil at speed, sail and foil clearly visible"
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%] sm:object-[50%_42%]"
        />
        {/* Overlay reduziert (via-ink/55 -> /40, to-ink/15 -> /5), damit Foto,
            Segel und Athlet besser erkennbar sind. Unten bleibt from-ink voll
            deckend, damit der Text (items-end) sicher lesbar bleibt. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5"
        />

        <div className="relative w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-xs uppercase tracking-widest2 text-red">
              Road to
            </p>
            <h2 className="mt-2 font-display text-5xl leading-[0.9] tracking-wide text-paper sm:text-7xl">
              OLYMPIC GAMES
            </h2>
            <p className="mt-6 max-w-lg text-balance leading-relaxed text-slate-light">
              Chasing my dream of representing Switzerland at the Olympic
              Games.
            </p>
            <p className="mt-3 max-w-lg text-balance leading-relaxed text-slate-light">
              Every training session, competition and challenge is part of
              the journey towards the highest level of international
              sailing.
            </p>
          </div>
        </div>
      </div>

      {/* Kompakte Timeline direkt unter dem Bild, ohne Olympia-Jahr. */}
      <div className="bg-white px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 sm:grid-cols-3">
            {TIMELINE.map((station) => (
              <div key={station.period}>
                <p className="font-mono text-xs uppercase tracking-widest2 text-red">
                  {station.period}
                </p>
                <p className="mt-2 font-display text-xl tracking-wide text-ink">
                  {station.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
