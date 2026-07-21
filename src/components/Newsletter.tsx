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
            alt="Devin Hauser beim IQFoil-Training"
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
            Follow my journey through World Cups, training camps and the
            road towards the Olympic Games.
          </p>

          {/* Athleten-Community-Anmeldung statt Standard-Newsletter-Formular.
              Noch KEINE echte Anbindung — reines Markup, aber bewusst mit
              name-Attributen und als <form> strukturiert, damit später ein
              Anbieter (z. B. Kit, Beehiiv, Brevo) einfach angeschlossen
              werden kann: dafür i. d. R. nur `action`/`method` auf dem
              <form> ergänzen und den type="button" auf type="submit"
              ändern. onSubmit verhindert aktuell jede Übertragung, damit
              der Button keine falsche erfolgreiche Anmeldung vortäuscht. */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 max-w-md"
          >
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
