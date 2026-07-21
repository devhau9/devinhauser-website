// Zentrale Cookie-Consent-Logik: wird sowohl von CookieConsent.tsx (Banner)
// als auch von GoogleAnalytics.tsx (bedingtes Laden des GA4-Scripts)
// verwendet. Ausgelagert in src/lib, damit keine der beiden Komponenten die
// jeweils andere importieren muss.

export type CookieConsentValue = "accepted" | "declined";

const CONSENT_STORAGE_KEY = "cookie-consent";

// Wird gefeuert, sobald sich die Zustimmung ändert (Klick auf "Akzeptieren"
// oder "Ablehnen"). Der native "storage"-Event von localStorage feuert nur
// in ANDEREN Tabs, nicht im selben Tab — deshalb ein eigenes Custom Event,
// damit GoogleAnalytics.tsx im selben Tab sofort reagieren kann.
export const COOKIE_CONSENT_EVENT = "cookie-consent-updated";

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function storeConsent(value: CookieConsentValue): void {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
