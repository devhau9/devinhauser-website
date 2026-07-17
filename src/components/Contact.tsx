import Image from "next/image";

export default function Contact() {
  return (
    <section id="kontakt" className="section-pad bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1.3fr,1fr] md:items-center md:gap-16 lg:gap-24">
        <div>
          <p className="eyebrow mb-5">Kontakt</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            LASS UNS SPRECHEN
          </h2>
          <p className="mt-6 max-w-xl italic leading-relaxed text-graphite">
            Für Sponsoring-Anfragen, Medienanfragen oder allgemeine
            Partnerschaften — direkt per E-Mail oder Instagram erreichbar.
            Ein Kontaktformular folgt in einer späteren Version.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:devinhauser9@gmail.com"
              className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
            >
              devinhauser9@gmail.com
            </a>
            <a
              href="https://instagram.com/devin.hauser_"
              className="rounded-sm border border-ink/15 px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:border-red hover:text-red"
            >
              @devin.hauser_
            </a>
          </div>

          <p className="mt-4 text-xs italic text-graphite/70">
            Hinweis: Diese E-Mail-Adresse ist vorläufig. Sie wird durch eine
            professionelle Adresse unter devinhauser.com ersetzt, sobald die
            Domain eingerichtet ist.
          </p>
        </div>

        <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl md:max-w-none">
          <Image
            src="/images/contact-portrait-bw.jpg"
            alt="Devin Hauser, Schwarz-Weiss-Porträt"
            fill
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
