import Link from "next/link";
import { SOCIAL_PROFILES } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import FoilDiagram from "@/components/iqfoil/FoilDiagram";
import CourseDiagram from "@/components/iqfoil/CourseDiagram";

/**
 * iQFOiL-Pillar-Page — DEUTSCHE FASSUNG (Standardsprache, ohne Pfadpraefix).
 *
 * Inhaltlich neu aufgebaut am 29.08.2026 auf Basis des fact-gecheckten
 * Masterentwurfs „WEBSITE COPY — WAS IST iQFOiL — DE EN — 2026-08-28".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WAS AUS DER ALTEN FASSUNG BEWUSST VERSCHWUNDEN IST
 * ─────────────────────────────────────────────────────────────────────────────
 * Die alte Seite nannte Zahlen, die der Fact Check ausdruecklich sperrt:
 *   • Hoechstgeschwindigkeiten (35 kn / 65 km/h, persoenliche 32,3 kn).
 *     Der Fact Check fuehrt Hoechstgeschwindigkeit als ⛔ — sie schwankt zu
 *     stark, um als Klassenmerkmal zu taugen.
 *   • Segelgroessen (8 m² / 7,3 m²). Die Klasse hat sie per 01/2025 geaendert;
 *     der Master nennt deshalb bewusst GAR KEINE Zahl, nur „der Unterschied
 *     ist die Segelgroesse".
 *   • Boardmasse und Fluegelgroessen. Gleiche Begruendung: veraenderlich.
 * Die Erklaerungen selbst sind vollstaendig geblieben — nur die verderblichen
 * Zahlen sind raus.
 *
 * KEINE MASTLAENGE: Der Masterentwurf schreibt „unter dem Board steckt ein
 * Mast, 4,9 Meter lang". Die fruehere Fassung dieser Seite nannte, mit Quelle
 * Starboard, einen 95 cm langen FOIL-Mast. Die 4,9 m gehoeren zum Rigg, nicht
 * zum Foil — beide Angaben zusammen waeren falsch. Solange das nicht geklaert
 * ist, steht hier keine Zahl. Der Text traegt auch ohne sie.
 *
 * SCHREIBWEISE: Schweizer Hochdeutsch, durchgehend „ss", nie das Eszett.
 * Fachbegriffe der Klasse bleiben englisch — iQFOiL, Foil, Board, Rigg,
 * Upwind, Downwind, Course Racing, Slalom, Marathon, Medal Series.
 *
 * Metadata und JSON-LD liegen in der Route (`src/app/(de)/iqfoil/page.tsx`).
 */

// Gekuerzt gegenueber der Fassung vom 10.08.2026: Der alte Titel war 66 Zeichen
// lang und wurde in den Suchergebnissen abgeschnitten. Der neue traegt dieselbe
// Aussage in 45 Zeichen.
export const IQFOIL_DE_TITLE = "Was ist iQFOiL? Olympisches Windsurfen erklärt";
export const IQFOIL_DE_DESCRIPTION =
  "Die olympische Windsurfklasse verständlich erklärt: wie das Foil das Board aus dem Wasser hebt, warum alle dasselbe Material fahren und wie ein Rennen abläuft.";

const H2 = "font-display text-3xl tracking-wide text-ink sm:text-4xl";
// `text-pretty` statt `text-balance`: Bei mehrzeiligen Absaetzen ist genau
// das der richtige Schalter — er verhindert das einzelne Wort auf der
// letzten Zeile, ohne wie `text-balance` alle Zeilen gleich lang zu ziehen.
const P = "mt-5 max-w-2xl text-pretty leading-relaxed text-graphite";
const SECTION = "mt-16 border-t border-hairline pt-12";

/** Kleiner, ehrlicher Herkunfts-Marker. */
function Source({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-widest2 text-graphite">
      {children}
    </span>
  );
}

