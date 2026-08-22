import { localizedPath } from "@/lib/i18n";

// Deutsche Fassung der Datenschutzerklärung — inhaltlich deckungsgleich mit
// src/views/legal/PrivacyEn.tsx. Die fachlichen Hinweise zum tatsächlichen
// Stand der Seite (offene GA4-Aufbewahrungsdauer, Newsletter ohne Formular,
// Web3Forms ohne behauptete Aufbewahrungsdauer, empfohlene anwaltliche
// Prüfung) stehen bewusst nur EINMAL, nämlich im Kopf der englischen Fassung.
// Wer hier eine rechtliche Aussage ändert, muss dort nachsehen und dieselbe
// Änderung vornehmen — sonst stehen zwei Sprachfassungen mit unterschiedlicher
// Rechtslage nebeneinander.
//
// Die Abschnittsmarker im JSX ("1. Data Controller", "2. Hosting", …) bleiben
// absichtlich englisch und identisch zur englischen Fassung: So lassen sich
// beide Dateien Abschnitt für Abschnitt nebeneinanderlegen, und eine spätere
// Korrektur ist in beiden Sprachen an derselben Marke wiederzufinden.
//
// SPRACHE: Schweizer Hochdeutsch, kein Eszett (durchgehend "ss"), durchgehend
// die Höflichkeitsform "Sie". Fachbegriffe nach Schweizer Datenschutzrecht
// (Personendaten, Bearbeitung); die DSGVO-Begriffe stehen nur dort daneben, wo
// die englische Fassung die DSGVO ausdrücklich nennt.

// Titel und Beschreibung liegen hier, nicht in der Route-Datei: Der sichtbare
// Text und die Metadata derselben Seite sollen aus EINER Quelle stammen. Die
// Route-Datei importiert diese beiden Konstanten und baut daraus ihr
// `metadata`-Objekt.
export const PRIVACY_DE_TITLE = "Datenschutzerklärung";
export const PRIVACY_DE_DESCRIPTION =
  "Datenschutzerklärung für www.devinhauser.com — wie Devin Hauser Daten von Besucherinnen und Besuchern erhebt, verwendet und schützt, einschliesslich Google Analytics, Cookies, Kontaktwegen und Partner Portal.";

const SECTION_HEADING =
  "font-display text-2xl tracking-wide text-ink sm:text-3xl";
const SECTION_WRAPPER = "mt-14 border-t border-hairline pt-10 first:mt-10 first:border-t-0 first:pt-0";
const BODY_TEXT = "mt-4 leading-relaxed text-graphite";
const LIST = "mt-4 space-y-2 leading-relaxed text-graphite";

