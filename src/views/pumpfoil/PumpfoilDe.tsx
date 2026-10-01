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
 * Pumpfoil-Lernseite — DEUTSCHE FASSUNG (Standardsprache, ohne Pfadpraefix).
 *
 * Angelegt am 02.10.2026. Zielgruppe: Menschen, die Pumpfoil lernen wollen und
 * spaeter vielleicht Lektionen bei Devin nehmen moechten. Die Seite soll
 * zuerst wirklich helfen — die Lektionen sind ein ehrlicher Ausblick am Ende,
 * kein Verkaufstext.
 *
 * QUELLENLAGE: Die Erklaerungen sind allgemeines, unstrittiges Grundwissen
 * zum Pumpfoilen, bewusst OHNE Zahlen (keine Fluegelflaechen, Mastlaengen,
 * Boardvolumen, Lerndauer). Solche Werte haengen von Gewicht, Material und
 * Spot ab und waeren ohne Quelle eine Behauptung. Ueber Devin steht hier nur,
 * was auf der Website bereits belegt ist: iQFOiL- und Wingfoil-Racer aus der
 * Schweiz, faehrt auch Pumpfoil (siehe About.tsx).
 *
 * Was hier bewusst NICHT steht, steht in src/lib/pumpfoil.ts.
 *
 * SCHREIBWEISE: Schweizer Hochdeutsch, durchgehend „ss", nie das Eszett.
 * Metadata und JSON-LD liegen in der Route (`src/app/(de)/pumpfoil/page.tsx`).
 */

const H2 = "font-display text-3xl tracking-wide text-ink sm:text-4xl";
const P = "mt-5 max-w-2xl text-pretty leading-relaxed text-graphite";
const SECTION = "mt-16 scroll-mt-24 border-t border-hairline pt-12";
const LINK = "text-ink underline underline-offset-4 hover:text-red";

const TOC = [
  { id: "was-ist-pumpfoil", label: "Was ist Pumpfoil?" },
  { id: "voraussetzungen", label: "Was du mitbringen solltest" },
  { id: "erste-schritte", label: "Die ersten Schritte" },
  { id: "fehler", label: "Häufige Fehler" },
  { id: "ausruestung", label: "Ausrüstung" },
  { id: "sicherheit", label: "Sicherheit" },
  { id: "lektionen", label: "Lektionen bei mir" },
  { id: "fragen", label: "Häufige Fragen" },
];

const PREREQUISITES = [
  ["Sicher schwimmen", "Du fällst oft ins Wasser, manchmal ins Tiefe. Sicheres Schwimmen ist die Grundlage für alles andere."],
  ["Grundfitness", "Pumpen ist intensiv, vor allem für Beine und Rumpf. Die ersten Flüge dauern oft nur wenige Sekunden — das ist normal."],
  ["Gefühl fürs Board", "Erfahrung vom Surfen, Wakeboarden, Wingfoilen, Skaten oder Snowboarden hilft beim Gleichgewicht. Zwingend ist sie nicht."],
  ["Geduld", "Pumpfoil braucht viele Versuche. Wer nach den ersten Stürzen weitermacht, wird belohnt — aber nicht am ersten Tag."],
  ["Gesundheit", "Wer Beschwerden an Knien, Rücken oder Schultern hat, klärt vorher ärztlich ab, ob die Belastung passt."],
];

const STEPS = [
  ["An Land beginnen", "Übe die Bewegung trocken: Surfstellung, leicht in den Knien, dann rhythmisch belasten und entlasten. Lass dir zeigen, wo deine Füsse auf dem Board stehen — sie entscheiden später, ob das Board steigt oder taucht."],
  ["Das Fluggefühl mit Hilfe holen", "Viele lernen das Fliegen zuerst mit Antrieb von aussen: hinter einem Boot, auf einem E-Foil oder mit einem Wing. So spürst du, wie das Foil reagiert, bevor du selbst für das Tempo sorgen musst. Ein Muss ist das nicht, es kann den Einstieg aber erleichtern."],
  ["Der erste Dockstart", "Am Steg nimmst du Anlauf, springst mit dem Board aufs Wasser, landest mit beiden Füssen gleichzeitig — und pumpst sofort. Die ersten Versuche enden meist nach wenigen Metern. Prüfe vorher die Wassertiefe und ob der Steg genutzt werden darf."],
  ["Kurz und oft", "Lieber viele kurze Versuche mit Pausen als wenige bis zur Erschöpfung. Mit müden Beinen werden Stürze unkontrollierter."],
  ["Länger fliegen", "Sitzt der Rhythmus, kommen Kurven, längere Strecken und irgendwann der Start ohne Steg dazu. Jede neue Stufe beginnt wieder mit ein paar unsauberen Versuchen."],
];

