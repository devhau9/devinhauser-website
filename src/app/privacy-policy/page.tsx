import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Devin Hauser",
  description:
    "Privacy Policy for devinhauser.com — how Devin Hauser collects, uses and protects visitor data, including Google Analytics, cookies, the newsletter, contact channels and the Partner Portal.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

// Hinweis für Devin: Rechtliche Basisangaben (Adresse etc.) sind noch mit
// [BITTE ERGÄNZEN] markiert (siehe Imprint-Seite) und müssen dort ergänzt
// werden, bevor diese Seite live geht. Alle technischen Angaben unten
// (Google Analytics, Cookie-Consent, Newsletter, Partner Portal) spiegeln
// den tatsächlichen aktuellen Stand des Codes wider, nicht einen
// angestrebten Zielzustand. [PRÜFEN]-Markierungen kennzeichnen Angaben, die
// von Devin bzw. den jeweiligen Anbietern bestätigt werden müssen (z. B.
// Hosting-Provider, GA4-Aufbewahrungsdauer), bevor die Seite live geht.
// Diese Seite ersetzt keine anwaltliche Prüfung — vor Veröffentlichung
// empfiehlt sich eine kurze Kontrolle durch eine auf Datenschutz
// spezialisierte Fachperson (Schweiz: DSG/revDSG; EU-Besucher: DSGVO).

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER = "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";
const LIST = "mt-4 space-y-2 leading-relaxed text-graphite";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-40 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            PRIVACY POLICY
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            Last updated: 21 July 2026
          </p>

          <p className={BODY_TEXT}>
            This Privacy Policy explains how devinhauser.com (&ldquo;this
            website&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
            uses and protects information about visitors. It is written to
            reflect exactly how the site currently works — not a planned
            future state. Sections that depend on details not yet finalised
            are marked <strong>[PRÜFEN]</strong> (&ldquo;to confirm&rdquo;)
            and will be updated once confirmed.
          </p>

          {/* 1. Data Controller */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Who Is Responsible</h2>
            <p className={BODY_TEXT}>
              This website is operated by Devin Hauser, Swiss IQFoil &amp;
              Wingfoil Racing Athlete, based in Zurich, Switzerland. Full
              legal contact details (registered address) are published on
              the{" "}
              <a
                href="/imprint"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Imprint
              </a>{" "}
              page. Where this Privacy Policy refers to &ldquo;we&rdquo; or
              &ldquo;us&rdquo;, it means Devin Hauser as the person
              responsible for this website.
            </p>
          </div>

          {/* 2. Hosting */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Hosting</h2>
            <p className={BODY_TEXT}>
              This website is built with Next.js and is intended to be
              hosted on Vercel Inc. (San Francisco, USA), with the domain
              devinhauser.com registered and managed through Hosttech GmbH
              (Switzerland).{" "}
              <strong>
                [PRÜFEN: aktuellen Hosting-Anbieter bei Go-Live bestätigen,
                falls die Seite (noch) nicht produktiv auf Vercel läuft]
              </strong>
              . When you visit this website, your device automatically
              sends technical information to the hosting infrastructure —
              typically your IP address, browser type and version,
              operating system, referring page, date and time of the
              request — in order to deliver the page to you. This is a
              standard, unavoidable part of how the web works and happens
              independently of whether you accept or decline the cookie
              banner described below.
            </p>
          </div>

          {/* 3. Cookies & Cookie Consent */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Cookies &amp; Cookie Consent</h2>
            <p className={BODY_TEXT}>
              On your first visit, a banner asks whether you accept or
              decline non-essential cookies (currently: Google Analytics,
              see below). Your choice is stored locally in your browser
              (via <code className="rounded bg-mist px-1.5 py-0.5 text-sm">localStorage</code>,
              key <code className="rounded bg-mist px-1.5 py-0.5 text-sm">cookie-consent</code>,
              value <code className="rounded bg-mist px-1.5 py-0.5 text-sm">accepted</code> or{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">declined</code>)
              — this storage entry itself is not a cookie and is not
              transmitted to any server; it only stays on your own device.
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>
                If you <strong>decline</strong>, no Google Analytics script
                is loaded and no analytics cookies are set. Only the
                consent decision itself is stored locally on your device.
              </li>
              <li>
                If you <strong>accept</strong>, Google Analytics is loaded
                and may set its own cookies (see below) to distinguish
                visitors and measure usage.
              </li>
              <li>
                You can change your decision at any time by clearing your
                browser&rsquo;s local storage for this site (in most
                browsers: site settings → cookies and site data → delete
                for devinhauser.com), which will show the banner again on
                your next visit.{" "}
                <strong>
                  [PRÜFEN: ein direkter &ldquo;Cookie-Einstellungen
                  ändern&rdquo;-Link im Footer ist als Verbesserung
                  vorgesehen, aktuell noch nicht umgesetzt]
                </strong>
              </li>
            </ul>
          </div>

          {/* 4. Google Analytics */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Google Analytics 4</h2>
            <p className={BODY_TEXT}>
              With your consent, this website uses Google Analytics 4
              (GA4), a web analytics service provided by Google Ireland
              Limited (Gordon House, Barrow Street, Dublin 4, Ireland),
              and, for data transfers outside the EEA, Google LLC (USA).
              GA4 helps us understand how visitors use this site (e.g.
              which pages are viewed, how long people stay, which device
              or region visitors come from) so we can improve it.
            </p>
            <p className={BODY_TEXT}>
              GA4 is only loaded after you actively click &ldquo;Accept&rdquo;
              in the cookie banner (see{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">
                src/components/GoogleAnalytics.tsx
              </code>
              ). Before consent, no request is sent to Google at all — not
              even to load the script. Data typically collected once
              consent is given includes: pages visited, approximate
              location (derived from IP address), device/browser type,
              referral source, and interaction events. Google Analytics
              may set cookies such as <code className="rounded bg-mist px-1.5 py-0.5 text-sm">_ga</code> and{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">_ga_*</code> to
              recognise returning visitors.
            </p>
            <p className={BODY_TEXT}>
              Data retention period in the GA4 property:{" "}
              <strong>[PRÜFEN – aktuelle GA4-Property-Einstellung bestätigen]</strong>.
              For details on how Google processes data, see Google&rsquo;s
              own privacy policy at{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </div>

          {/* 5. Newsletter */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Newsletter</h2>
            <p className={BODY_TEXT}>
              The website includes a newsletter sign-up form asking for
              first name, last name and email address. As things
              currently stand,{" "}
              <strong>
                this form is not yet connected to an email service
                provider
              </strong>{" "}
              — no data submitted through it is stored, transmitted or
              processed anywhere at this time.
            </p>
            <p className={BODY_TEXT}>
              Once the newsletter is connected to a provider{" "}
              <strong>
                [PRÜFEN: konkreter Anbieter, geplant ist Kit]
              </strong>
              , sign-up will use a double opt-in process: you will receive
              a confirmation email and your address will only be added to
              the mailing list after you confirm it. You will be able to
              unsubscribe at any time via a link in every newsletter
              email. This section will be updated with the provider&rsquo;s
              name, server location and a link to its own privacy policy
              as soon as it is connected.
            </p>
          </div>

          {/* 6. Contact Form */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Contact</h2>
            <p className={BODY_TEXT}>
              The Contact section currently links directly to an email
              address (mailto link) and an Instagram profile rather than
              a form on this website. If you write to us this way, your
              message and any information you choose to include (e.g.
              your name, company or the content of your email) is
              processed by your own email provider and ours in order to
              respond to you. We only use this information to answer your
              enquiry and do not add you to any mailing list without your
              separate, explicit consent.
            </p>
          </div>

          {/* 7. Partner Portal */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Partner Portal</h2>
            <p className={BODY_TEXT}>
              The Partner Portal form asks prospective sponsors and
              partners for first name, last name, company/organisation
              and email address. When you submit this form, the
              information is sent to Devin Hauser by email through{" "}
              <strong>Web3Forms</strong>, a third-party form-processing
              service that briefly handles the submission in order to
              deliver it. Web3Forms retains this data only for a short
              period, in line with their own data retention practices,
              before deleting it. The data is used solely to review and respond to your
              request; it is not added to any mailing list and not shared
              with anyone beyond Devin Hauser and Web3Forms. Devin
              personally reviews each request and decides whether to grant
              Partner Portal access.
            </p>
          </div>

          {/* 8. What Data Is Stored */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>What Data Is Stored, Today</h2>
            <p className={BODY_TEXT}>
              Summarising the sections above, at the current stage of this
              website:
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>
                Your cookie-consent decision is stored only in your own
                browser&rsquo;s local storage — never on our servers.
              </li>
              <li>
                If you accept analytics cookies, usage data is processed
                by Google Analytics 4 as described above.
              </li>
              <li>
                Newsletter and Partner Portal form submissions are{" "}
                <strong>not currently stored anywhere</strong> — no
                backend is connected yet.
              </li>
              <li>
                Direct emails or Instagram messages you send us are stored
                in our respective email/Instagram accounts, as with any
                normal email or direct message.
              </li>
              <li>
                Standard technical request data (IP address, browser,
                timestamps) is processed transiently by the hosting
                infrastructure to deliver the website to you, as described
                under &ldquo;Hosting&rdquo; above.
              </li>
            </ul>
          </div>

          {/* 9. Your Rights */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Your Rights</h2>
            <p className={BODY_TEXT}>
              Depending on where you are based, data protection law (the
              Swiss Federal Act on Data Protection, FADP, and/or the EU
              General Data Protection Regulation, GDPR, for visitors in
              the EU/EEA) gives you the following rights regarding any
              personal data we hold about you:
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>Access — ask what data we hold about you.</li>
              <li>Rectification — ask us to correct inaccurate data.</li>
              <li>Erasure — ask us to delete your data.</li>
              <li>
                Restriction and objection — ask us to limit or stop
                certain processing.
              </li>
              <li>Data portability — receive your data in a usable format.</li>
              <li>
                Withdraw consent at any time — for example, by declining
                or resetting the cookie banner as described above; this
                does not affect the lawfulness of processing before
                withdrawal.
              </li>
              <li>
                Lodge a complaint — with the Swiss Federal Data Protection
                and Information Commissioner (FDPIC) if you are in
                Switzerland, or with your local data protection authority
                if you are in the EU/EEA.
              </li>
            </ul>
            <p className={BODY_TEXT}>
              To exercise any of these rights, contact us using the
              details below.
            </p>
          </div>

          {/* 10. Data Security */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Data Security</h2>
            <p className={BODY_TEXT}>
              This website is served over HTTPS, and — as described above
              — the forms currently on the site do not transmit submitted
              data to any backend. As soon as any form is connected to a
              real backend or third-party service, appropriate technical
              and organisational measures will be used to protect that
              data, and this policy will be updated accordingly.
            </p>
          </div>

          {/* 11. Children */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Children&rsquo;s Privacy</h2>
            <p className={BODY_TEXT}>
              This website is a general-audience site about competitive
              sailing and is not directed at children. We do not knowingly
              collect personal data from children.
            </p>
          </div>

          {/* 12. Changes */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Changes To This Policy</h2>
            <p className={BODY_TEXT}>
              As the website evolves — for example when the newsletter or
              Partner Portal are connected to a live backend — this
              Privacy Policy will be updated to reflect the actual, current
              state of the site, and the &ldquo;Last updated&rdquo; date
              above will change accordingly.
            </p>
          </div>

          {/* 13. Contact */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Contact Us</h2>
            <p className={BODY_TEXT}>
              For any question about this Privacy Policy or your data,
              contact:{" "}
              <a
                href="mailto:devinhauser9@gmail.com"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                devinhauser9@gmail.com
              </a>{" "}
              <span className="text-sm italic text-graphite/70">
                (provisional address — will be replaced by a
                devinhauser.com address once set up)
              </span>
              . Full legal contact details are on the{" "}
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
