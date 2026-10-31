import Link from "next/link";
import { SECTION_ID, localizedPath, sectionHref, type Lang } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";
import { brandText } from "@/components/BrandText";

// Öffentliche Partnership-Section: bewusst KEINE öffentlichen Sponsoring-Levels
// (Bronze/Silver/Gold/Main) und KEINE Preise — die Website verkauft die
// Personal Brand und die Möglichkeiten als Partner, nicht einen standardisierten
// Sponsoring-Shop. Konkrete Levels/Preise/Deliverables bleiben im Dossier bzw.
// im individuellen Angebot (Entscheidung 27.07.2026). Keine Reichweiten/Zahlen
// erfunden, keine festen Mengen.
//
// ─────────────────────────────────────────────────────────────────────────────
// UMBAU 31.10.2026 — EIN WEG «PARTNER WERDEN» IN VIER SCHRITTEN
// ─────────────────────────────────────────────────────────────────────────────
// Wer · Warum es passen kann · Beispiele (ausdrücklich «nach Vereinbarung») ·
// direkter Kontakt. Die Schritte sind eine echte Reihenfolge, deshalb sind sie
// nummeriert.
//
//   • Resultate: nur Zeilen, die wortgleich in Highlights.tsx stehen und dort
//     belegt sind. Keine Summen (keine «X Meisterschaften»).
//   • Kontakt: E-Mail direkt, ohne Konto und ohne Formularpflicht. Das
//     Partner-Portal bleibt als zweiter Weg.
//   • Dossier: NUR auf Anfrage. Es wird keine Datei verlinkt oder ausgeliefert
//     — verschickt wird ausschliesslich die gültige freigegebene Fassung.
//   • Keine Exklusivität, keine Reichweitenzusage, keine festen Leistungen.

type Step = { title: string; text: string };

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    who: Step & { results: string[]; resultsLink: string };
    why: Step & { points: string[] };
    examples: Step & { badge: string; items: Step[] };
    contact: Step & { mail: string; subject: string; portal: string; dossier: string };
  }
> = {
  de: {
    eyebrow: "Zusammenarbeit",
    heading: "PARTNER WERDEN",
    lead: "International an der Spitze mitzufahren, braucht neben Training und Zeit auch eine finanzielle und organisatorische Grundlage: Material, Reisen, Startgebühren, Unterkünfte, Logistik, Coaching und Motorboot. Dafür suche ich Partner, die meinen Weg mittragen möchten.",
    who: {
      title: "Wer ich bin",
      text: "iQFOiL- und Wingfoil-Racer aus der Schweiz. Ich starte international in der U23- und Senior-Kategorie.",
      results: [
        "U23-Weltmeisterschaft Puck 2026 — 64. von 108",
        "Schweizermeisterschaft Silvaplana 2026 — 2. von 27 (iQFOiL), 3. von 45 (Overall)",
        "iQFOiL International Games Silvaplana 2025 — 5. von 13 (Senior)",
      ],
      resultsLink: "Alle ausgewählten Resultate",
    },
    why: {
      title: "Warum es passen kann",
      text: "Eine Zusammenarbeit passt, wenn eine Marke zu Sport, Wasser und Schweizer Herkunft passt.",
      points: [
        "Ein Schweizer Athlet im internationalen Regattaumfeld der olympischen Windsurfklasse.",
        "Bilder und Videos produziere ich selbst — vom Training bis zur Regatta.",
        "Ein junger Weg, der noch am Anfang steht: Partner können ihn über mehrere Saisons begleiten.",
      ],
    },
    examples: {
      title: "Was eine Zusammenarbeit beinhalten kann",
      text: "Beispiele. Was davon passt, legen wir gemeinsam fest.",
      badge: "Nach Vereinbarung",
      items: [
        {
          title: "Markenpräsenz",
          text: "Sichtbarkeit auf meiner Website, meinem Fahrzeug, in ausgewählten Social-Media-Inhalten und im Regattaumfeld.",
        },
        {
          title: "Bilder und Videos",
          text: "Fotos, Videos und Edits aus Trainingslagern, Wettkämpfen, Shootings und gemeinsamen Projekten.",
        },
        {
          title: "Produktintegration",
          text: "Produkte, die zu mir und meinem Sport passen, im Trainings-, Wettkampf-, Recovery- und Reisealltag.",
        },
        {
          title: "Über mehrere Saisons",
          text: "Eine Partnerschaft über eine ganze Saison oder mehrere — statt nur für ein einzelnes Event.",
        },
      ],
    },
    contact: {
      title: "Direkt Kontakt aufnehmen",
      text: "Eine kurze E-Mail genügt — kein Konto, keine Anmeldung.",
      mail: "E-Mail schreiben",
      subject: "Partnerschaft",
      portal: "Anfrage über das Partner-Portal",
      dossier: "Das aktuelle Partnerschaftsdossier schicke ich auf Anfrage gerne zu.",
    },
  },
  en: {
    eyebrow: "Collaboration",
    heading: "BECOME A PARTNER",
    lead: "Competing at the top internationally takes more than training and time. It also needs a financial and organisational foundation: equipment, travel, entry fees, accommodation, logistics, coaching and motorboat support. I am looking for partners who want to be part of that journey.",
    who: {
      title: "Who I am",
      text: "iQFOiL and Wingfoil racer from Switzerland, racing internationally in the U23 and senior fleets.",
      results: [
        "iQFOiL U23 World Championships Puck 2026 — 64th of 108",
        "Swiss Championship Silvaplana 2026 — 2nd of 27 (iQFOiL), 3rd of 45 (overall)",
        "iQFOiL International Games Silvaplana 2025 — 5th of 13 (senior)",
      ],
      resultsLink: "All selected results",
    },
    why: {
      title: "Why it can fit",
      text: "A partnership fits when a brand connects with sport, water and Swiss roots.",
      points: [
        "A Swiss athlete racing internationally in the Olympic windsurfing class.",
        "I produce my own photos and videos — from training to racing.",
        "A young journey at its start: partners can follow it across several seasons.",
      ],
    },
    examples: {
      title: "What a partnership can include",
      text: "Examples. What fits is something we decide together.",
      badge: "By agreement",
      items: [
        {
          title: "Brand Presence",
          text: "Visibility on my website, my vehicle, selected social media content and in the racing environment.",
        },
        {
          title: "Photos and Videos",
          text: "Photos, videos and edits from training camps, competitions, shoots and joint projects.",
        },
        {
          title: "Product Integration",
          text: "Products that fit me and my sport, in my training, racing, recovery and travel routine.",
        },
        {
          title: "Across Seasons",
          text: "A partnership across a full season or several — rather than a single event.",
        },
      ],
    },
    contact: {
      title: "Get in touch directly",
      text: "A short email is enough — no account, no sign-up.",
      mail: "Send an email",
      subject: "Partnership",
      portal: "Enquire via the Partner Portal",
      dossier: "I am happy to send the current partnership deck on request.",
    },
  },
};

