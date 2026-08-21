import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

/*
  COMING-SOON-VERSION (Stand 03.08.2026).

  Bewusst OHNE Formular, OHNE Eingabefelder und OHNE Subscribe-Button:
  - es wird keinerlei Nutzerdaten erfasst oder übertragen
  - es gibt keinen Button, der eine Anmeldung vortäuschen könnte
  - es wird kein Newsletter-Anbieter genannt oder behauptet

  Kein "use client" mehr nötig, da keine Event-Handler/Interaktivität
  vorhanden sind — die Section rendert jetzt als reine Server-Komponente.

  WENN DER NEWSLETTER SPÄTER WIRKLICH KOMMT (Reihenfolge einhalten):
    1. Anbieter-Konto + Verifizierung (analog zum Web3Forms-Setup)
    2. Formular an den Anbieter anbinden (action/method oder API/fetch)
    3. Double-Opt-in aktivieren (DSGVO/DSG: Bestätigungs-E-Mail)
    4. Einwilligungs-Hinweis + Link zur Datenschutzerklärung ergänzen
    5. Erfolgs-/Fehler-Status sauber anzeigen (wie im Partner Portal)
    6. Privacy Policy VOR der ersten Anmeldung aktualisieren (Anbieter,
       Serverstandort, Link zu dessen Datenschutzerklärung) — das ist dort
       im Newsletter-Abschnitt ausdrücklich zugesagt
*/
const COPY: Record<
  Lang,
  { eyebrow: string; heading: string; lead: string; badge: string; imageAlt: string }
> = {
  de: {
    eyebrow: "Newsletter",
    heading: "DEM WEG FOLGEN",
    lead: "Wettkampf-Updates, Trainingslager, Geschichten hinter den Kulissen und wichtige Meilensteine.",
    badge: "Newsletter startet bald",
    imageAlt: "Devin Hauser beim IQFoil-Training",
  },
  en: {
    eyebrow: "Newsletter",
    heading: "FOLLOW THE JOURNEY",
    lead: "Competition updates, training camps, behind-the-scenes stories and important milestones.",
    badge: "Newsletter launching soon",
    imageAlt: "Devin Hauser training IQFoil",
  },
};

export default function Newsletter({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section
      id={SECTION_ID.newsletter}
      className="section-pad border-t border-hairline bg-white"
    >
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
        {/* Grosses Action-Bild links. */}
        <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/DSCF0482.jpg"
            alt={c.imageAlt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-graphite">{c.lead}</p>

          {/* Status-Hinweis statt Formular — rein informativ, nicht klickbar. */}
          <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-sm border border-ink/15 px-5 py-3">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
              aria-hidden="true"
            />
            <span className="min-w-0 font-mono text-[0.7rem] uppercase leading-relaxed tracking-widest2 text-graphite sm:text-xs">
              {c.badge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
