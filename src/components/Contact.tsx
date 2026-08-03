import Image from "next/image";

export default function Contact() {
  return (
    <section id="kontakt" className="section-pad bg-white">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1.3fr,1fr] md:items-center md:gap-16 lg:gap-24">
        <div className="min-w-0">
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            LET&apos;S TALK
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-graphite">
            For sponsorship, media or partnership enquiries, I&apos;m reachable
            directly by email or on Instagram. I&apos;m always open to new
            partnerships and stories worth telling.
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
        </div>

        <div className="relative aspect-[3/4] w-full min-w-0 max-w-xs overflow-hidden rounded-2xl md:max-w-none">
          <Image
            src="/images/contact-portrait-bw.jpg"
            alt="Devin Hauser, black and white portrait"
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
