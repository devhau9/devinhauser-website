"use client";

import { useState, type FormEvent } from "react";

export default function PartnerPortalForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Bewusst kein Backend, keine Datenbank, kein externer Dienst:
    // Die Anfrage wird aktuell nirgends gespeichert oder versendet,
    // nur lokal im Frontend bestätigt.
    setSubmitted(true);
  }

  if (submitted) {
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

      <button
        type="submit"
        className="mt-8 rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
      >
        Zugang anfragen
      </button>

      <p className="mt-4 text-xs italic text-graphite/70">
        Die Anfrage wird manuell geprüft. Es erfolgt keine automatische
        Freischaltung.
      </p>
    </form>
  );
}
