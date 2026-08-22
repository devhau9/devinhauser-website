import Link from "next/link";
import type { SVGProps } from "react";
import { UI, localizedPath, type Lang } from "@/lib/i18n";

// Marken-Icons: identisch zu src/components/SocialMedia.tsx übernommen,
// damit Footer und Media-&-Content-Section exakt dieselbe Bildsprache
// verwenden (gleiche Pfaddaten, gleiche Markenfarben).
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id="footer-instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED576" />
          <stop offset="35%" stopColor="#F47133" />
          <stop offset="65%" stopColor="#BC3081" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-instagram-gradient)"
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

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/devin.hauser_/",
    Icon: InstagramIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@devin.hauser_",
    Icon: TikTokIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@devin.hauser",
    Icon: YouTubeIcon,
  },
];

// Vorläufige Kontakt-E-Mail — als eigene Konstante ausgelagert, damit sie
// später durch eine professionelle Adresse unter www.devinhauser.com ersetzt
// werden kann, ohne den Rest der Komponente anzufassen.
const CONTACT_EMAIL = "devinhauser9@gmail.com";

/**
 * Rechtliche Seiten.
 *
 * Die PFADE bleiben in beiden Sprachen englisch (`/imprint`, `/privacy-policy`,
 * `/copyright`) — nur mit `/en`-Praefix fuer die englische Fassung. Das ist
 * dieselbe Entscheidung wie bei `/media`: Uebersetzte Pfadsegmente saehen
 * huebscher aus, wuerden aber jede bestehende Verlinkung brechen und eine
 * zweite Pfadtabelle noetig machen. In next.config.mjs liegt bereits eine
 * 308-Weiterleitung von `/impressum` (alte .ch-Seite) auf `/imprint`.
 */
const LEGAL_PATHS = ["/privacy-policy", "/imprint", "/copyright"] as const;

const COPY: Record<
  Lang,
  {
    role: string;
    location: string;
    olympic: string;
    contact: string;
    follow: string;
    legal: string;
    legalLabels: [string, string, string];
    rights: string;
  }
> = {
  de: {
    role: "IQFoil- und Wingfoil-Racer aus der Schweiz",
    location: "Zürich, Schweiz",
    olympic: "Der Weg zu den Olympischen Spielen",
    contact: "Kontakt",
    follow: "Meinem Weg folgen",
    legal: "Rechtliches",
    legalLabels: ["Datenschutz", "Impressum", "Urheberrecht"],
    rights: "© 2026 Devin Hauser. Alle Rechte vorbehalten.",
  },
  en: {
    role: "Swiss IQFoil & Wingfoil Racer",
    location: "Zurich, Switzerland",
    olympic: "Road to the Olympic Games",
    contact: "Contact",
    follow: "Follow the Racing",
    legal: "Legal",
    legalLabels: ["Privacy Policy", "Imprint", "Copyright"],
    rights: "© 2026 Devin Hauser. All rights reserved.",
  },
};

export default function Footer({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const t = UI[lang];

  return (
    <footer className="border-t border-hairline bg-mist">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-24 lg:px-24">
        <div className="grid gap-14 sm:grid-cols-3 lg:gap-20">
          {/* Spalte 1: Brand */}
          <div>
            <p className="font-display text-2xl tracking-widest2 text-ink">
              DEVIN HAUSER
            </p>
            <div className="mt-6 space-y-3">
              <p className="font-mono text-sm uppercase tracking-widest2 text-red">
                {c.role}
              </p>
              <p className="font-body text-sm text-graphite">{c.location}</p>
              <p className="font-mono text-sm uppercase tracking-widest2 text-ink">
                {c.olympic}
              </p>
            </div>
          </div>

          {/* Spalte 2: Contact + Kanaele */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.contact}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-display text-lg tracking-wide text-ink transition-colors hover:text-red"
            >
              {CONTACT_EMAIL}
            </a>

            <p className="mt-8 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.follow}
            </p>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} (${t.newTab})`}
                  className="transition-transform duration-200 ease-out hover:scale-110"
                >
                  <social.Icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Spalte 3: Legal */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.legal}
            </p>
            <ul className="mt-3 space-y-2">
              {LEGAL_PATHS.map((path, index) => (
                <li key={path}>
                  <Link
                    href={localizedPath(path, lang)}
                    className="text-graphite transition-colors hover:text-red"
                  >
                    {c.legalLabels[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright — ganz unten, eigene Zeile */}
        <div className="mt-14 border-t border-hairline pt-6">
          <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            {c.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
