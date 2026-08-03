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

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SportGoals />
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
