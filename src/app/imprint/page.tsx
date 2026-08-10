import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal imprint / Impressum for devinhauser.com, operated by Devin Hauser, Swiss IQFoil & Wingfoil Racing Athlete.",
  alternates: {
    canonical: "/imprint",
  },
};

// Hinweis für Devin: Die Impressumsadresse ist von dir am 03.08.2026
// ausdrücklich bestätigt und exakt in der gelieferten Schreibweise
// eingesetzt worden — nichts ergänzt, nichts abgeleitet, nichts erfunden.
// Damit ist der zentrale offene Blocker aus dem Post-Launch-Cleanup
// geschlossen. Telefonnummer wurde entfernt (optional, keine bestätigt),
// Handelsregister-Feld auf "privat, nicht eingetragen" gesetzt (bestätigter
// Status), E-Mail-Hinweis "provisorisch" entfernt.

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER =
  "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";

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
              Wolfackerstrasse 5
              <br />
              8107 Buchs ZH
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
              </a>
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
              Operated as a private individual, not entered in the Swiss
              commercial register.
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
