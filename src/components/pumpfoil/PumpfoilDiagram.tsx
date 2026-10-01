import type { Lang } from "@/lib/i18n";

/**
 * Pumpfoil-Schaubild — vollstaendig eigener Aufbau, kein fremdes Diagramm,
 * keine Fotovorlage. Gleiche Bildsprache wie src/components/iqfoil/FoilDiagram
 * (Farben, Schrift, Fuehrungslinien), damit beide Erklaerseiten zusammenpassen.
 *
 * Warum eine Zeichnung statt eines Fotos: Fuer diese Seite gibt es kein eigenes
 * oder fuer diesen Zweck schriftlich freigegebenes Pumpfoil-Foto (Stand
 * 02.10.2026). Eine schlichte Zeichnung erklaert zudem, was ein Foto nicht
 * zeigt: was unter Wasser passiert, waehrend man pumpt.
 *
 * Bewusst schematisch, Seitenansicht, ohne Massangaben: Board ueber der
 * Wasserlinie, Mast, Rumpf, Frontfluegel vorn, Heckfluegel hinten. Der rote
 * Doppelpfeil steht fuer das rhythmische Belasten und Entlasten, die
 * gestrichelte Welle fuer den Weg des Frontfluegels. Die Amplitude ist
 * uebertrieben gezeichnet, damit man sie sieht — sie behauptet keine Groesse.
 *
 * Zugaenglichkeit: `role="img"` mit `<title>` und `<desc>`; Beschriftungen sind
 * echter SVG-Text. Keine Animation.
 */

const COPY: Record<
  Lang,
  {
    title: string;
    desc: string;
    board: string;
    water: string;
    mast: string;
    front: string;
    rear: string;
    pump: string;
    path: string;
    direction: string;
    caption: string;
  }
> = {
  de: {
    title: "So funktioniert Pumpfoil",
    desc: "Schaubild in Seitenansicht: ein Board knapp über der Wasserlinie, darunter ein Mast mit Rumpf, vorn ein grosser Frontflügel, hinten ein kleiner Heckflügel. Ein roter Doppelpfeil über dem Board steht für das rhythmische Belasten und Entlasten. Eine gestrichelte Wellenlinie unter Wasser zeigt den Weg des Frontflügels, ein Pfeil die Fahrtrichtung nach vorn.",
    board: "Board",
    water: "Wasserlinie",
    mast: "Mast",
    front: "Frontflügel",
    rear: "Heckflügel",
    pump: "Pumpen",
    path: "Weg des Frontflügels",
    direction: "Fahrtrichtung",
    caption:
      "Schematisch: Rhythmisches Belasten und Entlasten führt den Frontflügel in einer flachen Welle durchs Wasser. Daraus entstehen Auftrieb und Vortrieb.",
  },
  en: {
    title: "How pump foiling works",
    desc: "Side-view diagram: a board just above the waterline, below it a mast with a fuselage, a large front wing at the front and a small rear wing behind. A red double arrow above the board stands for the rhythmic weighting and unweighting. A dashed wavy line under the water shows the path of the front wing, and an arrow shows the direction of travel.",
    board: "Board",
    water: "Waterline",
    mast: "Mast",
    front: "Front wing",
    rear: "Rear wing",
    pump: "Pumping",
    path: "Path of the front wing",
    direction: "Direction of travel",
    caption:
      "Schematic: rhythmic weighting and unweighting moves the front wing through the water in a shallow wave. This creates both lift and forward drive.",
  },
};

export default function PumpfoilDiagram({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const id = "pumpfoil-diagram";

  return (
    <figure className="mt-8 max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-mist p-4 sm:p-6">
        <svg
          viewBox="0 0 520 360"
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
          <rect x="0" y="170" width="520" height="190" fill="#dbe4ea" />
          <line x1="0" y1="170" x2="520" y2="170" stroke="#7d8b96" strokeWidth="2" />

          {/* Board, knapp ueber der Wasserlinie: es fliegt. Nase rechts. */}
          <path
            d="M170 150 L330 150 Q350 156 330 162 L170 162 Q158 156 170 150 Z"
            fill="#0a0e14"
          />

          {/* Mast */}
          <rect x="262" y="162" width="10" height="92" rx="3" fill="#0a0e14" />
          {/* Rumpf, nach hinten zum Heckfluegel */}
          <rect x="184" y="252" width="104" height="6" rx="3" fill="#3c4a57" />
          {/* Frontfluegel — Profil, gross, vorn */}
          <path d="M262 255 Q300 243 344 252 Q300 262 262 255 Z" fill="#0a0e14" />
          {/* Heckfluegel — Profil, klein, hinten */}
          <path d="M168 255 Q186 249 206 254 Q186 260 168 255 Z" fill="#3c4a57" />

          {/* Weg des Frontfluegels — schematische Welle */}
          <path
            d="M24 312 Q64 290 104 312 T184 312 T264 312 T344 312 T424 312 T504 312"
            fill="none"
            stroke="#c8102e"
            strokeWidth="2.5"
            strokeDasharray="7 6"
          />
          <text x="24" y="346" className="fill-red font-mono" fontSize="18">
            {c.path}
          </text>

          {/* Pumpen — Doppelpfeil ueber dem Board */}
          <line
            x1="250"
            y1="62"
            x2="250"
            y2="134"
            stroke="#c8102e"
            strokeWidth="3"
            markerStart={`url(#${id}-arrow)`}
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x="266" y="104" className="fill-red font-mono" fontSize="20">
            {c.pump}
          </text>

          {/* Fahrtrichtung */}
          <line
            x1="380"
            y1="58"
            x2="470"
            y2="58"
            stroke="#c8102e"
            strokeWidth="3"
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x="500" y="38" textAnchor="end" className="fill-red font-mono" fontSize="18">
            {c.direction}
          </text>

          {/* Beschriftungen mit feinen Fuehrungslinien */}
          <g className="fill-ink font-mono" fontSize="20">
            <line x1="172" y1="152" x2="120" y2="120" stroke="#7d8b96" />
            <text x="114" y="118" textAnchor="end">{c.board}</text>

            <line x1="274" y1="210" x2="330" y2="210" stroke="#7d8b96" />
            <text x="336" y="216">{c.mast}</text>

            <line x1="336" y1="252" x2="370" y2="276" stroke="#7d8b96" />
            <text x="376" y="282">{c.front}</text>

            <line x1="170" y1="256" x2="124" y2="228" stroke="#7d8b96" />
            <text x="118" y="226" textAnchor="end">{c.rear}</text>
          </g>

          <text x="8" y="192" className="fill-graphite font-mono" fontSize="18">
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
