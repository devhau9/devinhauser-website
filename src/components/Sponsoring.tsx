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
      "Ich suche Partner, die an den Weg glauben — nicht nur an das Endergebnis.",
      "Ich starte international im IQFoil und im Wingfoil Racing und zeige die Arbeit dahinter über Fotos, Videos und Social Media.",
      "Gemeinsam lässt sich eine Zusammenarbeit bauen, die zu beiden Seiten passt — von Markenpräsenz und Produktintegration bis zu echten Inhalten und langfristigem Storytelling.",
    ],
    opportunities: "Möglichkeiten einer Zusammenarbeit",
    capabilities: [
      {
        title: "Markenpräsenz",
        text: "Präsenz auf meiner Website, im Wettkampfumfeld und auf meinen Social-Media-Kanälen.",
      },
      {
        title: "Content & Storytelling",
        text: "Fotos, Videos, Drohnenaufnahmen und echte Geschichten hinter den Kulissen.",
      },
      {
        title: "Produktintegration",
        text: "Produkte im echten Einsatz — im Training, im Wettkampf und im Alltag.",
      },
      {
        title: "Individuelle Partnerschaften",
        text: "Langfristige Kampagnen, Events und Aktivierungen rund um gemeinsame Ziele.",
      },
    ],
    ctaPrimary: "Partner werden",
    ctaSecondary: "Partnerunterlagen anfragen",
    note: "Konkrete Möglichkeiten und die vollständige Übersicht bespreche ich persönlich — der Einstieg läuft über das Partner-Portal.",
  },
  en: {
    eyebrow: "Partnership",
    heading: "PARTNERSHIP",
    paragraphs: [
      "I'm looking for partners who believe in the journey — not just the final result.",
      "I compete internationally in IQFoil and Wingfoil and share the work behind it through photography, video and social media.",
      "Together, we can build a partnership that fits both sides — from brand visibility and product integration to authentic content and long-term storytelling.",
    ],
    opportunities: "Partnership Opportunities",
    capabilities: [
      {
        title: "Brand Visibility",
        text: "Presence across my website, racing environment and social channels.",
      },
      {
        title: "Content & Storytelling",
        text: "Photography, video, drone footage and authentic behind-the-scenes stories.",
      },
      {
        title: "Product Integration",
        text: "Natural product integration through training, racing and everyday use.",
      },
      {
        title: "Custom Partnerships",
        text: "Long-term campaigns, events and activations built around shared goals.",
      },
    ],
    ctaPrimary: "Become a Partner",
    ctaSecondary: "Request Partnership Deck",
    note: "Concrete partnership options and a full overview are shared personally through the Partner Portal.",
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

        <h3 className="mt-16 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
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
