import Link from "next/link";
import { SOCIAL_PROFILES } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import FoilDiagram from "@/components/iqfoil/FoilDiagram";
import CourseDiagram from "@/components/iqfoil/CourseDiagram";

/**
 * iQFOiL pillar page — ENGLISH VERSION (served under /en).
 *
 * Rebuilt on 29.08.2026 from the fact-checked master draft
 * "WEBSITE COPY — WAS IST iQFOiL — DE EN — 2026-08-28".
 *
 * Same facts as the German page, not a word-for-word translation. British
 * spelling throughout, matching the rest of the site: metre, manoeuvre,
 * standardised, gybe.
 *
 * Removed from the previous version, per the fact check: top speeds, sail
 * areas, board dimensions and wing sizes. See the German file for the full
 * reasoning — the short version is that all of them are volatile or
 * unverifiable, and the explanations work without them.
 *
 * No mast length is given. The master draft says 4.9 m; the previous version of
 * this page cited a 95 cm foil mast. The 4.9 m belongs to the rig, not the
 * foil, so stating either alongside the other would be wrong.
 */

export const IQFOIL_EN_TITLE = "What Is iQFOiL? Olympic Windsurfing Explained";
export const IQFOIL_EN_DESCRIPTION =
  "The Olympic windsurfing class explained: how the foil lifts the board out of the water, why everyone races the same equipment, and how a race actually works.";

const H2 = "font-display text-3xl tracking-wide text-ink sm:text-4xl";
// `text-pretty` statt `text-balance`: Bei mehrzeiligen Absaetzen ist genau
// das der richtige Schalter — er verhindert das einzelne Wort auf der
// letzten Zeile, ohne wie `text-balance` alle Zeilen gleich lang zu ziehen.
const P = "mt-5 max-w-2xl text-pretty leading-relaxed text-graphite";
const SECTION = "mt-16 border-t border-hairline pt-12";

function Source({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-widest2 text-graphite">
      {children}
    </span>
  );
}

/** Mirrors FAQ_DE exactly, including which five go into structured data. */
export const FAQ_EN = [
  {
    q: "What does iQFOiL mean?",
    a: "The name of the equipment World Sailing selected for the Olympic windsurfing events — not an abbreviation. It refers to the whole package: board, sail and foil.",
    structured: true,
  },
  {
    q: "Why does the board fly?",
    a: "Because the wings under water generate lift, the way an aircraft wing does in air. Past enough speed that lift is enough to raise board and rider.",
    structured: true,
  },
  {
    q: "Does everyone really use the same equipment?",
    a: "Yes, within the class rules. Differences come from setup, technique and decisions — not from purchasing.",
    structured: true,
  },
  {
    q: "How do you win a race?",
    a: "A good start, clean speed, few mistakes in the manoeuvres, and the right decisions about where on the course to sail.",
    structured: true,
  },
  {
    q: "How fast is iQFOiL?",
    a: "Fast enough that the manoeuvres become the real challenge. An exact figure says little: speed depends on wind, chop, course and rider, and varies a lot.",
    structured: false,
  },
  {
    q: "Is iQFOiL Olympic?",
    a: "Yes. The class made its Olympic debut at the Paris 2024 Games, replacing the RS:X.",
    structured: true,
  },
];

const FORMATS = [
  { name: "Slalom", duration: "4–7 minutes", character: "all together, downwind, very fast" },
  { name: "Course racing", duration: "16–23 minutes", character: "upwind–downwind, tactical" },
  { name: "Marathon", duration: "60–90 minutes", character: "endurance, long distance" },
];

const SOURCES = [
  {
    label: "Royal Yachting Association — What is the iQFOiL",
    href: "https://www.rya.org.uk/iqfoil-worlds-2026/what-is-the-iqfoil/",
  },
  {
    label: "iQFOiL Class Official — Paris 2024",
    href: "https://www.iqfoilclassofficial.org/ofallinfoparis2024",
  },
  {
    label: "World Sailing — Paris 2024 Qualification System",
    href: "https://paris2024.sailing.org/racing/qualification-system/",
  },
];

