# Pumpfoil-Lernseite — 02.10.2026

**Status: lokal vorbereitet auf Branch `prep/pumpfoil-lernen-2026-10-02`. Nicht gemergt, nicht gepusht, nicht deployt.**

## Ziel

Organische Suche für Menschen, die Pumpfoil lernen wollen und später vielleicht
Lektionen bei Devin nehmen möchten. Eine starke, hilfreiche Seite statt vieler
dünner Ortsseiten.

| | DE | EN |
|---|---|---|
| URL | `/pumpfoil` | `/en/pumpfoil` |
| Titel | Pumpfoil lernen: Der Einstieg für Anfänger \| Devin Hauser (57) | Learn to Pump Foil: A Beginner's Guide \| Devin Hauser (53) |
| Beschreibung | 153 Zeichen | 153 Zeichen |
| Canonical | selbstreferenzierend | selbstreferenzierend |
| hreflang | de, en, x-default → DE | de, en, x-default → DE |
| JSON-LD | Article, BreadcrumbList, FAQPage (4 von 6 Fragen) | dasselbe |
| Sitemap | `lastmod` 2026-10-02 (`PUMPFOIL_UPDATED`) | dasselbe |

## Inhalt

Was ist Pumpfoil · Was du mitbringen solltest · Die ersten Schritte (5) ·
Häufige Fehler (6) · Ausrüstung · Sicherheit · Lektionen bei mir (Stand) ·
Häufige Fragen (6) · Weiterführende Links. Dazu ein eigenes SVG-Schaubild
(`PumpfoilDiagram`), kein Foto.

**Interne Links neu:** Startseite («Über mich», eigene Zeile unter dem Text),
`/iqfoil` (Abschlussabschnitt, DE/EN), 404-Seite. Der Footer ist bewusst
unverändert, damit Galerie- und Albumseiten byte-gleich bleiben.

## Was die Seite bewusst nicht behauptet

- **Kein Kursort.** Weder der Wohnort (auf der Website nie genannt) noch
  Silvaplana (Trainingsrevier). Devin wird nach der Zielregion gefragt.
- **Keine Preise, Termine, Bewertungen, Öffnungszeiten.**
- **Keine Lehrqualifikation.** Im Vault ist keine abgeschlossene Ausbildung
  belegt; die Ausbildungsroadmap (Wassersportkurse 2027) ist eine Planung.
- **Kein Erfolgsversprechen, keine Lerndauer.**
- **Kein Course-, Event-, LocalBusiness-, Offer- oder Review-Markup.**
- **Keine Buchungsfunktion, kein Formular.** Nur ein `mailto:`-Link mit
  Betreff und drei Leitfragen (Region, Erfahrung, Zeitfenster).
- **Keine Antwortzusage, keine Warteliste** (Nachbesserung 02.10.2026). Es gibt
  noch kein System, mit dem Devin allen Interessenten später zuverlässig
  antworten kann. Die Seite sagt deshalb: Die E-Mail hilft, Interesse und
  Wunschregion einzuschätzen; sie ist keine Buchung und kein Platz auf einer
  Warteliste; sobald ein konkretes Angebot feststeht, wird **die Seite**
  aktualisiert. Ein Test verhindert, dass eine Zusage wie «melde ich mich»
  zurückkommt.
- **Keine Zahlen zu Material** (Flügelfläche, Mastlänge, Volumen).

`tests/pumpfoil.test.ts` prüft diese Punkte im Quelltext; die Gegenprobe
(Kursort, Preis, Course-Markup, Lerndauer und Antwortzusage absichtlich
eingesetzt) schlägt jeweils an.

## Belegt über Devin (und nur das steht auf der Seite)

- iQFOiL- und Wingfoil-Racer aus der Schweiz (Website, About).
- Fährt auch Pumpfoil (About: «Ob iQFOiL, Wingfoil, Windsurfen, Pumpfoil …»).
- Plant Lektionen (Auftrag 02.10.2026; Vault: Konzept «Wassersportkurse 2027»,
  Pilotplan — nichts davon öffentlich bestätigt).

