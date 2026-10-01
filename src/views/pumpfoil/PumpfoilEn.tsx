import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { SECTION_ID, formatDate, localizedPath, sectionHref } from "@/lib/i18n";
import {
  LESSON_STATUS,
  PUMPFOIL_FAQ,
  PUMPFOIL_NAME,
  PUMPFOIL_UPDATED,
  lessonMailto,
} from "@/lib/pumpfoil";
import PumpfoilDiagram from "@/components/pumpfoil/PumpfoilDiagram";

/**
 * Pump foil learning page — ENGLISH VERSION (under /en).
 *
 * Created on 02.10.2026 as the counterpart to PumpfoilDe.tsx: same structure,
 * same claims, nothing added. British spelling, like the rest of the English
 * site (og:locale en_GB). "Pump foiling" follows the wording already used in
 * the English About text.
 *
 * What this page deliberately does NOT claim is listed in src/lib/pumpfoil.ts.
 * Metadata and JSON-LD live in the route (`src/app/(en)/en/pumpfoil/page.tsx`).
 */

const H2 = "font-display text-3xl tracking-wide text-ink sm:text-4xl";
const P = "mt-5 max-w-2xl text-pretty leading-relaxed text-graphite";
const SECTION = "mt-16 scroll-mt-24 border-t border-hairline pt-12";
const LINK = "text-ink underline underline-offset-4 hover:text-red";

const TOC = [
  { id: "what-is-pump-foiling", label: "What is pump foiling?" },
  { id: "before-you-start", label: "What you need to bring" },
  { id: "first-steps", label: "First steps" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "equipment", label: "Equipment" },
  { id: "safety", label: "Safety" },
  { id: "lessons", label: "Lessons with me" },
  { id: "faq", label: "FAQ" },
];

const PREREQUISITES = [
  ["Confident swimming", "You will fall in a lot, sometimes into deep water. Being a confident swimmer is the basis for everything else."],
  ["Basic fitness", "Pumping is intense, especially for your legs and core. The first flights often last only a few seconds — that is normal."],
  ["A feel for boards", "Experience from surfing, wakeboarding, wingfoiling, skateboarding or snowboarding helps with balance. It is not essential."],
  ["Patience", "Pump foiling takes a lot of attempts. Keeping going after the first falls pays off — just not on day one."],
  ["Health", "If you have problems with your knees, back or shoulders, check with a doctor first whether the load is right for you."],
];

const STEPS = [
  ["Start on land", "Practise the movement dry: surf stance, knees slightly bent, then weight and unweight in a steady rhythm. Have someone show you where your feet go on the board — later, that decides whether the board rises or dives."],
  ["Get the feeling of flight with help", "Many people first learn to fly with outside propulsion: behind a boat, on an eFoil or with a wing. That way you feel how the foil reacts before you have to create the speed yourself. It is not a must, but it can make the start easier."],
  ["Your first dock start", "On the dock, you take a run-up, jump onto the water with the board, land with both feet at the same time — and start pumping straight away. The first attempts usually end after a few metres. Check the water depth beforehand and whether the dock may be used."],
  ["Short and often", "Many short attempts with breaks are better than a few until you are exhausted. With tired legs, falls become less controlled."],
  ["Fly for longer", "Once the rhythm is there, turns, longer runs and eventually starting without a dock follow. Every new stage starts again with a few messy attempts."],
];

const MISTAKES = [
  ["Pumping too frantically", "Strength alone will not keep the board in the air. A calm, even rhythm carries you further than fast, hard pumping."],
  ["Weight too far back", "The board climbs too steeply, the foil reaches the surface and you fall. The other way round, too much weight at the front makes the nose dive."],
  ["Flying too high", "If the front wing gets too close to the surface, it loses lift and the board drops. Flying lower is safer at the start."],
  ["Stiff legs, looking down", "Looking at the board costs you balance and direction. Eyes forward, knees relaxed."],
  ["A front wing that is too small", "Small, fast wings are for experienced riders. To start with, a larger wing carries you much better at low speed."],
  ["Not enough water depth", "If the mast hits the bottom, the board stops abruptly. That can cause injuries and damage the equipment."],
];

