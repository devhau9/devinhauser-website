import Link from "next/link";
import { SECTION_ID, localizedPath, type Lang } from "@/lib/i18n";

// Öffentliche Partnership-Section: bewusst KEINE öffentlichen Sponsoring-Levels
// (Bronze/Silver/Gold/Main) und KEINE Preise — die Website verkauft die
// Personal Brand und die Möglichkeiten als Partner, nicht einen standardisierten
// Sponsoring-Shop. Konkrete Levels/Preise/Deliverables bleiben im Dossier bzw.
// im individuellen Angebot (Entscheidung 27.07.2026). Vier Capability-Karten
// statt Paketkarten. Keine Reichweiten/Zahlen erfunden, keine festen Mengen.

type Capability = {
  title: string;
  text: string;
};

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    opportunities: string;
    capabilities: Capability[];
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  }
> = {
  de: {
    eyebrow: "Partnerschaft",
    heading: "PARTNERSCHAFT",
    paragraphs: [
      "International an der Spitze mitzufahren, erfordert nicht nur viel Training und Zeit, sondern auch eine starke finanzielle und organisatorische Grundlage. Zu den grössten Ausgaben gehören Material, Reisen, Startgebühren, Unterkünfte, Logistik sowie Coaching und Motorboot.",
      "Dafür suche ich Partner, die meinen Weg im internationalen iQFOiL und Wingfoil Racing mittragen möchten. Was eine Zusammenarbeit konkret beinhaltet, bespreche ich am liebsten persönlich.",
    ],
    opportunities: "Wie eine Zusammenarbeit aussehen kann",
    capabilities: [
      {
        title: "Markenpräsenz",
        text: "Je nach Vereinbarung kann eine Marke auf meiner Website, meinem Fahrzeug, in ausgewählten Social-Media-Inhalten und im internationalen Regattaumfeld sichtbar werden.",
      },
      {
        title: "Bilder und Videos",
        text: "Fotos, Videos und Edits aus Trainingslagern, Wettkämpfen, Shootings und gemeinsamen Projekten.",
      },
      {
        title: "Produktintegration",
        text: "Produkte können authentisch in meinen Trainings-, Wettkampf-, Recovery- und Reisealltag integriert werden, sofern sie zu mir und meinem Sport passen.",
      },
      {
        title: "Langfristige Zusammenarbeit",
        text: "Auf Wunsch kann eine Partnerschaft über eine ganze Saison oder mehrere Saisons aufgebaut werden – statt nur für ein einzelnes Event.",
      },
    ],
    ctaPrimary: "Partner werden",
    ctaSecondary: "Partnerunterlagen anfragen",
    note: "Der konkrete Umfang wird gemeinsam festgelegt und auf die Ziele beider Seiten abgestimmt. Der Einstieg läuft über das Partner-Portal.",
  },
  en: {
    eyebrow: "Partnership",
    heading: "PARTNERSHIP",
    paragraphs: [
      "Competing at the highest international level requires more than training and time. It also requires a strong financial and organisational foundation. The main costs include equipment, travel, entry fees, accommodation, logistics, coaching and motorboat support.",
      "I am looking for partners who want to support my journey in international iQFOiL and Wingfoil Racing. I prefer to discuss the exact shape of a partnership personally.",
    ],
    opportunities: "What a partnership can include",
    capabilities: [
      {
        title: "Brand Presence",
        text: "Depending on the agreement, a brand can be featured on my website, my vehicle, selected social media content and within the international racing environment.",
      },
      {
        title: "Photos and Videos",
        text: "Photos, videos and edits from training camps, competitions, shoots and joint projects.",
      },
      {
        title: "Product Integration",
        text: "Products can be integrated authentically into my training, racing, recovery and travel routine when they fit me and my sport.",
      },
      {
        title: "Long-Term Collaboration",
        text: "A partnership can be built across a full season or several seasons, rather than around a single event.",
      },
    ],
    ctaPrimary: "Become a Partner",
    ctaSecondary: "Request Partnership Deck",
    note: "The exact scope is agreed together and aligned with the goals of both sides. The Partner Portal is the way in.",
  },
};

export default function Sponsoring({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section id={SECTION_ID.sponsoring} className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>

        {/* Kurze, persönliche, direkte Copy — kein Agentur-Ton, keine
            erfundenen Reichweiten, keine überzogenen Versprechen, kein
            Olympia-Jahr, keine öffentlichen Preise. */}
        {c.paragraphs.map((text, index) => (
          <p
            key={text.slice(0, 24)}
            className={`max-w-xl leading-relaxed text-graphite ${index === 0 ? "mt-6" : "mt-4"}`}
          >
            {text}
          </p>
        ))}

        {/* `text-balance`: ohne die Ausgleichsregel bricht die Zeile auf 375 px
            so um, dass das letzte Wort allein steht. */}
        <h3 className="mt-16 text-balance font-mono text-xs uppercase tracking-widest2 text-graphite/70">
          {c.opportunities}
        </h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {c.capabilities.map((capability) => (
            <div key={capability.title} className="card-surface flex flex-col p-8">
              <h4 className="font-display text-2xl tracking-wide text-ink">
                {capability.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                {capability.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            href={localizedPath("/partner-portal", lang)}
            className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
          >
            {c.ctaPrimary}
          </Link>
          <Link
            href={localizedPath("/partner-portal", lang)}
            className="rounded-sm border border-ink/15 px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:border-red hover:text-red"
          >
            {c.ctaSecondary}
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite">
          {c.note}
        </p>
      </div>
    </section>
  );
}
