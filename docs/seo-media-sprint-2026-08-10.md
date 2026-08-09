# SEO- und Media-Sprint — 10.08.2026

Branch: `seo-media-growth-2026-08-10` · Basis: `a5a12e0` auf `main`
**Nichts wurde deployed. Nichts wurde nach `main` gemerged. Nichts wurde versendet.**

---

## Der eine Befund, der alles andere überlagert

> ### 🔴 Ein Bild mit fremdem Copyright-Vermerk lag öffentlich auf der Website
>
> `public/images/highlights-iqfoil-cadiz.jpg` — ausgeliefert in der
> Results-Sektion — trägt in den EXIF-Daten:
>
> ```
> Artist    : SAILING ENERGY
> Copyright : © Sailing Energy /  iQF…
> ```
>
> SailingEnergy-Material ist im Vault durchgehend und ausdrücklich als **nicht
> freigegeben** geführt. Die Datei war unter einer stabilen URL öffentlich
> abrufbar.
>
> **Auf diesem Branch entfernt** — Datei gelöscht, Einbindung entfernt, die
> Results-Sektion läuft jetzt einspaltig. Das ist die einzige Änderung dieses
> Sprints, die ich ohne Rückfrage gemacht habe, weil Abwarten das Risiko
> verlängert hätte.

### Zwei weitere Bilder mit Hinweis auf Fremdherkunft — Entscheid nötig

| Datei | EXIF | Status |
|---|---|---|
| `iqfoil-action.jpg` | Canon EOS R6m2 · `Software: PhotoShelter` · 02.09.2024 | **in Verwendung** (Disciplines/IQFoil) |
| `hero-iqfoil-silvaplana.jpg` | Canon EOS R6m2 · `Software: PhotoShelter` · 02.09.2024 | unbenutzt, aber öffentlich abrufbar |

PhotoShelter ist eine professionelle Bildauslieferungsplattform; beide Dateien
stammen aus derselben Serie, zwei Sekunden auseinander. Das ist ein **Indiz**,
kein Beweis — deshalb unverändert gelassen. Anders als bei der Cádiz-Datei
steht in den Metadaten kein fremder Copyright-Vermerk.
**→ Devin-Entscheid 1.**

Ebenfalls unbenutzt und trotzdem öffentlich abrufbar: `social-portrait-square.jpg`
(1,4 MB) und `wingfoil-action-cremia.jpg` (14,1 MB, Sony ILCE-7M3). Alles in
`public/` ist per URL erreichbar, auch wenn es nirgends eingebunden ist.

---

## Suchsichtbarkeit — Erhebung 10.08.2026

Zehn Abfragen geprüft. **Das Ergebnis ist unbequem und eindeutig.**

| Abfrage | Erscheint devinhauser.com? |
|---|---|
| Devin Hauser | **nein** — Seite 1 besteht vollständig aus Namensvettern |
| Devin Hauser IQFoil | **nein** — Platz 1 und 2 sind seine eigenen TikToks |
| Devin Hauser Wingfoil | **nein** — GWA und ENSIS ranken, die Website nicht |
| Devin Hauser Switzerland | **nein** |
| Devin Hauser SUI-134 | **nein — aber `devinhauser.ch` auf Platz 1, 2 und 3** |
| Swiss IQFoil athlete | nein (Verbände, Magazine, Wikipedia) |
| IQFoil Switzerland | nein (Hersteller, Klasse, Verband) |
| IQFoil Silvaplana | nein (zu 100 % offizielle Klassen- und Event-Sites) |
| What is IQFoil | nein (RYA, IOC, Starboard, US Sailing, Wikipedia) |
| IQFoil | nein (Wikipedia in 5 von 9 Treffern) |

**Drei harte Fakten:**

1. **Der Index-Eintrag ist falsch.** `site:devinhauser.com` liefert **genau eine
   URL**, und zwar mit dem Titel **„Devin Hauser Web Development Portfolio"** —
   ein Titel aus einer früheren Belegung der Domain. Live ausgeliefert wird
   „Devin Hauser | Swiss IQFoil & Wingfoil Racing Athlete". Google hat die
   aktuelle Seite also noch nie richtig erfasst.
2. **Die `.ch` gewinnt gegen die `.com`.** Drei indexierte URLs
   (`/`, `/meine-ziele`, `/impressum`), zusätzlich gemischt als `http`, `https`,
   mit und ohne `www`. Titelschema „Devin Hauser (SUI-134) | …".
