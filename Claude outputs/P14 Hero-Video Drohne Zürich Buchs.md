# P14 — HERO-VIDEO FÜR DIE WEBSITE: DROHNE — BERGE, WASSER, STADT, LAND (Claude Code, Mac)

Stand: Dienstag, 17.11.2026, 19:45. Auftrag von Devin Hauser, vorbereitet vom Cowork-Koordinationschat. Modell Opus 5.5, Aufwand maximal. Denk gründlich (ultrathink), arbeite die Phasen der Reihe nach ab und prüfe jedes Ergebnis selbst, bevor du weitergehst.

---

## 0. Ziel in einem Satz

Aus Devins eigenen Drohnenaufnahmen entsteht ein **cinematisches Hero-Video im Querformat** in bester Qualität und hoher Auflösung. Es zeigt verschiedene Welten: **Berge** (Engadin, Silvaplana), **Wasser** (Silvaplanersee, Bergseen), **Stadt** (Zürich) und **Land** (Buchs ZH, Furttal). Es läuft auf der Startseite stumm in Schleife, sobald jemand die Website öffnet.

Das Video hat **keinen Ton**. Es lebt von Color Grading, schnellen Schnitten im richtigen Moment, Zeitlupe, Hyperlapse, Motion Effects und dezenten Motion Graphics. Text ist optional.

Es geht nur um dieses eine Video. Weitere Videos (mit Musik, andere Formate) kommen später und sind nicht Teil dieses Auftrags.

---

## 1. Kontext

- **Devin:** iQFOiL-Athlet aus Buchs ZH. Er filmt und schneidet selbst.
- **Zielseite:** in erster Linie der Hero der lokalen Vorschau **«DH Visuals»** (Arbeitsname, Name noch nicht entschieden), `/Volumes/T7 Shield/Website/devin-visuals-vorschau/`, mit eigenem Git ohne Remote. Sie ist nicht veröffentlicht. Rolle laut Seite: «Videographer & Video Editor», Region «Zürich und Umgebung». Eine der Leistungen dort heisst «Websitefilme: ein ruhiger Film für Ihre Startseite». Dieses Video ist also zugleich Devins eigene Arbeitsprobe dafür.
- **Heutiger Hero dort:** ein Standbild mit Schärfeverlagerung, aufgenommen in den USA, nicht in Zürich. Das neue Video soll ein echter Zürich-Hero werden.
- **devinhauser.com:** Die Website hat bereits ein eigenes Startseiten-Video (`src/components/FeaturedVideo.tsx`). Die Dateien dieses Auftrags sollen so gebaut sein, dass sie auch dort taugen würden. Dort wird aber nichts geändert.
- **Material:** Devin hat selbst mit seiner eigenen Drohne gefilmt. Die SD-Karte ist am Mac als Volume **«Untitled»** gemountet: `/Volumes/Untitled/DCIM/DJI_001/` (im Finder: Untitled › DCIM › DJI_001).
  - Dateien: `DJI_JJJJMMTTHHMMSS_NNNN_D.MP4`, dazu einzelne `.JPG` und `.DNG`.
  - Laut Finder-Screenshot: 9.11. (2 Clips, sehen nicht nach Luftaufnahmen aus, prüfen), 11.11. ca. 22:48 (Nacht), 13.11. ca. 09:30–09:48 (viele Clips, Stadt) und 14.11. ca. 12:42–12:46 (Landschaft, Dorf, Herbstwald).
  - Mehrere Clips sind hochkant (z. B. 0101, 0102, 0103, 0110, 0114, 0119, 0120; prüfen).
  - Welche Clips Zürich und welche Buchs zeigen, ermittelst du aus den GPS-Metadaten, nicht aus dem Datum.
