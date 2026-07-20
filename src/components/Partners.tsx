import Image from "next/image";
import Link from "next/link";

type Partner = {
  src: string;
  alt: string;
  name: string;
  href: string | null;
  imgPadding?: string;
  imgObjectPosition?: string;
};

// Jeder Partner mit offizieller Website. URLs recherchiert und bestätigt
// (Stand 19.07.2026, Arnold/Drei Plus ergänzt am 20.07.2026). Alle zehn
// Partner sind aktuell vollständig verlinkt.
const PARTNERS: Partner[] = [
  {
    src: "/logos/swiss-sailing-team.png",
    alt: "Swiss Sailing Team — offizielle Website",
    name: "Swiss Sailing Team",
    href: "https://www.swiss-sailing-team.ch",
  },
  {
    src: "/logos/sui-sailing.png",
    alt: "Swiss Sailing — offizielle Website",
    name: "Swiss Sailing",
    href: "https://www.swiss-sailing.ch",
    // Logo sitzt in der Bilddatei etwas höher als die anderen — minimale
    // weitere Korrektur (Nachjustierung 21.07., 3. Feinschliff).
    imgObjectPosition: "object-[50%_78%]",
  },
  {
    src: "/logos/sporthilfe.png",
    alt: "Stiftung Schweizer Sporthilfe — offizielle Website",
    name: "Schweizer Sporthilfe",
    href: "https://sporthilfe.ch",
  },
  {
    src: "/logos/ensis.png",
    alt: "ENSIS Watersports — offizielle Website",
    name: "ENSIS",
    href: "https://ensis.surf",
  },
  {
    src: "/logos/fanagus-removebg-preview.png",
    alt: "fanagus ag — offizielle Website",
    name: "Fanagus",
    href: "https://www.fanagus.ch",
  },
  {
    src: "/logos/dreiplus.png",
    alt: "Drei Plus — offizielle Website",
    name: "Drei Plus",
    href: "https://www.dreiplus.ch",
  },
  {
    src: "/logos/united-school-of-sports.png",
    alt: "United School of Sports — offizielle Website",
    name: "United School of Sports",
    href: "https://unitedschool.ch",
  },
  {
    src: "/logos/arnold.png",
    alt: "Arnold — offizielle Website",
    name: "Arnold",
    href: "https://www.arnold-coag.ch",
  },
  {
    src: "/logos/pm-consulting.svg",
    alt: "PMC Zürich — offizielle Website",
    name: "PMC Zürich",
    href: "https://pmc.zuerich",
  },
  {
    src: "/logos/kinesiologie-weideli-removebg-preview.png",
    alt: "Kinesiologie Weideli — offizielle Website",
    name: "Kinesiologie Weideli",
    href: "https://www.kinesiologie-weideli.ch",
    // Wirkte im Vergleich zu den anderen Logos zu klein — minimale
    // weitere Vergrösserung (Nachjustierung 21.07., 3. Feinschliff).
    imgPadding: "p-1",
  },
];

export default function Partners() {
  return (
    <section id="partner" className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Partner</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          AKTUELLE PARTNER
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          Proud to work with partners who support my journey in international
          racing.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {PARTNERS.map((partner) =>
            partner.href ? (
              <a
                key={partner.src}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} — offizielle Website (öffnet in neuem Tab)`}
                className="card-surface group relative flex h-24 items-center justify-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,14,20,0.06),0_28px_60px_-28px_rgba(10,14,20,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="160px"
                  className={`object-contain transition-transform duration-200 ease-out group-hover:scale-[1.04] ${
                    partner.imgPadding ?? "p-4"
                  } ${partner.imgObjectPosition ?? ""}`}
                />
              </a>
            ) : (
              <div
                key={partner.src}
                title="Offizielle Website noch nicht bestätigt"
                className="card-surface relative flex h-24 items-center justify-center"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="160px"
                  className="object-contain p-4"
                />
              </div>
            )
          )}
        </div>

        <p className="mt-12 text-sm text-graphite">
          Sponsor oder Medienvertreter?{" "}
          <Link
            href="/partner-portal"
            className="text-ink underline decoration-black/20 underline-offset-4 transition-colors hover:text-red"
          >
            Partner Portal — Zugang anfragen
          </Link>
        </p>
      </div>
    </section>
  );
}
