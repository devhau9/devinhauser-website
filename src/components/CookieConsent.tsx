"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  const shouldShowBanner = consent === null;

  function handleDecision(value: CookieConsentValue) {
    storeConsent(value);
    setConsent(value);
  }

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.label}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-line bg-ink/95 px-6 py-6 backdrop-blur sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-content flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-slate-light">
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