- **Drohne:** Laut internem Inventar wurde die Mini 4 Pro am 31.10. verkauft. Die neuen Aufnahmen stammen also von einer anderen Drohne. Modell aus den Metadaten (`encoder`/`model`) ablesen und im Bericht nennen, nicht raten.
- **Zweite Quelle: Archiv auf der T7** (bereits gesichert, nur lesen, nicht verschieben, nicht umbenennen, nicht kopieren). Devin will ausdrücklich auch seine Aufnahmen aus Silvaplana und von anderen Orten nutzen. Massgebend ist das interne Inventar `/Volumes/T7 Shield/Website/devin-visuals-vorschau/intern/DROHNEN-INVENTAR.md` (Stand 9.11.):

  | Ordner auf T7 | Welt | Stand / Hinweis |
  |---|---|---|
  | `2026/Silvaplana Engadingwing 2026/Drohne/` (inkl. `morning/`) | Berge, See, Morgenlicht | Kandidat, keine Personen in der Stichprobe. Erste Wahl für Berge. |
  | `2025/Lej da la Tscheppa Drohne/` | Bergsee | Kandidat. In einem Clip zwei Personen klein am Ufer, meiden. Schutzgebiet laut Inventar nicht geprüft. |
  | `2026/Shootings/Silvaplana Papi/Drohne/` | Berge, See, Fahrer weit weg | Kandidat. Campingplatz von oben meiden, Fahrer nur unerkennbar. |
  | `2026/IQFoil/Devin IQFOIL SILVAPLANA/Drone/` | See, Foil | Nur wenn Devin bestätigt, wer geflogen ist (fährt Devin selbst, flog jemand anderes). Bis dahin nicht verwenden. |
  | `2026/Shootings/Sunset Hyeres Drohne/`, `Drohne Hyeres Wing/`, `Mallorca Ferien 2026/Drohne/` | Meer (Ausland) | Reserve: höchstens 1–2 Shots, nur wenn ein Shot-Typ in der Schweiz fehlt. Personen und Privathäuser meiden. |
  | `2026/Shootings/Merlijn/…` | – | **Nicht verwenden** (Einverständnis der Person fehlt). |
  | Alle Ordner mit DJI Air 3 (Bernina, Cádiz, Sils, «Sils Fabio», `Allgemein/DJI Drone`), FPV von Adam, `IQFoil Drone Silvaplana`/`IQ Silva Drohne 2022` | – | **Gesperrt**: Pilot fremd oder unklar. Nie verwenden. |

- **Bodenaufnahmen** (z. B. `Silvaplana Engadingwing 2026/Vidoes/`, `Shootings/Buchs Hiking Lägern/`): nur ausnahmsweise, wenn ein Shot herausragend ist (Zeitraffer, Hyperlapse, Detail) und keine erkennbaren Personen zeigt. Der Film bleibt ein Luftbildfilm.
- **Pilot:** Für Zürich und Buchs hat Devin bestätigt, dass er selbst geflogen ist. Für die Archivordner ist das laut Inventar noch offen. Für diese interne Fassung darfst du die Kandidaten verwenden. Im Bericht führst du pro verwendetem Ordner auf, dass Devin «ich geflogen» bestätigen muss, bevor das Video öffentlich wird.
- **Header und Titel** der Seite sind noch offen. Das Video muss ohne eingebrannten Titel funktionieren.

---

## 2. Grenzen (verbindlich)

1. **Nichts veröffentlichen:** kein Upload, kein Posten, kein Push, kein Deploy, kein Merge mit Veröffentlichungswirkung, keine Nachricht an Dritte.
2. **SD-Karte nur lesen:**
   - nichts schreiben, umbenennen, löschen oder formatieren,
   - keine Resolve-Caches, Proxies oder Projektdateien auf der Karte,
   - zuerst vollständig mit Prüfsummen auf die T7 kopieren, dann nur mit der Kopie arbeiten.
3. **Kein Ton:** keine Musik, keine Geräusche, keine Stimme. Die Exporte haben **keine Audiospur** (nicht nur stumm, sondern ohne Audio-Stream).
4. **Keine KI-Bildgenerierung:** kein Generative Fill, keine erfundenen Bildteile, keine KI-Hochskalierung, die als bessere Bildqualität ausgegeben wird. Erlaubt sind Stabilisierung, Rauschminderung, Farbkorrektur, Retime und sauberes Weichzeichnen zum Datenschutz.
5. **DaVinci Resolve exklusiv:**
   - Es bedient immer nur ein Chat Resolve. Der Ibiza-Film v09c (Upload Mi 18.11.) hat Vorrang.
   - Phasen 0–3 laufen sofort, ohne Resolve.
   - Resolve öffnest du erst, wenn klar ist, dass Ibiza v09c fertig abgelegt ist und kein anderer Render läuft. Prüfen: neuester Bericht `DAVINCI — …` im Vault, `outputs/YouTube-Upload/`, laufende Prozesse. Sonst Devin fragen.
   - Bestehende Resolve-Projekte nicht verändern.
6. **Fremde Repos nicht ändern:**
   - `devin-visuals-vorschau` gehört dem Visuals-Chat (letzter Commit heute 18:55).
   - `devinhauser-website` gehört dem Website-Chat (Release wartet auf Devins Go).
   - Lesen für Farben und Schriften ist erlaubt. Den Einbau übernimmt der jeweilige Chat über deine Übergabe (Phase 8).
