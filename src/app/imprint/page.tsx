import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint — Devin Hauser",
};

export default function ImprintPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            IMPRINT
          </h1>
          <p className="mt-6 leading-relaxed text-graphite">
            This page is currently being prepared. Full imprint details will
            be published here shortly.
          </p>
        </div>
      </section>
    </main>
  );
}
