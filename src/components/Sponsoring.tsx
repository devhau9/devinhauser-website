import Link from "next/link";

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

const CAPABILITIES: Capability[] = [
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
];

export default function Sponsoring() {
  return (
    <section id="sponsoring" className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Partnership</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          PARTNERSHIP
        </h2>

        {/* Kurze, persönliche, direkte Copy — kein Agentur-/AI-Ton, keine
            erfundenen Reichweiten, keine überzogenen Versprechen, kein
            Olympia-Jahr. */}
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          I&apos;m looking for partners who believe in the journey — not just the
          final result.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-graphite">
          I compete internationally in IQFoil and Wingfoil and share the work
          behind it through photography, video and social media.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-graphite">
          Together, we can build a partnership that fits both sides — from brand
          visibility and product integration to authentic content and long-term
          storytelling.
        </p>

        <h3 className="mt-16 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
          Partnership Opportunities
        </h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability) => (
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
            href="/partner-portal"
            className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
          >
            Become a Partner
          </Link>
          <Link
            href="/partner-portal"
            className="rounded-sm border border-ink/15 px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:border-red hover:text-red"
          >
            Request Partnership Deck
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite">
          Concrete partnership options and a full overview are shared personally
          through the Partner Portal.
        </p>
      </div>
    </section>
  );
}