7. **Datenschutz:**
   - keine erkennbaren Gesichter, keine lesbaren Kennzeichen,
   - keine nahen Blicke in Gärten, auf Balkone, Pools oder in Fenster.
   - Solche Stellen meiden. Wenn nötig sauber weichzeichnen (getrackt, ohne Flackern).
   - Keine Beschriftung auf Privathäusern. Devins Wohnhaus und Strasse nicht erkennbar machen oder beschriften; «Buchs ZH» als Ort ist in Ordnung.
8. **Drohnenregeln:**
   - GPS-Startpunkte der Clips mit der offiziellen BAZL-Drohnenkarte (map.geo.admin.ch, Layer «Einschränkungen für Drohnen») abgleichen.
   - Clips in einer Zone mit Bewilligungspflicht (z. B. Kontrollzone Flughafen Zürich) oder in Schutzgebieten (z. B. im Engadin; Lej da la Tscheppa ist laut Inventar nicht geprüft) **nur im Bericht als Hinweis an Devin** melden. Das ist keine Rechtsauskunft und kein Urteil.
   - Auf der Seite bleibt `drohneVerfuegbar: false`. Das ändert nur Devin.
9. **Keine erfundenen Daten:** Koordinaten, Höhen und Zeiten im Bild nur aus echten Metadaten. Keine Fantasie-Telemetrie.
10. **Speicherplatz:** Die T7 hatte am 16.11. ca. 100 GB frei. Vor dem Kopieren Grösse und freien Platz messen. Bleiben danach unter 60 GB frei: anhalten und Devin melden. Nichts löschen, um Platz zu schaffen.
11. **Software:** Fehlende Werkzeuge nur aus offiziellen Quellen installieren (Homebrew-Formeln wie `ffmpeg`, `exiftool`; LUTs nur von dji.com). Version und Quelle im Bericht festhalten.
12. **Sprache:** Deutsch, Schweizer Schreibweise, kein ß. Behaupte nichts, was du nicht gemessen oder angesehen hast. Schau dir jedes ausgewählte Shot-Still selbst an (PNG lesen).

---

## 3. Ablage

Projektordner: `/Volumes/T7 Shield/2026/Website Hero Drohne 2026-11/`

| Ordner | Inhalt |
|---|---|
| `01_Original/` | 1:1-Kopie der SD-Karte Zürich/Buchs (`DJI_001` vollständig, auch `.LRF`, `.SRT`, `.JPG`, `.DNG`) und `PRUEFSUMMEN.sha256`. T7-Archivclips bleiben an ihrem Ort. |
| `02_Analyse/` | Clipliste (CSV und MD), Kontaktbögen, Shot-Stills, Storyboard, Look-Stills |
| `03_Proxy/` | Proxies/Optimized Media (nur falls nötig) |
| `04_Resolve/` | `.drp`-Sicherungen nach jeder Phase, Aufbauskript (z. B. `HERO_v01_Schnitt.lua`), LUTs mit Quelle |
| `05_Grafik/` | Fusion-Comps, Schrift-Lizenzhinweise, Tracking-Daten |
| `06_Master/` | ProRes-Master (CLEAN und TEXT) |
| `07_Web/` | Web-Encodes, Poster, lokale Vorschau `index.html`, `EINBAU-SNIPPET.md` |
| `08_Bericht/` | Prüfprotokolle (ffprobe, VMAF, Loop-Test), Bericht als Kopie |

---

## 4. Phasen

### Phase 0: Vorabprüfung (ohne Resolve)
- Prüfen, ob `/Volumes/Untitled/DCIM/DJI_001/` gemountet und lesbar ist. Dateien zählen, Gesamtgrösse messen.
- Freien Platz auf der T7 messen (Grenze siehe §2.10).
- Werkzeuge: `ffmpeg` (mit libx264, libx265, libsvtav1 oder libaom, libvpx-vp9 und, falls verfügbar, libvmaf) und `exiftool`.
- Resolve-Version feststellen und ob Studio oder Free. Das bestimmt Temporal NR, Speed Warp, H.265-Export und Motion Blur.
- Resolve-Belegung prüfen (§2.5). Nur notieren, noch nicht öffnen.

### Phase 1: Sicherung (Ingest)
- Nur die SD-Karte sichern. Das T7-Archiv ist schon gesichert: dort nur lesen und in Resolve direkt verknüpfen, nicht duplizieren.
- Die ganze Karte nach `01_Original/` kopieren (`rsync -a` oder `ditto`), Dateinamen unverändert.
- SHA-256 jeder Datei auf Karte und Kopie bilden und vergleichen. Ergebnis in `PRUEFSUMMEN.sha256` und im Bericht (Anzahl, Bytes, alle gleich ja/nein).
- Erst danach weiterarbeiten. Von hier an nur noch die Kopie lesen.