## Offene Fakten — vor oder nach der Veröffentlichung zu klären

1. **Zielregion** für Lektionen (Frage an Devin läuft). Erst danach einen Ort nennen.
2. **Angebot:** Einzel/Kleingruppe, Dauer, Material inklusive, Mindestalter, Voraussetzungen.
3. **Preis** und Zahlungsweg.
4. **Versicherung/Haftpflicht** und **Bewilligung** am Gewässer.
5. **Startdatum.**
6. **Qualifikationen:** welche Kurse (z. B. SLRG, VDWS) abgeschlossen sind — heute keine belegt.
7. **Wortlaut bestätigen:** «Ich plane, Pumpfoil-Lektionen anzubieten». Die
   frühere Zusage «Sobald Ort, Termine und Preis feststehen, melde ich mich» ist
   am 02.10. entfernt worden; stattdessen: «Sobald ein konkretes Angebot
   feststeht, aktualisiere ich diese Seite.»
8. **Fachliche Durchsicht** der Technikabschnitte durch Devin (Fussposition, Dockstart).
9. **Bilder:** Die Pumpfoil-Serie von Lukas Pitsch ist laut Rechteübersicht vom
   28.08.2026 mündlich für die Website erlaubt, das Album bleibt aber
   zurückgehalten. Für eine Seite, die künftige Lektionen bewirbt, vorher
   schriftlich bestätigen lassen. Eigene Pumpfoil-Clips auf T7: Urheber offen.
10. **Kontaktadresse:** Gmail; eine Adresse unter der eigenen Domain ist Backlog.

## Search Console — Stand 02.10.2026

Keine Daten verfügbar, deshalb **keine Baseline**:

- `devinhauser.com`: kein `google-site-verification`-TXT im DNS (nur SPF).
- Repository: kein Verifizierungs-Meta-Tag, keine Verifizierungsdatei.
- Supermetrics-Verbindung «Google Search Console»: nicht angemeldet.
- Vault: Search Console «nicht als eingerichtet belegt».

Ob eine URL-Präfix-Property über ein anderes Verfahren existiert, ist **unbekannt**.

## Messliste (nach Veröffentlichung)

| Kennzahl | Wo | Baseline | Prüfen |
|---|---|---|---|
| Indexiert: `/pumpfoil`, `/en/pumpfoil` | GSC → URL-Prüfung, Bericht «Seiten» | **offen** (heute live 404, also nicht indexiert) | Woche 1, 4 |
| Sitemap gelesen, 44 URLs | GSC → Sitemaps | **offen** | Woche 1 |
| Impressionen der Seite | GSC → Leistung, Filter Seite enthält `/pumpfoil` | **offen** | Woche 4, 8, 12 |
| Klicks der Seite | wie oben | **offen** | Woche 4, 8, 12 |
| Suchanfragen, die die Seite auslösen | GSC → Leistung → Suchanfragen | **offen** | Woche 8, 12 |
| Echte Anfragen | E-Mails mit Betreff «Interesse an Pumpfoil-Lektionen» / «Interest in pump foil lessons», von Devin gezählt | **offen** (frühere direkte Fragen nicht gezählt) | monatlich |
| Seitenaufrufe (nur Hinweis) | GA4, nur mit Cookie-Zustimmung → zählt zu wenig | **offen** | monatlich |

Voraussetzung: Search Console einrichten (Domain-Property, DNS-TXT bei Hosttech),
Sitemap einreichen, beide URLs per URL-Prüfung zur Indexierung anmelden.

## Später, nur mit ausdrücklicher Freigabe

Merge nach `main` → Push (GitHub Desktop) → Vercel-Deployment → Live-Prüfung
`/pumpfoil`, `/en/pumpfoil`, Sitemap, Startseite, `/iqfoil` → Search Console.
