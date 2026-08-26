# Performance-Prüfung 26.08.2026

Geprüft gegen die **Live-Seite** `https://www.devinhauser.com`, Stand
`ee66e9c`.

---

## Zuerst das Unangenehme: Lighthouse konnte ich nicht fahren

Die verlangte Tabelle mit LCP, CLS, INP und Total Blocking Time **kann ich
nicht liefern**. Vier Wege, alle versperrt:

| Weg | Warum nicht |
|---|---|
| `lighthouse` lokal | nicht installiert; eine Installation wäre eine neue Abhängigkeit |
| Chrome headless | auf diesem Rechner ist kein Chrome oder Chromium vorhanden |
| PageSpeed Insights API | Tageskontingent des anonymen Zugangs erschöpft (`Quota exceeded ... Queries per day`) |
| Eingebauter Browser | rendert nur auf Anforderung; `document.visibilityState` bleibt `hidden`, deshalb entstehen keine LCP-Einträge. Ein erzwungener Screenshot erzeugt zwar einen FCP-Wert, der aber nur sagt, wann ich das Rendern ausgelöst habe — als Messwert wertlos |

Erfundene Zahlen wären hier schlimmer als keine. **Die Messung musst du auf
deinem Rechner machen**, mit Chrome installiert:

```bash
npx lighthouse https://www.devinhauser.com/media --preset=perf --form-factor=mobile --view
```

Dasselbe für `/`, `/media/cremia-2026` und `/en`. Oder ohne Installation:
`https://pagespeed.web.dev/` mit der URL füttern.

**INP** ist ohnehin keine Laborzahl. Lighthouse gibt dafür einen Ersatzwert
aus; der echte INP kommt aus Felddaten und braucht ein paar Wochen echten
Verkehr. In der Search Console unter „Core Web Vitals" taucht er auf, sobald
genug Besucher da waren.

---

## Was ich stattdessen gemessen habe: die echte Übertragung

Alle Werte über HTTPS gegen die Live-Seite, komprimiert wie beim Browser,
Bildvariante wie sie ein 375-px-Telefon mit doppelter Pixeldichte wählt.

| Seite | HTML | JS + CSS | Bilder (erste Welle) | **Summe** |
|---|---:|---:|---:|---:|
| `/` | 23 KB | 151 KB | 23 KB | **197 KB** |
| `/media` | 13 KB | 151 KB | 70 KB | **234 KB** |
| `/media/cremia-2026` | 13 KB | 151 KB | 79 KB | **243 KB** |
| `/en` | 23 KB | 151 KB | 23 KB | **197 KB** |

**Das ist ein guter Wert.** Zum Vergleich: der Medianwert einer Website liegt
2026 bei rund 2 MB auf Mobilgeräten. Die Seite liegt bei einem Zehntel davon.

**Die 43 MB in `public/media` sind kein Nutzerproblem.** Das ist der
Quellbestand auf dem Server. Ausgeliefert wird daraus je Seite zwischen 23 und
79 KB, weil Next aus jedem Bild bedarfsgerechte AVIF-Varianten erzeugt. Der
Ordner darf also wachsen, ohne dass eine Seite langsamer wird.

**Der grösste Posten ist JavaScript, nicht Bild.** 151 KB komprimiert auf jeder
Seite, also rund zwei Drittel des Gewichts. Das ist für Next mit React normal
und ohne Umbau der Architektur nicht wesentlich zu senken.

---

## Die Einzelprüfungen

| Prüfpunkt | Befund |
|---|---|
| Hero mit `priority` | **ja** — `fetchPriority="high"` am `<img>` **und** `<link rel="preload" as="image">` im Kopf. Beides live bestätigt |
| `sizes`-Attribute | an **jedem** Bild gesetzt und passend zum Raster: Hero `100vw`, Albumkarten `(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw`, Albumbilder `… 22vw, … 30vw, 45vw` |
| AVIF-Auslieferung | **ja**, überall. Aushandlung am Hero (w=1080): AVIF 23 KB, WebP 40 KB, JPEG 45 KB — AVIF spart gegenüber JPEG rund die Hälfte |
| WebP als Rückfall | vorhanden, greift bei Browsern ohne AVIF |
| Lazy Loading unter dem Falz | `/` 19 von 20 lazy, `/media` 9 von 12, Albumseite 12 von 16. Die jeweils erste sichtbare Reihe lädt sofort, alles darunter verzögert |
| Ungenutzte Grössenvarianten | keine. `deviceSizes` endet bei 2048, `w=3840` wird mit **HTTP 400** abgewiesen — die Quellbilder sind 2000 px, grössere Varianten wären Rechenzeit ohne Gegenwert |
| Bilder am Optimizer vorbei | keine. Die einzige Ausnahme ist `/logos/pm-consulting.svg`; SVG wird absichtlich unverändert durchgereicht, es ist bereits vektoriell |
| Layout Shift durch Bilder | jedes Bild hat entweder `width`/`height` oder `fill` in einem Elternelement mit festem Seitenverhältnis. Strukturell kann dort nichts springen |

---

## Ein Befund, den ich nicht selbst beheben darf

`public/images/` enthält **56 MB getrackte Originale in voller Auflösung**:

| Datei | Auflösung | Grösse |
|---|---|---:|
| `wingfoil-action-cremia.jpg` | — | 13,4 MB |
| `hero-test-dscf0410.jpg` | 5829 × 3886 | 13,2 MB |
| `DSCF0515.jpg` | — | 8,0 MB |
| `iqfoil-action.jpg` | — | 6,5 MB |
| `hero-iqfoil-silvaplana.jpg` | — | 6,1 MB |

Nutzer laden davon **nichts** — Next liefert nur die kleinen AVIF. Aber bei
jedem Zugriff, für den noch keine Variante im Cache liegt, muss der Server ein
13-MB-JPEG dekodieren, bevor er das erste Byte schicken kann. Das trifft
ausgerechnet das Hero-Bild, also den LCP-Kandidaten der Startseite, und zwar
immer dann, wenn der Cache kalt ist — nach einem Deploy zum Beispiel.

Die Galerie zeigt, wie es aussehen sollte: `public/media` hat durchgehend
2000 px bei rund 0,5 MB je Datei.

**Ich fasse die Dateien nicht an**, weil das Ändern von Bilddateien laut
Vorgabe tabu ist. Der Vorschlag zur Entscheidung: dieselbe Export-Pipeline über
`public/images/` laufen lassen, die `public/media` schon erzeugt hat — 2000 px
lange Kante, sRGB, Metadaten raus. Gleiches Motiv, gleicher Bildausschnitt,
nur weniger Pixel; die grösste je angeforderte Variante ist 2048. Erspart rund
50 MB im Repository und nimmt die Dekodierlast vom Hero.

---

## Was ich nicht geändert habe

Nichts. Alle Prüfpunkte aus dem Auftrag waren entweder bereits korrekt oder in
`ee66e9c` schon behoben — die erste Kartenreihe auf `/media` lädt seit dem
Commit sofort statt verzögert. Es gab dieses Mal keinen technischen Fehler zu
beheben.
