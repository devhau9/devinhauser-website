import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright — Devin Hauser",
  description:
    "Copyright and usage terms for text, images, video and logos published on devinhauser.com.",
  alternates: {
    canonical: "/copyright",
  },
};

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER =
  "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";

export default function CopyrightPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            COPYRIGHT
          </h1>
          <p className={BODY_TEXT}>© 2026 Devin Hauser. All rights reserved.</p>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Ownership</h2>
            <p className={BODY_TEXT}>
              Unless otherwise noted, all text, photography, video and
              design elements published on devinhauser.com are either the
              property of Devin Hauser or used with permission from the
              respective rights holder (e.g. photographers, videographers).
              Nothing on this site may be reproduced, distributed,
              republished or used commercially without prior written
              permission.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Photo &amp; Video Credits</h2>
            <p className={BODY_TEXT}>
              Photography and video on this site are credited to their
              respective creators where required by the terms under which
              they were provided.{" "}
              <span className="font-semibold text-red">
                [BITTE ERGÄNZEN: einzelne Fotografen-/Videografen-Credits
                nachtragen, sobald final bestätigt]
              </span>
              . For a full list of credits or to request a specific
              credit, get in touch via the details on the{" "}
              <a
                href="/imprint"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Imprint
              </a>{" "}
              page.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Partner &amp; Federation Logos</h2>
            <p className={BODY_TEXT}>
              Logos of sponsors, partners, federations and associations
              displayed on this website (for example in the Partners
              section) remain the exclusive property of their respective
              owners and are used solely to indicate an existing
              partnership or affiliation. Their use does not transfer any
              rights and does not imply endorsement of any third-party
              product beyond the partnership itself.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Media Requests</h2>
            <p className={BODY_TEXT}>
              Journalists, sponsors and partners who need high-resolution
              images, video footage or an official press kit for editorial
              or partnership purposes are welcome to request access
              directly — see the{" "}
              <a
                href="/#kontakt"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Contact
              </a>{" "}
              section. Requests are reviewed individually.
            </p>
          </div>

          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Reporting Misuse</h2>
            <p className={BODY_TEXT}>
              If you believe content on this website infringes your
              copyright, or if you are a partner and would like your logo
              removed or corrected, please contact us using the details on
              the{" "}
              <a
                href="/imprint"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Imprint
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