3. **Es wurde kein einziger externer Link auf devinhauser.com gefunden.** ENSIS
   verlinkt `http://www.devinhauser.ch/`. Die GWA verlinkt gar keine Website.

**Was daraus folgt:** Das Problem ist nicht die Optimierung der Seite. Das
Problem ist, dass Google diese Seite praktisch nicht kennt. `robots.txt` erlaubt
alles, die Seite ist technisch sauber — es fehlen **Indexierungsanstoss, Links
und Unterseiten**.

### Realistische Erwartung

| Stufe | Ziel | Einschätzung |
|---|---|---|
| 1 | Google versteht devinhauser.com als offizielle Seite von Devin Hauser | erreichbar, Wochen |
| 2 | Sichtbarkeit bei Namens- und SUI-134-Suchen | erreichbar, Monate |
| 3 | Long-Tail-Impressionen zu IQFoil/Silvaplana | plausibel, Monate bis Jahre |
| 4 | Nennenswerter nicht-markenbezogener Traffic | offen |

**Nicht erreichbar und deshalb kein Ziel:** Platz 1 für „IQFoil" oder
„what is IQFoil". Diese Ergebnisseiten gehören Wikipedia, dem IOC, nationalen
Verbänden und dem Hersteller. Eine Athletenseite rankt dort in keiner der
geprüften Varianten — von niemandem.

---

## Was auf diesem Branch geändert wurde

### Neu

| Datei | Zweck |
|---|---|
| `src/lib/site.ts` | eine Quelle für Domain, Titel, Profile, Person-/WebSite-Markup |
| `src/lib/album-types.ts` | Typen der Media Library, ohne Node-Abhängigkeit |
| `src/lib/albums.ts` | Laden der Alben + **Rechtemodell** |
| `src/app/iqfoil/page.tsx` | Evergreen-Erklärseite mit Quellenangaben und FAQ |
| `src/app/media/page.tsx` | Galerie-Übersicht (leerer Zustand, `noindex`) |
| `src/app/media/[slug]/page.tsx` | Album-Seite mit Lightbox und Download-Steuerung |
| `src/components/AlbumGallery.tsx` | Galerie + Lightbox (Tastatur, Reduced Motion) |
| `src/app/not-found.tsx` | brauchbare 404-Seite |
| `content/albums/` | Album-Ablage, Vorlage, README |
| `docs/media-library.md` | Anleitung inkl. Rechte-, Export- und Namens-SOP |

### Geändert

- **`layout.tsx`** — Konstanten aus `lib/site`, Titel-Template, `WebSite`-Markup
  ergänzt, `Person`-Markup erweitert (Bild, Wohnort, `alternateName: SUI-134`,
  verknüpfbare `@id`), Skip-Link für Tastaturnutzer.
- **`page.tsx`** — `ProfilePage`-Markup, interner Einstieg zur IQFoil-Seite.
- **`sitemap.ts`** — nutzt `lib/site`, nimmt `/iqfoil` und künftige Alben auf,
  und setzt **kein `new Date()` mehr**: Ein bei jedem Build neu gesetztes
  Änderungsdatum behauptet gegenüber Google, dass sich bei jedem Deploy alles
  geändert hat. Das entwertet das Signal.
- **`robots.ts`** — nutzt `lib/site`. Verhalten unverändert.
- **`next.config.mjs`** — AVIF/WebP, `poweredByHeader: false`.
- **`Navigation.tsx`** — Anker sind root-relativ (`/#…`). **Das war ein echter
  Fehler:** Von `/imprint` aus zeigte `#ueber-mich` ins Leere, und mit den neuen
  Unterseiten wäre das flächendeckend gewesen. Dazu: „IQFoil" ergänzt,
  „Gallery" → „Social" (der Link führte zur Social-Media-Sektion, nicht zu Bildern).
- **`About.tsx`** — „Age: 18" → „Born: 2007". Wird am 16.11.2026 sonst falsch.
- **`Goals.tsx`** — `priority` entfernt. Zwei priorisierte Bilder konkurrieren
  beim Seitenaufbau; das untere lag weit unterhalb des ersten Bildschirms und
  verschlechterte damit genau die Kennzahl, die das Hero-Bild verbessern soll.
- **`Highlights.tsx`** — SailingEnergy-Bild entfernt (siehe oben).

---

## Was NICHT geändert wurde — und warum

