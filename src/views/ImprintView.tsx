import { localizedPath, type Lang } from "@/lib/i18n";

/**
 * Impressum.
 *
 * PRIVATSPHÄRE-ENTSCHEID 19.08.2026 (Devin, Launch-Sprint): Die private
 * Wohnadresse (Strasse, Hausnummer, Wohngemeinde) steht nicht mehr öffentlich
 * im Impressum. Minimale, seriöse Variante: Name, Rolle, „Zürich, Schweiz",
 * gültige E-Mail, Postadresse auf Anfrage.
 *
 * RECHTLICH ZU PRÜFEN (bewusst offen markiert, keine Rechtsberatung):
 * Art. 3 Abs. 1 lit. s UWG verlangt bei elektronischen *Angeboten von Waren,
 * Werken oder Leistungen* klare Angaben zur Identität und Kontaktadresse.
 * Ob eine persönliche Athleten-Website ohne Shop/Bestellmöglichkeit darunter
 * fällt, ist auslegungsbedürftig. Falls später ein kommerzielles Angebot
 * (z. B. Media-Services-Bestellung) auf dieser Domain läuft, braucht es
 * wieder eine ladungsfähige Adresse — dann z. B. Postfach oder
 * Geschäftsadresse statt Privatwohnung. Bis dahin gilt diese minimale
 * Variante.
 *
 * ÜBERSETZUNG 21.08.2026: Die deutsche Fassung ist eine wortgetreue
 * Übertragung derselben Aussagen — es kommt keine Angabe hinzu und keine
 * fällt weg. Die Rechtsprüfung oben gilt unverändert für beide Sprachen.
 */

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER =
  "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";
const LINK = "text-ink underline underline-offset-2 transition-colors hover:text-red";

export const IMPRINT_TITLE: Record<Lang, string> = {
  de: "Impressum",
  en: "Imprint",
};

export const IMPRINT_DESCRIPTION: Record<Lang, string> = {
  de: "Impressum für www.devinhauser.com, betrieben von Devin Hauser, IQFoil- und Wingfoil-Racer aus der Schweiz.",
  en: "Legal imprint / Impressum for www.devinhauser.com, operated by Devin Hauser, Swiss IQFoil & Wingfoil Racing Athlete.",
};

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    operator: string;
    role: string;
    location: string;
    postal: string;
    contact: string;
    email: string;
    responsible: string;
    responsibleText: string;
    register: string;
    registerText: string;
    disclaimer: string;
    liabilityContentLabel: string;
    liabilityContentText: string;
    liabilityLinksLabel: string;
    liabilityLinksText: string;
    copyright: string;
    copyrightLead: string;
    copyrightLink: string;
    copyrightTail: string;
    privacy: string;
    privacyLead: string;
    privacyLink: string;
  }