### Phase 2: Analyse jedes Clips
Gilt für die SD-Karte **und** die freigegebenen T7-Ordner aus §1. Für T7-Clips zuerst das Inventar und bestehende Kontaktbögen nutzen, nicht alles doppelt rechnen. Neu messen nur, was fehlt (Farbprofil, fps, beste In/Out).

Lege `02_Analyse/CLIPLISTE.csv` und `.md` an, je Clip (mit Spalte «Quelle: SD / T7-Ordner» und «Welt: Berge / Wasser / Stadt / Land / Meer»):
- Dateiname, Aufnahmezeit, Dauer
- Auflösung, Seitenverhältnis, Ausrichtung (quer/hoch)
- fps (r_frame_rate und avg), Codec, Profil, Bittiefe, pix_fmt, Bitrate
- Farbprofil und Transferfunktion (D-Log M, HLG oder Normal; aus Metadaten und Bildcharakter)
- Drohnenmodell (Metadaten)
- GPS-Start (mit `exiftool -ee`) und Ort (Zürich, Buchs ZH oder anderer Ort, über Distanz zu bekannten Ortskoordinaten), Drohnenkarten-Hinweis
- Bewegungstyp: Reveal, Push-in, Pull-back, Seitwärtsfahrt, Orbit, Top-down, Tilt-up, Hyperlapse, statisch
- Eignung: Zeitlupe (ab 50 fps, ideal 100/120 fps), Hyperlapse (DJI-Hyperlapse-Datei oder langer ruhiger Flug, der sich 4–10× beschleunigen lässt), schneller Schnitt (klare Bewegung in den ersten 10 Frames)
- Qualität: Ruckeln/Jello, Belichtung (ausgefressener Himmel?), Rauschen, Moiré auf Dächern, Propeller oder Schatten im Bild, Kompressionsartefakte, Fokus
- Datenschutz: Personen, Kennzeichen, Einblicke
- beste In/Out-Bereiche mit Timecode, Bewertung 1–5, verwendbar ja/nein mit Grund

Dazu:
- **Kontaktbögen** pro Clip mit ffmpeg (Bild alle 1–2 s, Kachel 5×4) und für jeden Kandidaten 2–3 Stills in voller Auflösung. **Alles selbst ansehen.**
- **Ausschliessen:**
  - Hochkant-Clips: nicht auf 16:9 zuschneiden. Liste für spätere Shorts an 08 übergeben.
  - Clips, die keine Luftaufnahmen sind.
  - Clips mit nicht lösbaren Datenschutzproblemen.
- **Nachtclip 11.11.:** nur verwenden, wenn Rauschen und Schärfe dem Tagmaterial standhalten und er den Loop nicht bricht.
- **Fotos (`.JPG`/`.DNG`):** nicht im Video, aber als mögliche Posterbilder notieren.

### Phase 3: Konzept und Storyboard (ohne Resolve)

**Hauptfassung «HERO LOOP»:** 30–40 s, nahtlose Schleife, 16:9.

**Idee:** «Berge · Wasser · Stadt · Land». Eine Fahrt durch Devins Schweiz, von den Engadiner Bergen über Wasser und Zürich bis nach Hause ins Furttal. Ruhige, grosse Momente wechseln mit kurzen, schnellen Montagen. Das wirkt hochwertig statt hektisch.

**Dramaturgie-Vorschlag** (an das Material anpassen; die beste Reihenfolge entscheidet das Material):

| Zeit | Teil | Inhalt |
|---|---|---|
| 0:00–0:05 | Opener Berge | epischer Reveal über einen Grat oder See im Engadin (z. B. Morgenlicht aus `morning/`). Nicht aus Schwarz einblenden; der Loop startet mitten in der Bewegung. |
| 0:05–0:11 | Wasser | Silvaplanersee oder Bergsee: Top-down auf Wasserflächen und Uferlinien, eine **Zeitlupe** (100/120 fps → 25 fps), Fahrer höchstens klein und unerkennbar |
| 0:11–0:13 | Übergang | Zoom-through oder Whip in Bewegungsrichtung, eventuell über Wolken oder hellen Himmel |
| 0:13–0:23 | Stadt Zürich, **schnelle Montage** | 6–10 Shots, sich beschleunigend (z. B. 2 · 1,5 · 1 · 0,8 · 0,6 · 0,5 · 0,5 s, kürzester Shot nicht unter 12 Frames), Match-Cuts über Linien (Strassen, Gleise, Limmat, Dächer), ein **Hyperlapse** über der Stadt, eine **Speed-Ramp** am Höhepunkt |
| 0:23–0:33 | Land Buchs ZH | Herbstfelder, Wald, Dorf: ruhige, weite Shots à 3–4 s. Bewusster Kontrast nach der Stadt, Atempause. |
| 0:33–0:38 | Loop-Rückführung | Bewegung und Licht laufen zurück in den Opener (gleiche Richtung, Match-Cut oder Überblendung 12–18 Frames). Der Übergang vom letzten zum ersten Frame darf nicht auffallen. |

