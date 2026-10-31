"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { localizedPath, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { play: string; hint: string; privacy: string; external: string }> = {
  de: {
    play: "Video abspielen",
    hint: "Erst beim Abspielen wird YouTube (Google) geladen.",
    privacy: "Datenschutz",
    external: "Auf YouTube ansehen",
  },
  en: {
    play: "Play video",
    hint: "YouTube (Google) is only loaded when you press play.",
    privacy: "Privacy",
    external: "Watch on YouTube",
  },
};

/**
 * YouTube-Video als «Fassade»: zuerst nur ein eigenes Vorschaubild.
 *
 * Warum nicht direkt das iframe: Ein eingebetteter YouTube-Player lädt beim
 * Seitenaufruf rund 1 MB Skript und meldet jeden Besuch an Google — auch bei
 * allen, die das Video nie starten. Hier entsteht die Verbindung zu YouTube
 * erst mit dem Klick. Das Vorschaubild liegt auf dieser Website, damit auch
 * dafür keine Anfrage an Google nötig ist.
 *
 * Der Ton startet nur nach dem Klick (autoplay=1 gilt erst ab dann) — es gibt
 * keinen automatisch startenden Ton.
 */
export default function YouTubeFacade({
  lang,
  videoId,
  title,
  poster,
  duration,
}: {
  lang: Lang;
  videoId: string;
  /** Titel wie auf YouTube — Pflicht für das iframe (Screenreader). */
  title: string;
  poster: { src: string; width: number; height: number };
  /** Anzeige wie «16:06». */
  duration?: string;
}) {
  const c = COPY[lang];
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="min-w-0">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink-soft">
        {playing ? (
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
            // Der Fokus lag auf dem Knopf, der jetzt verschwunden ist. Ohne
            // diese Zeile fiele er an den Seitenanfang zurück.
            onLoad={() => frameRef.current?.focus()}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${c.play}: ${title}${duration ? ` (${duration})` : ""}`}
            className="group absolute inset-0 block h-full w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
          >
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:h-20 sm:w-20"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8">
                <path d="M7 4.5v15l12.5-7.5z" />
              </svg>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest2 text-white sm:bottom-6 sm:left-6"
            >
              {c.play}
              {duration ? ` · ${duration}` : ""}
            </span>
          </button>
        )}
      </div>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-relaxed opacity-80">
        <span>{c.hint}</span>
        <Link
          href={localizedPath("/privacy-policy", lang)}
          className="underline underline-offset-2 transition-colors hover:text-red focus-visible:text-red"
        >
          {c.privacy}
        </Link>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-red focus-visible:text-red"
        >
          {c.external} ↗
        </a>
      </p>
    </div>
  );
}
