"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
  storeConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";
import { localizedPath, type Lang } from "@/lib/i18n";

const COPY: Record<
  Lang,
  {
    label: string;
    text: string;
    more: string;
    decline: string;
    accept: string;
  }
> = {
  de: {
    label: "Cookie-Einstellungen",
    text:
      "Diese Website nutzt Google Analytics, um die Nutzung zu verstehen und die Seite zu verbessern. Cookies werden erst nach Ihrer Zustimmung gesetzt.",
    more: "Mehr erfahren",
    decline: "Ablehnen",
    accept: "Akzeptieren",
  },
  en: {
    label: "Cookie settings",
    text:
      "This website uses Google Analytics to understand usage and improve the site. Cookies are only set once you agree.",
    more: "Learn more",
    decline: "Decline",
    accept: "Accept",
  },
};

/**
 * `useLayoutEffect` auf dem Client, `useEffect` auf dem Server.
 *
 * Die Bannerhöhe muss VOR dem ersten Bild gesetzt sein, in dem das Banner
 * ueberhaupt sichtbar ist — sonst zeichnet der Browser zuerst das Banner ueber
 * den Hero-Knoepfen und erst ein Bild spaeter den verschobenen Text. Genau
 * dieses Zucken vermeidet ein Layout-Effect: Er laeuft nach dem Einhaengen,
 * aber noch vor dem Zeichnen.
 *
 * Die Fallunterscheidung ist noetig, weil React beim Rendern auf dem Server
 * vor `useLayoutEffect` warnt. Diese Komponente wird serverseitig zwar nur zu
 * `null` gerendert, der Hook wird aber trotzdem aufgerufen.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// Einfaches, DSGVO/DSG-konformes Cookie-Consent-Banner:
// - erscheint nur, solange keine Entscheidung in localStorage gespeichert ist
// - "consent" startet bewusst als `undefined` (noch nicht geprüft) statt
//   `null` (aktiv abgelehnt/keine Entscheidung), damit der Banner server-
//   seitig NICHT gerendert wird (kein Zugriff auf localStorage im SSR) und
//   client-seitig erst nach dem ersten Effect erscheint — so entsteht kein
//   Hydration-Mismatch und kein kurzes Aufblitzen.
export default function CookieConsent({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [consent, setConsent] = useState<CookieConsentValue | null | undefined>(
    undefined
  );
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  const shouldShowBanner = consent === null;

  // Das Banner meldet seine eigene Höhe an das Dokument — sonst nichts.
  //
  // ───────────────────────────────────────────────────────────────────────────
  // WARUM DAS NÖTIG IST
  // ───────────────────────────────────────────────────────────────────────────
  // Das Banner liegt `fixed` am unteren Rand und deckte damit bei der Messung
  // vom 21.08.2026 auf JEDER Bildschirmbreite die beiden Hero-Knöpfe zu:
  // 375x812 und 1440x900 jeweils „Über mich" und „Kontakt aufnehmen",
  // 768x1024 sogar alle vier Einstiege. Ein Einwilligungsbanner, das die
  // Hauptaufrufe der Startseite verdeckt, nimmt dem Besucher genau die
  // Handlung weg, für die er gekommen ist.
  //
  // Zwei CSS-Variablen lösen das ohne eine einzige Änderung an der
  // Einwilligungslogik:
  //   --cookie-banner-h        exakte Bannerhöhe -> `body` bekommt so viel
  //                            Innenabstand unten, dass der Fusszeilenrand
  //                            nicht dauerhaft unter dem Banner liegt.
  //   --cookie-banner-offset   Bannerhöhe + 96px -> der Hero verschiebt seinen
  //                            Textblock um genau diesen Betrag nach oben,
  //                            solange das Banner steht. Was der Abstands-
  //                            halter oben verliert, gewinnt der Innenabstand
  //                            unten — die Höhe des Hero-Abschnitts und damit
  //                            der Bildausschnitt bleiben gleich (siehe
  //                            globals.css). Nach der Entscheidung fällt der
  //                            Wert weg und der Hero steht wieder wie vorher.
  //
  // Woher die 96px kommen: Unter den beiden Hauptknöpfen steht noch die flache
  // Zeile mit „Social Media" und „Galerie ansehen" (Zeilenhöhe plus Abstand
  // darüber). Ein Aufschlag von nur der Bannerhöhe hätte die Knöpfe zwar frei
  // gestellt, diese zweite Zeile aber weiterhin unter dem Banner gelassen —
  // bei der Messung auf 375x812 fehlten exakt 3px. Mit 96px (6rem) stehen auf
  // 375x812, 390x844 und 430x932 in beiden Sprachen alle vier Einstiege frei.
  // Auf sehr flachen Geräten (gemessen: 375x667) greift die `max()`-Notbremse
  // in globals.css; dort bleiben die beiden Hauptknöpfe frei, die flache
  // zweite Zeile liegt hinter dem Banner und wird erst beim Scrollen sichtbar.
  //
  // Gemessen wird mit `ResizeObserver`, nicht mit einem festen Wert: Die
  // Bannerhöhe hängt von Sprache, Schriftgrösse und Breite ab (164px auf
  // 375px deutsch, 145px englisch, 95px auf 1440px). Ein hart notierter Wert
  // wäre auf halber Strecke falsch.
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const clear = () => {
      root.style.removeProperty("--cookie-banner-h");
      root.style.removeProperty("--cookie-banner-offset");
    };

    const el = bannerRef.current;
    if (!shouldShowBanner || !el) {
      clear();
      return clear;
    }

    const publish = () => {
      const height = Math.ceil(el.getBoundingClientRect().height);
      root.style.setProperty("--cookie-banner-h", `${height}px`);
      root.style.setProperty("--cookie-banner-offset", `${height + 96}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);

    return () => {
      observer.disconnect();
      clear();
    };
  }, [shouldShowBanner]);

  function handleDecision(value: CookieConsentValue) {
    storeConsent(value);
    setConsent(value);
  }

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label={c.label}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-line bg-ink/95 px-6 py-4 backdrop-blur sm:px-10 sm:py-6 lg:px-16"
    >
      <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="max-w-2xl text-sm leading-snug text-slate-light sm:leading-relaxed">
          {c.text}{" "}
          <a
            href={localizedPath("/privacy-policy", lang)}
            className="text-paper underline underline-offset-2 transition-colors hover:text-red"
          >
            {c.more}
          </a>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleDecision("declined")}
            className="rounded-sm border border-ink-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-slate-light transition-colors hover:text-paper"
          >
            {c.decline}
          </button>
          <button
            type="button"
            onClick={() => handleDecision("accepted")}
            className="rounded-sm border border-red bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-transparent hover:text-red"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
