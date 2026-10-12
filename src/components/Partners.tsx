import Image from "next/image";
import Link from "next/link";
import { SECTION_ID, UI, localizedPath, type Lang } from "@/lib/i18n";

/**
 * Drei Gruppen nach tatsächlicher Leistung (Devins Wunsch vom 12.10.2026):
 *   sponsors  — «Sponsoren & Gönner»: Firmen und Gönner mit Geldbeitrag
 *   equipment — «Ausrüstung & Services»: Material, Leistungen, Teamkleidung
 *   network   — «Sportliches Netzwerk»: Verbände, Vereine, Schule, Förderstiftung
 * Keine Organisation erscheint als zahlender Sponsor; keine Beträge, keine
 * Klassen (Gold/Silber/Bronze).
 */
type Group = "sponsors" | "equipment" | "network";

const GROUP_ORDER: Group[] = ["sponsors", "equipment", "network"];

type Partner = {
  group: Group;
  src: string;
  alt: string;
  name: string;
  href: string | null;
  imgPadding?: string;
  imgObjectPosition?: string;
  /** Kurzer Zusatz unter dem Logo, wenn die Unterstützung über Dritte läuft. */
  note?: Record<Lang, string>;
};

// Namen wie im Sponsoring-Dossier 2027 (Stand 15.09.2026); innerhalb jeder
// Gruppe gilt die Dossier-Reihenfolge. Einordnung (12.10.2026):
//   Sponsoren & Gönner — McDonald's Dielsdorf (Patenschaft, Zusatz «via
//     Sporthilfe»), Heinz Bär AG (live seit 08.10.), Trockentech AG, GHB
//     Ground-Engineering AG und Micco Fugen- und Bauabdichtungen GmbH
//     (Zusagen per Mail), PM Consulting (laut Devins
//     Kerndaten «commercial partner»; ein Bezug zu einer Privatperson wird
//     nicht behauptet — Einordnung von Devin zu bestätigen)
//   Ausrüstung & Services — ENSIS, Fanagus (Material), Fitnesspark Migros
//     (Training), Kinesiologie Weideli (Behandlung), Drei Plus und Arnold
//     (Teamkleidung über den Verein), Arctic Plunge (Eisbad-Leihe, Vertrag
//     unterschrieben 12.10.2026)
//   Sportliches Netzwerk — Swiss Sailing Team, Swiss Sailing, RVZS, DRCS
//     (Devin bezahlt dort selbst), United School of Sports, Schweizer
//     Sporthilfe (Förderstiftung; das Geld der Patenschaft stammt vom Paten)
// Bewusst NICHT hier (Stand 12.10.2026): Komeo (Post-Umfang noch nicht
// bestätigt), BSgroup, KID, Meuli (Logo bzw. Nennung fehlt), Steinauer
// (ausdrücklich ohne Gegenleistung — nur mit Einverständnis).
// Alle Websites am 15.09.2026 bzw. bei Aufnahme aufgerufen und bestätigt.
// McDonald's Dielsdorf ohne eigenen Link: die Unterstützung läuft als
// Patenschaft über die Schweizer Sporthilfe.
const PARTNERS: Partner[] = [
  {
    group: "network",
    src: "/logos/swiss-sailing-team.png",
    alt: "Swiss Sailing Team logo",
    name: "Swiss Sailing Team",
    href: "https://www.swiss-sailing-team.ch",
  },
  {
    group: "network",
    src: "/logos/sui-sailing.png",
    alt: "Swiss Sailing logo",
    name: "Swiss Sailing",
    href: "https://www.swiss-sailing.ch",
    // Logo sitzt in der Bilddatei etwas höher als die anderen — minimale
    // weitere Korrektur (Nachjustierung 21.07., 3. Feinschliff).
    imgObjectPosition: "object-[50%_78%]",
  },
  {
    group: "network",
    src: "/logos/rvzs.png",
    alt: "Swiss Sailing Regionalverband Zentralschweiz (RVZS) logo",
    name: "RVZS",
    href: "https://www.rvzs.ch",
  },
  {
    group: "network",
    src: "/logos/drcs.png",
    alt: "DRCS logo",
    name: "DRCS",
    href: "https://drcs-sailing.com",
  },
  {
    group: "network",
    src: "/logos/sporthilfe.png",
    alt: "Stiftung Schweizer Sporthilfe logo",
    name: "Schweizer Sporthilfe",
    href: "https://sporthilfe.ch",
  },
  {
    group: "network",
    src: "/logos/united-school-of-sports.png",
    alt: "United School of Sports logo",
    name: "United School of Sports",
    href: "https://unitedschool.ch",
  },
  {
    group: "equipment",
    src: "/logos/ensis.png",
    alt: "ENSIS Watersports logo",
    name: "ENSIS",
    href: "https://ensis.surf",
  },
  {
    group: "equipment",
    src: "/logos/dreiplus.png",
    alt: "Drei Plus logo",
    name: "Drei Plus",
    href: "https://www.dreiplus.ch",
    // Devin 08.10.2026: Drei Plus und Arnold haben dem Verein (DRCS oder
    // RVZS — welcher, ist offen) die Teamkleidung mitfinanziert. Deshalb
    // «Teamkleidung» ohne Vereinsnamen.
    note: { de: "Teamkleidung", en: "Team clothing" },
  },
  {
    group: "equipment",
    src: "/logos/arnold.png",
    alt: "Arnold logo",
    name: "Arnold",
    href: "https://www.arnold-coag.ch",
    note: { de: "Teamkleidung", en: "Team clothing" },
  },
  {
    group: "equipment",
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
    group: "equipment",
    src: "/logos/kinesiologie-weideli-removebg-preview.png",
    alt: "Kinesiologie Weideli logo",
    name: "Kinesiologie Weideli",
    href: "https://www.kinesiologie-weideli.ch",
    // Wirkte im Vergleich zu den anderen Logos zu klein — minimale
    // weitere Vergrösserung (Nachjustierung 21.07., 3. Feinschliff).
    imgPadding: "p-1",
  },
  {
    group: "equipment",
    src: "/logos/fitnesspark-migros.png",
    alt: "Fitnesspark Migros logo",
    name: "Fitnesspark Migros",
    href: "https://www.fitnesspark.ch",
  },
  {
    // Eisbad-Leihe bis 31.10.2027; Vertrag mit den bestätigten Anpassungen
    // von Devin unterschrieben und am 12.10.2026 geschickt. Die Nennung auf
    // der Website DE/EN gehört zur vereinbarten Gegenleistung. Logo von
    // Arctic Plunge (09.10.2026, SVG «mit Bär»; ohne Skript, ohne externe
    // Verweise).
    group: "equipment",
    src: "/logos/arctic-plunge.svg",
    alt: "Arctic Plunge logo",
    name: "Arctic Plunge",
    href: "https://www.arcticplunge.ch",
  },
  {
    group: "sponsors",
    src: "/logos/mcdonalds-dielsdorf.png",
    alt: "McDonald's Dielsdorf logo",
    name: "McDonald's Dielsdorf",
    href: null,
    note: { de: "via Sporthilfe", en: "via Sporthilfe" },
  },
  {
    group: "sponsors",
    // Seit 08.10.2026 (Devins Freigabe vom 08.10.): finanzieller Unterstützer
    // für die Saison 2027 — Betrag bewusst nicht auf der Website. Firmenname,
    // Logo und Website-Link aus den Mails der Firma (Logo am 08.10.2026 als
    // «ElektroBaer_Logo.pdf», Vektor; Beleg im Vault, Website-Arbeitsdatei
    // vom 08.10.2026). Zuschnitt: Zeichen und Schriftzug wie
    // in der Mail-Signatur der Firma, ohne Stecker, Adresse und Telefon —
    // sonst wäre der Name auf der Karte unlesbar klein.
    src: "/logos/heinz-baer-ag.png",
    alt: "Heinz Bär AG logo",
    name: "Heinz Bär AG",
    href: "https://www.baerelektro.ch",
    // Breites Logo (ca. 4,7 : 1): weniger seitlicher Rand, damit der Name
    // auf der schmalen Handykarte gross genug bleibt.
    imgPadding: "px-2 py-4",
  },
  {
    group: "sponsors",
    // VORBEREITET 12.10.2026, nicht veröffentlicht: finanzieller Unterstützer
    // Saison 2027 (Zusage per Mail; Betrag und Zahlungsstand nicht öffentlich).
    // Logo und ausdrücklicher Wunsch «Logo mit Link auf Website und im
    // Partnerschaftsdossier»: Mail der Firma vom 12.10.2026, Datei «Logo mit
    // Adresse.png». Zuschnitt aus dem Original (12.10.2026): ohne Adressspalte
    // und ohne das oberste Siebtel des grauen Blocks, Weiss transparent —
    // nichts neu gezeichnet. Seitenverhältnis 1,65 : 1, damit der Schriftzug
    // auf der Handykarte die volle Breite nutzt. Link aus der Mail-Signatur.
    src: "/logos/trockentech.png",
    alt: "Trockentech AG logo",
    name: "Trockentech AG",
    href: "https://www.trockentech.ch",
    // Kleiner Rand, damit der Schriftzug auf der Handykarte gross bleibt.
    imgPadding: "p-1",
  },
  {
    group: "sponsors",
    // VORBEREITET 12.10.2026, nicht veröffentlicht: finanzieller Unterstützer
    // Saison 2027 (Zusage per Mail; Betrag nicht öffentlich). Logo von der
    // Firma am 11.10.2026 als Antwort auf das Angebot «Logo mit Link auf
    // Website und im Dossier» geschickt («ohne Hintergrund.png»).
    // LINK: www.ghb.swiss wie in der Signatur sichtbar. Der dort hinterlegte
    // Verweis auf georges-bovier.com führt heute auf eine fremde
    // Casino-Seite (geprüft 12.10.2026) — nie verwenden.
    src: "/logos/ghb-ground-engineering.png",
    alt: "GHB Ground-Engineering AG logo",
    name: "GHB Ground-Engineering AG",
    href: "https://www.ghb.swiss",
    imgPadding: "px-2 py-4",
  },
  {
    // Gönnerbeitrag Saison 2027 (Zusage per Mail 09.10.2026; Betrag nicht
    // öffentlich). Logo von der Firma am 12.10.2026 geschickt («neu
    // 400PngdpiLogo.png», transparent), auf den Inhalt zugeschnitten.
    // Name und Link wie auf der eigenen Website der Firma.
    group: "sponsors",
    src: "/logos/micco-fugen.png",
    alt: "Micco Fugen- und Bauabdichtungen GmbH logo",
    name: "Micco Fugen- und Bauabdichtungen GmbH",
    href: "https://www.micco-fugen.ch",
    imgPadding: "px-2 py-3",
  },
  {
    group: "sponsors",
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
    groups: Record<Group, string>;
  }
> = {
  de: {
    eyebrow: "Netzwerk",
    heading: "PARTNER & UNTERSTÜTZER",
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
    groups: {
      sponsors: "Sponsoren & Gönner",
      equipment: "Ausrüstung & Services",
      network: "Sportliches Netzwerk",
    },
  },
  en: {
    eyebrow: "Network",
    heading: "PARTNERS & SUPPORTERS",
    lead: "I work with partners, organisations and supporters who contribute to my journey in international racing.",
    thanks: "A big thank you to everyone who supports me on and off the water.",
    openTo: "I am open to new sponsors, supporters and long-term partnerships.",
    officialSite: "official website",
    footerQuestion: "Sponsor or media?",
    footerLink: "Request access through the Partner Portal",
    groups: {
      sponsors: "Sponsors & patrons",
      equipment: "Equipment & services",
      network: "Sporting network",
    },
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

function PartnerCard({ partner, lang }: { partner: Partner; lang: Lang }) {
  const padding = partner.note ? NOTE_PADDING : (partner.imgPadding ?? "p-4");

  if (!partner.href) {
    return (
      <div className="card-surface relative flex h-24 items-center justify-center">
        <Image src={partner.src} alt={partner.alt} fill sizes="160px" className={`object-contain ${padding}`} />
        {partner.note ? <PartnerNote text={partner.note[lang]} /> : null}
      </div>
    );
  }

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${partner.name} — ${COPY[lang].officialSite} (${UI[lang].newTab})`}
      className="card-surface group relative flex h-24 items-center justify-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,14,20,0.06),0_28px_60px_-28px_rgba(10,14,20,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
    >
      <Image
        src={partner.src}
        alt={partner.alt}
        fill
        sizes="160px"
        className={`object-contain transition-transform duration-200 ease-out group-hover:scale-[1.04] ${padding} ${partner.imgObjectPosition ?? ""}`}
      />
      {partner.note ? <PartnerNote text={partner.note[lang]} /> : null}
    </a>
  );
}

export default function Partners({ lang }: { lang: Lang }) {
  const c = COPY[lang];

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

        <div className="mt-14 space-y-10">
          {GROUP_ORDER.map((group) => (
            <div key={group}>
              <h3 className="font-mono text-xs uppercase tracking-widest2 text-graphite">
                {c.groups[group]}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
                {PARTNERS.filter((partner) => partner.group === group).map((partner) => (
                  <PartnerCard key={partner.src} partner={partner} lang={lang} />
                ))}
              </div>
            </div>
          ))}
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
