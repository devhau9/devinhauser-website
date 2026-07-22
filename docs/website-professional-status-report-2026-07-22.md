# Website Professional Status Report — 22.07.2026

**Projekt:** devinhauser-website (Next.js 14 App Router)
**Umfang dieses Berichts:** Vollständiger Audit (Code, SEO, Datenschutz, Sponsoren-Perspektive) + Analytics-Event-Konzept. Reine Analyse-Session — es wurden keine Design- oder Text-Änderungen vorgenommen, ausser den in früheren Sessions bereits umgesetzten und bestätigten Punkten (Cookie-Consent-System, Privacy Policy, Imprint/Copyright, SEO-Metadata, Sitemap/Robots/Manifest/Favicon).

---

## 1. Aktueller Stand

Die Website ist eine One-Page-Hauptseite (Hero → About → Disciplines → Road to Olympic Games → Results → Media & Content → Sponsoring → Partners → Contact → Newsletter) plus vier Unterseiten (Privacy Policy, Imprint, Copyright, Partner Portal). Technisch ist das Fundament solide: sauberes Next.js-App-Router-Setup, funktionierendes Cookie-Consent-System, vollständige rechtliche Basisseiten, korrekte SEO-Metadata. Inhaltlich bestehen aber noch mehrere **sichtbare Platzhalter genau in den Bereichen, die für Sponsoren am wichtigsten sind** (Resultate, Sponsoring-Pakete) — dazu mehr in Abschnitt 4.

`Website Status.md` existiert weiterhin nicht im Projekt (weder im Root noch unter `docs/`) — wie gewünscht wurde sie in dieser Session nicht automatisch angelegt, sondern hier nur gemeldet.

---

## 2. Bereits erledigt

