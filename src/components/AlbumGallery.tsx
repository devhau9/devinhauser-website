"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AlbumImage } from "@/lib/album-types";

type Props = {
  images: AlbumImage[];
  /** Wird serverseitig vorberechnet — der Client entscheidet nie über Rechte. */
  downloadFlags: boolean[];
  downloadHrefs: string[];
  albumTitle: string;
  albumCredit: string;
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
  albumCredit,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
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
          role="dialog"
          aria-modal="true"
          aria-label={`${albumTitle} — image ${(openIndex ?? 0) + 1} of ${images.length}`}
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
                  className="rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10"
                >
                  Download
                </a>
              ) : null}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                Close
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => step(-1)}
              className="rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10"
              aria-label="Previous image"
            >
              Prev
            </button>
            <p className="min-w-0 flex-1 text-center text-xs text-paper/70">
              {active.caption ? <span className="block">{active.caption}</span> : null}
              <span className="block font-mono uppercase tracking-widest2">
                {active.credit ?? albumCredit}
              </span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className="rounded-sm border border-paper/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper/10"
              aria-label="Next image"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
