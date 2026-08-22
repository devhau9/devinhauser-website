import Image from "next/image";
import Link from "next/link";
import { SOCIAL_PROFILES } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";

/**
 * IQFoil-Pillar-Page — ENGLISCHE FASSUNG.
 *
 * Warum diese Seite existiert: Die Startseite ist eine One-Page-Athletenseite.
 * Für informationsgetriebene Suchen ("what is iqfoil", "iqfoil equipment",
 * "iqfoil race formats") gab es bisher keine einzige eigene URL — die Site war
 * am 10.08.2026 mit genau EINER Seite im Google-Index.
 *
 * Redaktionelles Prinzip, sichtbar umgesetzt:
 *   • Alles, was aus offiziellen Quellen stammt, ist als solches markiert und
 *     unten mit Quelle und Abrufdatum belegt.
 *   • Alles, was Devins eigene Erfahrung ist, ist als solche markiert.
 *   • Es wird nichts behauptet, was nicht belegt oder eigene Erfahrung ist.
 *   • Keine fixe Olympia-Jahreszahl für Devins eigenes Ziel.
 *
 * Bewusst KEIN FAQPage-Structured-Data: Google zeigt FAQ-Rich-Results seit 2023
 * praktisch nur noch für Behörden- und Gesundheitsseiten. Das Markup hier
 * einzubauen brächte keinen Nutzen und wäre reine Optimierung für die Maschine.
 * Der FAQ-Abschnitt existiert für Leser.
 *
 * Metadata, Article-JSON-LD und BreadcrumbList-JSON-LD liegen NICHT mehr hier,
 * sondern in der Route (`src/app/(en)/en/iqfoil/page.tsx`). Diese Datei ist
 * reiner Seiteninhalt; Titel und Beschreibung werden für die Route exportiert.
 */

export const IQFOIL_EN_TITLE =
  "What Is IQFoil? Olympic Windsurfing Explained by a Swiss Racer";
export const IQFOIL_EN_DESCRIPTION =
  "IQFoil is the Olympic windsurfing class — a board that flies above the water on a hydrofoil. Swiss racer Devin Hauser explains the equipment, the race formats, the speeds and what it actually feels like.";

const H2 = "font-display text-3xl tracking-wide text-ink sm:text-4xl";
const P = "mt-5 max-w-2xl leading-relaxed text-graphite";

/** Kleiner, ehrlicher Herkunfts-Marker. */
// Kontrast: vorher text-graphite/60 bei 11px — rund 2.6:1 gegen Weiss und
// damit unter der WCAG-AA-Grenze von 4.5:1. Ausgerechnet der Herkunftsnachweis
// war das am schlechtesten lesbare Element der Seite. Jetzt volles graphite.
function Source({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-widest2 text-graphite">
      {children}
    </span>
  );
}

const FAQ = [
  {
    q: "Is IQFoil an Olympic class?",
    a: "Yes. According to the RYA, iQFOiL was introduced by World Sailing as the new Olympic windsurfing equipment for the Paris 2024 cycle, replacing the RS:X class that had been used up to Tokyo 2020.",
  },
  {
    q: "How fast does an IQFoil go?",
    a: "Starboard, the class board manufacturer, describes the package as working from 5 to 35 knots of wind (roughly 9 to 65 km/h). Board speed depends on wind, water and rider — my own personal top speed on the equipment is 32.3 knots, which is roughly 60 km/h.",
  },
  {
    q: "What equipment is used?",
    a: "One board, one foil, one sail per rider — the same for everyone in the fleet. Starboard lists the class board as 220 × 95 cm with 196 litres of volume, and the class foil with a 900 front wing, a 255 tail wing and a 95 cm foil mast. Men race an 8 m² sail, women a 7.3 m² sail.",
  },
  {
    q: "How does an IQFoil race work?",
    a: "The class runs three disciplines in the opening series — Course Racing, Sprint Slalom and Marathon — and then a Medal Series for the titles. The RYA describes race days with as many as six races and a knockout Medal Series for the top ten riders in each fleet.",
  },
  {
    q: "How is IQFoil different from normal windsurfing?",
    a: "The hull leaves the water. On a classic windsurf board you are planing — skimming along on top of the water — and fighting drag; on a foil the board lifts clear and rides on a wing under the water. It is quieter, faster in light wind, and it fails differently — when it goes wrong you come down, you do not just slow down.",
  },
  {
    q: "Is IQFoil hard to learn?",
    a: "Getting up on the foil is not the hard part — most windsurfers manage that in a few sessions. Staying at the right height, gybing (turning downwind through the wind) without touching down, and doing all of it in a fleet at racing speed is what takes years.",
  },
  {
    q: "What wind range does IQFoil race in?",
    a: "US Sailing describes course racing as taking place in more than 12 knots (about 22 km/h), sprint slalom between roughly 6 and 15 knots (about 11 to 28 km/h), and the marathon as a double-points distance race.",
  },
];

