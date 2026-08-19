# SEO- und Media-Sprint — 10.08.2026

> **Historical audit from 10.08.2026. Domain decision superseded on 19.08.2026:
> canonical public domain is `https://www.devinhauser.com`.**
> Alle devinhauser.com-Nennungen unten sind der damalige Stand.

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

> ### 🔴 Nachtrag: Löschen entfernt die Datei nicht aus der Git-Historie
>
> Die Gegenprüfung hat gezeigt, dass meine eigene Massnahme nicht so weit
> reicht, wie der Commit-Text es nahelegt. Ein `git rm` entfernt die Datei aus
> dem Arbeitsverzeichnis und aus dem aktuellen Stand — **nicht** aus der
> Historie. Die Datei ist mit einem Befehl vollständig wiederherstellbar,
> EXIF-Vermerk inklusive:
>
> ```bash
> git show ef2ae78~1:public/images/highlights-iqfoil-cadiz.jpg > wieder-da.jpg
> ```
>
> Das Repository liegt öffentlich auf GitHub. Wer es klont oder geklont hat,
> hat die Datei.
>
> **Reihenfolge der Massnahmen — die erste ist die wichtige:**
>
> 1. **Branch deployen.** Damit verschwindet das Bild von der *Website*. Das
>    ist der Ort, an dem es tatsächlich ausgeliefert wird, und der Schritt,
>    der die Wirkung hat.
> 2. **Danach entscheiden**, ob die Historie bereinigt wird. Das ist ein
>    Eingriff mit Force-Push, der jede vorhandene Kopie des Repositories
>    ungültig macht, und deshalb ausdrücklich **nicht** über Nacht ohne
>    Rückfrage gemacht worden:
>    ```bash
>    pip install git-filter-repo
>    git filter-repo --path public/images/highlights-iqfoil-cadiz.jpg --invert-paths
>    git push --force origin main
>    ```
> 3. **Oder das Repository auf privat stellen** — der einfachere Weg, wenn es
>    ohnehin nicht öffentlich sein muss. Vercel funktioniert mit privaten
>    Repositories genauso.
>
> **→ Devin-Entscheid 8.**

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

### Kamera-Seriennummern in veröffentlichten Bildern

In vier öffentlich abrufbaren Dateien stehen Geräte-Seriennummern in den
EXIF-Daten: `DSCF0482.jpg`, `DSCF0515.jpg`, `hero-test-dscf0410.jpg` und
`og-image.jpg` (`BodySerialNumber: 9CQ07246`, `LensSerialNumber: 95A01562`).
**GPS-Daten wurden in keinem Bild gefunden** — das ist die wichtigere Prüfung,
und sie ist sauber.

Eine Seriennummer ist kein dramatisches Datenleck, aber sie verknüpft alle
Bilder derselben Kamera über Websites hinweg. Entfernen ist verlustfrei
möglich und dauert eine Minute — hier nicht gemacht, weil `exiftool` in dieser
Umgebung nicht verfügbar war:

```bash
brew install exiftool
exiftool -BodySerialNumber= -LensSerialNumber= -gps:all= -overwrite_original public/images/*.jpg
```

Das ändert nur die Web-Kopien im Repository, nie die Originale.

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
- **`AlbumGallery.tsx`** — Fokusfalle in der Lightbox.
- **Alle acht Unterseiten** — Titel ohne eigenes Markensuffix (siehe unten).

---

## Die Gegenprüfung — und was sie an mir gefunden hat

Drei unabhängige Prüfungen gegen den fertigen Branch: eine auf SEO, eine auf
Bildrechte und Privacy, eine als vier verschiedene Besucher (Sponsorin,
Journalist, 14-Jährige, Handy im Zug). Alle drei mit dem Auftrag zu widerlegen,
nicht zu bestätigen. Sie haben elf echte Fehler gefunden, davon fünf in Code,
den ich in derselben Nacht geschrieben hatte. Alle sind behoben; der Commit
`63a0e87` hält jeden einzeln fest. Die vier, die zählen:

> **Der Titel wäre auf jeder Unterseite doppelt gewesen.**
> Das neue Titel-Template hängt „| Devin Hauser" automatisch an. Alle acht
> Unterseiten hängten es zusätzlich selbst an — „Imprint | Devin Hauser |
> Devin Hauser", im Browser-Tab und in der Google-Ergebnisliste. Vier dieser
> Seiten waren vorher fehlerfrei; mein Branch hätte sie kaputt gemacht. Kein
> Build-Fehler hätte das gezeigt. Das ist die Art Fehler, die genau ein
> Zeichen von einer Verbesserung entfernt liegt.

