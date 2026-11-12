import YouTubeFacade from "@/components/YouTubeFacade";
import { SECTION_ID, type Lang } from "@/lib/i18n";
import { absoluteUrl, jsonLdHtml } from "@/lib/site";

// Hauptvideo der Startseite (seit 31.10.2026; ersetzt am 13.11.2026).
//
// BELEGT (geprüft 12.11.2026, ca. 23:40 Zürich):
// - oEmbed (youtube.com/oembed, url=youtu.be/BU6nU6cB2lo): öffentlich auf dem
//   Kanal @devin.hauser, Titel exakt «How Does a Windsurf Foil Board Fly Above
//   Water?». Ändert Devin den Titel auf YouTube, hier nachziehen.
// - Videoseite: isPrivate false, isUnlisted false; uploadDate/datePublished
//   2026-11-12T14:34:07-08:00 (= 12.11.2026, 23:34 Zürich).
// - Dauer: approxDurationMs 315 320 (5:15,32), lengthSeconds 315; der Player
//   zeigt 5:15. Die Metaangabe der Seite rundet auf PT5M16S — hier bewusst
//   PT5M15S wie die tatsächliche Länge und der Master (5:15,32).
//
// Vorschaubild: Thumbnail A v03 aus dem eigenen Projekt «07-How-a-Foil-Flies»
// (T7, PB_How_a_Foil_Flies_THUMB_A_v03_4K.jpg), auf 1600×900 verkleinert, ohne
// Metadaten — kein Abruf von YouTube-Servern. Das Bild stammt aus den eigenen
// Aufnahmen; die Freigabe der Kameraperson ist im Projekt noch offen.
//
// Das frühere Video (Parawing Urnersee, qtws3inEID0) ist damit nicht mehr auf
// der Startseite; sein Poster /images/video/parawing-urnersee-2026.jpg bleibt
// bewusst im Repo.
//
// BEWUSST NICHT im Text: Ausrüstung, Geschwindigkeit, Aufrufzahlen. Nichts
// davon ist für dieses Video belegt.
const VIDEO = {
  id: "BU6nU6cB2lo",
  title: "How Does a Windsurf Foil Board Fly Above Water?",
  duration: "5:15",
  isoDuration: "PT5M15S",
  uploadDate: "2026-11-12T14:34:07-08:00",
  poster: { src: "/images/video/how-a-foil-flies-2026.jpg", width: 1600, height: 900 },
};

const COPY: Record<Lang, { eyebrow: string; heading: string; lead: string; description: string }> = {
  de: {
    eyebrow: "Video",
    heading: "WIE FLIEGT EIN FOILBOARD?",
    lead: "Warum hebt mein Windsurf-Board über dem Wasser ab? In diesem Video nehme ich das Wasser kurz weg: Mast, Frontflügel, Stabilisator, der Moment des Abhebens und eine ganze Halse, Schritt für Schritt.",
    description: "Erklärvideo von Devin Hauser: wie ein Windsurf-Foilboard über dem Wasser fliegt.",
  },
  en: {
    eyebrow: "Video",
    heading: "HOW DOES A FOIL BOARD FLY?",
    lead: "Why does my windsurf board lift off the water? In this video I take the water away for a moment: mast, front wing, stabilizer, the moment of takeoff and one full jibe, step by step.",
    description: "Explainer by Devin Hauser: how a windsurf foil board flies above the water.",
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
