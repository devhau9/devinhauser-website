import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SportGoals from "@/components/SportGoals";
import Goals from "@/components/Goals";
import Highlights from "@/components/Highlights";
import SocialMedia from "@/components/SocialMedia";
import Sponsoring from "@/components/Sponsoring";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
// Newsletter wieder aktiv (Entscheidung 03.08.2026) — aber als reine
// Coming-soon-Section OHNE Formular, Eingabefelder oder Subscribe-Button.
// Es werden weiterhin keine Daten erfasst und kein Anmelde-Erfolg
// vorgetäuscht; siehe src/components/Newsletter.tsx.
import Newsletter from "@/components/Newsletter";
import { SITE_URL } from "@/lib/site";

// ProfilePage markiert die Startseite als die Seite ÜBER diese Person — das
// ist genau die Beziehung, die bei einer Namenssuche zählt. Die Person selbst
// ist im Layout als eigene Entität mit @id definiert und wird hier nur
// referenziert, statt sie ein zweites Mal zu beschreiben.
const PROFILE_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_PAGE_JSON_LD) }}
      />
      <Hero />
      <About />
      <SportGoals />

      {/* Brücke von der Athletenseite in die Erklärseite. Bewusst genau EIN
          klarer Einstieg statt Keyword-Links im Fliesstext: Wer auf der
          Startseite "IQFoil" liest und nicht weiss, was das ist, bekommt hier
          die Antwort — und Suchmaschinen bekommen einen sauberen internen Link
          auf die einzige informationsgetriebene Seite der Site. */}
      <section className="border-b border-hairline bg-mist px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-content flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow mb-3">New to the sport?</p>
            <p className="max-w-xl leading-relaxed text-ink">
              IQFoil is the Olympic windsurfing class — a board that flies above
              the water on a hydrofoil. I wrote the explanation I wish I&apos;d
              found when I started: the equipment, the race formats, the speeds,
              and what it actually feels like.
            </p>
          </div>
          <Link
            href="/iqfoil"
            className="shrink-0 rounded-sm border border-ink px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            What is IQFoil?
          </Link>
        </div>
      </section>

      <Goals />
      <Highlights />
      <SocialMedia />
      <Sponsoring />
      <Partners />
      <Contact />
      <Newsletter />
    </main>
  );
}
