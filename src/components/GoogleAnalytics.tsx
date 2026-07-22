"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_EVENT, getStoredConsent } from "@/lib/cookie-consent";

// Google Analytics 4 — eingebaut nach offizieller Next.js App-Router-Praxis
// mit next/script (Teil von Next.js selbst, keine zusätzliche Abhängigkeit
// nötig). strategy="afterInteractive" lädt das Skript, nachdem die Seite
// interaktiv ist — verzögert also nicht das initiale Rendering/Layout.
//
// DSGVO/DSG-konform: Das Script wird erst injiziert, nachdem der Besucher im
// Cookie-Banner (CookieConsent.tsx) aktiv zugestimmt hat. Ohne gespeicherte
// Zustimmung ("accepted" in localStorage) wird gar kein Google-Script
// geladen — auch nicht das reine gtag.js.
//
// Measurement ID bewusst als Konstante hier zentral gepflegt (keine
// sensiblen Daten — die ID ist ohnehin öffentlich im Browser sichtbar).
const GA_MEASUREMENT_ID = "G-MFEECDJCEF";

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setHasConsent(getStoredConsent() === "accepted");

    function handleConsentUpdate() {
      setHasConsent(getStoredConsent() === "accepted");
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
  }, []);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
