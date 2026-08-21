import Image from "next/image";
import Link from "next/link";
import { SOCIAL_PROFILES } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";

/**
 * IQFoil-Pillar-Page — DEUTSCHE FASSUNG (Standardsprache, ohne Pfadpraefix).
 *
 * Warum diese Seite existiert: Die Startseite ist eine One-Page-Athletenseite.
 * Für informationsgetriebene Suchen ("was ist iqfoil", "iqfoil material",
 * "iqfoil rennformate") gab es bisher keine einzige eigene URL — die Site war
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
 * SCHREIBWEISE: Schweizer Hochdeutsch, durchgehend „ss", nie das Eszett. Die
 * Fachbegriffe der Klasse bleiben englisch und werden NICHT übersetzt — IQFoil,
 * Foil, Board, Rig, Fin, Course Racing, Sprint Slalom, Marathon, Medal Series,
 * Opening Series, World Sailing. Übersetzt würden sie in der Szene niemanden
 * mehr finden, der danach sucht.
 *
 * Metadata, Article-JSON-LD und BreadcrumbList-JSON-LD liegen NICHT mehr hier,
 * sondern in der Route (`src/app/(de)/iqfoil/page.tsx`). Diese Datei ist reiner
 * Seiteninhalt; Titel und Beschreibung werden für die Route exportiert.
 */

// Eigenständig formuliert, nicht Wort für Wort übersetzt: Ein deutscher Titel,
// der wie eine Übersetzung klingt, verliert genau die Suchbegriffe, wegen derer
// er existiert. Nur das Fragment — das Root-Layout hängt " | Devin Hauser" über
// `title.template` an.
export const IQFOIL_DE_TITLE =
  "Was ist IQFoil? Die olympische Windsurf-Klasse aus Schweizer Sicht";
export const IQFOIL_DE_DESCRIPTION =
  "IQFoil ist die olympische Windsurf-Klasse — ein Board, das auf einem Hydrofoil über dem Wasser fliegt. Der Schweizer Racer Devin Hauser erklärt Material, Rennformate, Geschwindigkeiten und wie es sich tatsächlich anfühlt.";

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
    q: "Ist IQFoil eine olympische Klasse?",
    a: "Ja. Gemäss der RYA wurde iQFOiL von World Sailing als neues olympisches Windsurf-Material für den Zyklus Paris 2024 eingeführt und ersetzte die RS:X-Klasse, die bis Tokio 2020 gefahren wurde.",
  },
  {
    q: "Wie schnell ist ein IQFoil?",
    a: "Starboard, der Hersteller des Klassenboards, gibt an, dass das Paket von 5 bis 35 Knoten Wind funktioniert (rund 9 bis 65 km/h). Die Geschwindigkeit des Boards hängt von Wind, Wasser und Fahrer ab — meine persönliche Höchstgeschwindigkeit auf diesem Material liegt bei 32,3 Knoten, also rund 60 km/h.",
  },
  {
    q: "Welches Material wird gefahren?",
    a: "Ein Board, ein Foil, ein Segel pro Person — für alle im Feld dasselbe. Starboard gibt das Klassenboard mit 220 × 95 cm und 196 Litern Volumen an, das Klassen-Foil mit einem 900er-Frontflügel, einem 255er-Heckflügel und einem 95 cm langen Foil-Mast. Männer fahren ein 8-m²-Segel, Frauen ein 7,3-m²-Segel.",
  },
  {
    q: "Wie läuft eine IQFoil-Regatta ab?",
    a: "Die Klasse fährt in der Opening Series drei Disziplinen — Course Racing, Sprint Slalom und Marathon — und danach eine Medal Series um die Titel. Die RYA beschreibt Regattatage mit bis zu sechs Wettfahrten und eine Medal Series im K.-o.-System für die zehn Besten jedes Feldes.",
  },
  {
    q: "Was unterscheidet IQFoil vom normalen Windsurfen?",
    a: "Der Rumpf verlässt das Wasser. Auf einem klassischen Windsurfboard gleitet man — man rauscht über die Wasseroberfläche — und kämpft gegen den Widerstand; auf dem Foil hebt das Board ab und fährt auf einem Flügel unter Wasser. Es ist leiser, bei wenig Wind schneller, und es scheitert anders: Wenn etwas schiefgeht, stürzt man ab, statt einfach langsamer zu werden.",
  },
  {
    q: "Ist IQFoil schwer zu lernen?",
    a: "Aufs Foil zu kommen ist nicht der schwierige Teil — die meisten Windsurfer schaffen das in wenigen Sessions. Die richtige Höhe zu halten, zu halsen (also mit dem Heck durch den Wind zu drehen) ohne aufzusetzen und das alles im Feld bei Renngeschwindigkeit zu tun: Das dauert Jahre.",
  },
  {
    q: "Bei welchem Wind wird IQFoil gefahren?",
    a: "US Sailing beschreibt Course Racing als Wettfahrten bei mehr als 12 Knoten (rund 22 km/h), Sprint Slalom bei etwa 6 bis 15 Knoten (rund 11 bis 28 km/h) und den Marathon als Langstreckenrennen mit doppelter Punktewertung.",
  },
];

