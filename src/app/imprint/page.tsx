import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint — Devin Hauser",
  description:
    "Legal imprint / Impressum for devinhauser.com, operated by Devin Hauser, Swiss IQFoil & Wingfoil Racing Athlete.",
  alternates: {
    canonical: "/imprint",
  },
};

// Hinweis für Devin: Alle mit [BITTE ERGÄNZEN] markierten Felder sind
// gesetzlich nötige Pflichtangaben für ein Schweizer Impressum (Name,
// ladungsfähige Adresse, Kontakt). Ich habe hier bewusst KEINE Adresse
// erfunden. Bitte vor Go-Live ausfüllen und die Markierungen entfernen.

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER =
  "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";
const PLACEHOLDER = "font-semibold text-red";

export default function ImprintPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            IMPRINT
          </h1>
          <p className={BODY_TEXT}>
            Legal notice pursuant to Swiss law (Art. 3 lit. s of the Swiss
            Federal Act Against Unfair Competition, UWG).
          </p>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Website Operator</h2>
            <p className={BODY_TEXT}>
              Devin Hauser
              <br />
              Swiss IQFoil &amp; Wingfoil Racing Athlete
              <br />
              <span className={PLACEHOLDER}>
                [BITTE ERGÄNZEN: Strasse und Hausnummer]
              </span>
              <br />
              <span className={PLACEHOLDER}>
                [BITTE ERGÄNZEN: PLZ und Ort]
              </span>
              <br />
              Switzerland
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Contact</h2>
            <p className={BODY_TEXT}>
              Email:{" "}
              <a
                href="mailto:devinhauser9@gmail.com"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                devinhauser9@gmail.com
              </a>{" "}
              <span className="text-sm italic text-graphite/70">
                (provisional — will be replaced by a devinhauser.com
                address once set up)
              </span>
              <br />
              Phone:{" "}
              <span className={PLACEHOLDER}>
                [BITTE ERGÄNZEN, optional]
              </span>
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Responsible For Content</h2>
            <p className={BODY_TEXT}>
              Devin Hauser is solely responsible for the content published
              on devinhauser.com.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>
              Commercial Register / UID
            </h2>
            <p className={BODY_TEXT}>
              <span className={PLACEHOLDER}>
                [BITTE ERGÄNZEN, falls als Einzelunternehmen im
                Handelsregister eingetragen bzw. UID-Nummer vorhanden;
                andernfalls: &ldquo;Operated as a private individual, not
                entered in the Swiss commercial register.&rdquo;]
              </span>
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Disclaimer</h2>
            <p className={BODY_TEXT}>
              <strong>Liability for content.</strong> The content of this
              website has been created with care, but no guarantee is
              given for its accuracy, completeness or timeliness. As a
              service provider, Devin Hauser is responsible for own
              content on these pages in accordance with general law.
            </p>
            <p className={BODY_TEXT}>
              <strong>Liability for links.</strong> This website may
              contain links to external third-party websites (e.g. sponsor
              and partner sites, social media profiles). No influence is
              exercised on the content of those external sites and no
              liability is accepted for them. The respective provider or
              operator of a linked page is always responsible for its
              content.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Copyright</h2>
            <p className={BODY_TEXT}>
              Details on the use of text, images and video on this site
              are set out on the{" "}
              <a
                href="/copyright"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Copyright
              </a>{" "}
              page.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Privacy</h2>
            <p className={BODY_TEXT}>
              For information on how visitor data is handled, see the{" "}
              <a
                href="/privacy-policy"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
