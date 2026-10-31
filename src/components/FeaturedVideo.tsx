import YouTubeFacade from "@/components/YouTubeFacade";
import { SECTION_ID, type Lang } from "@/lib/i18n";
import { absoluteUrl, jsonLdHtml } from "@/lib/site";

// Hauptvideo der Startseite (seit 31.10.2026).
//
// BELEGT (oEmbed-Abfrage 31.10.2026 und Social-Check 20.10.2026): öffentlich
// auf dem Kanal @devin.hauser, Titel «PARAWING RAW UNCUT LAKE URI
// SWITZERLAND», 16:06, veröffentlicht 18.10.2026. Der Titel wird exakt so
// übernommen, wie er auf YouTube steht; ändert Devin ihn dort, hier nachziehen.
//
// Vorschaubild: Einzelbild aus dem eigenen Video (Kandidat 3 aus
// «Thumbnail-Kandidaten-parawing-2026-10-19»), also eigenes Material — kein
// Abruf von YouTube-Servern.
//
// BEWUSST NICHT im Text: Ausrüstung, Windstärke, «ungeschnitten». Nichts davon
// ist für dieses Video belegt.
const VIDEO = {
  id: "qtws3inEID0",
  title: "PARAWING RAW UNCUT LAKE URI SWITZERLAND",
  duration: "16:06",
  isoDuration: "PT16M6S",
  uploadDate: "2026-10-18",
  poster: { src: "/images/video/parawing-urnersee-2026.jpg", width: 1600, height: 900 },
};

const COPY: Record<Lang, { eyebrow: string; heading: string; lead: string; description: string }> = {
  de: {
    eyebrow: "Video",
    heading: "EINE SESSION AM URNERSEE",
    lead: "Neben iQFOiL und Wingfoil fahre ich auch Parawing. Hier eine ganze Session auf dem Urnersee, aus meiner eigenen Perspektive gefilmt.",
    description: "Parawing-Session auf dem Urnersee, gefilmt von Devin Hauser.",
  },
  en: {
    eyebrow: "Video",
    heading: "A SESSION ON LAKE URI",
    lead: "Alongside iQFOiL and Wingfoil, I also ride a parawing. Here is a full session on Lake Uri, filmed from my own perspective.",
    description: "Parawing session on Lake Uri, Switzerland, filmed by Devin Hauser.",
  },
};

export default function FeaturedVideo({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  // VideoObject: nur belegte Felder. Kein `interactionStatistic` — Aufrufzahlen
  // ändern sich täglich und wären im statischen HTML sofort falsch.
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VIDEO.title,
    description: c.description,
    thumbnailUrl: absoluteUrl(VIDEO.poster.src),
    uploadDate: VIDEO.uploadDate,
    duration: VIDEO.isoDuration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${VIDEO.id}`,
    url: `https://www.youtube.com/watch?v=${VIDEO.id}`,
    creator: { "@id": `${absoluteUrl("/")}#person` },
  };

  return (
    <section id={SECTION_ID.video} className="section-pad bg-ink text-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(videoJsonLd) }} />
      <div className="reveal mx-auto grid max-w-content gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-end lg:gap-16">
        <div className="min-w-0">
          {/* Nicht `.eyebrow`: dessen Rot (#E10600) erreicht auf Schwarz nur 3,9:1.
              Das hellere Rot der Palette kommt auf 5,4:1. */}
          <p className="mb-5 font-mono text-xs uppercase tracking-widest2 text-red-soft">{c.eyebrow}</p>
          <h2 className="text-balance font-display text-4xl leading-[0.95] tracking-wide sm:text-5xl">
            {c.heading}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/80">{c.lead}</p>
        </div>
        <YouTubeFacade
          lang={lang}
          videoId={VIDEO.id}
          title={VIDEO.title}
          poster={VIDEO.poster}
          duration={VIDEO.duration}
        />
      </div>
    </section>
  );
}