**Schnittrhythmus ohne Musik:**
- Der Rhythmus entsteht nur aus Bild und Bewegung. Schnitte auf Bewegungshöhepunkte, nie mitten in langsames Ein- oder Ausschwingen.
- Schnelle Schnitte nur in **einer** Montage (Stadt). Dort gleiche Bewegungsrichtung und ähnliche Helligkeit, damit es fliesst statt flimmert. Keine Blitz- oder Weissframes.
- Zeitlupe nur aus echten Hochbildraten. Hyperlapse nur, wenn er nach Deflicker und Stabilisierung ruhig läuft.

**Jahreszeiten und Drohnen mischen:**
- Sommer im Engadin, November in Zürich und Buchs, verschiedene Drohnen und Farbprofile: Der Look muss alles zu einem Film verbinden.
- Jahreszeiten nicht künstlich umfärben. Die Übergänge so setzen, dass der Wechsel gewollt wirkt (z. B. Berge → Wasser → Stadt → Land wie eine Reise).

**Website-Komposition:**
- Auf der DH-Visuals-Seite steht der HTML-Titel **unten links** (`.hero-text` am unteren Rand, max. ca. 980 px breit). Deshalb das untere linke Drittel ruhig halten (Himmel, Feld, Wasser, keine unruhigen Details). Das Hauptmotiv liegt Mitte bis rechts oder oben.
- Auf schmalen Bildschirmen wird das Video beschnitten (`object-fit: cover`). Wichtige Bildteile und allfällige Schrift deshalb in den mittleren ca. 60 % der Breite.

**Storyboard:**
- `02_Analyse/STORYBOARD.md` mit Tabelle: Nr., Clip, In/Out, Dauer, Bewegung, Übergang, Grading-Notiz, Text ja/nein.
- Dazu je Shot ein Still.

**Drei Look-Stills** (auf 2–3 Schlüsselshots):

| Look | Beschreibung |
|---|---|
| A «Natürlich Premium» | Standard |
| B «Cinematic Warm» | |
| C «Kühl Schweiz» | |

Wenn Devin im Chat erreichbar ist: Storyboard und Look-Stills kurz zeigen und Rückmeldung abwarten. Sonst mit Look A und deinem Storyboard weiterarbeiten und am Ende beide Alternativen als Stills mitliefern.

### Phase 4: Schnitt in DaVinci Resolve (erst nach Freigabe gemäss §2.5)

**Projekt und Sicherung**
- Neues Projekt `HERO_DROHNE_2026-11`. Aufbau reproduzierbar per Resolve-Skript (Lua/Python wie beim Ibiza-Film), Skript in `04_Resolve/`. `.drp`-Sicherung nach jeder Phase.

**Timeline**
- Auflösung: Master in UHD 3840×2160, wenn die Quellen mindestens UHD sind, sonst in Quellauflösung.
- Bildrate: die dominante Quellbildrate, bevorzugt 25 oder 24.
- Höhere Bildraten (50/60 fps) als echte Zeitlupe interpretieren (Clip-Attribute), nicht mit Frame-Blending umrechnen.
- Bei gemischten Raten die Entscheidung im Bericht begründen.

**Proxies**
- Nur falls nötig, auf der T7 (`03_Proxy/`), z. B. ProRes Proxy oder DNxHR LQ. `.LRF`-Dateien der Drohne können als Sichtungsproxies dienen.

**Bildbearbeitung**
- **Stabilisierung** nur wo nötig. Gebäudekanten auf Verzerrung prüfen, minimaler Zoom.
- **Reframing:** im UHD-Master keine Skalierung über 100 %. Leichte Punch-ins nur, wenn die Quelle grösser als UHD ist.
- **Speed-Ramps** (2–3 im ganzen Film) nur mit Quellen ab 50 fps, mit weichen Kurven. Optical Flow oder Speed Warp nur, wenn keine Artefakte an Kanten oder Dächern entstehen. Bei 100 % und 200 % prüfen.
- **Zeitlupe:** Hochbildraten-Clips als echte Zeitlupe interpretieren (z. B. 100 fps in einer 25-fps-Timeline = 4×), nicht künstlich interpolieren.
- **Hyperlapse:** DJI-Hyperlapse-Dateien direkt nutzen. Sonst einen langen, ruhigen Flug 4–10× beschleunigen, mit Deflicker und leichter Stabilisierung. Frame-Blending nur, wenn es nicht schmiert.
- **Quellen mischen:** Clips verschiedener Drohnen, Auflösungen und Farbprofile sauber einordnen. Nichts unter die Master-Auflösung hochskalieren; Shots unter UHD nur in der 1080p-Fassung verwenden oder weglassen.

