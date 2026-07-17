import type { Metadata } from "next";
import PartnerPortalForm from "@/components/PartnerPortalForm";

export const metadata: Metadata = {
  title: "Partner Portal — Devin Hauser",
  description:
    "Zugang zum Partner Portal von Devin Hauser anfragen — für Sponsoren, Partner und Medienvertreter.",
};

export default function PartnerPortalPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Partner Portal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            Zugang anfragen
          </h1>

          <p className="mt-6 leading-relaxed text-graphite">
            Das Partner Portal stellt ausgewählten Partnern und
            Medienvertretern weiterführende Informationen, aktuelle
            Kennzahlen und Downloads zur Verfügung. Nach Prüfung der Anfrage
            wird der Zugang persönlich freigeschaltet.
          </p>

          <PartnerPortalForm />
        </div>
      </section>
    </main>
  );
}
