import type { Lang } from "@/lib/i18n";

/**
 * Kursgrafik — vollstaendig eigener Aufbau, kein fremdes Diagramm.
 *
 * Sie zeigt genau das, was Abschnitt 4 im Text beschreibt und was Einsteigern
 * am schwersten faellt: dass man nicht geradeaus gegen den Wind faehrt, sondern
 * im Zickzack. Der gestrichelte Pfad ist deshalb das eigentliche Motiv — die
 * Bojen allein wuerden die Frage nicht beantworten.
 *
 * Bewusst OHNE Distanzen, Winkel oder Gradzahlen: Kurse werden pro Event
 * gesteckt, jede Zahl hier waere eine Behauptung. Bewusst ohne Animation: Ein
 * laufender Punkt saehe hübsch aus, erklaert aber nichts, was der gestrichelte
 * Pfad nicht schon zeigt.
 */

const COPY: Record<
  Lang,
  {
    title: string;
    desc: string;
    start: string;
    finish: string;
    upwind: string;
    downwind: string;
    wind: string;
    path: string;
    caption: string;
  }
> = {
  de: {
    title: "Aufbau einer Regattabahn",
    desc: "Kursskizze: unten die Startlinie zwischen zwei Marken, darüber die Upwind-Marke, seitlich die Downwind-Marke. Der gestrichelte Weg zeigt, wie im Zickzack gegen den Wind und danach direkter zurückgefahren wird, bis zur Ziellinie.",
    start: "Startlinie",
    finish: "Ziel",
    upwind: "Upwind-Marke",
    downwind: "Downwind-Marke",
    wind: "Wind",
    path: "möglicher Weg",
    caption: "Gegen den Wind im Zickzack, zurück direkter — bis zur Ziellinie.",
  },
  en: {
    title: "How a race course is set",
    desc: "Course diagram: the start line between two marks at the bottom, the upwind mark above it and the downwind mark to the side. The dashed path shows the zigzag up into the wind and the more direct run back down, through to the finish line.",
    start: "Start line",
    finish: "Finish",
    upwind: "Upwind mark",
    downwind: "Downwind mark",
    wind: "Wind",
    path: "possible route",
    caption: "Zigzag up into the wind, a more direct run back down, then the finish.",
  },
};

export default function CourseDiagram({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const id = "course-diagram";

  return (
    <figure className="mt-8 max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-mist p-4 sm:p-6">
        <svg
          viewBox="0 0 520 420"
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
            <marker
              id={`${id}-wind`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#3c4a57" />
            </marker>
          </defs>

          {/* Wind von oben: damit liegt "upwind" oben im Bild */}
          <line
            x1="55"
            y1="34"
            x2="55"
            y2="96"
            stroke="#3c4a57"
            strokeWidth="3"
            markerEnd={`url(#${id}-wind)`}
          />
          <text x="55" y="24" textAnchor="middle" className="fill-graphite font-mono" fontSize="22">
            {c.wind}
          </text>

          {/* Zickzack nach oben, danach direkter zurueck */}
          <path
            d="M255 342 L170 265 L310 205 L250 97"
            fill="none"
            stroke="#c8102e"
            strokeWidth="3"
            strokeDasharray="9 8"
            strokeLinejoin="round"
          />
          <path d="M250 97 L390 262" fill="none" stroke="#c8102e" strokeWidth="3" strokeDasharray="9 8" />
          <path
            d="M390 262 L292 344"
            fill="none"
            stroke="#c8102e"
            strokeWidth="3"
            strokeDasharray="9 8"
            markerEnd={`url(#${id}-arrow)`}
          />

          {/* Bahnmarken */}
          <circle cx="250" cy="84" r="12" fill="#c8102e" />
          <text x="250" y="56" textAnchor="middle" className="fill-ink font-mono" fontSize="22">
            {c.upwind}
          </text>

          <circle cx="400" cy="270" r="12" fill="#c8102e" />
          <text x="400" y="306" textAnchor="middle" className="fill-ink font-mono" fontSize="22">
            {c.downwind}
          </text>

          {/* Startlinie zwischen zwei Marken, zugleich Ziellinie */}
          <line x1="170" y1="350" x2="340" y2="350" stroke="#0a0e14" strokeWidth="3" />
          <circle cx="170" cy="350" r="10" fill="#0a0e14" />
          <rect x="330" y="339" width="21" height="22" rx="3" fill="#0a0e14" />
          <text x="150" y="386" className="fill-ink font-mono" fontSize="22">
            {c.start}
          </text>
          <text x="366" y="386" textAnchor="end" className="fill-ink font-mono" fontSize="22">
            {c.finish}
          </text>

          {/* Legende fuer den gestrichelten Pfad */}
          <line x1="26" y1="300" x2="66" y2="300" stroke="#c8102e" strokeWidth="3" strokeDasharray="9 8" />
          <text x="74" y="306" className="fill-graphite font-mono" fontSize="20">
            {c.path}
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-graphite">
        {c.caption}
      </figcaption>
    </figure>
  );
}
