import PartnerPortalForm from "@/components/PartnerPortalForm";
import type { Lang } from "@/lib/i18n";

export const PORTAL_TITLE: Record<Lang, string> = {
  de: "Partner-Portal",
  en: "Partner Portal",
};

export const PORTAL_DESCRIPTION: Record<Lang, string> = {
  de: "Zugang zum Partner-Portal von Devin Hauser anfragen — für Sponsoren, Partner und Medienvertreterinnen und -vertreter.",
  en: "Request access to the Devin Hauser Partner Portal — for sponsors, partners and media representatives.",
};

const COPY: Record<Lang, { eyebrow: string; heading: string; lead: string }> = {
  de: {
    eyebrow: "Partner-Portal",
    heading: "Partner-Zugang anfragen",
    lead: "Das Partner-Portal gibt ausgewählten Partnern, Sponsoren und Medienvertreterinnen und -vertretern Zugang zu weiterführenden Informationen, aktuellen Reichweitendaten und Unterlagen zum Herunterladen.",
  },
  en: {
    eyebrow: "Partner Portal",
    heading: "Request Partner Access",
    lead: "The Partner Portal provides selected partners, sponsors and media representatives with access to additional information, current audience insights and downloadable materials.",
  },
};

export default function PartnerPortalView({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h1>

          <p className="mt-6 leading-relaxed text-graphite">{c.lead}</p>

          <PartnerPortalForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
