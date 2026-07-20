import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright — Devin Hauser",
};

export default function CopyrightPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            COPYRIGHT
          </h1>
          <p className="mt-6 leading-relaxed text-graphite">
            © 2026 Devin Hauser. All rights reserved. Detailed usage terms
            for images, video and other content on this site are currently
            being prepared and will be published here shortly.
          </p>
        </div>
      </section>
    </main>
  );
}