function StepHeading({ index, title }: { index: number; title: string }) {
  return (
    <h3 className="flex items-baseline gap-3 font-display text-2xl tracking-wide text-ink sm:text-3xl">
      <span className="font-mono text-xs tracking-widest2 text-red">{String(index).padStart(2, "0")}</span>
      {title}
    </h3>
  );
}

export default function Sponsoring({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.contact.subject)}`;

  return (
    <section id={SECTION_ID.sponsoring} className="section-pad bg-white">
      <div className="reveal mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-graphite">{c.lead}</p>

        <ol className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {/* 1 · Wer */}
          <li className="min-w-0">
            <StepHeading index={1} title={c.who.title} />
            <p className="mt-4 max-w-xl leading-relaxed text-graphite">{brandText(c.who.text)}</p>
            <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
              {c.who.results.map((line) => (
                <li key={line} className="py-3 text-sm leading-relaxed text-ink">
                  {brandText(line)}
                </li>
              ))}
            </ul>
            <Link
              href={sectionHref(lang, SECTION_ID.results)}
              className="mt-4 inline-block font-mono text-xs uppercase tracking-widest2 text-ink underline-offset-4 transition-colors hover:text-red hover:underline"
            >
              {c.who.resultsLink} →
            </Link>
          </li>

          {/* 2 · Warum */}
          <li className="min-w-0">
            <StepHeading index={2} title={c.why.title} />
            <p className="mt-4 max-w-xl leading-relaxed text-graphite">{c.why.text}</p>
            <ul className="mt-5 space-y-3">
              {c.why.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
          </li>

          {/* 3 · Beispiele — ausdrücklich nach Vereinbarung */}
          <li className="min-w-0 lg:col-span-2">
            <StepHeading index={3} title={c.examples.title} />
            <p className="mt-4 flex max-w-xl flex-wrap items-center gap-3 leading-relaxed text-graphite">
              <span className="rounded-sm border border-red/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest2 text-red">
                {c.examples.badge}
              </span>
              <span>{c.examples.text}</span>
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {c.examples.items.map((item) => (
                <div
                  key={item.title}
                  className="card-surface flex flex-col p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-display text-2xl tracking-wide text-ink">{item.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{item.text}</p>
                </div>
              ))}
            </div>
          </li>

          {/* 4 · Kontakt — direkt, ohne Anmeldung */}
          <li className="min-w-0 lg:col-span-2">
            <StepHeading index={4} title={c.contact.title} />
            <p className="mt-4 max-w-xl leading-relaxed text-graphite">{c.contact.text}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-white transition-transform hover:-translate-y-0.5"
              >
                {c.contact.mail}
              </a>
              <Link
                href={localizedPath("/partner-portal", lang)}
                className="rounded-sm border border-ink/15 px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:border-red hover:text-red"
              >
                {c.contact.portal}
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-graphite">
              {CONTACT_EMAIL} · {c.contact.dossier}
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