const EQUIPMENT = [
  ["Board", "Short, light and usually low in volume. Many pump foil boards will not carry you standing still — they only work once you are moving."],
  ["Foil", "Mast, fuselage, front wing and rear wing. Pump foil front wings are often long and narrow because that lets them glide efficiently. For beginners, what matters most is enough lift at low speed."],
  ["Protection", "A helmet and an impact vest protect you from the board and foil when you fall. Depending on the water temperature, add a wetsuit."],
  ["Try before you buy", "Where possible, rent first or learn at a school that provides equipment. That way you find out what suits you before you invest."],
];

const SAFETY = [
  ["Enough water depth", "clearly more than the length of your mast. The foil must never touch the bottom."],
  ["Keep your distance", "from swimmers, boats, docks and other foilers. The wings of a foil are hard and have sharp edges."],
  ["Fall the right way", "away from the foil, as flat as possible, arms protecting your head. Only grab the board and foil once they are still."],
  ["Only where it is allowed", "Many docks are private or reserved for boats, and the rules differ from lake to lake and from one municipality to the next. Ask first."],
  ["Never alone", "Someone on shore knows where you are. In a thunderstorm, in the cold or in poor visibility, stay on land."],
  ["In an emergency", "in Switzerland, call 144 for an ambulance or 112 as the general emergency number."],
];

