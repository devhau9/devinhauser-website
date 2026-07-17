import Image from "next/image";
import Link from "next/link";

const PARTNERS = [
  { src: "/logos/swiss-sailing-team.png", alt: "Swiss Sailing Team" },
  { src: "/logos/swiss-sailing.jpg", alt: "Swiss Sailing" },
  { src: "/logos/sporthilfe.png", alt: "Schweizer Sporthilfe" },
  { src: "/logos/ensis.png", alt: "ENSIS" },
  { src: "/logos/fanagus.jpg", alt: "Fanagus" },
  { src: "/logos/dreiplus.png", alt: "Drei Plus" },
  { src: "/logos/united-school-of-sports.png", alt: "United School of Sports" },
  { src: "/logos/arnold.png", alt: "Arnold" },
  { src: "/logos/pm-consulting.svg", alt: "PM Consulting" },
];

export default function Partners() {
  return (
    <section id="partner" className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">Partner</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          AKTUELLE PARTNER
        </h2>
        <p className="mt-6 max-w-xl italic leading-relaxed text-graphite">
          Diese Partner-Logos wurden automatisch anhand eindeutig erkennbarer
          Dateinamen zugeordnet. Fünf weitere Logo-Dateien im Ordner waren
          nicht eindeutig zuordenbar und wurden bewusst nicht verwendet (siehe
          Chat-Zusammenfassung) — bitte prüfen und ggf. nachreichen.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.src}
              className="card-surface relative flex h-24 items-center justify-center"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                sizes="140px"
                className="object-contain p-6"
              />
            </div>
          ))}
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