- **Die Resultate.** Die Zeilen „Wingfoil World Championship 2020 · Men" und
  „2021 · U16" tragen zusammen die Kennzahl „2 World Championship Top-5
  Finishes" und stehen in „5 World Championship Starts". Die externe Prüfung vom
  09.08.2026 hat ergeben, dass 2020 keine Wingfoil-WM stattfand. **Das bleibt
  unangetastet** — eine Korrektur zu erfinden wäre schlimmer als der Fehler.
  → **Devin-Entscheid 2.**
- **Die Domainform.** Der Code kanonisiert auf `https://devinhauser.com` ohne
  `www`. Ob die Produktion auf `www` weiterleitet, liess sich von hier aus nicht
  messen. Ein Wechsel wäre eine Zeile in `lib/site.ts` — aber nicht ungeprüft.
- **Kein DNS, kein Registrar, kein Redirect der `.ch`.** Ausserhalb des
  Repositories.
- **Keine Neugestaltung.** Keine Farben, keine Schriften, kein Layout ausser dort,
  wo ein entferntes Bild eine Spalte hinterlassen hat.

---

## Morgen-Review — unter 15 Minuten

```bash
git checkout seo-media-growth-2026-08-10
npm install
npm run build      # muss fehlerfrei durchlaufen
npm run dev
```

| # | Prüfen | Wo |
|---|---|---|
| 1 | Startseite unverändert, neuer IQFoil-Einstieg sitzt gut | `/` |
| 2 | Results-Sektion ohne Bild — passt das so? | `/#highlights` |
| 3 | Die neue Erklärseite lesen | `/iqfoil` |
| 4 | Galerie im leeren Zustand | `/media` |
| 5 | Navigation von einer Unterseite aus testen | `/iqfoil` → „About" |
| 6 | Mobil durchscrollen (Gerät oder 390 px) | alles |
| 7 | 404 prüfen | `/gibtsnicht` |

Danach: die sieben Entscheide unten, dann Merge und Deploy.

---

## Sieben Entscheidungen, die nur Devin treffen kann

| # | Entscheidung | Empfehlung |
|---|---|---|
| **1** | `iqfoil-action.jpg` und `hero-iqfoil-silvaplana.jpg` (PhotoShelter-Herkunft) — wer hat sie aufgenommen, und darf die Seite sie zeigen? | klären; bis dahin nichts weiterverbreiten |
| **2** | Die beiden Wingfoil-WM-Zeilen und die Kennzahl „2 World Championship Top-5" — präzisieren, ersetzen oder streichen? | vor dem ersten Sponsorenversand entscheiden |
| **3** | `devinhauser.ch`: dauerhaft auf `.com` weiterleiten? | ja — sie rankt für den eigenen Namen besser als die `.com` |
| **4** | Kanonische Domainform: mit oder ohne `www`? | die Form nehmen, die der Server ohnehin ausliefert |
| **5** | Erstes Album: welches Material ist **von Devin selbst** und darf heruntergeladen werden? | ein Album reicht, um `/media` scharf zu schalten |
| **6** | Download-Bedingungen für eigene Bilder: „frei für privaten Gebrauch mit Credit, kommerziell auf Anfrage"? | ja — steht so im Code, muss aber freigegeben werden |
| **7** | Newsletter — bleibt „coming soon"? | ja, bis zehn YouTube-Videos veröffentlicht sind |

---

## Sofortmassnahmen ausserhalb des Codes

**Google Search Console** — im Repository ist **keine** Verifikation auffindbar
(kein `google-site-verification`-Tag, keine Verifikationsdatei in `public/`).
Falls noch nicht eingerichtet, in dieser Reihenfolge:

1. `search.google.com/search-console` → Property **URL-Präfix**, exakt die Form,
   die der Server ausliefert.
2. Verifizieren — am einfachsten über den bestehenden GA4-Tag (`G-MFEECDJCEF`)
   oder eine HTML-Datei in `public/`.
3. Sitemap einreichen: `sitemap.xml`
4. **URL-Prüfung für `/`** → „Indexierung beantragen". Das ist der wichtigste
   einzelne Klick der ganzen Liste — er ersetzt den falschen Index-Eintrag
   „Devin Hauser Web Development Portfolio".
5. Dasselbe für `/iqfoil`.
6. Nach einer Woche: Leistungsbericht → erscheinen Namensabfragen?

