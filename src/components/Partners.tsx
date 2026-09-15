import Image from "next/image";
import Link from "next/link";
import { SECTION_ID, UI, localizedPath, type Lang } from "@/lib/i18n";

type Partner = {
  src: string;
  alt: string;
  name: string;
  href: string | null;
  imgPadding?: string;
  imgObjectPosition?: string;
  /** Kurzer Zusatz unter dem Logo, wenn die Unterstützung über Dritte läuft. */
  note?: Record<Lang, string>;
};

// Reihenfolge und Namen wie im Sponsoring-Dossier 2027, Seite „Partner,
// Organisationen & Unterstützer" (Stand 15.09.2026). Alle Websites am
// 15.09.2026 aufgerufen und bestätigt. Einzige Ausnahme ohne eigenen Link:
// McDonald's Dielsdorf — die Unterstützung läuft als Patenschaft über die
// Schweizer Sporthilfe, deshalb der Zusatz „via Sporthilfe" statt eines
// Verweises auf die Filiale.
const PARTNERS: Partner[] = [
  {
    src: "/logos/swiss-sailing-team.png",
    alt: "Swiss Sailing Team logo",
    name: "Swiss Sailing Team",
    href: "https://www.swiss-sailing-team.ch",
  },
  {
    src: "/logos/sui-sailing.png",
    alt: "Swiss Sailing logo",
    name: "Swiss Sailing",
    href: "https://www.swiss-sailing.ch",
    // Logo sitzt in der Bilddatei etwas höher als die anderen — minimale
    // weitere Korrektur (Nachjustierung 21.07., 3. Feinschliff).
    imgObjectPosition: "object-[50%_78%]",
  },
  {
    src: "/logos/rvzs.png",
    alt: "Swiss Sailing Regionalverband Zentralschweiz (RVZS) logo",
    name: "RVZS",
    href: "https://www.rvzs.ch",
  },
  {
    src: "/logos/drcs.png",
    alt: "DRCS logo",
    name: "DRCS",
    href: "https://drcs-sailing.com",
  },
  {
    src: "/logos/sporthilfe.png",
    alt: "Stiftung Schweizer Sporthilfe logo",
    name: "Schweizer Sporthilfe",
    href: "https://sporthilfe.ch",
  },
  {
    src: "/logos/united-school-of-sports.png",
    alt: "United School of Sports logo",
    name: "United School of Sports",
    href: "https://unitedschool.ch",
  },
  {
    src: "/logos/ensis.png",
    alt: "ENSIS Watersports logo",
    name: "ENSIS",
    href: "https://ensis.surf",
  },
  {
    src: "/logos/dreiplus.png",
    alt: "Drei Plus logo",
    name: "Drei Plus",
    href: "https://www.dreiplus.ch",
  },
  {
    src: "/logos/arnold.png",
    alt: "Arnold logo",
    name: "Arnold",
    href: "https://www.arnold-coag.ch",
  },
  {
    src: "/logos/fanagus-removebg-preview.png",
    alt: "fanagus ag logo",
    name: "Fanagus",
    href: "https://www.fanagus.ch",
  },
  {
    // Schreibweise seit 15.09.2026 „Weideli": So schreibt sich der Betrieb auf
    // seiner eigenen Website, und so steht es im aktuellen Dossier. Damit ist
    // die offene Rückfrage zum früheren Entscheid F6 (04.08.2026, „Weidli")
    // beantwortet.
    src: "/logos/kinesiologie-weideli-removebg-preview.png",
    alt: "Kinesiologie Weideli logo",
    name: "Kinesiologie Weideli",
    href: "https://www.kinesiologie-weideli.ch",
    // Wirkte im Vergleich zu den anderen Logos zu klein — minimale
    // weitere Vergrösserung (Nachjustierung 21.07., 3. Feinschliff).
    imgPadding: "p-1",
  },
  {
    src: "/logos/fitnesspark-migros.png",
    alt: "Fitnesspark Migros logo",
    name: "Fitnesspark Migros",
    href: "https://www.fitnesspark.ch",
  },
  {
    src: "/logos/mcdonalds-dielsdorf.png",
    alt: "McDonald's Dielsdorf logo",
    name: "McDonald's Dielsdorf",
    href: null,
    note: { de: "via Sporthilfe", en: "via Sporthilfe" },
  },
  {
    src: "/logos/pm-consulting.svg",
    alt: "PM Consulting logo",
    name: "PM Consulting",
    href: "https://pmc.zuerich",
  },
];

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    thanks: string;
    openTo: string;
    officialSite: string;
    footerQuestion: string;
    footerLink: string;
  }
