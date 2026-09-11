import Image from "next/image";
import Link from "next/link";
import { SECTION_ID, localizedPath, sectionHref, type Lang } from "@/lib/i18n";

// Hero-Bild: bewusst als eigene Konstante ausgelagert, damit ein Bildwechsel
// künftig nur eine Zeile betrifft. TEST (18.07.2026): DSCF0410 von Devin als
// möglicher Ersatz für das Cádiz-Bild vorgeschlagen. Bildausschnitt unten ist
// bewusst neutral (object-center) gesetzt, da eine visuelle Prüfung dieses
// Bildes technisch nicht möglich war – siehe Chat-Antwort. Bitte nach lokaler
// Sichtprüfung ggf. anpassen.
const HERO_IMAGE_SRC = "/images/hero-test-dscf0410.jpg";

const COPY: Record<
  Lang,
  {
    imageAlt: string;
    subtitle: string;
    location: string;
    about: string;
    connect: string;
    social: string;
    gallery: string;
    secondaryLabel: string;
  }
> = {
  de: {
    imageAlt: "Devin Hauser foilt mit Tempo über offenes Wasser",
    subtitle: "SWISS iQFOiL- UND WINGFOIL-RACER",
    location: "Zürich, Schweiz",
    about: "Über mich",
    connect: "Kontakt aufnehmen",
    social: "Social Media",
    gallery: "Galerie ansehen",
    secondaryLabel: "Weitere Einstiege",
  },
  en: {
    imageAlt: "Devin Hauser foiling at speed on open water",
    subtitle: "SWISS iQFOiL & WINGFOIL RACER",
    location: "Zurich, Switzerland",
    about: "About Me",
    connect: "Let's Connect",
    social: "Social Media",
    gallery: "View Gallery",
    secondaryLabel: "More entry points",
  },
};

/**
 * Startbild.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ZWEI EBENEN VON EINSTIEGEN — UND WARUM SIE GETRENNT BLEIBEN
 * ─────────────────────────────────────────────────────────────────────────────
 * Die Vorgabe vom 21.08.2026 verlangt zwei zusaetzliche Einstiege (Social Media
 * und Galerie) im Hero, ausdruecklich OHNE dass sie zum Haupt-Aufruf werden.
 *
 * Vier gleich aussehende Knoepfe nebeneinander waeren genau das Gegenteil: Wo
 * alles gleich wichtig aussieht, ist nichts wichtig, und die
 * Sportpositionierung („Athlet zuerst") verliert ihren Vorrang an zwei
 * Medienlinks. Die Trennung laeuft deshalb ueber drei Mittel gleichzeitig:
 *   • eigene ZEILE unter den Hauptknoepfen, mit sichtbarem Abstand
 *   • andere DARSTELLUNG — Textlinks mit feiner Unterlinie statt Flaechen
 *   • gedaempfte FARBE statt Papierweiss
 * Der rote Knopf bleibt der einzige gefuellte Knopf im Bild.
 *
 * NACHTRAG 21.08.2026: Die Schriftgroesse war urspruenglich das vierte Mittel
 * (11px gegen 12px der Knoepfe). Auf dem Telefon war das zu klein zum Lesen,
 * deshalb stehen beide Ebenen jetzt auf 12px. Die Rangfolge tragen die drei
 * verbleibenden Mittel weiterhin deutlich genug — ein Unterschied von einem
 * Pixel hat sie ohnehin nie hergestellt.
 *
 * NACHTRAG 07.09.2026 (Sichtpruefung Devin, Desktop und Telefon): Die zweite
 * Ebene wirkte wie eine Bildunterschrift statt wie ein Einstieg. Sie steht
 * jetzt auf 14px in mittlerer Staerke und in `paper/80` statt `slate-light`.
 * Damit ist die Schriftgroesse endgueltig KEIN Rangmerkmal mehr — die Knoepfe
 * bleiben bei 12px, tragen ihren Vorrang aber ueber Flaeche, Rahmen und den
 * einen gefuellten roten Knopf, und das sind die staerkeren Signale. Die
 * vertikale Innenpolsterung (`py-1`) hebt die Trefferflaeche auf 28px; sie
 * erzeugt keine sichtbare Knopfflaeche.
 *
 * WARUM DIE SPERRUNG HIER 0.16em IST UND NICHT `tracking-widest2` (0.25em):
 * Bei 14px und 0.25em brauchen „SOCIAL MEDIA" und „GALERIE ANSEHEN" zusammen
 * 350px. Auf einem 390px-Geraet stehen 342px zur Verfuegung — die Zeile brach
 * also um, und die zweite Zeile landete unter dem Cookie-Banner. Mit 0.16em
 * sind es 316px: eine Zeile, in beiden Sprachen, bis hinunter zu 375px. Die
 * englischen Beschriftungen sind kuerzer und waren nie das Problem; die
 * Sperrung ist trotzdem in beiden Sprachen gleich, damit sie nicht bei der
 * naechsten Textaenderung auseinanderlaeuft.
 */
