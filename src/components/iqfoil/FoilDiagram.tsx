import type { Lang } from "@/lib/i18n";

/**
 * Foil-Schaubild — vollstaendig eigener Aufbau, kein fremdes Diagramm.
 *
 * Warum es hier steht: Abschnitt 2 braucht zwei Absaetze, um zu erklaeren, was
 * unter dem Board haengt. Eine schlichte Zeichnung erledigt das in zwei
 * Sekunden — und sie hat, anders als jedes Foto, keinerlei Rechtefrage.
 *
 * Bewusst schematisch statt massstabsgetreu: Die Zeichnung soll die ANORDNUNG
 * zeigen (Segel oben, Board an der Wasserlinie, Mast nach unten, grosser
 * Frontfluegel vorn, kleiner Heckfluegel hinten), nicht Proportionen behaupten.
 * Deshalb steht auch keine Laengenangabe im Bild: Die Mastlaenge ist zwischen
 * den Quellen strittig, und eine gezeichnete Zahl waere eine Behauptung.
 *
 * Zugaenglichkeit: `role="img"` mit `<title>` und `<desc>`; die Beschriftungen
 * sind echter SVG-Text und skalieren mit. Keine Animation — sie braechte hier
 * keinen Erkenntnisgewinn.
 *
 * `viewBox` plus `w-full h-auto`: Das Bild bringt sein eigenes
 * Seitenverhaeltnis mit, verursacht also keinen Layoutsprung beim Laden.
 */

const COPY: Record<
  Lang,
  {
    title: string;
    desc: string;
    sail: string;
    board: string;
    water: string;
    mast: string;
    front: string;
    rear: string;
    direction: string;
    lift: string;
    caption: string;
  }
> = {
  de: {
    title: "Aufbau eines iQFOiL",
    desc: "Schaubild eines iQFOiL: Segel und Board über der Wasserlinie, darunter ein Mast mit einem grossen Frontflügel vorn und einem kleineren Heckflügel hinten. Pfeile zeigen die Fahrtrichtung nach vorn und den Auftrieb nach oben.",
    sail: "Segel",
    board: "Board",
    water: "Wasserlinie",
    mast: "Mast",
    front: "Frontflügel",
    rear: "Heckflügel",
    direction: "Fahrtrichtung",
    lift: "Auftrieb",
    caption: "Der Aufbau: Segel und Board über Wasser, Mast und zwei Flügel darunter.",
  },
  en: {
    title: "How an iQFOiL is put together",
    desc: "Diagram of an iQFOiL: sail and board above the waterline, below them a mast with a large front wing at the front and a smaller rear wing behind. Arrows show the direction of travel forwards and the lift upwards.",
    sail: "Sail",
    board: "Board",
    water: "Waterline",
    mast: "Mast",
    front: "Front wing",
    rear: "Rear wing",
    direction: "Direction of travel",
    lift: "Lift",
    caption: "The layout: sail and board above the water, mast and two wings below.",
  },
};

export default function FoilDiagram({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const id = "foil-diagram";

  return (
    <figure className="mt-8 max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-mist p-4 sm:p-6">
        <svg
          viewBox="0 0 520 380"
          className="h-auto w-full"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>{c.title}</title>
          <desc id={`${id}-desc`}>{c.desc}</desc>

          <defs>
            <marker
              id={`${id}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#c8102e" />
            </marker>
          </defs>

          {/* Wasser */}
          <rect x="0" y="200" width="520" height="180" fill="#dbe4ea" />
          <line x1="0" y1="200" x2="520" y2="200" stroke="#7d8b96" strokeWidth="2" />

          {/* Segel — schlichtes Dreieck, kein Markenzeichen */}
          <path d="M250 25 L250 190 L192 190 Z" fill="#c8102e" fillOpacity="0.85" />
          <line x1="250" y1="25" x2="250" y2="190" stroke="#0a0e14" strokeWidth="3" />

          {/* Board, knapp ueber der Wasserlinie: es fliegt */}
          <path
            d="M120 186 L352 186 Q372 192 352 198 L120 198 Q106 192 120 186 Z"
            fill="#0a0e14"
          />

          {/* Foil-Mast */}
          <rect x="252" y="198" width="11" height="52" rx="3" fill="#0a0e14" />
          {/* Frontfluegel — gross, vorn */}
          <path d="M195 250 Q258 234 320 250 Q258 262 195 250 Z" fill="#0a0e14" />
          {/* Verbindung zum Heckfluegel */}
          <rect x="254" y="250" width="7" height="24" fill="#3c4a57" />
          {/* Heckfluegel — kleiner, hinten */}
          <path d="M228 274 Q258 266 288 274 Q258 282 228 274 Z" fill="#3c4a57" />

          {/* Auftrieb */}
          <line
            x1="430"
            y1="250"
            x2="430"
            y2="210"
            stroke="#c8102e"
            strokeWidth="3"
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x="430" y="272" textAnchor="middle" className="fill-red font-mono" fontSize="22">
            {c.lift}
          </text>

          {/* Fahrtrichtung */}
          <line
            x1="330"
            y1="120"
            x2="420"
            y2="120"
            stroke="#c8102e"
            strokeWidth="3"
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x="375" y="104" textAnchor="middle" className="fill-red font-mono" fontSize="22">
            {c.direction}
          </text>

          {/* Beschriftungen mit feinen Fuehrungslinien */}
          <g className="fill-ink font-mono" fontSize="22">
            <line x1="248" y1="80" x2="182" y2="80" stroke="#7d8b96" />
            <text x="174" y="86" textAnchor="end">{c.sail}</text>

            <line x1="352" y1="190" x2="400" y2="172" stroke="#7d8b96" />
            <text x="406" y="178">{c.board}</text>

            <line x1="265" y1="222" x2="320" y2="222" stroke="#7d8b96" />
            <text x="326" y="228">{c.mast}</text>

            <line x1="205" y1="252" x2="156" y2="282" stroke="#7d8b96" />
            <text x="150" y="288" textAnchor="end">{c.front}</text>

            <line x1="290" y1="276" x2="350" y2="306" stroke="#7d8b96" />
            <text x="356" y="312">{c.rear}</text>
          </g>

          <text x="8" y="222" className="fill-graphite font-mono" fontSize="20">
            {c.water}
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-graphite">
        {c.caption}
      </figcaption>
    </figure>
  );
}
