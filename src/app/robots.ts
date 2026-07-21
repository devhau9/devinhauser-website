import type { MetadataRoute } from "next";

const SITE_URL = "https://devinhauser.com";

// Bewusst kein "disallow" für /partner-portal hier: Diese Seite ist bereits
// über robots-Metadata (noindex) von der Google-Indexierung ausgeschlossen
// (siehe src/app/partner-portal/page.tsx). Ein zusätzliches Disallow in
// robots.txt würde Google davon abhalten, die Seite überhaupt zu crawlen —
// und damit auch davon abhalten, das noindex-Tag zu sehen und zu
// respektieren. Best Practice: noindex per Meta-Tag steuern, robots.txt nur
// für generelles Crawling-Verhalten nutzen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
