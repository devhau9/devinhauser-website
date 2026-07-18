import Image from "next/image";

// Hero-Bild: bewusst als eigene Konstante ausgelagert, damit ein Bildwechsel
// künftig nur eine Zeile betrifft. TEST (18.07.2026): DSCF0410 von Devin als
// möglicher Ersatz für das Cádiz-Bild vorgeschlagen. Bildausschnitt unten ist
// bewusst neutral (object-center) gesetzt, da eine visuelle Prüfung dieses
// Bildes technisch nicht möglich war – siehe Chat-Antwort. Bitte nach lokaler
// Sichtprüfung ggf. anpassen.
const HERO_IMAGE_SRC = "/images/hero-test-dscf0410.jpg";
const HERO_IMAGE_ALT = "Devin Hauser – Testbild für Hero-Sektion (DSCF0410)";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(92svh-73px)] flex-col overflow-hidden"
    >
      {/* Vollbild-Hintergrund, edge-to-edge. object-center als bewusst
          NEUTRALER Platzhalter-Ausschnitt (mobil und Desktop identisch) –
          konnte für dieses spezifische Testbild nicht visuell geprüft und
          daher nicht gezielt zugeschnitten werden. Responsive Struktur
          (object-[..%_..%] sm:object-[..%_..%]) ist vorbereitet, sobald
          konkrete Werte feststehen. */}
      <Image
        src={HERO_IMAGE_SRC}
        alt={HERO_IMAGE_ALT}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center filter brightness-[1.1] contrast-[1.05] saturate-[1.15]"
      />

      {/* Verlauf für Textlesbarkeit: Deckkraft in der Bildmitte reduziert
          (via-ink/55 → via-ink/30), damit Berge und Wasser besser sichtbar
          werden. Ganz unten bleibt der Verlauf bewusst voll deckend
          (from-ink, unverändert), damit Name/Untertitel/Buttons unabhängig
          von der Bildhelligkeit sicher lesbar bleiben. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
      />

      {/* Fluider Abstandshalter statt fixer Pixelposition: schiebt den
          Textblock auf ca. 70–75 % der sichtbaren Bildschirmhöhe, skaliert
          dabei mit jeder Bildschirmgrösse mit. Die Sektion selbst bleibt
          min-h (nicht h fix), damit auf sehr niedrigen Bildschirmen nichts
          abgeschnitten wird, sondern der Hero im Zweifel minimal wächst.
          Werte proportional zur reduzierten Hero-Höhe (92svh statt 100svh)
          mitskaliert, damit die relative Textposition gleich bleibt. */}
      <div aria-hidden className="relative h-[63svh] shrink-0 sm:h-[65svh] lg:h-[66svh]" />

      <div className="relative w-full px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16">
        <div className="mx-auto max-w-content">
          <h1 className="animate-fade-in-up font-display text-[16vw] leading-[0.88] tracking-wide text-paper sm:text-7xl lg:text-8xl">
            DEVIN HAUSER
          </h1>

          <p className="mt-4 animate-fade-in-up font-body text-lg text-slate-light [animation-delay:120ms] sm:text-xl">
            IQFoil &amp; Wingfoil Racing
          </p>

          {/* SUI-134 als schlichtes Textelement, gleiche Designsprache wie der
              Rest des Heros (Mono-Schrift, Tracking) – bewusst ohne Rahmen/Box,
              etwas grösser als zuvor, aber weiterhin klar unterhalb des
              Untertitels in der Hierarchie. */}
          <p className="mt-3 animate-fade-in-up font-mono text-base uppercase tracking-[0.3em] text-paper [animation-delay:200ms] sm:text-lg">
            SUI-134
          </p>

          <div className="mt-10 flex animate-fade-in-up flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:gap-4">
            <a
              href="#ueber-mich"
              className="rounded-sm border border-paper/30 px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10"
            >
              About Me
            </a>
            <a
              href="#partner"
              className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              Let's Connect
            </a>
          </div>
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
