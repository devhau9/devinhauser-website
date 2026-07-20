import Hero from "@/components/Hero";
import About from "@/components/About";
import SportGoals from "@/components/SportGoals";
import Goals from "@/components/Goals";
import Highlights from "@/components/Highlights";
import SocialMedia from "@/components/SocialMedia";
import Sponsoring from "@/components/Sponsoring";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
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
