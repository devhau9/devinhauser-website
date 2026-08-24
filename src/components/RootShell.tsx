import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import HtmlLang from "@/components/HtmlLang";
import { fontClassNames } from "@/lib/fonts";
import { jsonLdHtml, personJsonLd, websiteJsonLd } from "@/lib/site";
import { UI, type Lang } from "@/lib/i18n";

/**
 * Das gemeinsame Dokumentgeruest beider Sprachen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM ES ZWEI ROOT-LAYOUTS GIBT, ABER NUR EIN GERUEST
 * ─────────────────────────────────────────────────────────────────────────────
 * `<html lang>` muss die tatsaechliche Sprache des Dokuments nennen — daran
 * haengen Screenreader-Aussprache, Silbentrennung und die Sprachbewertung von
 * Suchmaschinen. Ein einzelnes Root-Layout kennt den aktuellen Pfad nicht, ohne
 * die ganze Site auf dynamisches Rendering umzustellen. Also zwei Root-Layouts,
 * je Route Group eines.
 *
 * Zwei Layouts heisst aber nicht zwei Geruestdateien: Alles, was gleich bleibt
 * (Schriftvariablen, strukturierte Daten, Analytics, Sprunglink, Navigation,
 * Fusszeile, Cookie-Banner), steht genau hier. Die beiden Layouts sind je
 * sechs Zeilen und uebergeben nur die Sprache. So kann keine Fassung
 * versehentlich ohne Cookie-Banner oder ohne Sprunglink ausgeliefert werden.
 */
export default function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const t = UI[lang];

  return (
    <html lang={lang} className={fontClassNames}>
      <body className="min-h-screen bg-ink font-body text-paper antialiased">
        {/* Person und WebSite als getrennte, verknüpfte Entitäten (@id).
            Das hilft Suchmaschinen, die Seite als offizielle Website einer
            benannten Person zu erkennen — genau der Punkt, an dem es am
            10.08.2026 gehapert hat: devinhauser.com war mit einem veralteten
            Titel und nur einer URL indexiert. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(personJsonLd(lang)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(websiteJsonLd(lang)) }}
        />
        <HtmlLang lang={lang} />
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest2 focus:text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-red"
        >
          {t.skipToContent}
        </a>
        <Navigation lang={lang} />
        <div id="main-content">{children}</div>
        <Footer lang={lang} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
