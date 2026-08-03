import type { Metadata } from "next";
import PartnerPortalForm from "@/components/PartnerPortalForm";

export const metadata: Metadata = {
  title: "Partner Portal — Devin Hauser",
  description:
    "Request access to the Devin Hauser Partner Portal — for sponsors, partners and media representatives.",
  alternates: {
    canonical: "/partner-portal",
  },
  robots: {
    // Partner-Portal-Anfrageseite bewusst von der Indexierung ausgeschlossen:
    // kein Mehrwert für organische Google-Suche, verhindert aber nicht den
    // Zugriff für eingeladene Partner (kein Login-Schutz, nur kein Index).
    index: false,
    follow: true,
  },
};

export default function PartnerPortalPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Partner Portal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            Request Partner Access
          </h1>

          <p className="mt-6 leading-relaxed text-graphite">
            The Partner Portal provides selected partners, sponsors and
            media representatives with access to additional information,
            current audience insights and downloadable materials.
          </p>

          <PartnerPortalForm />
        </div>
      </section>
    </main>
  );
}