const MISTAKES = [
  ["Zu hektisch pumpen", "Kraft allein hält das Board nicht in der Luft. Ein ruhiger, gleichmässiger Rhythmus trägt weiter als schnelles, hartes Pumpen."],
  ["Gewicht zu weit hinten", "Das Board steigt zu steil, das Foil kommt an die Oberfläche, und du fällst. Umgekehrt lässt zu viel Gewicht vorn die Nase eintauchen."],
  ["Zu hoch fliegen", "Kommt der Frontflügel zu nah an die Wasseroberfläche, verliert er Auftrieb, und das Board fällt ab. Anfangs ist niedriger fliegen sicherer."],
  ["Steife Beine, Blick nach unten", "Wer aufs Board schaut, verliert Balance und Richtung. Blick nach vorn, Knie locker."],
  ["Zu kleiner Frontflügel", "Kleine, schnelle Flügel sind für Geübte. Für den Einstieg trägt ein grösserer Flügel bei wenig Tempo deutlich besser."],
  ["Zu wenig Wassertiefe", "Läuft der Mast auf Grund, stoppt das Board abrupt. Das kann zu Verletzungen und Materialschäden führen."],
];

const EQUIPMENT = [
  ["Board", "Kurz, leicht und meist mit wenig Volumen. Viele Pumpfoilboards tragen dich im Stand nicht — sie funktionieren erst in Bewegung."],
  ["Foil", "Mast, Rumpf, Frontflügel und Heckflügel. Pumpfoil-Frontflügel sind oft lang und schmal, weil sie damit effizient gleiten. Für den Anfang zählt vor allem genug Auftrieb bei wenig Tempo."],
  ["Schutz", "Helm und Prallschutzweste schützen bei Stürzen vor Board und Foil. Je nach Wassertemperatur kommt ein Neoprenanzug dazu."],
  ["Testen vor dem Kauf", "Wo es möglich ist, zuerst mieten oder bei einer Schule mit Material lernen. So merkst du, was zu dir passt, bevor du investierst."],
];

const SAFETY = [
  ["Genug Wassertiefe", "deutlich mehr, als dein Mast lang ist. Das Foil darf nie den Grund berühren."],
  ["Abstand halten", "zu Schwimmenden, Booten, Stegen und anderen Foilern. Die Flügel eines Foils sind hart und haben scharfe Kanten."],
  ["Richtig fallen", "weg vom Foil, möglichst flach aufs Wasser, die Arme schützen den Kopf. Board und Foil erst greifen, wenn sie ruhig liegen."],
  ["Nur, wo es erlaubt ist", "Viele Stege sind privat oder für Schiffe reserviert, und die Regeln unterscheiden sich je nach See und Gemeinde. Frag vorher nach."],
  ["Nicht allein", "Jemand am Ufer weiss, wo du bist. Bei Gewitter, Kälte oder schlechter Sicht bleibst du an Land."],
  ["Im Notfall", "Sanitätsnotruf 144, allgemeiner Notruf 112."],
];

