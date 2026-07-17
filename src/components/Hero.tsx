import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-hidden"
    >
      {/* Vollbild-Hintergrund, edge-to-edge. Stärkstes verfügbares Actionbild:
          zeigt Devin bei der eigentlichen Disziplin, an seiner Trainingsbasis,
          mit Segelnummer und Namen organisch im Bild selbst sichtbar. */}
      <Image
        src="/images/hero-iqfoil-silvaplana.jpg"
        alt="Devin Hauser beim IQFoil-Training in Silvaplana"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_45%]"
      />

      {/* Ruhiger Verlauf statt harter Fläche: unten kräftiger für
          Textlesbarkeit, nach oben hin fast unsichtbar, damit das Bild
          selbst im Vordergrund bleibt. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
      />

      {/* Fluider Abstandshalter statt fixer Pixelposition: schiebt den
          Textblock auf ca. 70–75 % der sichtbaren Bildschirmhöhe, skaliert
          dabei mit jeder Bildschirmgrösse mit. Die Sektion selbst bleibt
          min-h (nicht h fix), damit auf sehr niedrigen Bildschirmen nichts
          abgeschnitten wird, sondern der Hero im Zweifel minimal wächst. */}
      <div aria-hidden className="relative h-[68svh] shrink-0 sm:h-[70svh] lg:h-[72svh]" />

      <div className="relative w-full px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16">
        <div className="mx-auto max-w-content">
          <h1 className="animate-fade-in-up font-display text-[16vw] leading-[0.88] tracking-wide text-paper sm:text-7xl lg:text-8xl">
            DEVIN HAUSER
          </h1>

          <p className="mt-4 animate-fade-in-up font-body text-lg text-slate-light [animation-delay:120ms] sm:text-xl">
            IQFoil &amp; Wingfoil Racing
          </p>

          {/* SUI-134 bewusst wie eine Signatur: kleiner als der Untertitel,
              enger an ihn herangerückt, sehr weites Letter-Spacing, gedämpfte
              Farbe – tritt in Konkurrenz zu nichts, sondern wirkt wie eine
              Kennzeichnung am Bildrand. */}
          <p className="mt-1.5 animate-fade-in-up font-mono text-[10px] uppercase tracking-[0.35em] text-slate/70 [animation-delay:200ms]">
            SUI-134
          </p>

          <div className="mt-10 flex animate-fade-in-up flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:gap-4">
            <a
              href="#ueber-mich"
              className="rounded-sm border border-paper/30 px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10"
            >
              Explore my journey
            </a>
            <a
              href="#partner"
              className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              Partner with me
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
