import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SportGoals from "@/components/SportGoals";
import Goals from "@/components/Goals";
import Highlights from "@/components/Highlights";
import SocialMedia from "@/components/SocialMedia";
import GalleryTeaser from "@/components/GalleryTeaser";
import Sponsoring from "@/components/Sponsoring";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
// Newsletter wieder aktiv (Entscheidung 03.08.2026) — aber als reine
// Coming-soon-Section OHNE Formular, Eingabefelder oder Subscribe-Button.
// Es werden weiterhin keine Daten erfasst und kein Anmelde-Erfolg
// vorgetäuscht; siehe src/components/Newsletter.tsx.
import Newsletter from "@/components/Newsletter";
import { SITE_URL, CONTENT_UPDATED, jsonLdHtml } from "@/lib/site";
import { localizedPath, type Lang } from "@/lib/i18n";
import { brandText } from "@/components/BrandText";

const BRIDGE: Record<
  Lang,
  { eyebrow: string; text: string; cta: string }
> = {
  de: {
    eyebrow: "Neu im Sport?",
    text: "iQFOiL ist die olympische Windsurfklasse. Gefahren wird mit einem Board, einem Segel und einem Foil. Das Foil funktioniert unter Wasser ähnlich wie der Flügel eines Flugzeugs: Mit genügend Geschwindigkeit hebt es das Board aus dem Wasser.",
    cta: "Was ist iQFOiL?",
  },
  en: {
    eyebrow: "New to the sport?",
    text: "iQFOiL is the Olympic windsurfing class. Athletes race with a board, a sail and a hydrofoil. The foil works underwater in a similar way to an aircraft wing: once enough speed is generated, it lifts the board above the water.",
    cta: "What is iQFOiL?",
  },
};

/**
 * Startseite — identischer Aufbau in beiden Sprachen.
 *
 * Die Reihenfolge der Sektionen ist die Positionierung: Sport zuerst (Hero,
 * Über mich, Disziplinen, Olympia, Ergebnisse), dann die Medienkompetenz
 * (Social Media), dann die Bilder (Galerie), dann die Zusammenarbeit
 * (Partnerschaft, Partner, Kontakt).
 *
 * SOCIAL MEDIA UND GALERIE STEHEN BEWUSST DIREKT NEBENEINANDER. Sie waren
 * vorher dieselbe Sektion; sie jetzt an zwei entfernte Stellen der Seite zu
 * legen, würde die Trennung zwar erfüllen, aber niemandem erklären. Direkt
 * hintereinander ist der Unterschied auf einen Blick sichtbar: hier die
 * laufenden Kanäle, dort die kuratierten Alben.
 */
export default function HomeView({ lang }: { lang: Lang }) {
  const b = BRIDGE[lang];
  const home = `${SITE_URL}${localizedPath("/", lang)}`;

  // ProfilePage markiert die Startseite als die Seite ÜBER diese Person — das
  // ist genau die Beziehung, die bei einer Namenssuche zählt. Die Person selbst
  // ist im Layout als eigene Entität mit @id definiert und wird hier nur
  // referenziert, statt sie ein zweites Mal zu beschreiben.
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${home}#profilepage`,
    url: home,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    dateCreated: CONTENT_UPDATED,
    dateModified: CONTENT_UPDATED,
    inLanguage: lang,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(profilePageJsonLd) }}
      />
      <Hero lang={lang} />
      <About lang={lang} />
      <SportGoals lang={lang} />

      {/* Brücke von der Athletenseite in die Erklärseite. Bewusst genau EIN
          klarer Einstieg statt Keyword-Links im Fliesstext: Wer auf der
          Startseite „iQFOiL" liest und nicht weiss, was das ist, bekommt hier
          die Antwort — und Suchmaschinen bekommen einen sauberen internen Link
          auf die einzige informationsgetriebene Seite der Site. */}
      <section className="border-b border-hairline bg-mist px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-content flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow mb-3">{b.eyebrow}</p>
            <p className="max-w-xl leading-relaxed text-ink">{b.text}</p>
          </div>
          <Link
            href={localizedPath("/iqfoil", lang)}
            className="shrink-0 rounded-sm border border-ink px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {brandText(b.cta)}
          </Link>
        </div>
      </section>

      <Goals lang={lang} />
      <Highlights lang={lang} />
      <SocialMedia lang={lang} />
      <GalleryTeaser lang={lang} />
      <Sponsoring lang={lang} />
      <Partners lang={lang} />
      <Contact lang={lang} />
      <Newsletter lang={lang} />
    </main>
  );
}