// Die Quellentitel bleiben in der Originalsprache der Dokumente — ein
// übersetzter Titel liesse sich nicht mehr nachschlagen.
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

export default function IqfoilDe() {
  return (
    <main>
      <article className="section-pad bg-white">
        <div className="mx-auto max-w-content">
          <nav aria-label="Brotkrumennavigation" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              <li>
                <Link
                  href={localizedPath("/", "de")}
                  className="hover:text-ink"
                >
                  Startseite
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">IQFoil</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">Der Sport</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            WAS IST IQFOIL?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
            IQFoil ist die olympische Windsurf-Klasse. Das Board fährt nicht auf
            dem Wasser — es fliegt darüber, getragen von einem Flügel unter der
            Oberfläche. Ich fahre diese Klasse, und deshalb ist diese Seite die
            Fassung, die ich mir am Anfang selbst gewünscht hätte.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-graphite">
            Alles Technische auf dieser Seite ist mit seiner Quelle gekennzeichnet.
            Alles andere ist meine eigene Erfahrung — und auch das ist so
            gekennzeichnet.
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
                alt="Ein IQFoil-Board, das auf seinem Hydrofoil vollständig aus dem Wasser gehoben ist — nur der Foil-Mast steckt noch in der Oberfläche"
                fill
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="object-cover object-[50%_40%]"
                priority
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-graphite">
              Das ganze Board ist aus dem Wasser. Alles, was es trägt, liegt
              unter der Oberfläche — auf einem Mast, der etwa so lang ist wie ein
              Arm.
            </figcaption>
          </figure>

          {/* ── Was ist das ──────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Eine olympische One-Design-Klasse</h2>
            <p className={P}>
              IQFoil ist Windsurfen auf einem Hydrofoil, und es ist eine strikte
              One-Design-Klasse: Alle im Feld fahren dasselbe Board, dasselbe
              Foil und dasselbe Segel. Die Klasse sagt es unmissverständlich —
              das Ziel ist ein möglichst faires Racing, und genau deshalb ist das
              Material One-Design.
            </p>
            <p className={P}>
              Die Royal Yachting Association beschreibt iQFOiL als das Material,
              das World Sailing für das olympische Windsurfen im Zyklus Paris
              2024 eingeführt hat — als Nachfolge der RS:X-Klasse, die bis Tokio
              2020 gefahren wurde.
            </p>
            <p className="mt-4">
              <Source>Quellen: iQFOiL Class Official · RYA</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                One-Design ist der Teil, den viele unterschätzen.
                Geschwindigkeit lässt sich hier nicht kaufen. Wenn der Fahrer
                neben mir schneller ist, dann weil er fitter ist, sauberer fährt
                oder den Wind besser liest — nicht, weil er besseres Material
                hat. Das ist brutal, und genau deshalb mag ich es.
              </p>
            </div>
          </section>

          {/* ── Wie das Foil funktioniert ────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Wie das Foil tatsächlich funktioniert</h2>
            <p className={P}>
              Unter dem Board sitzt ein Mast mit zwei Flügeln: ein grosser vorne
              und ein kleiner hinten. Mit steigender Geschwindigkeit erzeugen
              diese Flügel Auftrieb — genau so, wie es ein Flugzeugflügel tut.
              Und sobald der Auftrieb das Gewicht von Board, Rig und Fahrer
              übersteigt, verlässt der Rumpf das Wasser.
            </p>
            <p className={P}>
              Von diesem Moment an berührt fast nichts mehr die Oberfläche. Der
              Widerstand bricht zusammen, und das Board beschleunigt weiter — bei
              Wind, der auf einem normalen Windsurfboard gerade einmal zum
              Gleiten reichen würde, also zum Dahinrauschen auf der
              Wasseroberfläche. Genau deshalb fahren Foil-Klassen Rennen bei
              wenig Wind, während das klassische Windsurfen noch am Strand sitzen
              würde.
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Beim ersten Abheben hört der Lärm auf. Das ist der Teil, von dem
                niemand erzählt. Ein Windsurfboard in Fahrt ist laut — Schläge,
                Gischt, Vibration. Auf dem Foil wird es still, und plötzlich
                arbeitet man mit den Füssen statt mit den Armen und korrigiert
                die Höhe ständig um wenige Zentimeter.
              </p>
            </div>
          </section>

          {/* ── Material ─────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Das Material</h2>
            <p className={P}>
              Starboard baut das Klassenmaterial und gibt das Board mit
              220 × 95 cm und 196 Litern Volumen an, das Klassen-Foil mit einem
              900er-Frontflügel, einem 255er-Heckflügel, einer 115er- oder
              95er-Fuselage und einem 95 cm langen Foil-Mast. Die Segelgrösse ist
              das Einzige, was sich zwischen den Feldern unterscheidet: Männer
              fahren 8 m², Frauen 7,3 m².
            </p>
            <p className={P}>
              Ein Detail, das man richtig verstehen sollte, weil es regelmässig
              für Verwirrung sorgt: Der 95-cm-Mast ist der <em>Foil</em>-Mast,
              also das Teil unter Wasser. Der Rig-Mast, der das Segel trägt, ist
              ein ganz anderes Bauteil — die RYA gibt ihn mit 4,9 m an. Zwei
              Masten, zwei sehr unterschiedliche Aufgaben.
            </p>
            <p className="mt-4">
              <Source>Quellen: Starboard iQFOiL · RYA · iQFOiL Class Official</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Es ist ein Board, ein Foil, ein Segel — und es reist in zwei
                Taschen und einem Boardbag. Zeit frisst nicht das Fahren, sondern
                das Auf- und Abriggen, das Ausspülen des Salzes aus dem Foil und
                das Kontrollieren jeder Schraube vor dem Rausfahren. Wer beim
                Material schludert, bekommt das vom Foil bei 30 Knoten
                mitgeteilt — rund 55 km/h.
              </p>
            </div>
          </section>

          {/* ── Formate ──────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Wie das Racing aufgebaut ist</h2>
            <p className={P}>
              Die Klasse fährt in der Opening Series drei verschiedene
              Disziplinen — Course Racing, Sprint Slalom und Marathon — und
              danach eine Medal Series, in der die Titel entschieden werden.
              US Sailing beschreibt Course Racing als klassisches
              Upwind-Downwind-Racing bei mehr als 12 Knoten Wind (rund 22 km/h),
              Sprint Slalom als Start auf Raumschotkurs in einen Downwind-Kurs
              mit mehreren Halsentonnen (eine Halse ist ein Richtungswechsel vor
              dem Wind, mit dem Heck durch den Wind) bei etwa 6 bis 15 Knoten
              (rund 11 bis 28 km/h) und den Marathon als Langstreckenrennen mit
              doppelter Punktewertung.
            </p>
            <p className={P}>
              Die RYA beschreibt, was das für einen Regattatag bedeutet:
              ausdauerlastige Marathons, taktisches Course Racing, kurze,
              intensive Slalom-Sprints und bis zu sechs Wettfahrten an einem
              einzigen Tag — wobei nach der Opening Series die zehn Besten jedes
              Feldes in eine Medal Series im K.-o.-System einziehen.
            </p>
            <p className="mt-4">
              <Source>Quellen: iQFOiL Class Official · US Sailing · RYA</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Drei Formate in einer Regatta — das macht diese Klasse schwer.
                Marathon belohnt Geduld, Slalom belohnt Nerven, Course Racing
                belohnt Taktik — und man wechselt am selben Tag zwischen ihnen,
                auf demselben Material, oft mit zwanzig Minuten zum Essen
                dazwischen. Ein guter Marathonfahrer kann einen schlechten
                Slalomtag haben und damit bis zum Mittag eine ganze Regatta
                verlieren.
              </p>
            </div>
          </section>

          {/* ── Geschwindigkeit & Anforderungen ──────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Geschwindigkeit — und was sie kostet</h2>
            <p className={P}>
              Starboard gibt an, dass das Paket von 5 bis 35 Knoten Wind
              funktioniert — Fin oder Foil, ein Board, ein Foil, ein Fin, ein
              Segel. Die tatsächliche Geschwindigkeit des Boards hängt von Wind,
              Wasserzustand und Fahrer ab.
            </p>
            <p className={P}>
              Meine eigene Höchstgeschwindigkeit auf diesem Material liegt bei
              32,3 Knoten, also rund 60 km/h. Das ist ein persönlicher Wert aus
              meinen eigenen Sessions, keine Angabe der Klasse.
            </p>
            <p className="mt-4">
              <Source>Quelle: Starboard iQFOiL · persönlicher Wert: Devin Hauser</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Viele sehen die Geschwindigkeit und halten das für einen
                Armsport. Es sind die Beine und die Rumpfmuskulatur. Man steht
                in der halben Hocke, hält ein Rig gegen vollen Druck und
                korrigiert mit den Füssen die Höhe in winzigen Schritten — ein
                ganzes Rennen lang, und danach an diesem Tag noch vier weitere
                Male. Was die meisten fertigmacht, ist nicht der eine harte
                Moment, sondern die Summe.
              </p>
            </div>
          </section>

          {/* ── Silvaplana ───────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Racing in der Höhe — Silvaplana</h2>
            <p className={P}>
              Mein Heimrevier ist der Silvaplanersee im Engadin, auf rund 1 800 m
              über Meer. Die regionale Tourismusorganisation beschreibt den
              Malojawind dort mit 3 bis 6 Beaufort, also rund 12 bis 49 km/h — am
              unteren Ende eine stetige Brise, am oberen ein richtig kräftiger
              Wind. Dieselbe Quelle nennt Silvaplana den bekanntesten
              Windsurfsee der Schweiz, mit einer Saison von etwa Mitte Mai bis
              Ende September.
            </p>
            <p className={P}>
              Silvaplana ist zudem ein Austragungsort, den die Klasse anfährt:
              Dort fanden wiederholt iQFOiL-Events statt, darunter Wettfahrten
              der Weltmeisterschaft und der International Games.
            </p>
            <p className="mt-4">
              <Source>Quellen: Engadin Tourismus · iQFOiL Class Official</Source>
            </p>
            <div className="card-surface mt-8 max-w-2xl p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                Aus eigener Erfahrung
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Silvaplana ist ein Thermikrevier, der Tag hat also eine feste
                Form: Der Morgen ist meist ruhig, über Mittag baut sich der Wind
                auf, und dann geht es los. Die dünne Höhenluft bedeutet bei
                gleicher Windgeschwindigkeit etwas weniger Druck im Segel, und
                das Wasser ist kalt genug, dass man es an langen Tagen spürt. Der
                grösste Teil des Feldes reist für eine Woche an. Ich darf den
                ganzen Sommer dort trainieren — das ist wahrscheinlich mein
                grösster einzelner Vorteil.
              </p>
            </div>
          </section>

          {/* ── Warum ich diese Klasse fahre ─────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className={H2}>Warum ich diese Klasse fahre</h2>
            <p className={P}>
              Ich habe 2014 mit Windsurfen angefangen, bin 2019 aufs Foil
              gewechselt und 2021 ins IQFoil. Ich starte international und fahre
              inzwischen in der Elite-Kategorie. Mein langfristiges Ziel ist es,
              die Schweiz an den Olympischen Spielen zu vertreten — das ist der
              Weg, auf dem ich bin, und ich nenne dazu bewusst keine Jahreszahl.
            </p>
            <p className={P}>
              Neben dem Racing mache und schneide ich meine Foto-, Video- und
              Drohnenaufnahmen selbst. Deshalb ist das meiste, was auf dieser
              Seite zu sehen ist, aus dem Sport heraus gefilmt und nicht vom
              Strand aus.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/#ueber-mich"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Über mich
              </Link>
              <Link
                href="/#highlights"
                className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                Meine Ergebnisse
              </Link>
              <a
                href="/#partner"
                className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
              >
                Partner werden
              </a>
            </div>

            {/* Die meisten Leute landen ueber eine Suche wie "was ist iqfoil"
                auf dieser Seite, nachdem sie irgendwo einen Clip gesehen haben.
                Ohne diesen Block waere der einzige Weg zu den Kanaelen die
                Startseite — auf dem Handy hiesse das: die ganze Seite scrollen.
                Drei Links kosten nichts und beantworten die naheliegendste
                Anschlussfrage: "wo sehe ich mehr davon?" */}
            <p className="mt-10 text-sm leading-relaxed text-graphite">
              Ich filme die meisten meiner Sessions selbst. Wer lieber sieht, wie
              das tatsächlich aussieht, statt darüber zu lesen:{" "}
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
            <h2 className={H2}>Häufige Fragen</h2>
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

          {/* ── Quellen ──────────────────────────────────────────────────── */}
          <section className="mt-16 border-t border-hairline pt-12">
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
              <li>Engadin Tourismus — Windsurfing Silvaplana</li>
            </ul>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-graphite">
              Quellen abgerufen am 10. August 2026. Material und Formate der
              Klasse ändern sich — wer an einem Event startet, prüft deshalb immer
              die aktuellen Klassenregeln und die Ausschreibung.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
