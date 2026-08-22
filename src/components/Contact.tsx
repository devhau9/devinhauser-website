import Image from "next/image";
import { SECTION_ID, type Lang } from "@/lib/i18n";

const CONTACT_EMAIL = "devinhauser9@gmail.com";
const INSTAGRAM_HANDLE = "@devin.hauser_";

const COPY: Record<
  Lang,
  { eyebrow: string; heading: string; lead: string; portraitAlt: string }
> = {
  de: {
    eyebrow: "Kontakt",
    heading: "LASS UNS REDEN",
    lead: "Für Sponsoring-, Medien- oder Partnerschaftsanfragen bin ich per E-Mail oder auf Instagram erreichbar. Eine kurze Nachricht mit dem Anliegen genügt.",
    portraitAlt: "Devin Hauser, Schwarzweiss-Porträt",
  },
  en: {
    eyebrow: "Contact",
    heading: "LET'S TALK",
    lead: "For sponsorship, media or partnership enquiries, email or Instagram both reach me. A short message saying what it is about is enough.",
    portraitAlt: "Devin Hauser, black and white portrait",
  },
};

export default function Contact({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section id={SECTION_ID.contact} className="section-pad bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1.3fr,1fr] md:items-center md:gap-16 lg:gap-24">
        <div className="min-w-0">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-graphite">{c.lead}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="https://www.instagram.com/devin.hauser_/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-ink/15 px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:border-red hover:text-red"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <div className="relative aspect-[3/4] w-full min-w-0 max-w-xs overflow-hidden rounded-2xl md:max-w-none">
          <Image
            src="/images/contact-portrait-bw.jpg"
            alt={c.portraitAlt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