/**
 * Sechs Fragen, nicht mehr. Die frueheren sieben enthielten drei, die es nach
 * dem Fact Check nicht mehr geben darf; nachgerueckt ist nichts, was der Text
 * oben schon beantwortet.
 *
 * `structured` markiert die fuenf Fragen, die zusaetzlich als FAQPage-JSON-LD
 * ausgeliefert werden. Die Frage nach der Geschwindigkeit ist bewusst NICHT
 * dabei: Eine Antwort ohne Zahl taugt nicht als Suchergebnis-Snippet, und eine
 * Zahl waere unbelegt. Sie steht hier trotzdem, weil Leserinnen und Leser sie
 * stellen.
 */
export const FAQ_DE = [
  {
    q: "Was bedeutet iQFOiL?",
    a: "Der Name der Ausrüstung, die World Sailing für die olympischen Windsurf-Wettbewerbe ausgewählt hat — keine Abkürzung. Gemeint ist das Gesamtpaket aus Board, Segel und Foil.",
    structured: true,
  },
  {
    q: "Warum fliegt das Board?",
    a: "Weil die Flügel unter Wasser Auftrieb erzeugen, so wie ein Flugzeugflügel in der Luft. Ab genügend Geschwindigkeit reicht dieser Auftrieb, um Board und Fahrer anzuheben.",
    structured: true,
  },
  {
    q: "Haben wirklich alle dasselbe Material?",
    a: "Ja, innerhalb der Klassenregeln. Unterschiede entstehen über Einstellung, Technik und Entscheidungen — nicht über den Einkauf.",
    structured: true,
  },
  {
    q: "Wie gewinnt man ein Rennen?",
    a: "Mit einem guten Start, sauberem Speed, wenigen Fehlern in den Manövern und den richtigen Entscheidungen darüber, wo auf der Bahn man fährt.",
    structured: true,
  },
  {
    q: "Wie schnell ist iQFOiL?",
    a: "Schnell genug, dass die Manöver zur eigentlichen Herausforderung werden. Eine exakte Zahl sagt wenig: Das Tempo hängt von Wind, Welle, Kurs und Fahrer ab und schwankt stark.",
    structured: false,
  },
  {
    q: "Ist iQFOiL olympisch?",
    a: "Ja. Die Klasse hatte ihr olympisches Debüt bei den Spielen in Paris 2024 und löste dort das RS:X ab.",
    structured: true,
  },
];

