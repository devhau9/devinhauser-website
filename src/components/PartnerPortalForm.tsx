"use client";

import { useState, type FormEvent } from "react";
import type { Lang } from "@/lib/i18n";

// Web3Forms: kostenloser Formular-Service ohne eigenes Backend (250
// Einreichungen/Monat gratis, Stand 22.07.2026 laut web3forms.com). Der
// Access Key ist bei Web3Forms bewusst kein Geheimnis, sondern dafür
// gedacht, direkt im Frontend zu stehen — gleiche Logik wie die
// GA4-Measurement-ID in GoogleAnalytics.tsx (öffentlich sichtbare ID, keine
// sensiblen Daten).
//
// Access Key aktiv und funktionsfähig — von Devin am 22.07.2026 eingerichtet
// und mit einer echten Testanfrage erfolgreich bestätigt (E-Mail kam an).
const WEB3FORMS_ACCESS_KEY = "9b95458b-aa64-4bfa-8a20-b9640fc76186";

type SubmitState = "idle" | "loading" | "success" | "error";

const COPY: Record<
  Lang,
  {
    subject: (company: string) => string;
    unknownCompany: string;
    successTitle: string;
    successText: string;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    errorLead: string;
    errorMailPrefix: string;
    submit: string;
    submitting: string;
    note: string;
  }
> = {
  de: {
    subject: (company) => `Neue Anfrage Partner-Portal — ${company}`,
    unknownCompany: "Firma unbekannt",
    successTitle: "Danke.",
    successText: "Ihre Anfrage ist eingegangen und wird geprüft.",
    firstName: "Vorname",
    lastName: "Nachname",
    company: "Firma / Organisation",
    email: "E-Mail-Adresse",
    errorLead: "Da ist etwas schiefgelaufen. Bitte noch einmal versuchen — oder direkt schreiben an",
    errorMailPrefix: "",
    submit: "Zugang anfragen",
    submitting: "Wird gesendet…",
    note: "Jede Anfrage wird persönlich geprüft. Der Zugang wird nicht automatisch erteilt.",
  },
  en: {
    subject: (company) => `New Partner Portal request — ${company}`,
    unknownCompany: "unknown company",
    successTitle: "Thank you.",
    successText: "Your request has been received and will be reviewed.",
    firstName: "First Name",
    lastName: "Last Name",
    company: "Company / Organisation",
    email: "Email Address",
    errorLead: "Something went wrong. Please try again, or write directly to",
    errorMailPrefix: "",
    submit: "Request Access",
    submitting: "Sending…",
    note: "Every request is reviewed personally. Access is not granted automatically.",
  },
};

const CONTACT_EMAIL = "devinhauser9@gmail.com";

export default function PartnerPortalForm({ lang }: { lang: Lang }) {
  const [state, setState] = useState<SubmitState>("idle");
  const c = COPY[lang];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Wiedereintritt sperren. Der Knopf ist waehrend `loading` zwar deaktiviert,
    // aber das ist Darstellung: Ein zweites Submit-Ereignis kann trotzdem
    // ankommen — Enter im Eingabefeld, ein zweiter Klick im selben Tick, ein
    // Autofill-Helfer. Zwei Anfragen bedeuten zwei Mails, und beim
    // Web3Forms-Ratelimit unter Umstaenden eine 429 auf die zweite: Der
    // Absender saehe einen Fehler, obwohl die Anfrage laengst angekommen ist.
    if (state === "loading") return;
    setState("loading");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      c.subject(String(formData.get("company") ?? c.unknownCompany))
    );
    // Antwortadresse ausdruecklich setzen, statt darauf zu vertrauen, dass
    // Web3Forms das Feld `email` von selbst als Reply-To uebernimmt. Ohne das
    // muesste die Adresse vor jeder Antwort von Hand aus der Mail kopiert
    // werden — bei einer Sponsorenwelle genau der Schritt, der vergessen wird.
    const email = formData.get("email");
    if (typeof email === "string" && email.length > 0) {
      formData.append("replyto", email);
    }

    // Zeitlimit. Ohne das bleibt das Formular bei einer haengenden Verbindung
    // dauerhaft in `loading`: Knopf deaktiviert, keine Fehlermeldung, kein
    // Hinweis auf die Ausweichadresse. Genau der Zustand, in dem eine Anfrage
    // verloren geht, ohne dass es jemand merkt.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
        signal: controller.signal,
      });
      const result: unknown = await response.json();

      // BEIDE Bedingungen. `result.success` allein genuegt nicht: Der Wert
      // stammt aus einer fremden Antwort, und der Erfolgszustand ist hier eine
      // Zusage an den Absender, dass seine Anfrage angekommen ist. Web3Forms
      // antwortet dokumentiert mit 200 und {"success": true} im Erfolgsfall,
      // mit 400 und {"success": false} bei Fehlern und mit 429 beim Ratelimit.
      // Bei den letzten beiden darf niemals „Danke" erscheinen.
      const bestaetigt =
        response.ok &&
        typeof result === "object" &&
        result !== null &&
        (result as { success?: unknown }).success === true;

      setState(bestaetigt ? "success" : "error");
    } catch {
      // Netzfehler, Abbruch durch das Zeitlimit oder eine Antwort, die kein
      // JSON ist — etwa die Fehlerseite eines Zwischenservers.
      setState("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  if (state === "success") {
    return (
      <div className="card-surface mt-10 p-8 sm:p-10" role="status">
        <p className="font-display text-xl tracking-wide text-ink">
          {c.successTitle}
        </p>
        <p className="mt-2 leading-relaxed text-graphite">{c.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface mt-10 p-8 sm:p-10">
      {/* Honeypot-Feld gegen Spam-Bots — Feldname "botcheck" exakt gemäss
          Web3Forms-API-Referenz (docs.web3forms.com/getting-started/
          api-reference), dort als leeres Text-Feld dokumentiert (nicht als
          Checkbox), deshalb hier bewusst type="text" statt type="checkbox":
          so wird bei jeder echten menschlichen Absendung zuverlässig ein
          leerer String mitgeschickt, exakt wie im offiziellen Beispiel.
          Für Menschen und Screenreader vollständig verborgen. */}
      <input
        type="text"
        name="botcheck"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ display: "none" }}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="font-mono text-xs uppercase tracking-widest2 text-graphite/70"
          >
            {c.firstName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="mt-2 w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-red"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="font-mono text-xs uppercase tracking-widest2 text-graphite/70"
          >
            {c.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="mt-2 w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-red"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="font-mono text-xs uppercase tracking-widest2 text-graphite/70"
          >
            {c.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            className="mt-2 w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-red"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-widest2 text-graphite/70"
          >
            {c.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-red"
          />
        </div>
      </div>

      {state === "error" && (
        <p className="mt-4 text-sm text-red" role="alert">
          {c.errorLead}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-8 rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {state === "loading" ? c.submitting : c.submit}
      </button>

      <p className="mt-4 text-xs italic text-graphite/70">{c.note}</p>
    </form>
  );
}
