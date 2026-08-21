import { SECTION_ID, localizedPath, sectionHref, type Lang } from "@/lib/i18n";

/**
 * Urheberrecht.
 *
 * Die Seite beschreibt, was mit Texten, Bildern, Videos und Partnerlogos auf
 * dieser Website erlaubt ist. Sie ist die textliche Entsprechung zu dem, was
 * `canDownload()` in src/lib/albums.ts technisch erzwingt: Anzeigen ja,
 * Weiterverbreiten nur nach Rückfrage. Die Galerie ist ausdrücklich KEINE
 * offene Pressebild-Datenbank — dieselbe Aussage steht sichtbar bei der
 * Galerie selbst.
 */

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER =
  "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";
const LINK = "text-ink underline underline-offset-2 transition-colors hover:text-red";

export const COPYRIGHT_TITLE: Record<Lang, string> = {
  de: "Urheberrecht",
  en: "Copyright",
};

export const COPYRIGHT_DESCRIPTION: Record<Lang, string> = {
  de: "Urheberrecht und Nutzungsbedingungen für Texte, Bilder, Videos und Logos auf www.devinhauser.com.",
  en: "Copyright and usage terms for text, images, video and logos published on www.devinhauser.com.",
};

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    rights: string;
    ownership: string;
    ownershipText: string;
    credits: string;
    creditsLead: string;
    creditsTail: string;
    imprintLabel: string;
    logos: string;
    logosText: string;
    mediaRequests: string;
    mediaLead: string;
    contactLabel: string;
    mediaTail: string;
    misuse: string;
    misuseLead: string;
    misuseTail: string;
  }
> = {
  de: {
    eyebrow: "Rechtliches",
    heading: "URHEBERRECHT",
    rights: "© 2026 Devin Hauser. Alle Rechte vorbehalten.",
    ownership: "Rechteinhaberschaft",
    ownershipText:
      "Soweit nicht anders vermerkt, sind alle auf www.devinhauser.com veröffentlichten Texte, Fotos, Videos und Gestaltungselemente entweder Eigentum von Devin Hauser oder werden mit Erlaubnis der jeweiligen Rechteinhaber verwendet (zum Beispiel von Fotografinnen, Fotografen oder Videoschaffenden). Nichts auf dieser Website darf ohne vorherige schriftliche Erlaubnis vervielfältigt, verbreitet, erneut veröffentlicht oder kommerziell genutzt werden.",
    credits: "Bild- und Videonachweise",
    creditsLead:
      "Fotos und Videos auf dieser Website werden dort den Urheberinnen und Urhebern zugeordnet, wo die Bedingungen der Überlassung das verlangen und wo die Urheberschaft tatsächlich belegt ist. Wo kein Nachweis vorliegt, steht statt einer Fotografennennung die sachliche Herkunftszeile „Bild: Archiv Devin Hauser“ — eine Zuordnung wird nicht vermutet. Einzelnachweise werden ergänzt, sobald neue Inhalte veröffentlicht werden. Für eine vollständige Liste oder die Aufnahme eines bestimmten Credits genügt eine kurze Nachricht über die Angaben im ",
    creditsTail: ".",
    imprintLabel: "Impressum",
    logos: "Logos von Partnern und Verbänden",
    logosText:
      "Logos von Sponsoren, Partnern, Verbänden und Organisationen auf dieser Website (etwa im Partner-Bereich) bleiben ausschliessliches Eigentum der jeweiligen Inhaber und werden allein dazu verwendet, eine bestehende Partnerschaft oder Zugehörigkeit anzuzeigen. Ihre Verwendung überträgt keine Rechte und bedeutet keine Empfehlung eines Produkts über die Partnerschaft hinaus.",
    mediaRequests: "Medienanfragen",
    mediaLead:
      "Diese Website ist keine offene Pressebild-Datenbank. Medienschaffende, Sponsoren und Partner, die hochaufgelöste Bilder, Videomaterial oder ein offizielles Pressekit für redaktionelle Zwecke oder für eine Zusammenarbeit benötigen, fragen bitte direkt an — siehe ",
    contactLabel: "Kontakt",
    mediaTail: ". Jede Anfrage wird einzeln geprüft.",
    misuse: "Missbrauch melden",
    misuseLead:
      "Wer der Ansicht ist, dass Inhalte dieser Website sein Urheberrecht verletzen, oder wer als Partner sein Logo entfernt oder korrigiert haben möchte, meldet sich bitte über die Angaben im ",
    misuseTail: ".",
  },
  en: {
    eyebrow: "Legal",
    heading: "COPYRIGHT",
    rights: "© 2026 Devin Hauser. All rights reserved.",
    ownership: "Ownership",
    ownershipText:
      "Unless otherwise noted, all text, photography, video and design elements published on www.devinhauser.com are either the property of Devin Hauser or used with permission from the respective rights holder (e.g. photographers, videographers). Nothing on this site may be reproduced, distributed, republished or used commercially without prior written permission.",
    credits: "Photo & Video Credits",
    creditsLead:
      "Photography and video on this site are credited to their respective creators where required by the terms under which they were provided and where authorship is actually documented. Where no evidence exists, the factual source line “Image: Devin Hauser archive” is shown instead of a photographer credit — authorship is never assumed. Individual credits are expanded over time as new content is published. For a full list of credits or to request a specific credit, get in touch via the details on the ",
    creditsTail: " page.",
    imprintLabel: "Imprint",
    logos: "Partner & Federation Logos",
    logosText:
      "Logos of sponsors, partners, federations and associations displayed on this website (for example in the Partners section) remain the exclusive property of their respective owners and are used solely to indicate an existing partnership or affiliation. Their use does not transfer any rights and does not imply endorsement of any third-party product beyond the partnership itself.",
    mediaRequests: "Media Requests",
    mediaLead:
      "This website is not an open press image library. Journalists, sponsors and partners who need high-resolution images, video footage or an official press kit for editorial or partnership purposes are welcome to request access directly — see the ",
    contactLabel: "Contact",
    mediaTail: " section. Requests are reviewed individually.",
    misuse: "Reporting Misuse",
    misuseLead:
      "If you believe content on this website infringes your copyright, or if you are a partner and would like your logo removed or corrected, please get in touch using the details on the ",
    misuseTail: " page.",
  },
};

export default function CopyrightView({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const contactHref = sectionHref(lang, SECTION_ID.contact);

  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            {c.heading}
          </h1>
          <p className={BODY_TEXT}>{c.rights}</p>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.ownership}</h2>
            <p className={BODY_TEXT}>{c.ownershipText}</p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.credits}</h2>
            <p className={BODY_TEXT}>
              {c.creditsLead}
              <a href={localizedPath("/imprint", lang)} className={LINK}>
                {c.imprintLabel}
              </a>
              {c.creditsTail}
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.logos}</h2>
            <p className={BODY_TEXT}>{c.logosText}</p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.mediaRequests}</h2>
            <p className={BODY_TEXT}>
              {c.mediaLead}
              <a href={contactHref} className={LINK}>
                {c.contactLabel}
              </a>
              {c.mediaTail}
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>{c.misuse}</h2>
            <p className={BODY_TEXT}>
              {c.misuseLead}
              <a href={localizedPath("/imprint", lang)} className={LINK}>
                {c.imprintLabel}
              </a>
              {c.misuseTail}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