### Phase 5: Color Grading

**Farbmanagement**
- DaVinci YRGB Color Managed oder manuell mit CST.
- Arbeitsraum: DaVinci Wide Gamut / Intermediate.
- Ausgabe: Rec.709 Gamma 2.4.

**Eingang je Clip**
- **D-Log M:** CST, falls Resolve «DJI D-Log M» anbietet, sonst die offizielle DJI-LUT «D-Log M to Rec.709» von dji.com (Quelle, Version und Prüfsumme notieren, keine Dritt-LUTs).
- **HLG:** Rec.2100 HLG.
- **Normal:** Rec.709.

**Node-Struktur pro Clip**
1. Rauschminderung: leicht. Temporal nur mit Studio, 2–3 Frames. Auf Moiré und Wachseffekt achten.
2. Balance: Belichtung und Weissabgleich an neutralen Flächen (helle Fassaden, Strassen).
3. Kontrast und Kurven: weiches S, saubere Lichter, kein Clipping im Himmel.
4. Himmel: HSL-Qualifier und weiches Fenster, ohne Halos und Ränder.
5. Herbstfarben und Grün: natürliche Orange-, Gelb- und Grüntöne, nicht überzogen.
6. Details: leichter Mitteltonkontrast, keine Überschärfung.
7. Shot-Match: Abgleich zwischen den Shots, mit Galerie-Stills vergleichen.

**Look (Gruppe Post-Clip oder Timeline-Node, für alle gleich)**
- dezenter filmischer Look mit weichem Highlight-Rolloff und leicht kühleren Schatten bei neutralen bis warmen Lichtern
- falls vorhanden, Film Look Creator mit niedriger Stärke
- Halation höchstens angedeutet, leichte Vignette
- **feines Korn** am Ende: als Dither gegen Banding im Himmel, so fein, dass es die Webkompression übersteht
- Kein Orange-Türkis-Kitsch, keine HDR-Halos, keine übersättigten Herbstfarben.
- Die Lichter dürfen leicht cremig wirken (passend zu den Seitenfarben `#f4efe6` Weiss und `#17191c` Anthrazit). Das Kobalt `#2a4fe0` gehört nur in die Grafik, nicht ins Bild.

**Messwerte (Scopes)**
- Lichter maximal ca. 95 % im Waveform, Schwarz ca. 2–5 %, nichts abgesoffen.
- Vectorscope ohne Ausreisser.
- Konsistenz über alle Shots per Galerie-Vergleich.
- Flimmern prüfen; bei Hyperlapse Deflicker.

**Lesbarkeit des Titels**
- Keine starke Abdunkelung einbacken. Die Website regelt die Lesbarkeit mit einem CSS-Verlauf. Eine sehr leichte Vignette unten links ist in Ordnung.

### Phase 6: Motion Graphics und Motion Effects (Fusion)

**Zwei Fassungen desselben Schnitts:**
1. **CLEAN:** ohne jede Schrift. Das ist die Hauptfassung für die Website, weil Titel und Header als HTML darüber liegen und Devin sie noch nicht kennt.
2. **TEXT:** mit dezenten Ortsmarken. Alle Texte bleiben in Fusion editierbar (Text+), damit Devin sie später ändern kann.

**Typografie wie auf der Seite**
- Barlow Condensed ExtraBold für kleine Etiketten in Grossbuchstaben mit Laufweite, Geist für feine Zusatzzeilen. Beide stehen unter OFL; Lizenzhinweis in `05_Grafik/`.
- Schriften aus `devin-visuals-vorschau/medien/schrift/` nur lesen. Bei Bedarf aus der offiziellen Quelle (Google Fonts / Vercel Geist) installieren.

**Erlaubte Grafik-Elemente** (höchstens 3 Typen, premium und reduziert):
1. **Ortsmarke** pro Welt, z. B. «ENGADIN» oder «SILVAPLANA», «ZÜRICH», «BUCHS ZH»: feine Linie, echte Koordinaten aus GPS, für Buchs auf 2 Nachkommastellen gerundet (Privatsphäre). Animation: Masken-Reveal und Laufweite mit Ease (12–18 Frames), Stand, Ausblenden. In der schnellen Montage keine Schrift.
2. **Getrackte Marke** an einem öffentlichen Wahrzeichen (z. B. Limmat, Grossmünster, Prime Tower), mit Planar oder Camera Tracker. Nur wenn der Track sauber klebt und kein Rutschen sichtbar ist. Nie an Privathäusern.
3. **Feine Linien- oder Rasterakzente** (Kobalt `#2a4fe0` oder Weiss), sparsam.