> = {
  de: {
    eyebrow: "Netzwerk",
    heading: "PARTNER",
    // Kanonische Sprachregel aus dem Vault: die BESTEHENDEN Logos heissen
    // „Partner, Organisationen und Unterstützer" — nie „Sponsoren", und es
    // wird keine Zahl behauptet. Auf dieser Seite werden Logos gezeigt, keine
    // Vertragsverhältnisse beschrieben.
    // `openTo` spricht dagegen von künftigen Sponsoren — das ist eine Aussage
    // über die eigene Offenheit, keine Behauptung über die gezeigten Logos,
    // und steht deshalb nicht im Widerspruch zur Regel.
    lead: "Ich arbeite mit Partnern, Organisationen und Unterstützern zusammen, die meinen Weg im internationalen Racing mittragen.",
    thanks: "Ein grosses Dankeschön an alle, die mich auf und neben dem Wasser unterstützen.",
    openTo: "Ich bin offen für neue Sponsoren, Unterstützer und langfristige Partnerschaften.",
    officialSite: "offizielle Website",
    footerQuestion: "Sponsor oder Medien?",
    footerLink: "Zugang über das Partner-Portal anfragen",
  },
  en: {
    eyebrow: "Network",
    heading: "PARTNERS",
    lead: "I work with partners, organisations and supporters who contribute to my journey in international racing.",
    thanks: "A big thank you to everyone who supports me on and off the water.",
    openTo: "I am open to new sponsors, supporters and long-term partnerships.",
    officialSite: "official website",
    footerQuestion: "Sponsor or media?",
    footerLink: "Request access through the Partner Portal",
  },
};

// Karten mit Zusatz geben unten Platz für eine Textzeile frei; das Logo
// bleibt dadurch in derselben Kartenhöhe wie alle anderen.
const NOTE_PADDING = "px-4 pb-8 pt-3";

function PartnerNote({ text }: { text: string }) {
  return (
    <span className="absolute inset-x-2 bottom-2 text-center font-mono text-[10px] leading-none text-graphite">
      {text}
    </span>
  );
}

export default function Partners({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const t = UI[lang];

  return (
    <section id={SECTION_ID.partners} className="section-pad bg-mist">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">{c.lead}</p>
        <p className="mt-3 max-w-xl leading-relaxed text-graphite">{c.thanks}</p>
        <p className="mt-3 max-w-xl leading-relaxed text-graphite">{c.openTo}</p>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {PARTNERS.map((partner) =>
            partner.href ? (
              <a
                key={partner.src}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} — ${c.officialSite} (${t.newTab})`}
                className="card-surface group relative flex h-24 items-center justify-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,14,20,0.06),0_28px_60px_-28px_rgba(10,14,20,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="160px"
                  className={`object-contain transition-transform duration-200 ease-out group-hover:scale-[1.04] ${
                    partner.note ? NOTE_PADDING : (partner.imgPadding ?? "p-4")
                  } ${partner.imgObjectPosition ?? ""}`}
                />
                {partner.note ? <PartnerNote text={partner.note[lang]} /> : null}
              </a>
            ) : (
              <div
                key={partner.src}
                className="card-surface relative flex h-24 items-center justify-center"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="160px"
                  className={`object-contain ${partner.note ? NOTE_PADDING : (partner.imgPadding ?? "p-4")}`}
                />
                {partner.note ? <PartnerNote text={partner.note[lang]} /> : null}
              </div>
            )
          )}
        </div>

        <p className="mt-12 text-sm text-graphite">
          {c.footerQuestion}{" "}
          <Link
            href={localizedPath("/partner-portal", lang)}
            className="text-ink underline decoration-black/20 underline-offset-4 transition-colors hover:text-red"
          >
            {c.footerLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