const FORMATS = [
  { name: "Slalom", dauer: "4–7 Minuten", art: "alle gleichzeitig, downwind, sehr schnell" },
  { name: "Course Racing", dauer: "16–23 Minuten", art: "Upwind–Downwind, taktisch" },
  { name: "Marathon", dauer: "60–90 Minuten", art: "Ausdauer, lange Distanz" },
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

export default function IqfoilDe() {
  return (
    <main>
      <article className="section-pad !pt-24 sm:!pt-28 md:!pt-40 lg:!pt-48 bg-white">
        <div className="mx-auto max-w-content">
          <nav aria-label="Brotkrumennavigation" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              <li>
                <Link href={localizedPath("/", "de")} className="hover:text-ink">
                  Startseite
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">iQFOiL</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">Der Sport</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            WAS IST iQFOiL?
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
            iQFOiL ist die olympische Windsurfklasse. Das Board liegt nicht im
            Wasser, sondern fliegt darüber — auf einem Hydrofoil, einem Flügel
            unter der Wasseroberfläche. Ich fahre diese Klasse international, und
            hier erkläre ich, wie sie funktioniert.
          </p>

          {/* ── 2 · Vom Windsurfen zum Fliegen ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Vom Windsurfen zum Fliegen</h2>
            <p className={P}>
              Klassisches Windsurfen kennen die meisten: Board, Segel, Finne — das
              Board gleitet über das Wasser. iQFOiL beginnt gleich, der
              Unterschied hängt darunter. Unter dem Board steckt ein Mast, und
              unten daran sitzen zwei Flügel: ein grosser Frontflügel und ein
              kleinerer Heckflügel. Zusammen ergeben sie das Foil.
            </p>

            <FoilDiagram lang="de" />

            <p className={P}>
              Bei wenig Tempo bremsen die Flügel sogar leicht. Ab einer gewissen
              Geschwindigkeit kippt das: Sie erzeugen Auftrieb, nach demselben
              Prinzip wie ein Flugzeugflügel, nur im dichteren Medium. Wasser ist
              rund achthundertmal dichter als Luft, deshalb genügt eine
              Flügelfläche etwa von der Grösse eines Unterarms, um Fahrer und
              Material anzuheben. Das Board steigt, bis nur noch der Mast
              eintaucht — der grösste Teil des Wasserwiderstands fällt weg, und
              es wird schlagartig ruhig und schnell.
            </p>
            <p className={P}>
              Der Heckflügel hält die Balance. Zu viel Auftrieb, und das Foil
              schiesst aus dem Wasser; zu wenig, und man fällt zurück. Diese
              Balance über Minuten zu halten, bei Wellen und drehendem Wind, ist
              der Teil, den man wirklich lernen muss.
            </p>
          </section>

          {/* ── 3 · Das Material ─────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Das Material</h2>
            <p className={P}>
              iQFOiL ist eine One-Design-Klasse: Alle fahren dasselbe Material
              innerhalb der Klassenregeln — gleiches Board, gleiches Foil,
              gleicher Mast. Der einzige Unterschied zwischen den Wettbewerben
              der Männer und der Frauen ist die Segelgrösse. Bei sehr wenig Wind
              erlaubt die Klasse zusätzlich eine klassische Finne statt des
              Foils. Gefahren wird also nicht immer fliegend — nur meistens.{" "}
              <Source>Quelle: RYA</Source>
            </p>
            <p className={P}>
              Das klingt, als müssten dann alle gleich schnell sein. Sind sie
              nicht. Gleiches Material heisst nur: Niemand kann sich einen
              Vorteil kaufen. Was bleibt, ist die Einstellung — Foilposition,
              Segeltrimm, Fussschlaufen, Flughöhe. Jede davon verändert das
              Verhalten bei diesem Wind, dieser Welle, diesem Kurs, und was heute
              richtig ist, kann morgen falsch sein.
            </p>
            <p className={P}>
              Genau das mag ich an der Klasse. Es gibt keine Ausrede über das
              Material. Wer schneller ist, hat besser eingestellt, besser gelesen
              oder besser gefahren.
            </p>
          </section>

          {/* ── 4 · Wie ein Rennen funktioniert ──────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Wie ein Rennen funktioniert</h2>
            <p className={P}>
              Ein Rennen beginnt an einer Startlinie zwischen zwei Marken. Alle
              starten gleichzeitig, und das Starttiming ist bereits die halbe
              Miete: eine Sekunde zu früh und man wird zurückgeschickt, eine
              Sekunde zu spät und man fährt im verwirbelten Wind der anderen.
            </p>
            <p className={P}>
              Danach folgt ein Kurs, abgesteckt durch Bojen: Upwind gegen den
              Wind im Zickzack, weil man nicht direkt hineinfahren kann, und
              Downwind zurück, deutlich schneller. An jeder Boje wird gewendet
              oder gehalst. Diese Manöver entscheiden Rennen — wer dabei vom Foil
              fällt, verliert Sekunden, die kaum aufzuholen sind.
            </p>

            <CourseDiagram lang="de" />

            <p className={P}>
              Nicht jedes Rennen läuft gleich ab. Die Klasse kennt mehrere
              Formate, und welche gefahren werden, steht in der Ausschreibung des
              jeweiligen Events. Bei den Olympischen Spielen in Paris 2024 waren
              es drei:
            </p>

            {/* Eigener Scroll-Container: Die Tabelle hat drei Spalten und darf
                auf 375 px die Seite nicht seitlich schieben. */}
            <div className="mt-6 max-w-2xl overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Format
                    </th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Dauer
                    </th>
                    <th className="py-3 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                      Charakter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FORMATS.map((f) => (
                    <tr key={f.name} className="border-b border-hairline">
                      <td className="py-3 pr-4 font-medium text-ink">{f.name}</td>
                      <td className="py-3 pr-4 text-graphite">{f.dauer}</td>
                      <td className="py-3 text-graphite">{f.art}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={P}>
              Nach mehreren Renntagen kamen dort die besten zehn in eine Medal
              Series mit Viertel-, Halb- und Grossfinale. Andere Events setzen
              andere Schwerpunkte. <Source>Quelle: iQFOiL Class Official</Source>
            </p>
          </section>

          {/* ── 5 · Was einen schnellen Fahrer ausmacht ──────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Was einen schnellen Fahrer ausmacht</h2>
            <p className={P}>
              One Design heisst nicht, dass nur Gewicht oder Material zählen. Es
              heisst, dass alles andere zählt.
            </p>
            <dl className="mt-6 max-w-2xl space-y-5">
              {[
                ["Start", "Volle Fahrt genau im Moment des Signals, an der richtigen Stelle der Linie. Ein schlechter Start kostet mehr, als Material je bringen könnte."],
                ["Speed und Tuning", "Tempo bei möglichst hohem Winkel zum Wind — und die passende Einstellung dazu. Die von heute Morgen ist am Nachmittag vielleicht falsch."],
                ["Manöver", "Eine Halse, bei der das Board auf dem Foil bleibt, ist Gold wert. Eine, bei der man abfällt, kostet zehn Sekunden."],
                ["Taktik und Strategie", "Strategie ist der Plan vor dem Start: welche Bahnseite, welcher Wind. Taktik ist, was davon übrig bleibt, wenn dreissig andere dasselbe wollen."],
                ["Balance, Fitness und Kopf", "Korrekturen im Zehntelsekundenbereich, mehrere Läufe pro Tag, Marathondistanzen — und am Ende entscheidet, wer im letzten Lauf noch klar denkt."],
              ].map(([titel, text]) => (
                <div key={titel}>
                  <dt className="font-body text-base font-medium text-ink">
                    {titel}
                  </dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 6 · Warum iQFOiL olympisch ist ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Warum iQFOiL olympisch ist</h2>
            <p className={P}>
              World Sailing hat iQFOiL als Material für die Windsurf-Wettbewerbe
              der Olympischen Spiele Paris 2024 bestimmt — als Ablösung des RS:X,
              das über mehrere Spiele gefahren wurde. Paris 2024 war damit das
              olympische Debüt der Klasse. Es gibt einen Wettbewerb für Männer
              und einen für Frauen, mit identischem Material bis auf die
              Segelgrösse. <Source>Quelle: RYA</Source>
            </p>
            <p className={P}>
              Wie die Qualifikation funktioniert, ist der Teil, den viele
              überraschend finden: Der Startplatz gehört nicht dem Athleten,
              sondern dem Land. Für Paris 2024 galt pro Nation und Wettbewerb
              maximal ein Startplatz. Die Plätze wurden über mehrere Wege
              vergeben — Weltmeisterschaft, kontinentale Ausscheidungen, eine
              letzte Chance-Regatta, dazu Gastgeberland und Universality-Plätze.
              Welcher Athlet den Platz dann tatsächlich bekommt, entscheidet der
              nationale Verband nach seinen eigenen Kriterien.{" "}
              <Source>Quelle: World Sailing</Source>
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-red pl-5 leading-relaxed text-ink">
              Das war der Stand für Paris 2024. Qualifikationssysteme werden für
              jede Ausgabe neu festgelegt. Was für die nächsten Spiele gilt, ist
              damit nicht automatisch dasselbe.
            </p>
          </section>

          {/* ── 7 · Mein Weg ─────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Mein Weg</h2>
            <p className={P}>
              Mit sieben stand ich das erste Mal auf einem Brett. Seither will
              ich am liebsten jeden Tag aufs Wasser. Angefangen habe ich bei
              nationalen Nachwuchsregatten, danach kamen die internationalen:
              erst U17, dann zwei Jahre U19, inzwischen die U23- und
              Senior-Kategorie. Jede Stufe bedeutet ein grösseres Feld und ein
              höheres Niveau — und jedes Mal fängt man gefühlt wieder unten an.
            </p>
            <p className={P}>
              Mein langfristiges Ziel ist es, die Schweiz an den Olympischen
              Spielen zu vertreten. Ohne fixes Jahr. Das entscheidet sich über
              Resultate und über den Verband, nicht über Ankündigungen. Bis dahin
              geht es um jeden Trainingstag — im Sommer meist auf dem
              Silvaplanersee.
            </p>
            <p className={P}>
              Wo ich aktuell stehe, steht bei den{" "}
              <Link
                href="/#highlights"
                className="text-ink underline underline-offset-4 hover:text-red"
              >
                Resultaten
              </Link>
              .
            </p>
          </section>

          {/* ── 8 · iQFOiL und Wingfoil Racing ───────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>iQFOiL und Wingfoil Racing</h2>
            <p className={P}>
              Ich fahre neben iQFOiL auch Wingfoil Racing. Gemeinsam haben die
              beiden das Wichtigste: ein Foil unter dem Board, ein Kurs mit
              Bojen, ein Start, an dem alles hängt, und dieselbe Frage — wer ist
              bei diesem Wind am schnellsten von A nach B?
            </p>
            <p className={P}>
              Unterschiedlich ist der Antrieb: Beim Wingfoilen hält man einen
              aufblasbaren Wing frei in den Händen, statt ein Rigg mit Mast auf
              dem Board zu haben. Das verändert Starts, Handling und Manöver, und
              die Kurse sind oft enger gesteckt. Getaktet wird anders, gedacht
              wird gleich.
            </p>
            <p className={P}>
              Für mein iQFOiL-Training ist das wertvoll: andere Taktiken, andere
              Gegner, und ich bleibe auch dann auf dem Foil, wenn die
              iQFOiL-Saison Pause macht. Wingfoil Racing ist keine olympische
              Klasse — ich fahre es, weil es mich besser macht.
            </p>
          </section>

          {/* ── 9 · Häufige Fragen ───────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Häufige Fragen</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {FAQ_DE.map((item) => (
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

          {/* ── 10 · Abschluss ───────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Wenn du mehr sehen willst</h2>
            <p className={P}>
              Bilder aus den Regatten der letzten Saisons liegen in der Galerie,
              die aktuellen Platzierungen bei den Resultaten. Wie eine
              Zusammenarbeit aussehen kann, steht bei der Partnerschaft.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/#highlights"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Resultate
              </Link>
              <Link
                href={localizedPath("/media", "de")}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Galerie
              </Link>
              <Link
                href="/#sponsoring"
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
              >
                Partnerschaft
              </Link>
            </div>

            <p className="mt-10 max-w-2xl text-pretty text-sm leading-relaxed text-graphite">
              Auf{" "}
              <Link
                href="/#social-media"
                className="text-ink underline underline-offset-4 hover:text-red"
              >
                Social Media
              </Link>{" "}
              poste ich, was zwischen den Rennen passiert — Material, Anreise,
              Trainingsblöcke:{" "}
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

          {/* ── Quellen ──────────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Quellen für die technischen Angaben auf dieser Seite
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
              Quellen abgerufen am 28. August 2026. Material, Rennformate und
              Qualifikationssysteme der Klasse ändern sich — wer an einem Event
              startet, prüft deshalb immer die aktuellen Klassenregeln und die
              Ausschreibung.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
