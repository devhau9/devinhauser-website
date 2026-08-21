import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

/**
 * Olympia-Sektion.
 *
 * ═════════════════════════════════════════════════════════════════════════════
 * DIE KORREKTUR VOM 21.08.2026 — WARUM DAS BILD NICHT MEHR FORMATFUELLEND LIEGT
 * ═════════════════════════════════════════════════════════════════════════════
 * Vorher lag das Foto als formatfuellender Hintergrund in einem
 * `min-h-[75vh]`-Band, zugeschnitten mit `object-cover object-[50%_35%]`
 * (Desktop) bzw. `object-[50%_42%]` (Mobile). Die Ausschnittwerte waren im Code
 * selbst als „ERSTE SCHAETZUNG — von Devin visuell zu bestaetigen" markiert und
 * nie geprueft worden.
 *
 * Was ein `object-cover`-Band tatsaechlich macht: Es fuellt eine Flaeche, deren
 * Seitenverhaeltnis von der Fensterbreite und der Viewport-Hoehe abhaengt. Bei
 * einem 3:2-Foto in einem Band, das auf einem breiten Bildschirm schnell
 * 2.5:1 oder flacher wird, verschwindet ein erheblicher Teil der Bildhoehe —
 * und zwar an jedem Geraet anders. Genau das Motiv, das diese Sektion tragen
 * soll (Segel mit Schweizerkreuz, Segelnummer SUI-134, Athlet auf dem Board),
 * steht im Bild vertikal uebereinander und wird von einem solchen Band als
 * Erstes angeschnitten. Auf einem flachen Laptopfenster war vom Segel oben
 * regelmaessig nichts mehr zu sehen.
 *
 * Die Loesung ist bewusst die langweilige: Das Bild bekommt einen Rahmen mit
 * SEINEM EIGENEN Seitenverhaeltnis und wird mit `object-contain` gezeichnet.
 * Damit ist der Beschnitt nicht „gut eingestellt", sondern strukturell
 * unmoeglich — auf jeder Bildschirmbreite, in jeder Hoehe, ohne einen einzigen
 * geschaetzten Prozentwert. Kein Verzerren (`object-contain` skaliert
 * proportional), kein Retuschieren, kein Wegschneiden.
 *
 * `object-contain` UND passendes Rahmenverhaeltnis gleichzeitig ist Absicht:
 * Das Rahmenverhaeltnis sorgt dafuer, dass keine schwarzen Balken entstehen,
 * `object-contain` sorgt dafuer, dass auch bei einer minimalen Abweichung
 * (2560x1439 sind 1.7790 statt exakt 1.7778) letterboxed statt beschnitten
 * wird. Eine der beiden Massnahmen allein waere schon richtig; zusammen kann
 * ein spaeterer Bildwechsel mit leicht anderem Format nichts kaputtmachen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * A/B — ZWEI GLEICHWERTIGE BILDER, DEVIN ENTSCHEIDET
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIANTE A  `/images/DSCF0515.jpg` — das BESTEHENDE Bild (Cremia, 3:2).
 *   Vollstaendig dargestellt zeigt es alles, was die Vorgabe verlangt: Segel
 *   mit Schweizerkreuz, gut lesbares SUI-134, Namenszug D. HAUSER, Athlet
 *   ganz im Bild, Board und Foil ueber dem Wasser. Es funktioniert visuell —
 *   das Problem war nie das Bild, sondern der Beschnitt.
 *
 * VARIANTE B  `/images/olympic-silvaplana-sui134.jpg` — Silvaplana, 16:9.
 *   Web-Fassung (2560 px, q82) von `iqf-02_silvaplana-sail-number.jpg` aus dem
 *   Ordner „Launch Candidate Pack V1.1 — CREDIT SAFE" (Asset IQF-02,
 *   `rights_class = OWN — DISPLAY APPROVED`, `public_download = NO`).
 *   Naeher am Motiv, Segelnummer noch deutlicher, Heimrevier statt Gardasee.
 *
 * Umschalten ist eine Zeile: `OLYMPIC_VARIANT` unten. Beide Fassungen sind als
 * Screenshot bei 1440 px und 375 px dokumentiert.
 *
 * KEINE BILDUNTERSCHRIFT MIT FOTOGRAFENNENNUNG: Fuer keines der beiden Bilder
 * ist im Rechte-Manifest eine namentlich benannte Person als Fotograf belegt
 * (bei IQF-02 steht dort „Familie Hauser", das ist keine Person). Nach der
 * Regel vom 20.08.2026 darf daraus kein „Photo: Hauser" werden. Die Sektion
 * zeigt deshalb — wie die uebrige Startseite — gar keine Credit-Zeile.
 */

