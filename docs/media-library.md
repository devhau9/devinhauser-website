# Media Library — Anleitung

Ein Album ist **ein Ordner mit Bildern plus eine JSON-Datei**. Kein Code, kein CMS,
keine Datenbank. Nach dem Export der Bilder dauert ein Album rund 15 Minuten.

---

## Album veröffentlichen — sechs Schritte

1. **Bilder exportieren** (siehe „Export" unten) nach `public/media/<slug>/`.
   Slug-Format: `<ort>-<jahr>-<monat>-<tag>`, z. B. `silvaplana-2026-08-09`.
2. **Metadaten schreiben:** `content/albums/<slug>.json` — Vorlage ist
   `content/albums/_TEMPLATE.json.example`.
3. **Rechte setzen** — siehe „Rechte" unten. Im Zweifel `"restricted"`.
4. **Lokal prüfen:** `npm run dev` → `http://localhost:3000/media/<slug>`
5. **Bauen:** `npm run build` — muss fehlerfrei durchlaufen.
6. **Deployen und Link teilen:** `https://devinhauser.com/media/<slug>`

Ein Album erscheint automatisch auf `/media`, in der Navigation und in der
Sitemap. Solange kein einziges Album existiert, ist `/media` bewusst auf
`noindex` und in keiner Navigation verlinkt — alle drei schalten sich mit dem
ersten Album von selbst um. Es ist keine Codeänderung nötig.

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

```jsonc
{
  "slug": "silvaplana-2026-08-09",      // = Ordnername unter public/media/
  "title": "IQFoil Training — Silvaplana",
  "date": "2026-08-09",                  // ISO, steuert Sortierung + Sitemap
  "location": "Lake Silvaplana, Switzerland",
  "sport": "IQFoil",
  "description": "Ein bis zwei Sätze. Erscheint auf der Seite und im Sharing-Text.",
  "photographer": "Devin Hauser",
  "credit": "Photos: Devin Hauser",
  "rights": "own",                       // own | licensed-use | restricted
  "downloadAllowed": true,               // wirkt nur bei rights: "own"
  "coverImage": "/media/silvaplana-2026-08-09/2026-08-09_silvaplana_iqfoil_001.jpg",
  "tags": ["IQFoil", "Silvaplana"],
  "noindex": false,                      // true = vorbereiten, noch nicht indexieren
  "images": [
    {
      "src": "/media/silvaplana-2026-08-09/2026-08-09_silvaplana_iqfoil_001.jpg",
      "alt": "IQFoil rider foiling across Lake Silvaplana in afternoon wind",
      "width": 2000,
      "height": 1333,
      "caption": "Optional",            // optional
      "credit": "Optional",             // optional, überschreibt Album-Credit
      "downloadSrc": "/media/.../..._001-2560.jpg", // optional
      "downloadAllowed": false          // optional, kann nur EINSCHRÄNKEN
    }
  ]
}
```

`width` und `height` sind Pflicht — ohne sie springt das Layout beim Laden
(Cumulative Layout Shift). Beide Werte stehen im Exportdialog.

**Alt-Texte:** beschreiben, was zu sehen ist. Ein Satz. Keine Stichwortlisten.
Gut: `"IQFoil rider foiling across Lake Silvaplana in afternoon wind"`.
Schlecht: `"iqfoil silvaplana windsurfing foil racing switzerland"`.

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
