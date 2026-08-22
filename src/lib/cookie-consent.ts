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

/**
 * Gespeicherte Entscheidung lesen — oder `null`, wenn es keine gibt.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM HIER EIN try/catch STEHT (Befund 22.08.2026)
 * ─────────────────────────────────────────────────────────────────────────────
 * `window.localStorage` ist kein harmloses Objekt: In Safari mit „Alle Cookies
 * blockieren", in eingebetteten Ansichten und unter verschärften Datenschutz-
 * einstellungen WIRFT bereits der Zugriff auf die Eigenschaft — nicht erst
 * `getItem`. Die alte Fassung hatte nur `typeof window === "undefined"` als
 * Schutz, und das hilft gegen einen werfenden Getter überhaupt nicht.
 *
 * Diese Funktion wird aus zwei Effekten heraus während der Hydration
 * aufgerufen (CookieConsent.tsx und GoogleAnalytics.tsx). Eine Ausnahme dort
 * bricht die Hydration ab, und weil das Projekt bewusst keine `error.tsx`
 * besitzt, blieb die GESAMTE Seite weiss — nicht nur das Banner. Genau dieser
 * Fall wurde am 22.08.2026 mit blockiertem Storage reproduziert.
 *
 * Verhalten im Fehlerfall ist absichtlich konservativ: „keine Entscheidung
 * feststellbar" ist dasselbe wie „noch nicht entschieden". Also `null` — das
 * Banner erscheint, und Analytics bleibt aus. Ein Fehler beim Lesen darf
 * niemals als Zustimmung ausgelegt werden.
 */
export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  let value: string | null;
  try {
    value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }

  return value === "accepted" || value === "declined" ? value : null;
}

/**
 * Entscheidung speichern und die Seite darüber informieren.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM DAS EVENT AUSSERHALB DES try/catch STEHT
 * ─────────────────────────────────────────────────────────────────────────────
 * Schreiben kann aus denselben Gründen scheitern wie Lesen, zusätzlich bei
 * vollem Speicher. In der alten Fassung riss ein solcher Fehler zwei Dinge
 * mit sich: Die Ausnahme lief aus dem Klick-Handler heraus, UND die Zeile
 * darunter wurde nie erreicht — das Ereignis blieb aus, die Oberfläche
 * reagierte also gar nicht mehr auf den Klick.
 *
 * Deshalb umschliesst `try` nur den Schreibvorgang. Das Ereignis wird in
 * jedem Fall gefeuert: Wer auf „Ablehnen" oder „Akzeptieren" klickt, sieht
 * seine Auswahl sofort wirken, auch wenn sie sich nicht dauerhaft ablegen
 * lässt. Weil dann nichts gespeichert ist, erscheint das Banner nach einem
 * Neuladen wieder — das ist richtig so: Eine Einwilligung, die nicht
 * nachweisbar abgelegt werden konnte, darf nicht als fortbestehend gelten.
 *
 * `GoogleAnalytics.tsx` liest auf dieses Ereignis hin erneut über
 * `getStoredConsent()`. Konnte nicht geschrieben werden, liefert das weiterhin
 * `null` und Analytics bleibt aus — auch nach einem Klick auf „Akzeptieren".
 * Das ist gewollt: Ohne belegbar abgelegte Einwilligung wird nicht gemessen.
 */
export function storeConsent(value: CookieConsentValue): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Nicht ablegbar. Die Auswahl gilt trotzdem für die laufende Ansicht —
    // dafür sorgt das Ereignis unten und der lokale Zustand im Banner.
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