> = {
  de: {
    eyebrow: "Rechtliches",
    heading: "IMPRESSUM",
    lead: "Rechtliche Hinweise und Kontaktangaben zu dieser Website.",
    operator: "Betreiber der Website",
    role: "IQFoil- und Wingfoil-Racer aus der Schweiz",
    location: "Zürich, Schweiz",
    postal:
      "Eine Postadresse für rechtliche Korrespondenz wird auf Anfrage über die untenstehende E-Mail-Adresse bekanntgegeben.",
    contact: "Kontakt",
    email: "E-Mail:",
    responsible: "Verantwortlich für den Inhalt",
    responsibleText:
      "Devin Hauser ist allein verantwortlich für die auf www.devinhauser.com veröffentlichten Inhalte.",
    register: "Handelsregister / UID",
    registerText:
      "Betrieb als Privatperson, nicht im Schweizer Handelsregister eingetragen.",
    disclaimer: "Haftungsausschluss",
    liabilityContentLabel: "Haftung für Inhalte.",
    liabilityContentText:
      " Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen. Als Anbieter ist Devin Hauser für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
    liabilityLinksLabel: "Haftung für Links.",
    liabilityLinksText:
      " Diese Website kann Links zu externen Websites Dritter enthalten (zum Beispiel Seiten von Sponsoren und Partnern oder Social-Media-Profile). Auf die Inhalte dieser externen Seiten besteht kein Einfluss, und es wird dafür keine Haftung übernommen. Für den Inhalt einer verlinkten Seite ist immer deren Anbieter oder Betreiber verantwortlich.",
    copyright: "Urheberrecht",
    copyrightLead:
      "Angaben zur Verwendung von Texten, Bildern und Videos dieser Website stehen auf der Seite ",
    copyrightLink: "Urheberrecht",
    copyrightTail: ".",
    privacy: "Datenschutz",
    privacyLead:
      "Wie mit den Daten von Besucherinnen und Besuchern umgegangen wird, steht in der ",
    privacyLink: "Datenschutzerklärung",
  },
  en: {
    eyebrow: "Legal",
    heading: "IMPRINT",
    lead: "Legal notice and contact information for this website.",
    operator: "Website Operator",
    role: "Swiss IQFoil & Wingfoil Racing Athlete",
    location: "Zurich, Switzerland",
    postal:
      "A postal address for legal correspondence is available on request via the email below.",
    contact: "Contact",
    email: "Email:",
    responsible: "Responsible For Content",
    responsibleText:
      "Devin Hauser is solely responsible for the content published on www.devinhauser.com.",
    register: "Commercial Register / UID",
    registerText:
      "Operated as a private individual, not entered in the Swiss commercial register.",
    disclaimer: "Disclaimer",
    liabilityContentLabel: "Liability for content.",
    liabilityContentText:
      " The content of this website has been created with care, but no guarantee is given for its accuracy, completeness or timeliness. As a service provider, Devin Hauser is responsible for own content on these pages in accordance with general law.",
    liabilityLinksLabel: "Liability for links.",
    liabilityLinksText:
      " This website may contain links to external third-party websites (e.g. sponsor and partner sites, social media profiles). No influence is exercised on the content of those external sites and no liability is accepted for them. The respective provider or operator of a linked page is always responsible for its content.",
    copyright: "Copyright",
    copyrightLead:
      "Details on the use of text, images and video on this site are set out on the ",
    copyrightLink: "Copyright",
    copyrightTail: " page.",
    privacy: "Privacy",
    privacyLead:
      "For information on how visitor data is handled, see the ",
    privacyLink: "Privacy Policy",
  },
};

export default function ImprintView({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h1>
          <p className={BODY_TEXT}>{c.lead}</p>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.operator}</h2>
            <p className={BODY_TEXT}>
              Devin Hauser
              <br />
              {c.role}
              <br />
              {c.location}
            </p>
            <p className={BODY_TEXT}>{c.postal}</p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.contact}</h2>
            <p className={BODY_TEXT}>
              {c.email}{" "}
              <a href="mailto:devinhauser9@gmail.com" className={LINK}>
                devinhauser9@gmail.com
              </a>
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.responsible}</h2>
            <p className={BODY_TEXT}>{c.responsibleText}</p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.register}</h2>
            <p className={BODY_TEXT}>{c.registerText}</p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.disclaimer}</h2>
            <p className={BODY_TEXT}>
              <strong>{c.liabilityContentLabel}</strong>
              {c.liabilityContentText}
            </p>
            <p className={BODY_TEXT}>
              <strong>{c.liabilityLinksLabel}</strong>
              {c.liabilityLinksText}
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.copyright}</h2>
            <p className={BODY_TEXT}>
              {c.copyrightLead}
              <a href={localizedPath("/copyright", lang)} className={LINK}>
                {c.copyrightLink}
              </a>
              {c.copyrightTail}
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.privacy}</h2>
            <p className={BODY_TEXT}>
              {c.privacyLead}
              <a href={localizedPath("/privacy-policy", lang)} className={LINK}>
                {c.privacyLink}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
