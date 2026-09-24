/** @type {import('next').NextConfig} */

// Öffentliche Markenadresse seit 19.08.2026: https://www.devinhauser.com
// (Entscheid Devin, Launch-Sprint). Alle anderen Produktions-Hostnamen leiten
// permanent (308) hierher. WICHTIG: ausschliesslich exakte Host-Matches —
// bewusst KEIN Wildcard auf *.vercel.app, damit Preview-Deployments
// (z. B. devinhauser-website-git-<branch>-….vercel.app) weiterhin direkt
// erreichbar bleiben. Previews trägt Vercel ohnehin mit «X-Robots-Tag:
// noindex» aus; zusätzlich kann im Dashboard Deployment Protection
// (Standard Protection) aktiviert werden — beides ohne Codeänderung.
const CANONICAL = "https://www.devinhauser.com";

/** Pfaderhaltende 308-Weiterleitung für einen exakten Hostnamen. */
const hostRedirect = (host) => ({
  source: "/:path*",
  has: [{ type: "host", value: host }],
  destination: `${CANONICAL}/:path*`,
  permanent: true,
});

/**
 * Sicherheitsheader für jede Antwort.
 *
 * Gemessen am 24.09.2026 lieferte die Produktion nur `strict-transport-security`
 * (von Vercel gesetzt, max-age 63072000). Die drei folgenden Header fehlten.
 * Sie sind bewusst die risikoarme Auswahl:
 *
 *   • `X-Content-Type-Options: nosniff` — der Browser hält sich an den
 *     gesendeten Content-Type und rät nicht. Betrifft nur Fälle, in denen ein
 *     falscher Typ ausgeliefert würde; für korrekt getypte Antworten folgenlos.
 *
 *   • `Referrer-Policy: strict-origin-when-cross-origin` — beim Klick auf einen
 *     Partnerlink erfährt die Zielseite nur noch die Herkunftsdomain, nicht den
 *     vollen Pfad. Das ist ohnehin Chromes Standard; hier steht es verbindlich
 *     und gilt damit auch in Browsern mit anderer Vorgabe.
 *
 *   • `X-Frame-Options: SAMEORIGIN` — die Seite darf nicht in einen fremden
 *     Rahmen gesetzt werden (Clickjacking). Die Website bindet nichts von sich
 *     selbst in fremde Seiten ein; eine Einbettung wäre heute immer fremd.
 *
 * BEWUSST OHNE Content-Security-Policy: Eine CSP müsste Google Analytics
 * (googletagmanager.com, nur nach Zustimmung geladen), das Web3Forms-Ziel des
 * Partnerformulars und Next.js' Inline-Skripte abdecken. Eine zu enge Regel
 * bricht genau diese drei Funktionen — und zwar erst in der Produktion. Eine
 * CSP gehört deshalb in einen eigenen Schritt mit eigener Messung, nicht
 * nebenbei in diese Ergänzung.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig = {
  reactStrictMode: true,

  // Moderne Bildformate zuerst. AVIF ist deutlich kleiner als WebP, WebP bleibt
  // als Fallback. Betrifft nur die von next/image ausgelieferten Derivate —
  // die Quelldateien in /public bleiben unverändert.
  images: {
    formats: ["image/avif", "image/webp"],

    // Die Webexporte in public/media sind 2000 px lang. Ohne diese Begrenzung
    // fordert die Lightbox mit `sizes="100vw"` auf einem 1440-px-Schirm mit
    // doppelter Pixeldichte die Stufe 3840 an. Next rechnet nichts hoch — es
    // liefert dieselben 2000 px — legt aber einen zweiten Cache-Eintrag an,
    // der nie schaerfer sein kann als der erste. Die Liste endet deshalb bei
    // 2048, der ersten Stufe oberhalb der Quellaufloesung.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  // Kein X-Powered-By-Header. Kein Sicherheitsgewinn im engeren Sinn, aber
  // auch kein Grund, die eingesetzte Technik ungefragt mitzuliefern.
  poweredByHeader: false,

  async headers() {
    // `/:path*` trifft jede Route, auch statische Dateien aus /public und die
    // von next/image erzeugten Bildantworten.
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

  async redirects() {
    return [
      // Alte .ch-Inhaltspfade zuerst (spezifisch vor generisch). Diese Regeln
      // sind schlummernd, bis die .ch-DNS auf Vercel zeigt — sie schaden bis
      // dahin nicht und erben danach das Ranking der alten Seite.
      { source: "/impressum", has: [{ type: "host", value: "devinhauser.ch" }], destination: `${CANONICAL}/imprint`, permanent: true },
      { source: "/impressum", has: [{ type: "host", value: "www.devinhauser.ch" }], destination: `${CANONICAL}/imprint`, permanent: true },
      { source: "/meine-ziele", has: [{ type: "host", value: "devinhauser.ch" }], destination: `${CANONICAL}/`, permanent: true },
      { source: "/meine-ziele", has: [{ type: "host", value: "www.devinhauser.ch" }], destination: `${CANONICAL}/`, permanent: true },

      // Apex → www (die eigentliche Kanonisierung).
      hostRedirect("devinhauser.com"),
      // Stabiler vercel.app-Produktionshost → www (behebt das Bing-Duplikat).
      hostRedirect("devinhauser-website.vercel.app"),
      // Tote .ch-Domain, sobald sie wieder auf dieses Projekt zeigt.
      hostRedirect("devinhauser.ch"),
      hostRedirect("www.devinhauser.ch"),
    ];
  },
};

export default nextConfig;