**Bing Webmaster Tools** lohnt sich nur wegen des Imports: Konto anlegen, Search
Console importieren, fertig. Zehn Minuten, kein Projekt.

---

## Backlinks — fünf echte Gelegenheiten, keine Kampagne

| # | Wer | Ist-Zustand | Ziel | Wer entscheidet |
|---|---|---|---|---|
| 1 | **ENSIS** | verlinkt `http://www.devinhauser.ch/`, Alter „19" | `https://devinhauser.com`, Jahrgang statt Alter | ENSIS-Team |
| 2 | **GWA Wingfoil World Tour** | Athletenprofil ohne Website-Link | Website ergänzen lassen | GWA |
| 3 | **Swiss Sailing / Swiss Sailing Team** | Devin auf der iQFoil-Klassenseite nicht genannt | Athletenlink | Verband |
| 4 | **Sailing News** | nennt ihn namentlich in Berichten, ohne Link | bei künftigen Berichten Website nennen | Redaktion |
| 5 | **Partnerseiten** (Fanagus, Drei Plus, Weidli u. a.) | teilweise Logos ohne Rückverlinkung | Link auf devinhauser.com | jeweilige Firma |

Fertiger Text für 1 (**nicht versendet**):

> Hoi zusammen
> Zwei Kleinigkeiten zu meiner Athletenseite bei euch, wenn ihr mal Zeit habt:
> Beim Alter steht 19 — ich bin Jahrgang 2007. Am besten schreibt ihr einfach
> „Jahrgang 2007", dann stimmt es auch nächstes Jahr noch. Und als Website ist
> devinhauser.ch verlinkt; meine aktuelle Seite ist **devinhauser.com**.
> Würdet ihr den Link umhängen? Danke euch und liebe Grüsse, Devin

---

## Suchanfrage → beste Seite

| Abfrage | Beste Seite | Zustand |
|---|---|---|
| Devin Hauser | `/` | vorhanden, nicht indexiert |
| Devin Hauser IQFoil / Wingfoil | `/` | vorhanden |
| Devin Hauser SUI-134 | `/` | vorhanden — `SUI-134` jetzt auch im Markup |
| Swiss IQFoil athlete | `/` | vorhanden |
| What is IQFoil / IQFoil explained | `/iqfoil` | **neu** |
| IQFoil equipment / board / sail size | `/iqfoil` | **neu** |
| IQFoil race formats / slalom vs course racing | `/iqfoil` | **neu** |
| How fast is IQFoil | `/iqfoil` | **neu** |
| IQFoil Silvaplana | `/iqfoil` (Abschnitt) | **neu** — bewusst keine eigene Seite |
| Photos from \<Event\> | `/media/<slug>` | Gerüst steht, Album fehlt |

Eine Abfrage, eine Seite. Keine zweite Seite zum selben Thema.

---

## Nicht bauen

Benutzerkonten · Likes und Kommentare · Social-Feed-Klon · CMS · App ·
Mitgliedschaften · Forum · Shop · Newsletter-System · Volltextsuche · Chatbot ·
eigene Silvaplana-Landingpage (die Ergebnisseite gehört zu 100 % offiziellen
Klassen- und Event-Sites — eine dünne Seite dagegen wäre verschenkte Mühe und
würde interne Verlinkung verwässern) · Stories-/Blog-Bereich, solange keine zehn
Beiträge realistisch sind.

---

## 90 Tage

**August** — Branch prüfen und deployen · Search Console einrichten und
Indexierung beantragen · ENSIS-Link korrigieren lassen.
**September** — `.ch` weiterleiten · erstes echtes Album veröffentlichen ·
Resultatfrage entscheiden und umsetzen.
**Oktober** — zweites Album aus einer Wettkampfwoche · eine zweite
Inhaltsseite, falls die erste Wirkung zeigt · erste Auswertung in der Search
Console.

**Danach höchstens fünf weitere Inhalte, nach Wirkung sortiert:**
IQFoil-Ausrüstung im Detail · ein Renntag von innen · Wingfoil vs IQFoil ·
Training im Engadin · ein Album je grösserem Event.

## Acht Kennzahlen, monatlich, fünfzehn Minuten

Klicks aus der Suche · Klicks auf Namensabfragen · Impressionen ohne
Markenbezug · indexierte Seiten · Besuche auf Albumseiten · Downloads ·
Kontaktanfragen · Core Web Vitals. Mehr nicht, und kein tägliches
Positions-Nachschauen.