- Cookie-Consent-Banner (`CookieConsent.tsx`) mit Akzeptieren/Ablehnen, Entscheidung wird in `localStorage` gespeichert
- Google Analytics 4 (`GoogleAnalytics.tsx`) lädt nachweislich erst nach aktiver Zustimmung
- Geteilte Consent-Logik in `src/lib/cookie-consent.ts` sauber ausgelagert
- Privacy Policy vollständig auf Englisch, deckt GA4, Cookies, Newsletter, Kontakt, Partner Portal, Hosting, gespeicherte Daten und Nutzerrechte ab — beschreibt bewusst den *tatsächlichen* aktuellen Stand (z. B. „Newsletter aktuell nicht angebunden"), nicht einen Wunschzustand
- Imprint professionell nach Schweizer Vorgaben strukturiert (Adresse als `[BITTE ERGÄNZEN]` markiert, keine Angaben erfunden)
- Copyright-Seite mit Bildrechten, Partner-Logo-Nutzung und Presseanfragen-Hinweis ausgebaut
- SEO-Metadata in `layout.tsx`: Open Graph, Twitter Card, Canonical URLs (Root + 4 Unterseiten), Keywords, Author, robots-Direktiven
- `src/app/sitemap.ts` und `src/app/robots.ts` nach Next.js-Best-Practice
- `src/app/manifest.ts` (Web App Manifest) neu angelegt
- Favicon/Icon-Set (`favicon.ico`, `icon.png`, `apple-icon.png`) und ein dediziertes 1200×630-OG-Bild — als technischer Platzhalter aus dem bestehenden „DH"-Markenzeichen bzw. einem echten Hero-Foto erzeugt, bis ein finales Icon-Design vorliegt

---

## 3. Funktioniert (technisch verifiziert in dieser Session)

- **TypeScript:** `npx tsc --noEmit` läuft komplett fehlerfrei
- **Client/Server-Components:** korrekt aufgeteilt — `layout.tsx` bleibt Server Component, `GoogleAnalytics.tsx` und `CookieConsent.tsx` sind explizit `"use client"`, keine Vermischung
- **Hydration:** kein Risiko gefunden — beide Client-Komponenten rendern serverseitig und beim ersten Client-Render bewusst `null`, der eigentliche Zustand wird erst nach dem ersten `useEffect` gesetzt (Standard-Next.js-Pattern, kein Mismatch)
- **Cookie-Gate bestätigt:** Vor einer gespeicherten Zustimmung wird **kein einziges** Google-Script eingebunden (auch nicht das reine `gtag.js`) — der `<Script>`-Block wird komplett übersprungen, nicht nur „deaktiviert"
- **Sicherheit:** keine Secrets im Code, alle externen Links konsequent mit `rel="noopener noreferrer"`, kein `dangerouslySetInnerHTML` mit dynamischen/nutzergesteuerten Daten, Partner-Portal-Seite korrekt auf `noindex` (aber crawlbar) gesetzt
- **`npm run build` konnte in dieser Sandbox nicht final verifiziert werden** — siehe Abschnitt 4, technische Hygiene. Bitte einmal selbst lokal am Mac ausführen, um das abschliessend zu bestätigen.

---

## 4. Offene Punkte

### A. Rechtlich — blockierend für eine Live-Schaltung
- **Imprint:** echte Adresse (Strasse, PLZ/Ort) fehlt noch, aktuell `[BITTE ERGÄNZEN]`. In diesem Zustand ist die Seite **nicht gesetzeskonform veröffentlichbar** (Art. 3 lit. s UWG verlangt eine ladungsfähige Adresse).
- **Privacy Policy:** Hosting-Provider und GA4-Datenaufbewahrungsdauer sind mit `[PRÜFEN]` markiert und sollten vor Launch final bestätigt werden.

### B. Sponsoring-Content — wichtigster inhaltlicher Punkt
- Die **Resultate-Sektion** (`Highlights.tsx`) zeigt aktuell **wörtlich sichtbaren** Platzhaltertext für jeden Website-Besucher: „Platzhalter-Wettkampf 1–4", „Platz [X] von [Y]", Jahr „20XX", plus den Satz „Platzhalter: Die verifizierte Resultat-Datenbank wird aus Kapitel 6 der Wissensdatenbank übernommen…" direkt im Frontend.
- Die **Sponsoring-Sektion** — inhaltlich die wichtigste Sektion der ganzen Seite für das eigentliche Website-Ziel — zeigt ebenfalls wörtlichen deutschen Platzhaltertext live im Frontend: „Platzhalter: Kernargumente, warum eine Partnerschaft mit Devin attraktiv ist…". Alle drei Pakete (Bronze/Silber/Gold) haben Platzhalter-Preise („Platzhalter CHF") und Platzhalter-Leistungen.
- Das Sponsoring-Dossier-PDF existiert nicht (Button ist korrekt als „folgt" deaktiviert — ehrlich gelöst, wirkt aber für Besucher unfertig).
- Die Contact-Sektion ist komplett auf Deutsch, während der Rest der Seite auf Englisch ist — Bruch für internationale Sponsoren/Medien.
- Die Kontakt-E-Mail ist weiterhin die private Gmail-Adresse (im Code selbst bereits als „vorläufig" markiert).

*(Ausführliche Sponsoren-Perspektive siehe Anhang A.)*

### C. SEO
- **Google Search Console** ist noch nicht eingerichtet — das kann ich nicht für dich vorbereiten, ohne erfundene Daten einzusetzen: du müsstest selbst ein GSC-Property anlegen (empfohlen: Domain-Property mit DNS-TXT-Verifizierung bei Hosttech, alternativ HTML-Meta-Tag-Verifizierung, dessen Code du mir dann geben kannst).
- Favicon/Sitemap/Manifest sind technisch angelegt, aber **nicht visuell im Browser verifiziert** (Build-Limitierung, siehe Punkt D).
- `<html lang="de">` in `layout.tsx`, obwohl die meisten Sektionen auf Englisch sind — SEO-technisch ein leichter Widerspruch, sollte projektweit einmal bewusst entschieden werden (Englisch vs. Deutsch vs. zweisprachig).

### D. Datenschutz-Details
- Kein „Cookie-Einstellungen ändern"-Link nach der ersten Entscheidung — aktuell nur über die Browser-Einstellungen zurücksetzbar. In der Privacy Policy bereits transparent so dokumentiert.
- Newsletter- und Partner-Portal-Formulare haben noch keine DSGVO-Checkbox/keinen Datenschutzhinweis direkt am Formular. Aktuell unkritisch, da beide Formulare technisch inert sind (nichts wird gespeichert/übertragen) — wird relevant, sobald sie angebunden werden.

### E. Technische Hygiene / Performance
- **~84 MB ungenutzte Bilddateien** liegen im deployten `public/`-Ordner (werden mitausgeliefert, obwohl im Code nirgends referenziert):
  `DSCF0940.jpg` (12.5 MB), `DSCF0941.jpg` (13 MB), `SWS_Sui134.jpg` (1.4 MB), `hero-iqfoil-silvaplana.jpg` (6.4 MB — durch das Test-Hero-Bild ersetzt), und vor allem `wingfoil cremia IT.jpg` (**50.7 MB**, unbenutztes Duplikat des tatsächlich verwendeten `wingfoil-action-cremia.jpg`).
- `PlaceholderMedia.tsx` wird nirgends mehr importiert — toter Code (verifiziert per Referenzsuche über alle Komponenten).
- `public/logos/swiss-sailing.jpg` wird nicht mehr referenziert (ersetzt durch `sui-sailing.png`).
- Kein ESLint-Setup vorhanden — `next lint` fragt beim ersten Aufruf interaktiv nach einer Konfiguration.
- **`npm run build` liess sich in dieser Cowork-Sandbox nicht verifizieren:** `node_modules` enthält nur die für macOS (arm64) kompilierten Next.js-Binärdateien, die Gerätebrücke führt Befehle aber in einer Linux-Umgebung aus. Das ist eine reine Umgebungs-Einschränkung dieser Session, kein Code-Problem. Bitte einmal selbst in einem normalen Terminal auf deinem Mac `npm run build` ausführen, um das final zu bestätigen.

---

## 5. Empfohlene nächste Schritte

1. **Imprint-Adresse ergänzen** — ohne das ist die Seite rechtlich nicht live-schaltbar.
2. **Resultate- und Sponsoring-Platzhaltertexte durch echte Inhalte ersetzen** — höchste Priorität für das eigentliche Ziel „Sponsoren gewinnen", da aktuell sichtbarer Platzhaltertext live ist.
3. **`npm run build` selbst am Mac verifizieren** (Terminal, ausserhalb dieser Sandbox).
4. **Google Search Console einrichten** (dein eigenes Google-Konto nötig) und mir bei Bedarf den Verifizierungscode geben.
5. Contact-Sektion ins Englische übersetzen, professionelle `@devinhauser.com`-E-Mail einrichten, sobald verfügbar.
6. Ungenutzte Bilddateien (~84 MB) und `PlaceholderMedia.tsx` bereinigen (sicherer, risikoarmer Aufräum-Task für eine der nächsten Sessions).
7. Analytics-Event-Tracking gemäss Konzept in Anhang B umsetzen, sobald du grünes Licht gibst.

---

## 6. Prioritäten-Roadmap

**HIGH**
- Imprint-Adresse ergänzen (rechtlich blockierend)
- Platzhaltertexte in Resultate- und Sponsoring-Sektion ersetzen (sichtbar für jeden Besucher, zentral für Sponsoring-Ziel)
- `npm run build` selbst am Mac verifizieren

**MEDIUM**
- Google Search Console einrichten
- Contact-Sektion ins Englische übersetzen + professionelle E-Mail-Adresse
- Sponsoring-Dossier-PDF erstellen und Button aktivieren
- Ungenutzte Bilddateien (~84 MB) und toten Code (`PlaceholderMedia.tsx`) bereinigen
- DSGVO-Checkbox bei Newsletter/Partner-Portal-Formularen ergänzen (spätestens vor Anbindung an echten Backend/Anbieter)
- „Cookie-Einstellungen ändern"-Link im Footer ergänzen
- Sprachstrategie der Seite (DE/EN) einmal bewusst entscheiden und `html lang` entsprechend setzen

**LOW**
- Ungenutztes Logo (`swiss-sailing.jpg`) entfernen
- ESLint-Konfiguration einrichten
- OG-`locale`-Feld und Twitter-Handle ergänzen, sobald ein offizieller X/Twitter-Account existiert
- Favicon/Icon-Set ggf. später durch ein finales Icon-Design ersetzen (aktueller Stand ist ein sauberer, aber einfacher Platzhalter)

---

## Anhang A — Sponsoren-Perspektive (Phase 3, Detailanalyse)

Bewertet aus Sicht eines Sponsors, der die Seite zum ersten Mal besucht — keine Textänderungen vorgenommen, nur Beobachtungen:

**„Wer ist Devin?"** — wird schnell beantwortet: Hero (Name, Disziplin, Segelnummer) direkt gefolgt von einer ausführlichen About-Sektion mit Steckbrief (Nationalität, Alter, Grösse/Gewicht, Standort, Verein). Funktioniert gut.

**„Was sind die Resultate?"** — die Results-Sektion existiert an sinnvoller Position (nach Disciplines/Goals), zeigt aber aktuell ausschliesslich Platzhalterdaten. Für einen Sponsor, der genau diese Frage stellt, ist das aktuell die grösste Lücke der ganzen Seite.

**„Warum lohnt sich eine Partnerschaft?"** — die Sponsoring-Sektion ist strukturell gut angelegt (drei Pakete, klare Sektion), aber inhaltlich komplett offen (Platzhalter-Preise/-Leistungen, sogar der Einleitungstext ist noch als „Platzhalter: Kernargumente…" sichtbar). Das ist die für einen Sponsor entscheidendste Sektion der Seite und aktuell die am wenigsten fertige.

**„Wie kann man Kontakt aufnehmen?"** — funktioniert (mailto-Link, Instagram, Partner-Portal-Link), wirkt aber durch die deutschsprachige Sektion und die private Gmail-Adresse noch nicht ganz auf dem professionellen Niveau des restlichen Auftritts.

**Weitere Beobachtung:** Die bewusste Entscheidung, keine Reichweiten-/Follower-Zahlen öffentlich zu zeigen und stattdessen aufs Partner Portal zu verweisen, ist strategisch nachvollziehbar (schützt Daten, filtert ernsthafte Anfragen) — sollte aber eine bewusste Entscheidung sein und keine zufällige Lücke. Falls gewünscht, kann das in einer künftigen Session hinterfragt werden.

---

## Anhang B — Analytics-Event-Konzept (Phase 4, noch kein Code)

GA4-Empfehlung: verwandte Aktionen als **ein** Event mit unterscheidendem Parameter statt vieler einzelner Event-Namen (z. B. ein `social_click`-Event mit `platform`-Parameter statt drei separaten Instagram/TikTok/YouTube-Events) — hält den GA4-Events-Report übersichtlich und lässt sich trotzdem sauber nach Plattform aufschlüsseln.

| Event-Name | Zweck | Warum wichtig für Sponsoren |
|---|---|---|
| `contact_button_click` | Klick auf den primären Kontakt-/„Let's Connect"-CTA (Hero + Contact) | Direkter Indikator für Kontaktbereitschaft von Besuchern |
| `email_click` | Klick auf einen `mailto:`-Link (Contact, Sponsoring-CTA, Footer) | Zentraler Anfrage-Kanal, solange kein Formular existiert |
| `social_click` (Parameter: `platform` = instagram/tiktok/youtube) | Klick auf einen Social-Media-Kanal | Zeigt Reichweiten-Interesse als Hinweis auf Engagement-Potenzial |
| `partner_link_click` (Parameter: `partner_name`) | Klick auf ein bestehendes Partner-Logo | Sozialer Beweis / Cross-Traffic-Indikator für neue Sponsoren |
| `sponsoring_cta_click` | Klick auf „Partnerschaft anfragen" | Direktester Conversion-Punkt der gesamten Seite |
| `partner_portal_open` | Klick auf einen „Partner Portal"-Link | Zeigt vertieftes Interesse über die öffentliche Seite hinaus |
| `newsletter_signup` | Erfolgreiches Absenden des Newsletter-Formulars (erst relevant nach Anbindung) | Community-Wachstum als Reichweiten-Kennzahl |
| `file_download` (Parameter: `file_name`) | Download des Sponsoring-Dossiers (sobald vorhanden) | Warmer Lead-Indikator — wer das PDF lädt, hat konkretes Interesse |

Umsetzung erst nach deiner Freigabe, wie ursprünglich vereinbart.