const OLYMPIC_VARIANTS = {
  A: {
    src: "/images/DSCF0515.jpg",
    /** 6138 x 4092 = exakt 3:2 */
    frame: "aspect-[3/2]",
    alt: {
      de: "Devin Hauser auf dem IQFoil-Board: rotes Segel mit Schweizerkreuz und der Segelnummer SUI-134, Board und Foil über dem Wasser",
      en: "Devin Hauser on the IQFoil board: red sail with the Swiss cross and sail number SUI-134, board and foil above the water",
    },
  },
  B: {
    src: "/images/olympic-silvaplana-sui134.jpg",
    /** 2560 x 1439 ≈ 16:9 */
    frame: "aspect-[16/9]",
    alt: {
      de: "Devin Hauser foilt auf dem Silvaplanersee, rotes IQFoil-Segel mit Schweizerkreuz und Segelnummer SUI-134 vor Bergkulisse",
      en: "Devin Hauser foiling on Lake Silvaplana, red IQFoil sail with the Swiss cross and sail number SUI-134 against the mountains",
    },
  },
} as const;

/** Umschalter für den A/B-Vergleich. "A" = bestehendes Bild, "B" = credit-sicher. */
const OLYMPIC_VARIANT: keyof typeof OLYMPIC_VARIANTS = "A";

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    body: string;
    timeline: { period: string; text: string }[];
  }
> = {
  de: {
    // Bewusst zeitlos: keine Jahreszahl beim Olympiaziel, keine Aussage über
    // Qualifikation, Kaderzugehörigkeit oder Teilnahme.
    eyebrow: "Der Weg zu den",
    heading: "OLYMPISCHEN SPIELEN",
    lead: "Mein Ziel ist es, die Schweiz an den Olympischen Spielen zu vertreten.",
    body: "Jedes Training, jeder Wettkampf und jede Herausforderung gehört zu diesem Weg — hin zum höchsten Niveau des internationalen Segelsports.",
    timeline: [
      { period: "2026", text: "Internationale Erfahrung sammeln" },
      { period: "2027", text: "Mich mit den Besten der Welt messen" },
      { period: "Zukunft", text: "Olympisches Ziel" },
    ],
  },
  en: {
    eyebrow: "Road to the",
    heading: "OLYMPIC GAMES",
    lead: "My goal is to represent Switzerland at the Olympic Games.",
    body: "Every training session, competition and challenge is part of the journey towards the highest level of international sailing.",
    timeline: [
      { period: "2026", text: "Building international experience" },
      { period: "2027", text: "Competing among the world's best" },
      { period: "Future", text: "Olympic ambition" },
    ],
  },
};

export default function Goals({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const image = OLYMPIC_VARIANTS[OLYMPIC_VARIANT];

  return (
    <section id={SECTION_ID.goals} className="overflow-hidden">
      <div className="bg-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bild zuerst im Markup: Auf schmalen Geräten steht das Motiv oben
              und der Text darunter — dieselbe Reihenfolge, die man von der
              früheren Bild-mit-Text-darunter-Sektion kennt. Auf Desktop
              wandert es per `lg:order-2` nach rechts. */}
          <div className="min-w-0 lg:order-2">
            <div
              className={`relative w-full overflow-hidden rounded-2xl bg-ink-soft ${image.frame}`}
            >
              <Image
                src={image.src}
                alt={image.alt[lang]}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div className="min-w-0 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-widest2 text-red">
              {c.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-5xl leading-[0.9] tracking-wide text-paper sm:text-6xl lg:text-7xl">
              {c.heading}
            </h2>
            <p className="mt-6 max-w-lg text-balance leading-relaxed text-slate-light">
              {c.lead}
            </p>
            <p className="mt-3 max-w-lg text-balance leading-relaxed text-slate-light">
              {c.body}
            </p>
          </div>
        </div>
      </div>

      {/* Kompakte Zeitachse direkt unter dem Bild, ohne Olympia-Jahr. */}
      <div className="bg-white px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 sm:grid-cols-3">
            {c.timeline.map((station) => (
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
