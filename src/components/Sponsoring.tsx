const TIERS = [
  {
    name: "Bronze",
    price: "Platzhalter CHF",
    perks: ["Platzhalter-Leistung 1", "Platzhalter-Leistung 2"],
  },
  {
    name: "Silber",
    price: "Platzhalter CHF",
    perks: ["Platzhalter-Leistung 1", "Platzhalter-Leistung 2", "Platzhalter-Leistung 3"],
  },
  {
    name: "Gold",
    price: "Platzhalter CHF",
    perks: [
      "Platzhalter-Leistung 1",
      "Platzhalter-Leistung 2",
      "Platzhalter-Leistung 3",
      "Platzhalter-Leistung 4",
    ],
  },
];

export default function Sponsoring() {
  return (
    <section id="sponsoring" className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Sponsoring</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          PARTNERSCHAFT
        </h2>
        <p className="mt-6 max-w-xl italic leading-relaxed text-graphite">
          Platzhalter: Kernargumente, warum eine Partnerschaft mit Devin
          attraktiv ist — Sport, Reichweite, Content-Mehrwert. Wird aus dem
          Sponsoring-Dossier und Kapitel 7 der Wissensdatenbank übernommen.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.name} className="card-surface flex flex-col p-9">
              <h3 className="font-display text-2xl tracking-wide text-ink">
                {tier.name}
              </h3>
              <p className="mt-2 font-mono text-sm text-graphite/70">
                {tier.price}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm italic leading-relaxed text-graphite">
                {tier.perks.map((perk) => (
                  <li key={perk}>— {perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          {/* Kein PDF im Ordner media/documents/sponsoring-dossier gefunden.
              Button bleibt sichtbar, aber bewusst als "noch nicht verfügbar"
              markiert statt auf einen erfundenen Link zu zeigen. */}
          <span
            aria-disabled="true"
            title="PDF noch nicht abgelegt in media/documents/sponsoring-dossier"
            className="cursor-not-allowed rounded-sm border border-dashed border-hairline px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-graphite/60"
          >
            Sponsoring-Dossier herunterladen (PDF folgt)
          </span>
          <a
            href="mailto:devinhauser9@gmail.com"
            className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
          >
            Partnerschaft anfragen
          </a>
        </div>
        <p className="mt-3 text-xs italic text-graphite/70">
          Sobald die PDF-Datei in media/documents/sponsoring-dossier liegt,
          wird der Button live verlinkt.
        </p>
      </div>
    </section>
  );
}
