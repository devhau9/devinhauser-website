"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
  storeConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

// Einfaches, DSGVO/DSG-konformes Cookie-Consent-Banner:
// - erscheint nur, solange keine Entscheidung in localStorage gespeichert ist
// - "consent" startet bewusst als `undefined` (noch nicht geprüft) statt
//   `null` (aktiv abgelehnt/keine Entscheidung), damit der Banner server-
//   seitig NICHT gerendert wird (kein Zugriff auf localStorage im SSR) und
//   client-seitig erst nach dem ersten Effect erscheint — so entsteht kein
//   Hydration-Mismatch und kein kurzes Aufblitzen.
export default function CookieConsent() {
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
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-line bg-ink/95 px-6 py-6 backdrop-blur sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-content flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-slate-light">
          Diese Website verwendet Google Analytics, um die Nutzung zu
          verstehen und die Seite zu verbessern. Cookies werden erst gesetzt,
          wenn du zustimmst.{" "}
          <a
            href="/privacy-policy"
            className="text-paper underline underline-offset-2 transition-colors hover:text-red"
          >
            Mehr erfahren
          </a>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleDecision("declined")}
            className="rounded-sm border border-ink-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-slate-light transition-colors hover:text-paper"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => handleDecision("accepted")}
            className="rounded-sm border border-red bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-transparent hover:text-red"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