export default function PrivacyDe() {
  return (
    <main className="bg-white">
      <section className="section-pad !pb-32 !pt-24 sm:!pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5">Rechtliches</p>
          {/* Weiches Trennzeichen im Titel: "DATENSCHUTZERKLÄRUNG" ist ein
              einziges Wort aus 20 Zeichen und passt in Bebas Neue bei
              text-4xl nicht auf schmale Displays. Die Trennstelle nach
              "DATENSCHUTZ" ist die korrekte und bleibt überall dort
              unsichtbar, wo das Wort in eine Zeile passt. */}
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
            DATENSCHUTZ&shy;ERKLÄRUNG
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            Zuletzt aktualisiert: 3. August 2026
          </p>

          <p className={BODY_TEXT}>
            Diese Datenschutzerklärung erläutert, wie www.devinhauser.com
            („diese Website“, „wir“, „uns“) Informationen über Besucherinnen
            und Besucher erhebt, verwendet und schützt. Sie ist so verfasst,
            dass sie genau abbildet, wie die Website heute funktioniert — und
            nicht einen geplanten künftigen Zustand. Einige wenige Angaben
            unten stehen noch nicht abschliessend fest; sie sind im jeweiligen
            Abschnitt offen benannt und werden ergänzt, sobald sie bestätigt
            sind.
          </p>

          {/* 1. Data Controller */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Wer ist verantwortlich</h2>
            <p className={BODY_TEXT}>
              Diese Website wird betrieben von Devin Hauser, IQFoil- und
              Wingfoil-Racing-Athlet aus der Schweiz, ansässig im Kanton
              Zürich, Schweiz. Die Kontaktangaben, einschliesslich der
              Kontakt-E-Mail-Adresse, finden Sie im{" "}
              <a
                href={localizedPath("/imprint", "de")}
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Impressum
              </a>
              . Wo diese Datenschutzerklärung von „wir“ oder „uns“ spricht,
              ist damit Devin Hauser als die für diese Website verantwortliche
              Person gemeint.
            </p>
          </div>

          {/* 2. Hosting */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Hosting</h2>
            <p className={BODY_TEXT}>
              Diese Website ist mit Next.js gebaut und wird bei der Vercel Inc.
              (San Francisco, USA) gehostet; die Domain www.devinhauser.com ist
              über die Hosttech GmbH (Schweiz) registriert und wird dort
              verwaltet. Wenn Sie diese Website aufrufen, sendet Ihr Gerät
              automatisch technische Angaben an die Hosting-Infrastruktur — in
              der Regel Ihre IP-Adresse, Browsertyp und -version,
              Betriebssystem, verweisende Seite sowie Datum und Uhrzeit der
              Anfrage —, damit Ihnen die Seite ausgeliefert werden kann. Das
              ist ein üblicher, unvermeidbarer Teil der Funktionsweise des Webs
              und geschieht unabhängig davon, ob Sie den unten beschriebenen
              Cookie-Banner akzeptieren oder ablehnen.
            </p>
          </div>

          {/* 3. Cookies & Cookie Consent */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>
              Cookies &amp; Cookie-Einwilligung
            </h2>
            <p className={BODY_TEXT}>
              Beim ersten Besuch fragt ein Banner, ob Sie nicht notwendige
              Cookies akzeptieren oder ablehnen (derzeit: Google Analytics,
              siehe unten). Ihre Entscheidung wird lokal in Ihrem Browser
              gespeichert
              (über <code className="rounded bg-mist px-1.5 py-0.5 text-sm">localStorage</code>,
              Schlüssel <code className="rounded bg-mist px-1.5 py-0.5 text-sm">cookie-consent</code>,
              Wert <code className="rounded bg-mist px-1.5 py-0.5 text-sm">accepted</code> oder{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">declined</code>)
              — dieser Speichereintrag ist selbst kein Cookie und wird an
              keinen Server übermittelt; er bleibt ausschliesslich auf Ihrem
              eigenen Gerät.
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>
                Wenn Sie <strong>ablehnen</strong>, wird kein
                Google-Analytics-Skript geladen und es werden keine
                Analyse-Cookies gesetzt. Lokal auf Ihrem Gerät gespeichert wird
                ausschliesslich die Einwilligungsentscheidung selbst.
              </li>
              <li>
                Wenn Sie <strong>akzeptieren</strong>, wird Google Analytics
                geladen und kann eigene Cookies setzen (siehe unten), um
                Besucherinnen und Besucher zu unterscheiden und die Nutzung zu
                messen.
              </li>
              <li>
                Sie können Ihre Entscheidung jederzeit ändern, indem Sie den
                lokalen Speicher Ihres Browsers für diese Website löschen (in
                den meisten Browsern: Website-Einstellungen → Cookies und
                Websitedaten → für www.devinhauser.com löschen); beim nächsten
                Besuch erscheint der Banner dann erneut. Derzeit gibt es an
                keiner anderen Stelle der Website einen separaten Link
                „Cookie-Einstellungen ändern“ — dieses Zurücksetzen auf
                Browserebene ist heute der Weg, Ihre Entscheidung anzupassen.
              </li>
            </ul>
          </div>

          {/* 4. Google Analytics */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Google Analytics 4</h2>
            <p className={BODY_TEXT}>
              Mit Ihrer Einwilligung verwendet diese Website Google Analytics 4
              (GA4), einen Webanalysedienst der Google Ireland Limited (Gordon
              House, Barrow Street, Dublin 4, Irland) und, für
              Datenübermittlungen ausserhalb des EWR, der Google LLC (USA). GA4
              hilft uns zu verstehen, wie Besucherinnen und Besucher diese
              Website nutzen (z. B. welche Seiten aufgerufen werden, wie lange
              jemand bleibt, von welchem Gerät oder aus welcher Region
              Besucherinnen und Besucher kommen), damit wir sie verbessern
              können.
            </p>
            <p className={BODY_TEXT}>
              GA4 wird erst geladen, nachdem Sie im Cookie-Banner aktiv auf
              „Akzeptieren“ geklickt haben (siehe{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">
                src/components/GoogleAnalytics.tsx
              </code>
              ). Vor der Einwilligung wird überhaupt keine Anfrage an Google
              gesendet — auch nicht, um das Skript zu laden. Nach erteilter
              Einwilligung werden typischerweise folgende Daten erhoben:
              aufgerufene Seiten, ungefährer Standort (abgeleitet aus der
              IP-Adresse), Geräte-/Browsertyp, Verweisquelle sowie
              Interaktionsereignisse. Google Analytics kann Cookies wie{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">_ga</code> und{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm">_ga_*</code>{" "}
              setzen, um wiederkehrende Besucherinnen und Besucher zu erkennen.
            </p>
            <p className={BODY_TEXT}>
              Die genaue Aufbewahrungsdauer, die in dieser GA4-Property
              eingestellt ist, wurde für diese Datenschutzerklärung noch nicht
              gesondert bestätigt; GA4 erlaubt es den Inhaberinnen und Inhabern
              einer Property, die Aufbewahrung von Daten auf Ereignisebene auf
              entweder 2 oder 14 Monate zu setzen. Dieser Abschnitt wird mit
              dem genauen, bestätigten Wert ergänzt. Einzelheiten dazu, wie
              Google Daten bearbeitet, finden Sie in der Datenschutzerklärung
              von Google unter{" "}
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
              Auf der Website wird derzeit eine Newsletter-Ankündigung
              angezeigt, aber{" "}
              <strong>es ist kein Anmeldeformular aktiv</strong>. Zurzeit
              werden keine Newsletter-Daten erhoben, gespeichert oder
              übermittelt.
            </p>
            <p className={BODY_TEXT}>
              Falls später Newsletter-Anmeldungen eingeführt werden, wird diese
              Datenschutzerklärung aktualisiert, bevor Anmeldungen
              entgegengenommen werden — einschliesslich des Namens des
              Anbieters, des Serverstandorts und eines Links auf dessen eigene
              Datenschutzerklärung. Eine künftige Anmeldung erfolgt im
              Double-Opt-in-Verfahren, mit einem Abmeldelink in jeder
              Newsletter-E-Mail.
            </p>
          </div>

          {/* 6. Contact Form */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Kontakt</h2>
            <p className={BODY_TEXT}>
              Die Kontakt-Sektion verlinkt derzeit direkt auf eine
              E-Mail-Adresse (mailto-Link) und auf ein Instagram-Profil und
              nicht auf ein Formular auf dieser Website. Wenn Sie uns auf
              diesem Weg schreiben, werden Ihre Nachricht und alle Angaben, die
              Sie darin machen (z. B. Ihr Name, Ihr Unternehmen oder der Inhalt
              Ihrer E-Mail), von Ihrem eigenen und von unserem E-Mail-Anbieter
              bearbeitet, um Ihnen antworten zu können. Wir verwenden diese
              Angaben ausschliesslich zur Beantwortung Ihrer Anfrage und nehmen
              Sie ohne Ihre gesonderte, ausdrückliche Einwilligung in keinen
              E-Mail-Verteiler auf.
            </p>
          </div>

          {/* 7. Partner Portal */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Partner Portal</h2>
            <p className={BODY_TEXT}>
              Das Formular des Partner Portals fragt interessierte Sponsoren
              und Partner nach Vorname, Nachname, Unternehmen/Organisation und
              E-Mail-Adresse. Wenn Sie dieses Formular absenden, werden die
              Angaben über{" "}
              <strong>Web3Forms</strong>, einen Formulardienst eines
              Drittanbieters, per E-Mail an Devin Hauser gesendet. Web3Forms
              bearbeitet die Übermittlung zum Zweck der Zustellung per E-Mail,
              nach Massgabe der eigenen Datenschutzpraxis. Die Daten werden
              ausschliesslich verwendet, um Ihre Anfrage zu prüfen und zu
              beantworten; sie werden in keinen E-Mail-Verteiler aufgenommen
              und ausser an Devin Hauser und Web3Forms an niemanden
              weitergegeben. Devin prüft jede Anfrage persönlich und
              entscheidet, ob der Zugang zum Partner Portal gewährt wird.
            </p>
          </div>

          {/* 8. What Data Is Stored */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>
              Welche Daten heute gespeichert werden
            </h2>
            <p className={BODY_TEXT}>
              Zusammengefasst gilt beim heutigen Stand dieser Website:
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>
                Ihre Cookie-Entscheidung wird ausschliesslich im lokalen
                Speicher Ihres eigenen Browsers gespeichert — nie auf unseren
                Servern.
              </li>
              <li>
                Wenn Sie Analyse-Cookies akzeptieren, werden Nutzungsdaten wie
                oben beschrieben von Google Analytics 4 bearbeitet.
              </li>
              <li>
                Es wird eine Newsletter-Ankündigung angezeigt, aber{" "}
                <strong>es ist kein Anmeldeformular aktiv</strong>, also{" "}
                <strong>
                  werden keine Newsletter-Daten erhoben, gespeichert oder
                  übermittelt
                </strong>{" "}
                (siehe „Newsletter“ oben).
              </li>
              <li>
                Anfragen über das Partner Portal werden wie oben beschrieben
                per E-Mail über Web3Forms an Devin Hauser gesendet. Die daraus
                entstehende E-Mail wird in unserem E-Mail-Konto gespeichert;
                die Anfrage wird in keinen E-Mail-Verteiler aufgenommen.
              </li>
              <li>
                Direkte E-Mails oder Instagram-Nachrichten, die Sie uns senden,
                werden in unserem jeweiligen E-Mail- bzw. Instagram-Konto
                gespeichert, wie bei jeder gewöhnlichen E-Mail oder
                Direktnachricht.
              </li>
              <li>
                Übliche technische Anfragedaten (IP-Adresse, Browser,
                Zeitstempel) werden von der Hosting-Infrastruktur vorübergehend
                bearbeitet, um Ihnen die Website auszuliefern, wie oben unter
                „Hosting“ beschrieben.
              </li>
            </ul>
          </div>

          {/* 9. Your Rights */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Ihre Rechte</h2>
            <p className={BODY_TEXT}>
              Je nachdem, wo Sie ansässig sind, gibt Ihnen das Datenschutzrecht
              (das Schweizer Bundesgesetz über den Datenschutz, DSG bzw.
              englisch FADP, und/oder die EU-Datenschutz-Grundverordnung,
              DSGVO, für Besucherinnen und Besucher in der EU/im EWR) die
              folgenden Rechte in Bezug auf Personendaten (nach DSGVO:
              personenbezogene Daten), die wir über Sie gespeichert haben:
            </p>
            <ul className={`${LIST} list-disc pl-5`}>
              <li>
                Auskunftsrecht — fragen, welche Daten wir über Sie
                gespeichert haben.
              </li>
              <li>
                Berichtigung — verlangen, dass wir unrichtige Daten
                korrigieren.
              </li>
              <li>Löschung — verlangen, dass wir Ihre Daten löschen.</li>
              <li>
                Einschränkung und Widerspruch — verlangen, dass wir bestimmte
                Bearbeitungen einschränken oder einstellen.
              </li>
              <li>
                Datenübertragbarkeit — Ihre Daten in einem nutzbaren Format
                erhalten.
              </li>
              <li>
                Einwilligung jederzeit widerrufen — zum Beispiel, indem Sie den
                Cookie-Banner wie oben beschrieben ablehnen oder zurücksetzen;
                die Rechtmässigkeit der Bearbeitung bis zum Widerruf bleibt
                davon unberührt.
              </li>
              <li>
                Beschwerde einreichen — beim Eidgenössischen Datenschutz- und
                Öffentlichkeitsbeauftragten (EDÖB, englisch FDPIC), wenn Sie
                sich in der Schweiz befinden, oder bei Ihrer örtlichen
                Datenschutzbehörde, wenn Sie sich in der EU/im EWR befinden.
              </li>
            </ul>
            <p className={BODY_TEXT}>
              Um eines dieser Rechte auszuüben, kontaktieren Sie uns über die
              unten stehenden Angaben.
            </p>
          </div>

          {/* 10. Data Security */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Datensicherheit</h2>
            <p className={BODY_TEXT}>
              Diese Website wird über HTTPS ausgeliefert. Übermittlungen aus
              dem Partner Portal werden über eine verschlüsselte Verbindung an
              Web3Forms gesendet und wie oben beschrieben per E-Mail an Devin
              Hauser weitergeleitet. Auf dieser Website ist derzeit kein
              Newsletter-Formular aktiv, es wird also nichts über ein solches
              übermittelt. E-Mails, die Sie direkt senden, und Nachrichten, die
              Sie über Instagram senden, werden von den jeweiligen Diensten
              nach deren eigenen Bedingungen übermittelt und gespeichert. Wo
              ein Dienst eines Drittanbieters auf diese Weise Daten bearbeitet,
              verlassen wir uns auf dessen technische und organisatorische
              Sicherheitsmassnahmen sowie auf unsere eigene Sorgfalt im Umgang
              mit den daraus entstehenden Nachrichten. Falls künftig weitere
              Formulare oder Dienste angebunden werden, wird diese
              Datenschutzerklärung entsprechend aktualisiert.
            </p>
          </div>

          {/* 11. Children */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Datenschutz für Kinder</h2>
            <p className={BODY_TEXT}>
              Diese Website richtet sich mit dem Thema Wettkampfsegeln an ein
              allgemeines Publikum und nicht an Kinder. Wir erheben wissentlich
              keine Personendaten von Kindern.
            </p>
          </div>

          {/* 12. Changes */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>
              Änderungen dieser Datenschutzerklärung
            </h2>
            <p className={BODY_TEXT}>
              Während sich die Website weiterentwickelt — zum Beispiel wenn ein
              Newsletter-Dienst eingeführt wird, wenn neue Analyse- oder
              Mediendienste hinzukommen oder wenn neue Formulare oder
              zusätzliche Funktionen des Partner Portals angebunden werden —,
              wird diese Datenschutzerklärung aktualisiert, damit sie den
              tatsächlichen, aktuellen Stand der Website wiedergibt, und das
              Datum „Zuletzt aktualisiert“ oben ändert sich entsprechend.
            </p>
          </div>

          {/* 13. Contact */}
          <div className={SECTION_WRAPPER}>
            <h2 className={SECTION_HEADING}>Kontakt aufnehmen</h2>
            <p className={BODY_TEXT}>
              Bei Fragen zu dieser Datenschutzerklärung oder zu Ihren Daten
              wenden Sie sich an:{" "}
              <a
                href="mailto:devinhauser9@gmail.com"
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                devinhauser9@gmail.com
              </a>
              . Die vollständigen rechtlichen Kontaktangaben finden Sie im{" "}
              <a
                href={localizedPath("/imprint", "de")}
                className="text-ink underline underline-offset-2 transition-colors hover:text-red"
              >
                Impressum
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