const SOURCES = [
  {
    label: "iQFOiL Class Official — The Class",
    href: "https://www.iqfoilclassofficial.org/the-class",
  },
  {
    label: "Starboard iQFOiL — Equipment",
    href: "https://iqfoil.star-board.com/equipment/iqfoil-class/",
  },
  {
    label: "Royal Yachting Association — What is the iQFOiL",
    href: "https://www.rya.org.uk/iqfoil-worlds-2026/what-is-the-iqfoil/",
  },
  {
    label: "US Sailing — iQFOiL one-design profile",
    href: "https://www.ussailing.org/one-design-profile/iq-foil/",
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
                <Link
                  href={localizedPath("/", "en")}
                  className="hover:text-ink"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">IQFoil</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">The sport</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            WHAT IS IQFOIL?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
            IQFoil is the Olympic windsurfing class. The board does not sail on
            the water — it flies above it, carried by a wing under the surface.
            I race it, so this page is the version I wish I&apos;d found when I
            started.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-graphite">
            Everything technical on this page is marked with its source. Everything
            else is my own experience, and it&apos;s marked as that.
          </p>

          {/* Ein Bild, bevor der erste Fliesstext kommt.
              BILDWAHL IST EINE RECHTEENTSCHEIDUNG: verwendet wird bewusst
              /images/DSCF0515.jpg — bereits auf der Startseite veroeffentlicht,
              ohne fremden Copyright- oder Agenturvermerk in den Metadaten.
              NICHT verwendet werden iqfoil-action.jpg und
              hero-iqfoil-silvaplana.jpg: beide tragen PhotoShelter-Spuren, also
              Hinweise auf eine Fotografen-Auslieferungsplattform. Solange die
              Herkunft nicht geklaert ist, kommen sie auf keine neue Seite. */}
          <figure className="mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-mist">
              <Image
                src="/images/DSCF0515.jpg"
                alt="An IQFoil board lifted clear of the water on its hydrofoil, only the foil mast still in the surface"
                fill
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="object-cover object-[50%_40%]"
                priority
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-graphite">
              The whole board is out of the water. Everything holding it up is
              under the surface, on a mast about as long as your arm.
            </figcaption>
          </figure>

          {/* ── What is it ───────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>A one-design Olympic class</h2>
            <p className={P}>
              IQFoil is windsurfing on a hydrofoil, and it is a strict one-design
              class: every racer in the fleet uses the same board, the same foil
              and the same sail. The class puts it plainly — the aim is to make
              racing as fair as possible, which is why the equipment is
              one-design.
            </p>
            <p className={P}>
              The Royal Yachting Association describes iQFOiL as the equipment
              World Sailing introduced for Olympic windsurfing in the Paris 2024
              cycle, replacing the RS:X class that had been raced up to Tokyo
              2020.
            </p>
            <p className="mt-4">
              <Source>Sources: iQFOiL Class Official · RYA</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                One-design is the part people underestimate. Nobody buys speed
                here. If the rider next to me is faster, it is because they are
                fitter, smoother or read the wind better — not because they have
                better gear. That is brutal and it is the reason I like it.
              </p>
            </div>
          </section>

          {/* ── How the foil works ───────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>How the foil actually works</h2>
            <p className={P}>
              Under the board sits a mast with two wings: a large one at the
              front and a small one at the back. As speed builds, those wings
              generate lift in exactly the way an aircraft wing does — and once
              the lift exceeds the weight of board, rig and rider, the hull
              leaves the water.
            </p>
            <p className={P}>
              From that moment on, almost nothing is touching the surface. Drag
              collapses, and the board keeps accelerating in wind that would
              barely have you planing — skimming on top of the water — on a normal
              windsurf board. That is why
              foiling classes race in light air where conventional windsurfing
              would be sitting on the beach.
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                The first time it lifts, the noise stops. That is the part nobody
                tells you about. A windsurf board at speed is loud — slapping,
                spray, vibration. On the foil it goes quiet, and you are suddenly
                doing the work with your feet instead of your arms, constantly
                correcting height by a few centimetres at a time.
              </p>
            </div>
          </section>

          {/* ── Equipment ────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>The equipment</h2>
            <p className={P}>
              Starboard, which builds the class equipment, lists the board at
              220 × 95 cm with 196 litres of volume, and the class foil with a
              900 front wing, a 255 tail wing, a 115 or 95 fuselage and a 95 cm
              foil mast. Sail sizes are the one thing that differ between fleets:
              men race 8 m², women 7.3 m².
            </p>
            <p className={P}>
              One detail worth getting right, because it confuses people: the
              95 cm mast is the <em>foil</em> mast, the part under the water. The
              rig mast that carries the sail is a different component again — the
              RYA gives it as 4.9 m. Two masts, two very different jobs.
            </p>
            <p className="mt-4">
              <Source>Sources: Starboard iQFOiL · RYA · iQFOiL Class Official</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                It is one board, one foil, one sail, and it travels in two bags
                and a board bag. What eats the time is not the sailing — it is
                rigging, de-rigging, rinsing salt out of the foil and checking
                every screw before you go out. Get sloppy with the hardware and
                the foil tells you about it at 30 knots — around 55 km/h.
              </p>
            </div>
          </section>

          {/* ── Formats ──────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>How racing is structured</h2>
            <p className={P}>
              The class runs three different disciplines in the opening series —
              Course Racing, Sprint Slalom and Marathon — and then a Medal Series
              where the titles are decided. US Sailing describes course racing as
              traditional upwind–downwind racing in more than 12 knots of wind
              (about 22 km/h), sprint slalom as a reaching start into a downwind
              course with several gybe marks (a gybe is a turn downwind, through
              the wind) in roughly 6 to 15 knots (about 11 to 28 km/h), and the
              marathon as a double-points distance race.
            </p>
            <p className={P}>
              The RYA describes what that means for a regatta day: stamina-heavy
              marathons, tactical course racing, short intense slalom sprints, and
              as many as six races in a single day — with the ten best riders in
              each fleet going into a knockout Medal Series after the opening
              series.
            </p>
            <p className="mt-4">
              <Source>Sources: iQFOiL Class Official · US Sailing · RYA</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Three formats in one regatta is what makes this class hard.
                Marathon rewards patience, slalom rewards nerve, course racing
                rewards tactics — and you switch between them on the same day, on
                the same equipment, often with twenty minutes to eat in between.
                A good marathon rider can have a bad slalom day and lose an
                entire regatta by lunchtime.
              </p>
            </div>
          </section>

          {/* ── Speed & demands ──────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Speed, and what it costs you</h2>
            <p className={P}>
              Starboard describes the package as working from 5 to 35 knots of
              wind — fin or foil, one board, one foil, one fin, one sail. Actual
              board speed depends on wind, water state and rider.
            </p>
            <p className={P}>
              My own top speed on this equipment is 32.3 knots, which is about
              60 km/h. That is a personal number from my own sessions, not a class
              figure.
            </p>
            <p className="mt-4">
              <Source>Source: Starboard iQFOiL · personal figure: Devin Hauser</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                People see the speed and assume it is an arms sport. It is legs
                and core. You are in a semi-squat holding a rig against full
                pressure, making tiny height corrections with your feet, for the
                length of a race — and then doing it again four more times that
                day. What ends most people is not one hard moment, it is the
                accumulation.
              </p>
            </div>
          </section>

          {/* ── Silvaplana ───────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Racing at altitude — Silvaplana</h2>
            <p className={P}>
              In summer I train on Lake Silvaplana in the Engadin, at around 1 800 m
              above sea level. The regional tourism board describes the Maloja
              wind there as blowing at 3 to 6 Beaufort, which is roughly 12 to
              49 km/h — a steady breeze at the bottom of that range, a properly
              strong one at the top. The same source calls Silvaplana
              Switzerland&apos;s best-known windsurfing lake, with the season
              running roughly from mid-May to the end of September.
            </p>
            <p className={P}>
              It is also a venue the class travels to: iQFOiL events have been
              held there repeatedly, including World Championship and
              International Games racing.
            </p>
            <p className="mt-4">
              <Source>Sources: Engadin Tourismus · iQFOiL Class Official</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                My take
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Silvaplana is a thermal spot, so the day has a shape: mornings are
                usually quiet, the wind fills in over lunch and then it is on. Thin
                air at altitude means slightly less power in the sail for the same
                wind speed, and the water is cold enough that you notice it on
                long days. Most of the fleet flies in for a week. I get to train
                there all summer, which is probably the single biggest advantage
                I have.
              </p>
            </div>
          </section>

          {/* ── Why I race it ────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Why I race it</h2>
            <p className={P}>
              I started windsurfing in 2014, moved onto a foil in 2019 and into
              IQFoil in 2021. I race internationally and I am now competing in the
              senior fleet. My long-term goal is to represent Switzerland at the
              Olympic Games — that is the road I am on, and I am not going to put
              a year on it.
            </p>
            <p className={P}>
              Alongside the racing I shoot and edit my own photo and video, which is
              why most of what you see on this site was taken from inside the
              sport rather than from the beach.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/en#ueber-mich"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                About me
              </Link>
              <Link
                href="/en#highlights"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                My results
              </Link>
              <a
                href="/en#partner"
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
              >
                Partner with me
              </a>
            </div>

            {/* Die meisten Leute landen ueber eine Suche wie "what is iqfoil"
                auf dieser Seite, nachdem sie irgendwo einen Clip gesehen haben.
                Ohne diesen Block waere der einzige Weg zu den Kanaelen die
                Startseite — auf dem Handy hiesse das: die ganze Seite scrollen.
                Drei Links kosten nichts und beantworten die naheliegendste
                Anschlussfrage: "wo sehe ich mehr davon?" */}
            <p className="mt-10 text-sm leading-relaxed text-graphite">
              I film most of my own sessions. If you want to see what this
              actually looks like rather than read about it:{" "}
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

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Common questions</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-body text-base font-medium text-ink">
                    {item.q}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-graphite">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Sources ──────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Sources for the technical facts on this page
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
              <li>Engadin Tourismus — Windsurfing Silvaplana</li>
            </ul>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-graphite">
              Sources checked 10 August 2026. Class equipment and formats do change
              — if you are entering an event, always check the current class rules
              and the notice of race.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