export default function PumpfoilDe() {
  const mailto = lessonMailto(CONTACT_EMAIL, "de");

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
              <li className="text-ink">{PUMPFOIL_NAME.de}</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">Foil-Einstieg</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            PUMPFOIL LERNEN
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
            Pumpfoil ist Fliegen über dem Wasser ohne Wind, ohne Welle und ohne
            Motor — ein Board auf einem Hydrofoil, angetrieben nur von deiner
            eigenen Pumpbewegung. Hier steht, was du für den Einstieg wissen
            solltest: was Pumpfoil ist, was du mitbringen solltest, wie die
            ersten Versuche ablaufen, welche Fehler fast alle machen und worauf
            es bei Material und Sicherheit ankommt.
          </p>
          <p className={P}>
            Ich bin Devin Hauser, iQFOiL- und Wingfoil-Racer aus der Schweiz.
            Neben den Rennklassen fahre ich auch Pumpfoil. Lektionen bei mir
            sind in Planung, aber noch nicht buchbar —{" "}
            <a href="#lektionen" className={LINK}>
              hier steht der aktuelle Stand
            </a>
            .
          </p>
          <p className="mt-5 max-w-2xl border-l-2 border-red pl-5 text-sm leading-relaxed text-ink">
            Diese Seite ist eine Orientierung. Sie ersetzt keine Einführung am
            Wasser durch eine ausgebildete Lehrperson.
          </p>

          <nav aria-label="Auf dieser Seite" className="mt-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Auf dieser Seite
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

          {/* ── Was ist Pumpfoil? ────────────────────────────────────────── */}
          <section id="was-ist-pumpfoil" className={SECTION}>
            <h2 className={H2}>Was ist Pumpfoil?</h2>
            <p className={P}>
              Beim Pumpfoil stehst du auf einem kurzen, leichten Board. Darunter
              sitzt ein Foil: ein Mast, an dessen unterem Ende ein grosser
              Frontflügel und ein kleiner Heckflügel befestigt sind. Sobald das
              Board genug Tempo hat, erzeugt der Frontflügel Auftrieb und hebt
              das Board aus dem Wasser — nach demselben Prinzip wie ein
              Flugzeugflügel.
            </p>
            <p className={P}>
              Das Besondere: Es gibt keinen Antrieb von aussen. Kein Wind im
              Segel, kein Zug von einem Boot, keine Welle, die schiebt. Das
              Tempo entsteht durch die Pumpbewegung — du belastest das Board
              rhythmisch und entlastest es wieder. Dabei bewegt sich der
              Frontflügel in einer flachen Welle durchs Wasser, ähnlich wie die
              Schwanzflosse eines Delfins, und schiebt dich nach vorn.
            </p>

            <PumpfoilDiagram lang="de" />

            <p className={P}>
              Gestartet wird meistens von einem Steg, dem sogenannten Dockstart:
              Anlauf, Sprung, Landung auf dem Board und sofort pumpen. Viele
              Pumpfoilboards haben so wenig Volumen, dass sie dich im Stand
              nicht tragen. Alles beginnt deshalb aus der Bewegung, und wer
              aufhört zu pumpen, sinkt ein.
            </p>
            <p className={P}>
              Die Pumpbewegung ist auch in anderen Foil-Disziplinen wertvoll:
              Beim Wingfoilen hilft sie zum Beispiel, bei wenig Wind früher ins
              Fliegen zu kommen.
            </p>
          </section>

          {/* ── Voraussetzungen ──────────────────────────────────────────── */}
          <section id="voraussetzungen" className={SECTION}>
            <h2 className={H2}>Was du mitbringen solltest</h2>
            <dl className="mt-6 max-w-2xl space-y-5">
              {PREREQUISITES.map(([titel, text]) => (
                <div key={titel}>
                  <dt className="font-body text-base font-medium text-ink">{titel}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Erste Schritte — echte Reihenfolge, deshalb nummeriert ───── */}
          <section id="erste-schritte" className={SECTION}>
            <h2 className={H2}>Die ersten Schritte</h2>
            <p className={P}>
              Der Weg zum ersten längeren Flug ist für fast alle ähnlich. Wie
              schnell er geht, ist sehr unterschiedlich.
            </p>
            <ol className="mt-6 max-w-2xl space-y-6">
              {STEPS.map(([titel, text], index) => (
                <li key={titel} className="grid grid-cols-[2.25rem,1fr] gap-x-3">
                  <span
                    aria-hidden
                    className="font-mono text-sm tabular-nums text-red"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body text-base font-medium text-ink">{titel}</p>
                    <p className="mt-1 text-pretty leading-relaxed text-graphite">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Häufige Fehler ───────────────────────────────────────────── */}
          <section id="fehler" className={SECTION}>
            <h2 className={H2}>Häufige Fehler</h2>
            <dl className="mt-6 max-w-2xl space-y-5">
              {MISTAKES.map(([titel, text]) => (
                <div key={titel}>
                  <dt className="font-body text-base font-medium text-ink">{titel}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Ausrüstung ───────────────────────────────────────────────── */}
          <section id="ausruestung" className={SECTION}>
            <h2 className={H2}>Ausrüstung</h2>
            <p className={P}>
              Pumpfoil-Material ist spezialisiert. Was passt, hängt von
              Körpergewicht, Können und Spot ab — deshalb stehen hier bewusst
              keine Grössen. Lass dich beraten und teste, bevor du kaufst.
            </p>
            <dl className="mt-6 max-w-2xl space-y-5">
              {EQUIPMENT.map(([titel, text]) => (
                <div key={titel}>
                  <dt className="font-body text-base font-medium text-ink">{titel}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Sicherheit ───────────────────────────────────────────────── */}
          <section id="sicherheit" className={SECTION}>
            <h2 className={H2}>Sicherheit</h2>
            <ul className="mt-6 max-w-2xl space-y-4">
              {SAFETY.map(([titel, text]) => (
                <li key={titel} className="text-pretty leading-relaxed text-graphite">
                  <span className="font-medium text-ink">{titel}:</span> {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl border-l-2 border-red pl-5 leading-relaxed text-ink">
              Diese Hinweise sind eine Orientierung. Sie ersetzen keine
              Einführung am Wasser durch eine ausgebildete Lehrperson.
            </p>
          </section>

          {/* ── Lektionen — ehrlicher Stand, kein Angebot ────────────────── */}
          <section id="lektionen" className={SECTION}>
            <h2 className={H2}>Pumpfoil-Lektionen bei mir</h2>
            <p className={P}>
              Ich plane, Pumpfoil-Lektionen anzubieten. Bevor jemand bei mir auf
              dem Wasser steht, müssen ein paar Dinge geklärt sein — deshalb ist
              heute noch nichts davon buchbar.
            </p>

            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-8">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Stand {formatDate(PUMPFOIL_UPDATED, "de")}
              </p>
              <dl className="space-y-4">
                {LESSON_STATUS.de.map((item) => (
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
              Wenn du später bei mir Pumpfoil lernen möchtest, schreib mir eine
              E-Mail. Hilfreich sind drei Angaben: in welcher Region du lernen
              möchtest, welche Erfahrung du auf dem Wasser hast und wann du
              grundsätzlich Zeit hättest. Deine E-Mail hilft mir einzuschätzen,
              wie gross das Interesse ist und in welchen Regionen Lektionen
              gewünscht sind. Sie ist keine Buchung und kein Platz auf einer
              Warteliste und verpflichtet dich zu nichts. Sobald ein konkretes
              Angebot feststeht, aktualisiere ich diese Seite.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={mailto}
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
              >
                Interesse per E-Mail melden
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-block break-all py-3 font-mono text-sm text-ink underline underline-offset-4 hover:text-red"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <p className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-graphite">
              Wer schon jetzt loslegen will, lernt am besten bei einer
              Wassersportschule mit ausgebildeten Lehrpersonen. Wie ich mit
              E-Mails umgehe, steht in der{" "}
              <Link href={localizedPath("/privacy-policy", "de")} className={LINK}>
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>

          {/* ── Häufige Fragen ───────────────────────────────────────────── */}
          <section id="fragen" className={SECTION}>
            <h2 className={H2}>Häufige Fragen</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {PUMPFOIL_FAQ.de.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-body text-base font-medium text-ink">{item.q}</dt>
                  <dd className="mt-2 text-pretty leading-relaxed text-graphite">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Weiter ───────────────────────────────────────────────────── */}
          <section className={SECTION}>
            <h2 className={H2}>Mehr vom Foil</h2>
            <p className={P}>
              Wie das Foil im Rennsport funktioniert, erkläre ich auf der Seite
              zu iQFOiL, der olympischen Windsurfklasse. Wer ich bin und wofür
              ich trainiere, steht auf der Startseite.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={localizedPath("/iqfoil", "de")}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Was ist iQFOiL?
              </Link>
              <Link
                href={sectionHref("de", SECTION_ID.about)}
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Über mich
              </Link>
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Zuletzt überarbeitet am {formatDate(PUMPFOIL_UPDATED, "de")}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
