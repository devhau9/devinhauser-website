import Image from "next/image";

const CHANNELS = [
  {
    name: "Instagram",
    handle: "@devin.hauser_",
    stat: "Platzhalter: Follower-Zahl",
    href: "https://instagram.com/devin.hauser_",
  },
  {
    name: "TikTok",
    handle: "Platzhalter: Handle folgt",
    stat: "ca. 12'600 Follower",
    href: "#",
  },
  {
    name: "YouTube",
    handle: "Personal Brand im Aufbau",
    stat: "Noch kein aktiver Kanal",
    href: "#",
  },
];

export default function SocialMedia() {
  return (
    <section id="social-media" className="section-pad bg-mist">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1fr,1.3fr] md:items-start md:gap-16 lg:gap-24">
        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl md:max-w-none">
          <Image
            src="/images/social-portrait-square.jpg"
            alt="Devin Hauser bei einer Regatta"
            fill
            sizes="(min-width: 768px) 35vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow mb-5">Social Media &amp; Content</p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            MEDIA &amp; CONTENT
          </h2>
          <p className="mt-6 max-w-xl italic leading-relaxed text-graphite">
            Platzhalter: Text zu Devins Content-Fähigkeiten (Foto, Video,
            Drohne, FPV, Editing) als Mehrwert für Partner — wird aus der
            Wissensdatenbank ergänzt.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {CHANNELS.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                className="card-surface group block p-6 transition-shadow hover:shadow-[0_1px_2px_rgba(10,14,20,0.04),0_24px_56px_-28px_rgba(10,14,20,0.24)]"
              >
                <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                  {channel.name}
                </p>
                <p className="mt-3 font-display text-xl tracking-wide text-ink group-hover:text-red">
                  {channel.handle}
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-graphite">
                  {channel.stat}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
