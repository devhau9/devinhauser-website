# Media Library — Anleitung

Ein Album ist **ein Ordner mit Bildern plus eine JSON-Datei**. Kein Code, kein CMS,
keine Datenbank. Nach dem Export der Bilder dauert ein Album rund 15 Minuten.

---

## Album veröffentlichen — sechs Schritte

1. **Bilder exportieren** (siehe „Export" unten) nach `public/media/<slug>/`.
   Slug-Format als Empfehlung: `<ort>-<jahr>-<monat>-<tag>`, z. B.
   `silvaplana-2026-08-09`. Erzwungen wird nur `^[a-z0-9]+(-[a-z0-9]+)*$` —
   die bestehenden Alben heissen deshalb `silvaplana-2025` und `cremia-2026`.
2. **Metadaten schreiben:** `content/albums/<slug>.json` — Vorlage ist
   `content/albums/_TEMPLATE.json.example`.
3. **Rechte setzen** — siehe „Rechte" unten. Im Zweifel `"restricted"`.
4. **Lokal prüfen:** `npm run dev` → `http://localhost:3000/media/<slug>`
5. **Bauen:** `npm run build` — muss fehlerfrei durchlaufen.
6. **Deployen und Link teilen:** `https://www.devinhauser.com/media/<slug>`

Ein **freigegebenes** Album erscheint automatisch auf `/media`, in der
Navigation und in der Sitemap; es ist keine Codeänderung nötig. Ein Album mit
`"noindex": true` zählt dabei nicht mit — solange nur solche Alben existieren,
bleibt `/media` auf `noindex`, genau wie bei einer leeren Galerie. Siehe
„`noindex` und die lokale Vorschau".

---

## Export aus Lightroom / Capture One

| Zweck | Längere Kante | Qualität | Metadaten |
|---|---|---|---|
| Anzeige im Web (`src`) | 2000 px | 80 | **nur Copyright + Contact**, kein GPS |
| Download (`downloadSrc`, optional) | 2560 px | 90 | **nur Copyright + Contact**, kein GPS |

**Immer:** GPS/Standortdaten entfernen. Kamera-Seriennummern entfernen. sRGB.

> ⚠️ Dieser Schritt ist **nicht** durch Code abgesichert — anders als die
> Rechteklassen. Er passiert im Exportdialog, oder er passiert nicht. In den
> bereits veröffentlichten Bildern unter `public/images/` stehen heute noch
> Kamera-Seriennummern (`BodySerialNumber`, `LensSerialNumber`); GPS-Daten
> wurden dort keine gefunden. Siehe Morning Review.
**Nie:** RAW veröffentlichen. Originale umbenennen oder überschreiben — es werden
ausschliesslich Kopien exportiert.

**Gar keine Metadaten sind auch in Ordnung** und in einem Fall sogar besser:
EXIF-ASCII trägt das Zeichen `©` nicht verlustfrei, aus `© Sailing Energy` wird
beim Rückschreiben `? Sailing Energy`. Ein verfälschter Credit in der Datei ist
schlechter als keiner. Der verbindliche Wortlaut steht ohnehin im Album-JSON,
und von dort zeigt ihn die Website an. Die Bilder der beiden Startalben sind
deshalb vollständig metadatenfrei exportiert — geprüft: kein EXIF, kein IPTC,
kein GPS, sRGB-Profil vorhanden.

**Dateinamen** (nur für Web-Exporte, nie für Kameraoriginale):

```
2026-08-09_silvaplana_iqfoil_001.jpg
<datum>_<ort>_<sportart>_<nummer>.jpg
```

Sprechende Dateinamen sind ein echtes Bild-SEO-Signal — `IMG_9274.jpg` ist keines.

---

## Rechte — vier getrennte Fragen

Vor jedem Album alle vier einzeln beantworten. **Keine Antwort folgt aus einer
anderen.**

1. **Wer hat es aufgenommen?**
2. **Darf Devin es zeigen?**
3. **Darf Devin einen Download anbieten?**
4. **Dürfen Dritte es weiterverwenden — und mit welchem Credit?**

Daraus folgt die Rechteklasse im JSON:

| `rights` | Bedeutung | Download möglich? |
|---|---|---|
| `"own"` | Devin hat es selbst aufgenommen | **ja**, wenn `downloadAllowed: true` |
| `"licensed-use"` | Dritter hat fotografiert, Devin darf es **verwenden** | **nein** |
| `"restricted"` | Event-, Klassen- oder Agenturmaterial | **nein** |

> **Der wichtigste Satz dieser Datei:** Eine Nutzungserlaubnis für Devin ist
> **nicht** das Recht, die Datei an beliebige Dritte weiterzugeben. Bilder von
> Andreas Furger oder Tobias Meier dürfen gezeigt werden — sie gehören nach
> heutigem Stand in `"licensed-use"`, nicht in `"own"`.

Der Code erzwingt das: `canDownload()` in `src/lib/albums.ts` gibt bei
`"licensed-use"` und `"restricted"` **immer** `false` zurück, auch wenn im JSON
versehentlich `"downloadAllowed": true` steht. Ein Tippfehler in einer
Inhaltsdatei kann also nie fremdes Material zum Download freigeben.

### Was das Rechtemodell leistet — und was nicht

Damit hier keine Sicherheit behauptet wird, die es nicht gibt:

**Was der Code verhindert** — einen angebotenen Download; ein fremdes Bild als
Sharing-Vorschau (WhatsApp, Slack, LinkedIn und X holen sich das Vorschaubild
aktiv ab und legen eine eigene Kopie an, das ist echte Weiterverbreitung); und
die Anmeldung der Dateien bei der Google-Bildersuche über `ImageObject`. Alle
drei hängen an derselben Bedingung `rights === "own"`.

**Was der Code nicht verhindern kann:** Jedes angezeigte Bild liegt unter einer
öffentlichen URL — sonst wäre es nicht sichtbar. Wer „Bild speichern" wählt,
bekommt dieselbe Datei. Eine statisch ausgelieferte Website kann das technisch
nicht unterbinden, und keine Einstellung ändert daran etwas.

**Die praktische Folge:** Für `"restricted"`-Material ist die einzige
verlässliche Schutzmassnahme, es **nicht zu veröffentlichen**. Die Rechteklasse
ist dafür da, ein Versehen zu verhindern — sie ist kein Zugriffsschutz.

---

## Das Schema

**Zweisprachig ist Pflicht.** `title`, `description`, `alt` und `caption` sind
Objekte mit `de` und `en` — beide Seiten teilen sich denselben Bildbestand, nur
die Beschriftung wechselt. Ein leeres `en` führt zur Ablehnung des ganzen
Albums; ein Alt-Text in der falschen Sprache ist schlechter als ein
umständlicher in der richtigen.

```jsonc
{
  "slug": "silvaplana-2025",             // = Ordnername unter public/media/
  "date": "2025-08-19",                  // ISO, steuert Sortierung + Sitemap
  "title":       { "de": "…", "en": "…" },
  "description": { "de": "…", "en": "…" },   // ein bis zwei Sätze
  "location": "Silvaplanersee, Graubünden, Schweiz",
  "sport": "IQFoil",
  "photographer": "Sailing Energy",
  "photographerKind": "organization",    // person | organization — siehe unten
  "credit": "© Sailing Energy",
  "rights": "licensed-use",              // own | licensed-use | restricted
  "downloadAllowed": false,              // wirkt nur bei rights: "own"
  "coverImage": "/media/silvaplana-2025/2025-08-19_silvaplana_iqfoil_001.jpg",
  "tags": ["IQFoil", "Silvaplana"],
  "featured": false,                     // optional, siehe „Best of"
  "noindex": true,                       // true = fertig, aber nicht freigegeben
  "images": [
    {
      "src": "/media/silvaplana-2025/2025-08-19_silvaplana_iqfoil_001.jpg",
      "alt":     { "de": "…", "en": "…" },
      "width": 2000,
      "height": 1333,
      "caption": { "de": "…", "en": "…" },  // optional
      "photographer": "Tobias Meier",       // optional, überschreibt das Album
      "credit": "Photo: Tobias Meier",      // optional, überschreibt das Album
      "rights": "licensed-use",             // optional, kann nur EINSCHRÄNKEN
      "downloadSrc": "/media/.../..._2560.jpg", // optional
      "downloadAllowed": false              // optional, kann nur EINSCHRÄNKEN
    }
  ],
  "videos": []                           // Schema vorbereitet, V1 zeigt nichts
}
```

`width` und `height` sind Pflicht — ohne sie springt das Layout beim Laden
(Cumulative Layout Shift). Beide Werte stehen im Exportdialog.

**Alt-Texte:** beschreiben, was zu sehen ist. Ein Satz. Keine Stichwortlisten.
Gut: `"SUI 134 und AUT 53 nebeneinander foilend vor der Bergkulisse"`.
Schlecht: `"iqfoil silvaplana windsurfing foil racing schweiz"`.
Eine Person nur beim Namen nennen, wenn das Bild sie belegt — etwa über die
Segelnummer. Sonst „Fahrer" statt „Devin Hauser".

**Ein leerer Credit am Bild ist etwas anderes als kein Credit.** `"credit": ""`
ist eine ausdrückliche Angabe und fällt **nicht** auf den Albumcredit zurück;
bei Fremdmaterial lehnt der Loader das Album deshalb ab. Wer den Albumcredit
will, lässt das Feld weg.

---

## `photographerKind` — Person oder Organisation

Das Feld steuert ausschliesslich die `author`-Angabe im JSON-LD:

| Wert | JSON-LD |
|---|---|
| `"person"` | `{"@type": "Person", …}` |
| `"organization"` | `{"@type": "Organization", …}` |
| **fehlt** | **kein `author`** |

Es wird nichts aus dem Namen abgeleitet. „Sailing Energy" sieht nach Firma aus,
„Marc Weiler Photography & Film" enthält einen Personennamen und ist trotzdem
ein Betrieb. Strukturierte Daten sind eine Tatsachenbehauptung gegenüber
Suchmaschinen — wer keine belegte Zuordnung hat, macht keine Aussage. Ein
fehlender `author` ist gültiges schema.org, ein falscher ist eine Falschangabe.

Ein Schreibfehler wie `"Person"` oder `"org"` führt zur **Ablehnung** des
Albums und nicht zum stillen Weglassen — sonst wäre der Fehler unsichtbar.

---

## `noindex` und die lokale Vorschau

`"noindex": true` heisst: Das Album ist fertig gebaut, aber noch nicht
freigegeben. Konkret:

- Die Detailseite existiert und ist über ihre URL erreichbar; sie trägt oben
  einen sichtbaren Review-Hinweis und im Kopf `robots: noindex`.
- Das Album steht **nicht** in der Sitemap und **nicht** in
  `getPublicAlbums()`.
- In der Galerie-Übersicht und im Startseiten-Teaser erscheint es nur mit
  gesetztem Vorschauschalter, gekennzeichnet mit `Review`.

Der Schalter ist eine Umgebungsvariable und standardmässig **aus**:

```bash
GALLERY_PREVIEW=1 npm run build   # oder: npm run preview
```

Ohne ihn verhält sich die Website exakt so wie ohne die Alben — ein
versehentlicher Produktionsbuild kann nichts veröffentlichen. Der Schalter
ändert **weder** die `robots`-Angaben **noch** die Sitemap.

**Livegang eines Albums** ist genau eine Änderung: `"noindex"` auf `false`.

---

## „Best of" — nur über `featured`

`"featured": true` markiert ein bestehendes Eventalbum als Best-of-tauglich.
Ein eigenes Best-of-Album mit kopierten Dateien wäre der falsche Weg: derselbe
Bildbestand läge ein zweites Mal im Repository und liefe bei jeder Korrektur
auseinander. In V1 wird das Flag noch nicht ausgewertet.

---

## Rechteklasse bei vorliegender Freigabe

Die Tabelle oben ordnet Agenturmaterial `"restricted"` zu — das ist die
Vorsichtsregel für den Fall **fehlender Information**, keine Feststellung über
eine konkrete Datei. Liegt eine schriftliche Freigabe des Rechteinhabers vor,
ist `"licensed-use"` die genauere Einstufung.

Praktisch unterscheiden sich die beiden nur in einem Satz im Frontend
(„Veröffentlicht mit Erlaubnis des Fotografen" gegenüber „Eventmaterial,
gezeigt mit Erlaubnis … Rechteinhaber"). `canDownload()` liefert in beiden
Fällen `false`. Im Zweifel weiterhin `"restricted"`.

**Eine Freigabe zur Anzeige ist keine Freigabe zur Weitergabe.** Felder aus
dem Auswahl-Manifest wie `release_doc_reference` oder `display_approved`
belegen, woher eine Erlaubnis kommt — sie sind dokumentarisch und wirken
niemals als Schalter. Der Loader ignoriert sie.

---

## Was bewusst nicht gebaut ist

Kein „Download all" als ZIP (Bandbreite und Missbrauchspotenzial ohne
erkennbaren Nutzen — einzelne Downloads reichen), keine Benutzerkonten, keine
Likes oder Kommentare, keine Suche, keine Filter. Sortierung ist „neueste
zuerst". Das kann später dazukommen, wenn genug Alben existieren, dass es fehlt.

**Ab wann die Architektur nicht mehr reicht:** Solange die Bilder im
Git-Repository liegen, ist bei rund **500 MB** Schluss — spätestens dann gehören
sie in einen Objektspeicher mit CDN, und `src` zeigt auf eine externe URL. Bei
2000 px / Qualität 80 sind das grob 1 000 bis 1 500 Bilder. Vorher lohnt die
Migration nicht.
