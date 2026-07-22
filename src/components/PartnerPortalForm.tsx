"use client";

import { useState, type FormEvent } from "react";

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

export default function PartnerPortalForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      `New Partner Portal request — ${formData.get("company") ?? "unknown company"}`
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();
      setState(result.success ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card-surface mt-10 p-8 sm:p-10" role="status">
        <p className="font-display text-xl tracking-wide text-ink">
          Vielen Dank.
        </p>
        <p className="mt-2 leading-relaxed text-graphite">
          Deine Anfrage wurde erfasst und wird geprüft.
        </p>
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
            Vorname
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
            Nachname
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
            Unternehmen / Organisation
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
            E-Mail-Adresse
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
          Something went wrong. Please try again, or write directly to{" "}
          <a href="mailto:devinhauser9@gmail.com" className="underline">
            devinhauser9@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-8 rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {state === "loading" ? "Sending…" : "Zugang anfragen"}
      </button>

      <p className="mt-4 text-xs italic text-graphite/70">
        Die Anfrage wird manuell geprüft. Es erfolgt keine automatische
        Freischaltung.
      </p>
    </form>
  );
}
