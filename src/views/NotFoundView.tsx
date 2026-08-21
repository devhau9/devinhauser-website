import Link from "next/link";
import { SECTION_ID, localizedPath, sectionHref, type Lang } from "@/lib/i18n";

const COPY: Record<
  Lang,
  { eyebrow: string; heading: string; text: string; links: string[] }
> = {
  de: {
    eyebrow: "404",
    heading: "SEITE NICHT GEFUNDEN",
    text: "Diese Seite gibt es nicht — sie wurde vielleicht verschoben, oder der Link ist veraltet. Hier geht es weiter.",
    links: ["Startseite", "Was ist IQFoil", "Ergebnisse", "Galerie", "Kontakt"],
  },
  en: {
    eyebrow: "404",
    heading: "PAGE NOT FOUND",
    text: "That page doesn’t exist — it may have been moved or the link may be out of date. Here is where to go instead.",
    links: ["Home", "What is IQFoil", "Results", "Gallery", "Contact"],
  },
};

export default function NotFoundView({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  const targets = [
    localizedPath("/", lang),
    localizedPath("/iqfoil", lang),
    sectionHref(lang, SECTION_ID.results),
    localizedPath("/media", lang),
    sectionHref(lang, SECTION_ID.contact),
  ];

  return (
    <main className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h1>
        <p className="mt-6 max-w-lg leading-relaxed text-graphite">{c.text}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {targets.map((href, index) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block rounded-sm border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                {c.links[index]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
