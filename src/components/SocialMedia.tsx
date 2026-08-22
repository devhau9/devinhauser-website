import Link from "next/link";
import type { SVGProps } from "react";
import { SECTION_ID, UI, localizedPath, type Lang } from "@/lib/i18n";

// Marken-Icons: Iconformen unverändert aus den bisherigen, gemeinfreien
// Simple-Icons-Pfaddaten übernommen — nur die Füllung von "currentColor"
// (neutral, einheitlich mit dem übrigen Text) auf feste Markenfarben
// umgestellt. Keine neue Abhängigkeit, weiterhin reine Inline-SVGs.
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED576" />
          <stop offset="35%" stopColor="#F47133" />
          <stop offset="65%" stopColor="#BC3081" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagram-brand-gradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948C23.732 2.7 21.311.273 16.951.073 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  );
}

const TIKTOK_PATH =
  "M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z";

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      {/* Markentypischer Duoton-Versatz: Cyan- und Rot-Kopie leicht versetzt
          dahinter, schwarze Grundform oben — bewusst dezent (0.6px Versatz),
          nicht neonartig übertrieben. */}
      <path d={TIKTOK_PATH} fill="#00E5DB" transform="translate(0.6 -0.6)" opacity={0.85} />
      <path d={TIKTOK_PATH} fill="#EE1D52" transform="translate(-0.6 0.6)" opacity={0.85} />
      <path d={TIKTOK_PATH} fill="#000000" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Alle drei Profile bestätigt (19.07.2026) — vollständig klickbar.
const CHANNELS = [
  {
    name: "Instagram",
    handle: "@devin.hauser_",
    href: "https://www.instagram.com/devin.hauser_/",
    Icon: InstagramIcon,
  },
  {
    name: "TikTok",
    handle: "@devin.hauser_",
    href: "https://www.tiktok.com/@devin.hauser_",
    Icon: TikTokIcon,
  },
  {
    name: "YouTube",
    handle: "@devin.hauser",
    href: "https://www.youtube.com/@devin.hauser",
    Icon: YouTubeIcon,
  },
];

/**
 * Social Media & Content.
 *
 * ═════════════════════════════════════════════════════════════════════════════
 * TRENNUNG VON SOCIAL MEDIA UND GALERIE (Vorgabe 21.08.2026)
 * ═════════════════════════════════════════════════════════════════════════════
 * Diese Sektion hiess in der Überschrift „MEDIA & CONTENT" und war damit von
 * der Bildergalerie unter /media sprachlich nicht zu unterscheiden. Zwei
 * verschiedene Dinge trugen praktisch denselben Namen: hier die laufenden
 * Kanäle, dort die kuratierten Alben. Wer „Media" las, konnte beides meinen.
 *
 * Jetzt ist die Zuständigkeit eindeutig:
 *   • DIESE Sektion  = die Kanäle und die Content-Kompetenz (Social Media)
 *   • GalleryTeaser + /media = die Bilder selbst (Galerie)
 * Beide verlinken aufeinander, aber keine der beiden behauptet, die andere zu
 * sein. Es gibt weiterhin nur EIN Galeriesystem — die Media Library.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REIHENFOLGE DER AUSSAGEN
 * ─────────────────────────────────────────────────────────────────────────────
 * Vorgegeben und bewusst eingehalten: IQFoil → Wingfoil Racing →
 * Content-Kompetenz → Kooperationen. Der Sport steht zuerst, die
 * Medienkompetenz ist der Unterschied, die Zusammenarbeit ist die Folge —
 * nicht umgekehrt.
 */

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    galleryLink: string;
    portalText: string;
    portalCta: string;
  }
> = {
  de: {
    eyebrow: "Social Media",
    heading: "SOCIAL MEDIA & CONTENT",
    paragraphs: [
      "Zuerst der Sport: Ich fahre IQFoil, die olympische Windsurf-Klasse, und starte zusätzlich im Wingfoil Racing.",
      "Einen grossen Teil der Fotos und Videos mache ich selbst — an Regatten, im Training und auf den Fahrten dazwischen. Dazu kommen ausgewählte Aufnahmen von Fotografinnen, Fotografen und Organisationen; wer das Bild gemacht hat, steht beim Bild.",
      "Für Partner entstehen daraus Bilder und Videos von den Regatten und aus dem Training.",
    ],
    galleryLink: "Die kuratierten Bilder liegen in der Galerie",
    portalText:
      "Sie überlegen eine Zusammenarbeit? Der Einstieg läuft über das Partner-Portal.",
    portalCta: "Partner-Portal",
  },
  en: {
    eyebrow: "Social Media",
    heading: "SOCIAL MEDIA & CONTENT",
    paragraphs: [
      "The sport comes first: I race IQFoil, the Olympic windsurfing class, and I also compete in Wingfoil Racing.",
      "I shoot a large part of the photos and video myself — at regattas, in training and on the drives in between. Alongside that, the site uses selected images from photographers and organisations; whoever took the picture is credited with it.",
      "For partners, that turns into photos and video from the regattas and from training.",
    ],
    galleryLink: "The curated photos live in the gallery",
    portalText:
      "Thinking about working together? The Partner Portal is the way in.",
    portalCta: "Partner Portal",
  },
};

export default function SocialMedia({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const t = UI[lang];

  return (
    <section id={SECTION_ID.social} className="section-pad bg-mist">
      {/* Bild bewusst entfernt — aktuell kein passendes echtes Creator-/
          Behind-the-Scenes-Foto vorhanden. Section deshalb ohne leeren
          Bildplatz einspaltig ausgerichtet. */}
      <div className="mx-auto max-w-content">
        <div className="min-w-0">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h2>

          {c.paragraphs.map((text, index) => (
            <p
              key={text.slice(0, 24)}
              className={`max-w-xl leading-relaxed text-graphite ${index === 0 ? "mt-6" : "mt-4"}`}
            >
              {text}
            </p>
          ))}

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {CHANNELS.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${channel.name} — ${channel.handle} (${t.newTab})`}
                className="card-surface group block p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,14,20,0.06),0_28px_60px_-28px_rgba(10,14,20,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                <channel.Icon className="h-7 w-7 transition-transform duration-200 ease-out group-hover:scale-110" />
                <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                  {channel.name}
                </p>
                <p className="mt-2 font-display text-xl tracking-wide text-ink group-hover:text-red">
                  {channel.handle}
                </p>
              </a>
            ))}
          </div>

          {/* Eindeutige Brücke zur Galerie — die Trennung wird hier auch für
              Leserinnen und Leser sichtbar, nicht nur in der Navigation. */}
          <p className="mt-8">
            <Link
              href={localizedPath("/media", lang)}
              className="font-mono text-xs uppercase tracking-widest2 text-ink underline decoration-black/20 underline-offset-[6px] transition-colors hover:text-red"
            >
              {c.galleryLink}
            </Link>
          </p>

          {/* Ruhiger Partner-Portal-Hinweis statt Follower-/Insight-Zahlen. */}
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-graphite">{c.portalText}</p>
            <Link
              href={localizedPath("/partner-portal", lang)}
              className="shrink-0 rounded-sm bg-red px-6 py-3 text-center font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
            >
              {c.portalCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
