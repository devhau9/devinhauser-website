"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AlbumImage } from "@/lib/album-types";
import type { Lang } from "@/lib/i18n";

const COPY: Record<
  Lang,
  {
    openImage: (index: number, total: number, alt: string) => string;
    dialogLabel: (title: string, index: number, total: number) => string;
    download: string;
    close: string;
    prev: string;
    next: string;
    prevLabel: string;
    nextLabel: string;
  }
> = {
  de: {
    openImage: (index, total, alt) => `Bild ${index} von ${total} öffnen: ${alt}`,
    dialogLabel: (title, index, total) => `${title} — Bild ${index} von ${total}`,
    download: "Herunterladen",
    close: "Schliessen",
    prev: "Zurück",
    next: "Weiter",
    prevLabel: "Vorheriges Bild",
    nextLabel: "Nächstes Bild",
  },
  en: {
    openImage: (index, total, alt) => `Open image ${index} of ${total}: ${alt}`,
    dialogLabel: (title, index, total) => `${title} — image ${index} of ${total}`,
    download: "Download",
    close: "Close",
    prev: "Prev",
    next: "Next",
    prevLabel: "Previous image",
    nextLabel: "Next image",
  },
};

type Props = {
  images: AlbumImage[];
  /** Wird serverseitig vorberechnet — der Client entscheidet nie über Rechte. */
  downloadFlags: boolean[];
  downloadHrefs: string[];
  albumTitle: string;
  /**
   * Fertige Credit-Zeile je Bild — serverseitig durch `displayCredit()`
   * gelaufen. Der Client bekommt keine Rohdaten aus der JSON-Datei zu sehen
   * und trifft damit auch keine Rechteaussage: Ob „Photo: Tobias Meier" oder
   * „Bild: Archiv Devin Hauser" dort steht, ist bereits entschieden.
   */
  /** `null` = fuer dieses Bild darf keine Credit-Zeile stehen. */
  imageCredits: (string | null)[];
  lang: Lang;
};

/**
 * Galerie mit einfachem Lightbox-Viewer.
 *
 * Bewusst ohne Bibliothek: ein Dialog, zwei Pfeile, Escape. Das hält die
 * Bundle-Grösse klein und das Verhalten vorhersehbar. Tastatur und
 * Reduced-Motion sind berücksichtigt.
 *
 * Wichtig: Ob ein Bild heruntergeladen werden darf, wird NICHT hier entschieden.
 * Die Flags kommen fertig aus `canDownload()` auf dem Server.
 */
export default function AlbumGallery({
  images,
  downloadFlags,
  downloadHrefs,
  albumTitle,
  imageCredits,
  lang,
}: Props) {
  const c = COPY[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = current + delta;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);

      // Fokusfalle. Ohne sie tabbt man aus dem geoeffneten Dialog heraus auf
      // die Elemente DAHINTER — sichtbar verdeckt, aber weiterhin fokussierbar.
      // Wer nur mit der Tastatur bedient, verliert damit den Dialog aus den
      // Augen und findet den Schliessen-Knopf nicht wieder. aria-modal allein
      // hilft nicht: Es sagt Screenreadern etwas, aendert aber nichts an der
      // Tab-Reihenfolge des Browsers.
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (current instanceof Node && !root.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <li key={image.src} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              aria-label={c.openImage(index + 1, images.length, image.alt[lang])}
            >
              <Image
                src={image.src}
                alt={image.alt[lang]}
                fill
                loading={index < 4 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={c.dialogLabel(albumTitle, (openIndex ?? 0) + 1, images.length)}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-widest2 text-paper/70">
              {(openIndex ?? 0) + 1} / {images.length}
            </p>
            <div className="flex items-center gap-2">
              {downloadFlags[openIndex ?? 0] ? (
                <a
                  href={downloadHrefs[openIndex ?? 0]}
                  download
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                >
                  {c.download}
                </a>
              ) : null}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {c.close}
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            <Image
              src={active.src}
              alt={active.alt[lang]}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Auf dem Telefon steht die Bildunterschrift auf einer EIGENEN Zeile
              ueber den Pfeilen (`order-first w-full`), auf groesseren Schirmen
              wie bisher zwischen ihnen. Vorher teilten sich drei Elemente die
              375-px-Zeile, und die Credit-Zeile brach mitten im Namen des
              Rechteinhabers um: „© SAILING / ENERGY". Ein Credit, der den
              Namen zerlegt, erfuellt seinen Zweck nicht.

              Die DOM-Reihenfolge bleibt Zurueck → Text → Weiter, damit sich an
              Tab-Reihenfolge und Vorlesereihenfolge nichts aendert. */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:flex-nowrap sm:px-6">
            <button
              type="button"
              onClick={() => step(-1)}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              aria-label={c.prevLabel}
            >
              {c.prev}
            </button>
            <p className="order-first w-full text-center text-xs text-paper/70 sm:order-none sm:w-auto sm:min-w-0 sm:flex-1">
              {active.caption ? (
                <span className="block">{active.caption[lang]}</span>
              ) : null}
              <span className="block font-mono uppercase tracking-widest2">
                {imageCredits[openIndex ?? 0] ?? ""}
              </span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              aria-label={c.nextLabel}
            >
              {c.next}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
