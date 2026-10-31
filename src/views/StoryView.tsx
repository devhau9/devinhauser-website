import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import YouTubeFacade from "@/components/YouTubeFacade";
import { brandText } from "@/components/BrandText";
import { SECTION_ID, formatDate, localizedPath, sectionHref, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLdHtml } from "@/lib/site";
import { MISSING, STORY_SECTIONS, storyPath, type Story } from "@/lib/stories";

const COPY: Record<
  Lang,
  {
    kind: Record<Story["kind"], string>;
    sections: Record<(typeof STORY_SECTIONS)[number] | "result", string>;
    draft: string;
    pending: string;
    of: string;
    source: string;
    video: string;
    images: string;
    back: string;
    home: string;
  }
> = {
  de: {
    kind: { regatta: "Regatta", training: "Training" },
    sections: { goal: "Ziel", challenge: "Herausforderung", course: "Verlauf", result: "Resultat" },
    draft: "Entwurf — nur lokale Vorschau, nicht veröffentlicht",
    pending: "Das Resultat folgt, sobald die offizielle Rangliste steht.",
    of: "von",
    source: "Quelle",
    video: "Video",
    images: "Bilder",
    back: "Zu den Resultaten",
    home: "Startseite",
  },
  en: {
    kind: { regatta: "Regatta", training: "Training" },
    sections: { goal: "Goal", challenge: "Challenge", course: "How it went", result: "Result" },
    draft: "Draft — local preview only, not published",
    pending: "The result follows once the official ranking is final.",
    of: "of",
    source: "Source",
    video: "Video",
    images: "Images",
    back: "Back to results",
    home: "Home",
  },
};

function dateRange(story: Story, lang: Lang): string {
  const start = formatDate(story.startDate, lang);
  if (!story.endDate || story.endDate === story.startDate) return start;
  // Gleiches Jahr: «4. November – 8. November 2026» statt zweimal 2026.
  const sameYear = story.endDate.slice(0, 4) === story.startDate.slice(0, 4);
  return `${sameYear ? start.replace(/,?\s*\d{4}$/, "") : start} – ${formatDate(story.endDate, lang)}`;
}

/** Bezeichnungen wie «X-15» nie am Bindestrich umbrechen. */
function noBreakCodes(text: string): ReactNode {
  return text.split(/(\S*-\d\S*)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function storyMetadata(story: Story, lang: Lang): Metadata {
  return pageMetadata({
    lang,
    path: storyPath(story.slug),
    title: story.title[lang],
    description: story.summary[lang],
    type: "article",
    // Ein Entwurf ist nie indexierbar — auch nicht, wenn die Vorschau läuft.
    noindex: story.status !== "published",
  });
}

/**
 * Eine Regatta- oder Trainingsgeschichte: Ziel → Herausforderung → Verlauf →
 * Resultat, danach Bilder und Video. Fehlende Teile einer veröffentlichten
 * Geschichte lässt der Loader gar nicht durch; in Entwürfen werden sie als
 * gut sichtbare Lücke gezeigt, damit klar ist, was noch fehlt.
 */
export default function StoryView({ story, lang }: { story: Story; lang: Lang }) {
  const c = COPY[lang];
  const isDraft = story.status !== "published";

  const crumbs = breadcrumbJsonLd([
    { name: c.home, path: localizedPath("/", lang) },
    { name: story.title[lang], path: localizedPath(storyPath(story.slug), lang) },
  ]);

  return (
    <main className="bg-white">
      {!isDraft ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(crumbs) }} />
      ) : null}

      <article className="section-pad mx-auto max-w-3xl !px-6 sm:!px-10">
        {isDraft ? (
          <p className="mb-10 rounded-sm border border-dashed border-red/40 bg-red/5 px-4 py-3 font-mono text-xs uppercase tracking-widest2 text-red">
            {c.draft}
          </p>
        ) : null}

        <p className="eyebrow mb-5">
          {c.kind[story.kind]} · {brandText(story.discipline[lang])}
        </p>
        <h1 className="text-balance font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-6xl">
          {noBreakCodes(story.title[lang])}
        </h1>
        <p className="mt-5 font-mono text-xs uppercase tracking-widest2 text-graphite">
          {brandText(story.event[lang])} · {story.location[lang]} · {dateRange(story, lang)}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-ink">{brandText(story.summary[lang])}</p>

        {/* Der Bogen ist eine echte Reihenfolge — deshalb eine geordnete Liste. */}
        <ol className="mt-14 space-y-12 border-l border-hairline pl-6 sm:pl-10">
          {STORY_SECTIONS.map((key) => {
            const text = story[key]?.[lang];
            const missing = !text || text.includes(MISSING);
            if (missing && !isDraft) return null;
            return (
              <li key={key} className="relative">
                <span aria-hidden="true" className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-red sm:-left-[45px]" />
                <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite">{c.sections[key]}</h2>
                <p className={`mt-3 leading-relaxed ${missing ? "italic text-red" : "text-ink"}`}>
                  {text ?? MISSING}
                </p>
              </li>
            );
          })}

          <li className="relative">
            <span aria-hidden="true" className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-red sm:-left-[45px]" />
            <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite">{c.sections.result}</h2>
            {story.result ? (
              <div className="mt-3">
                <p className="font-display text-5xl tracking-wide text-red">
                  {story.result.placement}.
                  <span className="ml-3 font-mono text-sm uppercase tracking-widest2 text-graphite">
                    {c.of} {story.result.field}
                  </span>
                </p>
                <p className="mt-2 text-sm text-ink">{brandText(story.result.scoring[lang])}</p>
                <a
                  href={story.result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-graphite underline underline-offset-2 hover:text-red"
                >
                  {c.source}: {story.result.sourceLabel} ↗
                </a>
              </div>
            ) : (
              <p className="mt-3 leading-relaxed text-graphite">{c.pending}</p>
            )}
          </li>
        </ol>

        {story.images.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-widest2 text-graphite">{c.images}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {story.images.map((img) => (
                <figure key={img.src} className="min-w-0">
                  <Image
                    src={img.src}
                    alt={img.alt[lang]}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 640px) 380px, 100vw"
                    className="h-auto w-full rounded-xl"
                  />
                  <figcaption className="mt-2 text-xs text-graphite">© {img.credit}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {story.video ? (
          <section className="mt-16 text-ink">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-widest2 text-graphite">{c.video}</h2>
            <YouTubeFacade
              lang={lang}
              videoId={story.video.youtubeId}
              title={story.video.title}
              // Der Loader verlangt zu jedem Video mindestens ein eigenes Bild.
              poster={story.images[0]}
            />
          </section>
        ) : null}

        <Link
          href={sectionHref(lang, SECTION_ID.results)}
          className="mt-16 inline-block font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:text-red"
        >
          ← {c.back}
        </Link>
      </article>
    </main>
  );
}