export default function Hero({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section
      id={SECTION_ID.hero}
      className="relative flex min-h-[calc(92svh-73px)] flex-col overflow-hidden"
    >
      <Image
        src={HERO_IMAGE_SRC}
        alt={c.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center filter brightness-[1.1] contrast-[1.05] saturate-[1.15]"
      />

      {/* Verlauf für Textlesbarkeit: Deckkraft in der Bildmitte reduziert,
          damit Berge und Wasser sichtbar bleiben. Ganz unten bleibt der Verlauf
          voll deckend, damit Name, Untertitel und Knöpfe unabhängig von der
          Bildhelligkeit sicher lesbar bleiben. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
      />

      {/* Fluider Abstandshalter statt fixer Pixelposition. Wert gegenüber der
          Fassung vom 19.08. leicht reduziert (63 → 58 svh), weil unter den
          Hauptknöpfen jetzt eine zweite, flache Zeile steht: ohne diese
          Korrektur wüchse der Hero auf kleinen Geräten über die Bildhöhe
          hinaus und der Bildausschnitt verschöbe sich.

          Die Höhe steckt seit dem 21.08.2026 in `.hero-spacer` (globals.css),
          weil sie zusätzlich das Cookie-Banner berücksichtigen muss: Solange
          das Banner steht, rückt der Text um dessen Höhe nach oben, damit die
          beiden Knöpfe nicht darunter verschwinden. Was hier oben wegfällt,
          kommt unten über `.hero-content-pad` wieder dazu — die Höhe des
          Abschnitts und damit der Bildausschnitt bleiben unverändert. Ohne
          Banner sind es unverändert 58/60/61 svh. */}
      <div aria-hidden className="hero-spacer relative shrink-0" />

      {/* `hero-content-pad` ersetzt das frühere `pb-16 sm:pb-20`. Es ist
          derselbe Abstand — plus genau der Betrag, den `.hero-spacer` oben
          wegnimmt, solange das Cookie-Banner steht. Dadurch bleibt die Höhe
          des Hero-Abschnitts konstant und mit ihr der Bildausschnitt.
          Begründung ausführlich in globals.css. */}
      <div className="hero-content-pad relative w-full px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-content">
          <h1 className="animate-fade-in-up font-display text-[16vw] leading-[0.88] tracking-wide text-paper sm:text-7xl lg:text-8xl">
            DEVIN HAUSER
          </h1>

          {/* KEIN `uppercase` auf dieser Zeile: der Text steht bereits in
              Versalien, und die CSS-Grossschreibung wuerde aus „iQFOiL" ein
              „IQFOIL" machen — die Markenschreibweise ist aber verbindlich.
              `text-balance` verhindert, dass auf schmalen Geraeten ein
              einzelnes Wort allein auf der zweiten Zeile steht. */}
          <p className="mt-4 animate-fade-in-up text-balance font-mono text-sm tracking-[0.18em] text-paper [animation-delay:120ms] sm:text-base sm:tracking-[0.24em]">
            {c.subtitle}
          </p>

          {/* Segelnummer und Standort teilen sich eine Zeile: beides sind kurze
              Kennzahlen, und drei einzelne Zeilen unter dem Namen wuerden den
              Hero auf dem Telefon nach unten schieben.

              07.09.2026: War 12/14px in `slate-light` bei 0.3em Sperrung und
              damit auf beiden Geraeten zu schwach. Jetzt 14px in mittlerer
              Staerke, `paper/75` und 0.16em — heller, kompakter, schneller
              erfassbar.

              Die Sperrung ist kein Geschmack, sondern gemessen: Bei 0.22em
              brauchte die englische Fassung „SUI-134 · ZURICH, SWITZERLAND"
              333px, auf einem 375px-Geraet stehen aber nur 327px zur
              Verfuegung — die Zeile brach um. 0.16em passt in beiden Sprachen
              auf eine Zeile.

              BEWUSST OHNE `sm:text-base`: Mit 16px stand die Zeile auf dem
              Desktop exakt so gross wie der Untertitel darueber und war durch
              die mittlere Staerke sogar schwerer — die Rangfolge kippte. Den
              Vorrang traegt jetzt allein die Deckkraft (100% gegen 75%), und
              das nur, weil beide Zeilen reiner Text ohne Flaeche sind. */}
          <p className="mt-3 animate-fade-in-up font-mono text-sm font-medium uppercase tracking-[0.16em] text-paper/75 [animation-delay:200ms]">
            SUI-134 · {c.location}
          </p>

          {/* Ebene 1 — die beiden Hauptknöpfe, unverändert in Gewicht und Rolle. */}
          <div className="mt-10 flex animate-fade-in-up flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:gap-4">
            <Link
              href={sectionHref(lang, SECTION_ID.about)}
              className="rounded-sm border border-paper/30 px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10"
            >
              {c.about}
            </Link>
            <Link
              href={sectionHref(lang, SECTION_ID.contact)}
              className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              {c.connect}
            </Link>
          </div>

          {/* Ebene 2 — bewusst flach: Textlinks, keine Flächen, gedämpfte Farbe. */}
          <nav
            aria-label={c.secondaryLabel}
            className="mt-6 flex animate-fade-in-up flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:360ms]"
          >
            <Link
              href={sectionHref(lang, SECTION_ID.social)}
              className="rounded-sm py-1 font-mono text-sm font-medium uppercase tracking-[0.16em] text-paper/80 underline decoration-paper/40 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {c.social}
            </Link>
            <Link
              href={localizedPath("/media", lang)}
              className="rounded-sm py-1 font-mono text-sm font-medium uppercase tracking-[0.16em] text-paper/80 underline decoration-paper/40 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {c.gallery}
            </Link>
          </nav>
        </div>
      </div>

      {/* Dezenter Scroll-Indikator: reine Form, kein Icon, kein Text. */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="h-8 w-px animate-drift bg-paper/30" />
      </div>
    </section>
  );
}