export default function PumpfoilEn() {
  const mailto = lessonMailto(CONTACT_EMAIL, "en");

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
              <li className="text-ink">{PUMPFOIL_NAME.en}</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">Getting started on the foil</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            LEARN TO PUMP FOIL
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
            Pump foiling is flying above the water with no wind, no waves and
            no motor — a board on a hydrofoil, powered only by your own pumping.
            This page covers what you should know to get started: what pump
            foiling is, what you need to bring, how the first attempts go, the
            mistakes almost everyone makes, and what matters for equipment and
            safety.
          </p>
          <p className={P}>
            I&rsquo;m Devin Hauser, an iQFOiL and Wingfoil racer from
            Switzerland. Alongside the racing classes, I also pump foil. Lessons
            with me are being planned but cannot be booked yet —{" "}
            <a href="#lessons" className={LINK}>
              here is where things stand
            </a>
            .
          </p>
          <p className="mt-5 max-w-2xl border-l-2 border-red pl-5 text-sm leading-relaxed text-ink">
            This page is a guide. It does not replace an introduction on the
            water from a qualified instructor.
          </p>

          <nav aria-label="On this page" className="mt-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              On this page
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block rounded-sm border border-hairline px-3 py-2 text-sm text-ink transition-colors hover:bg-mist"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── What is pump foiling? ────────────────────────────────────── */}
          <section id="what-is-pump-foiling" className={SECTION}>
            <h2 className={H2}>What is pump foiling?</h2>
            <p className={P}>
              In pump foiling you stand on a short, light board. Underneath it
              sits a foil: a mast with a large front wing and a small rear wing
              attached at the bottom. Once the board has enough speed, the front
              wing creates lift and raises the board out of the water — on the
              same principle as an aircraft wing.
            </p>
            <p className={P}>
              What makes it special is that there is no outside propulsion. No
              wind in a sail, no tow from a boat, no wave pushing you. Your speed
              comes from pumping — you weight and unweight the board in a steady
              rhythm. This moves the front wing through the water in a shallow
              wave, rather like a dolphin&rsquo;s tail, and drives you forward.
            </p>

            <PumpfoilDiagram lang="en" />

            <p className={P}>
              Most starts are from a dock, the so-called dock start: run-up,
              jump, land on the board and start pumping straight away. Many pump
              foil boards have so little volume that they will not carry you
              standing still. So everything starts from movement, and if you
              stop pumping, you sink.
            </p>
            <p className={P}>
              Pumping is valuable in other foil disciplines too: when
              wingfoiling, for example, it helps you get up on the foil earlier
              in light wind.
            </p>
          </section>

          {/* ── Before you start ─────────────────────────────────────────── */}
          <section id="before-you-start" className={SECTION}>
            <h2 className={H2}>What you need to bring</h2>
            <dl className="mt-6 max-w-2xl space-y-5">
              {PREREQUISITES.map(([title, text]) => (
                <div key={title}>
                  <dt className="font-body text-base font-medium text-ink">{title}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── First steps — a real sequence, hence numbered ────────────── */}
          <section id="first-steps" className={SECTION}>
            <h2 className={H2}>First steps</h2>
            <p className={P}>
              The road to the first longer flight is similar for almost
              everyone. How quickly it goes varies a lot.
            </p>
            <ol className="mt-6 max-w-2xl space-y-6">
              {STEPS.map(([title, text], index) => (
                <li key={title} className="grid grid-cols-[2.25rem,1fr] gap-x-3">
                  <span
                    aria-hidden
                    className="font-mono text-sm tabular-nums text-red"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body text-base font-medium text-ink">{title}</p>
                    <p className="mt-1 text-pretty leading-relaxed text-graphite">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Common mistakes ──────────────────────────────────────────── */}
          <section id="mistakes" className={SECTION}>
            <h2 className={H2}>Common mistakes</h2>
            <dl className="mt-6 max-w-2xl space-y-5">
              {MISTAKES.map(([title, text]) => (
                <div key={title}>
                  <dt className="font-body text-base font-medium text-ink">{title}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Equipment ────────────────────────────────────────────────── */}
          <section id="equipment" className={SECTION}>
            <h2 className={H2}>Equipment</h2>
            <p className={P}>
              Pump foil equipment is specialised. What suits you depends on your
              weight, your ability and your spot — which is why this page
              deliberately gives no sizes. Get advice and try before you buy.
            </p>
            <dl className="mt-6 max-w-2xl space-y-5">
              {EQUIPMENT.map(([title, text]) => (
                <div key={title}>
                  <dt className="font-body text-base font-medium text-ink">{title}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Safety ───────────────────────────────────────────────────── */}
          <section id="safety" className={SECTION}>
            <h2 className={H2}>Safety</h2>
            <ul className="mt-6 max-w-2xl space-y-4">
              {SAFETY.map(([title, text]) => (
                <li key={title} className="text-pretty leading-relaxed text-graphite">
                  <span className="font-medium text-ink">{title}:</span> {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl border-l-2 border-red pl-5 leading-relaxed text-ink">
              These notes are a guide. They do not replace an introduction on
              the water from a qualified instructor.
            </p>
          </section>

          {/* ── Lessons — honest status, not an offer ────────────────────── */}
          <section id="lessons" className={SECTION}>
            <h2 className={H2}>Pump foil lessons with me</h2>
            <p className={P}>
              I am planning to offer pump foil lessons. A few things need to be
              settled before anyone gets on the water with me — which is why
              none of it can be booked yet.
            </p>

            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-8">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Status as of {formatDate(PUMPFOIL_UPDATED, "en")}
              </p>
              <dl className="space-y-4">
                {LESSON_STATUS.en.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      {item.label}
                    </dt>
                    <dd className="font-body text-base text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className={P}>
              If you would like to learn pump foiling with me later on, send me
              an email. Three details help: the region where you would like to
              learn, your experience on the water and when you would generally
              be available. Your email helps me gauge how much interest there is
              and in which regions people would like lessons. It is not a
              booking or a place on a waiting list, and it does not commit you
              to anything. As soon as there is a concrete offer, I will update
              this page.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={mailto}
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
              >
                Register interest by email
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-block break-all py-3 font-mono text-sm text-ink underline underline-offset-4 hover:text-red"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <p className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-graphite">
              If you want to start now, the best place to learn is a water
              sports school with qualified instructors. How I handle emails is
              set out in the{" "}
              <Link href={localizedPath("/privacy-policy", "en")} className={LINK}>
                privacy policy
              </Link>
              .
            </p>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          <section id="faq" className={SECTION}>
            <h2 className={H2}>Frequently asked questions</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {PUMPFOIL_FAQ.en.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-body text-base font-medium text-ink">{item.q}</dt>
                  <dd className="mt-2 text-pretty leading-relaxed text-graphite">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── More ─────────────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>More from the foil</h2>
            <p className={P}>
              How the foil works in racing is explained on the page about
              iQFOiL, the Olympic windsurfing class. Who I am and what I train
              for is on the home page.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={localizedPath("/iqfoil", "en")}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                What is iQFOiL?
              </Link>
              <Link
                href={sectionHref("en", SECTION_ID.about)}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                About me
              </Link>
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Last revised on {formatDate(PUMPFOIL_UPDATED, "en")}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