export default function IqfoilEn() {
  return (
    <main>
      <article className="section-pad !pt-24 sm:!pt-28 md:!pt-40 lg:!pt-48 bg-white">
        <div className="mx-auto max-w-content">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              <li>
                <Link href={localizedPath("/", "en")} className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">iQFOiL</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">The sport</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            WHAT IS iQFOiL?
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
            iQFOiL is the Olympic windsurfing class. The board doesn&rsquo;t sit
            in the water — it flies above it, on a hydrofoil, a wing below the
            surface. I race this class internationally, and here I explain how it
            works.
          </p>

          {/* ── 2 · From windsurfing to flying ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>From windsurfing to flying</h2>
            <p className={P}>
              Most people know classic windsurfing: board, sail, fin — the board
              planes across the water. iQFOiL starts the same way; the difference
              is underneath. Below the board sits a mast, and at the bottom of it
              are two wings: a large front wing and a smaller rear wing. Together
              they make the foil.
            </p>

            <FoilDiagram lang="en" />

            <p className={P}>
              At low speed the wings even add a little drag. Past a certain speed
              that flips: they generate lift, on the same principle as an
              aircraft wing, only in a denser medium. Water is roughly eight
              hundred times denser than air, so a wing area about the size of a
              forearm is enough to lift rider and gear. The board rises until only
              the mast stays submerged — most of the drag disappears with it, and
              it goes quiet and fast at once.
            </p>
            <p className={P}>
              The rear wing holds the balance. Too much lift and the foil
              breaches; too little and you drop back down. Holding that balance
              for minutes, through chop and shifting wind, is the part you
              genuinely have to learn.
            </p>
          </section>

          {/* ── 3 · The equipment ────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>The equipment</h2>
            <p className={P}>
              iQFOiL is a one-design class: everyone races the same equipment
              within the class rules — same board, same foil, same mast. The only
              difference between the men&rsquo;s and women&rsquo;s events is sail
              size. In very light wind the class also allows a conventional fin
              instead of the foil, so it isn&rsquo;t always flying — just mostly.{" "}
              <Source>Source: RYA</Source>
            </p>
            <p className={P}>
              That sounds like everyone should be equally fast. They aren&rsquo;t.
              Same equipment only means nobody can buy an advantage. What&rsquo;s
              left is setup — foil position, sail trim, foot straps, ride height.
              Each of those changes how the gear behaves in this wind, this chop,
              this course, and what&rsquo;s right today can be wrong tomorrow.
            </p>
            <p className={P}>
              That&rsquo;s what I like about the class. There is no excuse about
              the gear. Whoever is faster set it up better, read it better, or
              sailed it better.
            </p>
          </section>

          {/* ── 4 · How a race works ─────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>How a race works</h2>
            <p className={P}>
              A race starts on a start line between two marks. Everyone starts at
              once, and timing is already half the job: a second early and you
              are sent back, a second late and you are sailing in everyone
              else&rsquo;s dirty wind.
            </p>
            <p className={P}>
              Then comes a course marked by buoys: upwind, zigzagging because you
              cannot sail straight into the wind, and downwind on the way back,
              considerably faster. At every mark you tack or gybe. These
              manoeuvres decide races — drop off the foil and you lose seconds
              you will not get back.
            </p>

            <CourseDiagram lang="en" />

            <p className={P}>
              Not every race is the same. The class uses several formats, and
              which ones are sailed is set out in each event&rsquo;s notice of
              race. At the Paris 2024 Olympic Games there were three:
            </p>

            <div className="mt-6 max-w-2xl overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Format
                    </th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Duration
                    </th>
                    <th className="py-3 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Character
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FORMATS.map((f) => (
                    <tr key={f.name} className="border-b border-hairline">
                      <td className="py-3 pr-4 font-medium text-ink">{f.name}</td>
                      <td className="py-3 pr-4 text-graphite">{f.duration}</td>
                      <td className="py-3 text-graphite">{f.character}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={P}>
              After several days of racing the top ten went into a medal series
              with quarter, semi and grand final. Other events set other
              priorities. <Source>Source: iQFOiL Class Official</Source>
            </p>
          </section>

          {/* ── 5 · What makes a fast racer ──────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>What makes a fast racer</h2>
            <p className={P}>
              One design doesn&rsquo;t mean only weight or equipment count. It
              means everything else does.
            </p>
            <dl className="mt-6 max-w-2xl space-y-5">
              {[
                ["Start", "Full speed exactly on the signal, in the right spot on the line. A bad start costs more than equipment could ever give."],
                ["Speed and tuning", "Pace at the highest possible angle to the wind — and the setup to match. This morning's may be wrong by the afternoon."],
                ["Manoeuvres", "A gybe where the board stays on the foil is worth gold. One where you drop costs ten seconds."],
                ["Tactics and strategy", "Strategy is the plan before the start: which side, which wind. Tactics is what survives once thirty other people want the same thing."],
                ["Balance, fitness and head", "Corrections in tenths of a second, several races a day, marathon distances — and in the end it is whoever can still think clearly in the last race."],
              ].map(([title, text]) => (
                <div key={title}>
                  <dt className="font-body text-base font-medium text-ink">
                    {title}
                  </dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 6 · Why iQFOiL is Olympic ────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Why iQFOiL is Olympic</h2>
            <p className={P}>
              World Sailing selected iQFOiL as the equipment for the windsurfing
              events at the Paris 2024 Olympic Games, replacing the RS:X that had
              been raced across several Games. Paris 2024 was the class&rsquo;s
              Olympic debut. There is one event for men and one for women, with
              identical equipment apart from sail size.{" "}
              <Source>Source: RYA</Source>
            </p>
            <p className={P}>
              How qualification works surprises many people: the place belongs to
              the nation, not the athlete. For Paris 2024, each nation could
              enter a maximum of one board per event. Places were allocated
              through several routes — the World Championship, continental
              qualifiers, a last-chance regatta, plus host nation and
              universality places. Which athlete then takes the place is decided
              by the national federation under its own criteria.{" "}
              <Source>Source: World Sailing</Source>
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-red pl-5 leading-relaxed text-ink">
              That was the Paris 2024 system. Qualification systems are set
              afresh for each edition, so what applies to the next Games is not
              automatically the same.
            </p>
          </section>

          {/* ── 7 · My path ──────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>My path</h2>
            <p className={P}>
              I first stood on a board at seven. Since then I want to be on the
              water every day I can. I started at national youth regattas, then
              came the international ones: U17 first, then two years in U19, and
              now the U23 and senior categories. Every step means a bigger fleet
              and a higher level — and every time it feels like starting near the
              bottom again.
            </p>
            <p className={P}>
              My long-term goal is to represent Switzerland at the Olympic Games.
              Without a fixed year. That is decided by results and by the
              federation, not by announcements. Until then it is about every
              training day — in summer mostly on Lake Silvaplana.
            </p>
            <p className={P}>
              Where I stand right now is on the{" "}
              <Link
                href="/en#highlights"
                className="text-ink underline underline-offset-4 hover:text-red"
              >
                results
              </Link>{" "}
              section.
            </p>
          </section>

          {/* ── 8 · iQFOiL and wingfoil racing ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>iQFOiL and wingfoil racing</h2>
            <p className={P}>
              Alongside iQFOiL I also race wingfoil. The two share the important
              part: a foil under the board, a course with buoys, a start that
              decides a lot, and the same question — who gets from A to B fastest
              in this wind?
            </p>
            <p className={P}>
              What differs is the power source: in wingfoiling you hold an
              inflatable wing in your hands instead of having a rig and mast on
              the board. That changes starts, handling and manoeuvres, and
              courses are often tighter. The timing differs; the thinking
              doesn&rsquo;t.
            </p>
            <p className={P}>
              For my iQFOiL racing it is valuable: other tactics, other
              opponents, and I stay on the foil when the iQFOiL season pauses.
              Wingfoil racing is not an Olympic class — I race it because it makes
              me better.
            </p>
          </section>

          {/* ── 9 · Frequently asked questions ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Frequently asked questions</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {FAQ_EN.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-body text-base font-medium text-ink">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-pretty leading-relaxed text-graphite">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 10 · Closing ─────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>If you want to see more</h2>
            <p className={P}>
              Images from the last few seasons of racing are in the gallery, the
              current placings under results. How a partnership can work is on
              the partnership section.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/en#highlights"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Results
              </Link>
              <Link
                href={localizedPath("/media", "en")}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Gallery
              </Link>
              <Link
                href="/en#sponsoring"
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
              >
                Partnership
              </Link>
            </div>

            <p className="mt-10 max-w-2xl text-pretty text-sm leading-relaxed text-graphite">
              On{" "}
              <Link
                href="/en#social-media"
                className="text-ink underline underline-offset-4 hover:text-red"
              >
                social media
              </Link>{" "}
              I post what happens between races — gear, travel, training blocks:{" "}
              {SOCIAL_PROFILES.map((href, index) => {
                const label = href.includes("instagram")
                  ? "Instagram"
                  : href.includes("tiktok")
                    ? "TikTok"
                    : "YouTube";
                return (
                  <span key={href}>
                    {index > 0 ? " · " : null}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline underline-offset-4 hover:text-red"
                    >
                      {label}
                    </a>
                  </span>
                );
              })}
            </p>
          </section>

          {/* ── Sources ──────────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Sources for the technical details on this page
            </h2>
            <ul className="mt-5 max-w-2xl space-y-2 text-sm text-graphite">
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-graphite">
              Sources accessed on 28 August 2026. Equipment, race formats and
              qualification systems change — anyone entering an event should
              always check the current class rules and the notice of race.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
