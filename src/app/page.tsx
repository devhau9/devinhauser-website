import Hero from "@/components/Hero";
import About from "@/components/About";
import SportGoals from "@/components/SportGoals";
import Highlights from "@/components/Highlights";
import SocialMedia from "@/components/SocialMedia";
import Sponsoring from "@/components/Sponsoring";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SportGoals />
      <Highlights />
      <SocialMedia />
      <Sponsoring />
      <Partners />
      <Contact />
    </main>
  );
}