**Nicht einbacken:** REC-Punkt und Zeitcode. Die DH-Visuals-Seite zeigt beides bereits als HTML; doppelt wirkt billig.

**Motion Effects und Übergänge**
- 70–80 % harte Schnitte auf Bewegung.
- Höchstens 2–3 besondere Übergänge:
  - (a) Zoom-through oder Push mit richtungsgleicher Bewegungsunschärfe
  - (b) Whip-Übergang passend zur Kamerarichtung
  - (c) einmal ein Licht- oder Luma-Übergang über hellen Himmel
- Keine Spins, Glitches, Star-Wipes oder Light-Leak-Pakete.
- Bewegungsunschärfe nur, wo sie die Bewegung glaubwürdig macht.
- Schrift-Animationen mit weichen Kurven (ähnlich `cubic-bezier(.2,.7,.2,1)` der Seite), nichts hüpft.
- Kein Einblenden aus Schwarz und kein Ausblenden in Schwarz in der Loop-Fassung.

**Optional:** eine Kurzfassung «HERO MOBIL» mit 12–15 s (je ein starker Shot pro Welt), ebenfalls nahtlos, nur wenn das Material es ohne Qualitätsverlust hergibt.

### Phase 7: Export und technische Prüfung

**Master** (je CLEAN und TEXT) in `06_Master/`:
- ProRes 422 HQ, Timeline-Auflösung, 10 Bit, Rec.709 Gamma 2.4, **ohne Audiospur**.
- Farb-Tag so wählen und testen, dass das Bild in QuickTime, Safari und Chrome gleich aussieht wie im Resolve-Viewer (Gamma-Verschiebung vermeiden, z. B. Rec.709-A). Ergebnis im Bericht.
- Name: `DH_Hero_Drohne_v01_CLEAN_MASTER_ProRes422HQ.mov` bzw. `…_TEXT_…`

**Web-Encodes** in `07_Web/`, mit ffmpeg aus dem Master. Alle ohne Audio (`-an`), mit `-movflags +faststart` und bt709-Farbtags:

| Datei | Codec und Einstellungen | Zielgrösse (Richtwert bei 30 s) |
|---|---|---|
| `…_1080p_h264.mp4` | libx264, preset veryslow, CRF 18–20, High-Profil, yuv420p | ≤ ca. 15–20 MB (schnelle Montage braucht mehr Bitrate) |
| `…_1080p_hevc.mp4` | libx265 10 Bit (main10), CRF ca. 22–24, `-tag:v hvc1` (Safari) | ≤ ca. 10 MB |
| `…_1440p_av1.mp4` | SVT-AV1 10 Bit, CRF ca. 30–35 | ≤ ca. 12 MB |
| `…_2160p_hevc.mp4` | nur wenn der Master UHD ist, für grosse Bildschirme | ≤ ca. 40–50 MB |
| `…_720p_h264.mp4` | für Mobil (oder aus «HERO MOBIL») | ≤ ca. 5 MB |
| `…_poster.jpg` / `.webp` / `.avif` | erster Frame der Schleife, 1920 px breit | je ≤ ca. 200 KB |

- Die Grössen sind Richtwerte. Qualität geht vor. Wird eine Datei zu gross, die CRF schrittweise erhöhen und dabei Banding im Himmel prüfen. Lieber etwas grösser als sichtbar verschlechtert.

**Prüfungen (alle protokollieren in `08_Bericht/`):**
- `ffprobe` je Datei: Auflösung, fps, Dauer, Codec, Profil, Farbtags, kein Audio-Stream, `hvc1`-Tag bei HEVC, moov am Anfang
- VMAF gegen den Master (falls libvmaf vorhanden): Ziel ≥ 93 bei 1080p
- Sichtprüfung bei 100 % und 200 % (Stills aus dem Encode): Banding, Blockartefakte, Moiré, Flimmern
- keine schwarzen Frames, keine Doppelframes, keine Sprünge
- **Loop-Test:** Datei dreimal hintereinander als `…_LOOPTEST_3x.mp4`, Nahtstelle selbst ansehen (Stills 10 Frames vor und nach der Naht)
- Wiedergabe in QuickTime, Safari und Chrome auf dem Mac: Autoplay stumm, Schleife, Farben gleich