> **Ein Albumtitel hätte Code auf der Seite ausführen können.**
> `JSON.stringify` maskiert `<` nicht. Eine Bildunterschrift mit `</script`
> hätte den Markup-Block beendet und den Rest als echtes HTML ins Dokument
> gestellt. Behoben mit `jsonLdHtml()`, geprüft mit einer präparierten
> Zeichenkette.

> **Das Rechtemodell schützte den Knopf, nicht das Bild.**
> `canDownload()` war korrekt. Aber Vorschaubild und Bildersuche-Markup
> wurden unabhängig von der Rechteklasse gesetzt — und beim Teilen eines Links
> legt jede Plattform eine eigene Kopie des Vorschaubilds an. Für fremdes
> Material war das genau der Fall, den das Modell verhindern soll.

> **Die Galerie wäre unauffindbar geblieben.**
> Indexierung und Sitemap schalteten beim ersten Album automatisch um. Die
> Navigation nicht — sie war eine feste Liste. Die ganze Media Library wäre
> gebaut, aber nirgends verlinkt gewesen.

Dazu, aus der Nutzerprüfung: **auf dem Handy gab es gar keine Navigation.** Die
Links liegen in einem Container, der unter 768 px versteckt ist, und ein
Burger-Menü existiert nicht. Auf einem Telefon blieb nur der Contact-Knopf —
und `/iqfoil` war damit überhaupt nicht erreichbar. Jetzt gibt es eine zweite,
horizontal scrollbare Zeile. Ohne JavaScript.

Die Nutzerprüfung hat zusätzlich zehn Punkte gefunden, die **nicht** aus diesem
Sprint stammen und die ich bewusst nicht angefasst habe — sie betreffen
bestehende Entscheidungen der Seite, nicht die Suchsichtbarkeit:

- Das „Partner Portal" verspricht Reichweitenzahlen und liefert ein Formular
  mit vier Feldern und dem Hinweis, dass jede Anfrage manuell geprüft wird.
  Eine Sponsorin mit 90 Sekunden füllt das nicht aus. **Irgendeine echte,
  nicht erfundene Zahl gehört öffentlich auf die Seite.**
- Die Kontaktadresse ist eine Gmail-Adresse auf einer eigenen Domain.
- „Let's Connect" ist der auffälligste Knopf der Seite und führt zur
  Sponsorenwand, nicht zu einem Kontaktweg.
- Die Vokabeln „Brand Visibility", „Content & Storytelling", „Product
  Integration", „Custom Partnerships" lesen sich wie ein Agentur-Menü. Wer
  schnell liest, liest nur Überschriften — und die sagen gerade nicht
  „Athlet".
- „Die vollständige Resultatliste wird intern geführt" ist eine Sackgasse ohne
  anklickbaren Anschluss.
- Ankernamen sind deutsch (`#ueber-mich`, `#kontakt`) auf einer sonst
  englischen Seite; sie werden in geteilten Links sichtbar.
- `text-graphite/60` und `/70` liegen unter der Kontrastgrenze und stehen
  ausgerechnet unter den Resultatzeilen und den Formularfeldern.
- Fokusrahmen sind nur auf einem Teil der Seite definiert.

Diese Liste ist der Ausgangspunkt für die nächste Runde, nicht für diese.

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
| 8 | **Browser-Tab-Titel auf einer Unterseite** — genau einmal „Devin Hauser" | `/imprint` |
| 9 | Handy-Navigation: zweite Zeile unter der Kopfzeile, scrollbar | 390 px |

Danach: die acht Entscheide unten, dann Merge und Deploy.

**Was in dieser Umgebung nicht geprüft werden konnte:** `npm run build`,
`npm run lint` und `tsc --noEmit` waren nicht ausführbar — die npm-Registry ist
hier vollständig blockiert (403 auf jedes Paket, auch `typescript` und `next`).
Ersatzweise geprüft wurde: die Rechtelogik mit 8 Zusicherungen und der Loader
gegen 8 präparierte Album-Dateien, beides direkt gegen die echten Quelldateien
ausgeführt; die JSON-LD-Maskierung mit 7 Zusicherungen; dazu eine statische
Prüfung über 21 geänderte Dateien (Klammerbilanz, jeder interne Link gegen die
tatsächlich existierenden Routen, jeder Sprunganker gegen die tatsächlich
vergebenen IDs, jeder Bildpfad gegen die Platte, keine Client-Komponente in
einer `node:fs`-Kette, GA4-ID und Web3Forms-Key unverändert). **Ergebnis: keine
Befunde.** Der erste echte Build ist trotzdem Schritt eins am Morgen — eine
statische Prüfung ersetzt keinen Compiler.

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
| **8** | **Git-Historie: das Cádiz-Bild bereinigen, Repository auf privat stellen — oder so lassen?** | zuerst deployen (das nimmt es von der Website), dann in Ruhe entscheiden |

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
