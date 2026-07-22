// Preise und konkrete Einzelleistungen pro Stufe sind laut
// docs/open-questions.md (Punkt 5) bewusst noch offen — inkl. der
// Grundsatzfrage, ob Preise überhaupt öffentlich gezeigt werden sollen.
// Deshalb hier bewusst KEINE erfundenen CHF-Beträge oder Leistungslisten:
// "Nach Absprache" ist in der Sponsoring-Welt ein absolut übliches,
// professionelles Vorgehen, solange die Tiers final nicht bestätigt sind.
// Sobald Devin Preise/Leistungen freigibt, hier ergänzen.
const TIERS = [
  {
    name: "Bronze",
    price: "Nach Absprache",
    perks: ["Umfang und Leistungen werden individuell besprochen"],
  },
  {
    name: "Silber",
    price: "Nach Absprache",
    perks: ["Umfang und Leistungen werden individuell besprochen"],
  },
  {
    name: "Gold",
    price: "Nach Absprache",
    perks: ["Umfang und Leistungen werden individuell besprochen"],
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
        {/* Text basiert ausschliesslich auf bereits vorhandenen, an anderer
            Stelle im Projekt bestätigten Informationen (Steckbrief in
            About.tsx, content/de/02-ueber-mich.md, bereits bestehende
            Partner in Partners.tsx, Content-Ausrichtung in SocialMedia.tsx).
            Keine neuen Zahlen, Resultate oder Partner erfunden. */}
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          Devin Hauser ist ein 18-jähriger Schweizer IQFoil- und
          Wingfoil-Racing-Athlet (Segelnummer SUI-134), verankert in Zürich
          mit Trainingsbasis am Silvaplanersee. Er befindet sich mitten im
          Aufbau internationaler Erfahrung auf dem Weg zur Weltspitze — eine
          Partnerschaft bedeutet, einen Athleten frühzeitig zu begleiten, der
          seinen Weg konsequent, langfristig und mit sichtbarem Engagement
          verfolgt.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-graphite">
          Diszipliniertes Training, internationale Wettkampferfahrung und
          eine ehrliche, unmittelbare Kommunikation über den Alltag im
          Spitzensport prägen seinen Auftritt. Über Foto-, Video- und
          Drohnenaufnahmen entstehen authentische Einblicke in Training,
          Wettkämpfe und den Weg dorthin — Content, der sich direkt für die
          eigenen Kanäle von Partnern nutzen lässt.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-graphite">
          Sichtbar wird das über Instagram, TikTok und YouTube sowie die
          bereits bestehenden Partnerschaften mit Organisationen aus Sport,
          Gesundheit, Wassersport und der Schweizer Wirtschaft (siehe
          Partner-Sektion unten). Detaillierte Reichweiten- und
          Zielgruppendaten stellen wir interessierten Partnern gerne über
          das Partner Portal zur Verfügung.
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