### Phase 8: Lokale Vorschau, Bericht, Übergaben

**Lokale Vorschau** `07_Web/index.html`, nur lokal und in keinem Repo:
- Vollbild-Hero mit `<video autoplay muted loop playsinline preload="metadata" poster="…">`, Quellen in der Reihenfolge AV1 → HEVC → H.264.
- Platzhalter-Titel unten links in Geist/Barlow, mit dem Vermerk «Titel offen».
- CSS-Verlauf für die Lesbarkeit. Bei `prefers-reduced-motion: reduce` nur das Poster.
- Umschalter CLEAN/TEXT.
- Bei 360, 390, 768 und 1440 px prüfen (Screenshots in `08_Bericht/`).

**`07_Web/EINBAU-SNIPPET.md`** für den Visuals-Chat und den Website-Chat:
- HTML-Snippet und Next.js-Variante
- Hinweise zu Poster, `preload`, reduzierter Bewegung und dazu, dass iOS-Stromsparmodus Autoplay verhindern kann (dann zeigt das Poster)
- Lizenz- und Rechtehinweis: eigene Aufnahmen von Devin, Drohnenmodell aus den Metadaten, Fluggebiet-Hinweise.
- **Nicht** selbst einbauen.

**Bericht im Obsidian-Vault:** `…/08 Projekte/CLAUDE AUTOPILOT/Arbeitsdateien/VIDEO — HERO DROHNE — 2026-11-<TT> <HHMM>.md`, Inhalt:
1. Stand in einem Satz.
2. Sicherung: Anzahl Dateien, Bytes, Prüfsummen ok ja/nein.
3. Clipliste kurz: verwendet, verworfen mit Grund, Hochkant-Liste für Shorts.
4. Storyboard, gewählter Look, Begründung.
5. Exporttabelle: Datei, Pfad, Auflösung, fps, Codec, Bitrate, Grösse, Dauer, VMAF, geprüft ja/nein.
6. Hinweise zu Datenschutz und Drohnenkarte je betroffenem Clip.
7. **Offene Entscheide für Devin, je mit Empfehlung:**
   - Look A/B/C
   - CLEAN oder TEXT auf der Seite
   - Titel und Name
   - Einbau in DH Visuals (intern) und/oder devinhauser.com
   - ob ein Drohnenvideo öffentlich gezeigt werden soll, solange `drohneVerfuegbar: false` gilt
   - Pilot pro verwendetem T7-Ordner bestätigen («ich geflogen» oder «geflogen von …»)
8. Getrennt aufführen: was erledigt ist, was Vorschlag ist, was nicht geprüft werden konnte.

**Übergaben** (kurz, im jeweiligen Ordner):
- an 01 Zentrale (Status, Entscheide)
- an 05 Website und an den Visuals-Chat (Snippet, Dateien)
- an 08 Contentproduktion (Hochkant-Clips für Shorts)

**Schlussmeldung an Devin im Chat:** höchstens 6 Sätze. Was fertig ist, wo die Vorschau liegt (Pfad zu `index.html`), was er ansehen soll (Loop-Naht, Look) und welche Entscheide offen sind.

---

## 5. Abnahmekriterien (alle müssen erfüllt sein)

- [ ] Originale gesichert, Prüfsummen identisch, Karte unverändert
- [ ] Nur Querformat-Material, keine hochkant zugeschnittenen Clips, keine Hochskalierung im Master
- [ ] Mindestens drei Welten (Berge, Wasser, Stadt, Land) sichtbar; nur Kandidaten-Ordner aus §1, keine gesperrten Quellen
- [ ] Zeitlupe nur aus echten Hochbildraten, Hyperlapse ruhig und flackerfrei, schnelle Montage fliesst ohne Flimmern
- [ ] Look über alle Shots konsistent, kein Clipping im Himmel, kein Banding im Web-Encode
- [ ] Schleife ohne sichtbare Naht, kein Schwarz
- [ ] Keine Audiospur in allen Dateien
- [ ] CLEAN- und TEXT-Fassung vorhanden, Texte editierbar, nur echte Daten
- [ ] Keine erkennbaren Personen, Kennzeichen oder Einblicke; keine Beschriftung von Privathäusern
- [ ] Web-Dateien in Richtgrösse oder Abweichung begründet; Safari, Chrome und QuickTime zeigen gleiche Farben
- [ ] Lokale Vorschau funktioniert bei 360–1440 px; reduzierte Bewegung zeigt das Poster
- [ ] Bericht, Übergaben und `.drp`-Sicherung abgelegt; nichts veröffentlicht, gepusht oder gesendet
