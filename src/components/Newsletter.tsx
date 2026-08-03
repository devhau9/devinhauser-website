"use client";

import Image from "next/image";

export default function Newsletter() {
  return (
    <section id="newsletter" className="section-pad border-t border-hairline bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
        {/* Grosses Action-Bild links. */}
        <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/DSCF0482.jpg"
            alt="Devin Hauser training IQFoil"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="eyebrow mb-5">Newsletter</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            STAY UPDATED
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-graphite">
            Follow my journey towards the Olympic Games. I share competitions,
            training camps, behind-the-scenes moments, new content and the
            milestones along the way — straight to your inbox.
          </p>

          {/*
            FRONTEND IST BEWUSST FERTIG VORBEREITET, aber noch OHNE echte
            Anbindung — es wird bewusst KEIN Newsletter-Anbieter erfunden.
            Der Button täuscht keine erfolgreiche Anmeldung vor (onSubmit
            verhindert jede Übertragung).

            OFFEN FÜR DIE TECHNISCHE INTEGRATION (Entscheidung: echter
            Newsletter-Dienst, z. B. Kit / Beehiiv / Brevo):
              1. Anbieter-Konto + Verifizierung (analog zum Web3Forms-Setup)
              2. Formular an den Anbieter anbinden (action/method oder API/fetch)
              3. Double-Opt-in aktivieren (DSGVO/DSG: Bestätigungs-E-Mail)
              4. Einwilligungs-Hinweis + Link zur Datenschutzerklärung ergänzen
              5. Erfolgs-/Fehler-Status sauber anzeigen (wie im Partner Portal)
              6. Datenschutzerklärung um den Newsletter-Abschnitt erweitern
            Bis dahin: type="submit" -> type="button" belassen, kein Fake-Erfolg.
          */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-md">
            <div className="flex flex-col overflow-hidden rounded-sm border border-ink/15 focus-within:border-red sm:flex-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                aria-label="First Name"
                className="w-full min-w-0 bg-white px-5 py-3.5 text-ink outline-none sm:w-1/2 sm:border-r sm:border-ink/15"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                aria-label="Last Name"
                className="w-full min-w-0 bg-white px-5 py-3.5 text-ink outline-none sm:w-1/2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              aria-label="Email Address"
              className="mt-3 w-full rounded-sm border border-ink/15 bg-white px-5 py-3.5 text-ink outline-none focus:border-red"
            />
            <button
              type="button"
              className="mt-3 w-full rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red-soft sm:w-auto"
            >
              Join the Journey
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
