# Strukturierte Daten 26.08.2026

Geprüft gegen die **Live-Seite**, Stand `ee66e9c`. Elf Seiten abgerufen, jeder
JSON-LD-Block einzeln geparst und gegen die Anforderungen des
Rich-Results-Tests geprüft.

**Ergebnis: keine Fehler, keine Warnungen.**

---

## Welcher Block liegt auf welcher Seite

| Seite | Blöcke |
|---|---|
| `/` und `/en` | Person, WebSite, ProfilePage |
| `/iqfoil` und `/en/iqfoil` | Person, WebSite, Article |
| `/media` und `/en/media` | Person, WebSite, BreadcrumbList |
| `/media/<album>` (12 Alben, DE und EN) | Person, WebSite, BreadcrumbList, ImageGallery |
| `/partner-portal` | Person, WebSite |

Alle Blöcke sind gültiges JSON, jeder hat `@context` und `@type`, nirgends ein
ungeschütztes `<` oder `>` im ausgelieferten Skript.

---

## Person

```
@id          https://www.devinhauser.com/#person
name         Devin Hauser
jobTitle     IQFoil- und Wingfoil-Racer   (EN: IQFoil & Wingfoil Racing Athlete)
url          https://www.devinhauser.com/
image        …/images/about-portrait.jpg
nationality  Country / Switzerland
sameAs       Instagram, TikTok, YouTube
```

Die `@id` ist in **beiden** Sprachen dieselbe — es gibt einen Devin Hauser,
nicht zwei. Zwei verschiedene Kennungen würden Suchmaschinen zwei Personen
melden und das Signal halbieren.

**Zu „Person oder Athlete":** schema.org kennt **keinen** Typ `Athlete`.
`Person` mit `jobTitle` ist die korrekte und einzige Auszeichnung dafür.
`SportsOrganization` und `SportsTeam` gäbe es, passen hier aber nicht.

---

## ImageGallery — `photographerKind` steuert richtig

Für jedes der zwölf Alben geprüft, welcher `author`-Typ herauskommt:

| Album | Author |
|---|---|
| `cremia-2026` | **Person** / Tobias Meier |
| `swissfoiling-2023` | **Person** / Marc Weiler |
| `silvaplana-2025` · `silvaplana-worlds-2024` · `cadiz-2026` · `cadiz-2025` · `lanzarote-2026` · `arzachena-2025` · `portimao-2025` · `brest-2025` · `embrun-2024` · `sa-rapita-2024` | **Organization** / Sailing Energy |

Zwei Person, zehn Organization — genau das, was die Felder `photographerKind`
in den Album-Dateien vorgeben. Kein Album ohne Author, keiner mit falschem Typ.

Jede ImageGallery trägt ausserdem `name`, `description`, `datePublished` und
`contentLocation`.

**`image[]` fehlt in allen zwölf — das ist Absicht.** Die Liste einzelner
`ImageObject` mit `contentUrl` ist die ausdrückliche Einladung an Google
Images, die Dateien selbst zu indexieren und in den Suchergebnissen
auszuliefern. Sie wird nur ausgegeben, wenn **jedes** Bild eines Albums
eigenes Material ist. Alle zwölf Alben sind `licensed-use`, also fremdes
Material mit Anzeigerecht — die Liste bleibt weg. Das ist kein fehlendes Feld,
sondern das Rechtemodell bei der Arbeit.

---

## Article auf der IQFoil-Seite

Alle Pflichtfelder für das Article-Rich-Result vorhanden:

`headline` · `image` · `datePublished` · `dateModified` · `author` ·
`publisher` · `mainEntityOfPage` · `inLanguage` · `description` · `about`

`author` und `publisher` verweisen per `@id` auf den Person-Knoten, statt ihn
zu wiederholen. Sauber verknüpft.

---

## BreadcrumbList

Auf `/media` und allen Albumseiten, in beiden Sprachen. `position` läuft
lückenlos von 1 bis n, jedes `ListItem` hat `name` und `item`. Das sichtbare
Breadcrumb auf der Seite stimmt mit dem Markup überein — Google warnt sonst
genau dort.

---

## Graph-Verknüpfung

```
ProfilePage  --mainEntity-->  Person (#person)
ProfilePage  --isPartOf   -->  WebSite (#website)
WebSite      --publisher  -->  Person (#person)
Article      --author     -->  Person (#person)
Article      --publisher  -->  Person (#person)
```

Konsistent, keine verwaisten Verweise.

---

## Eine Beobachtung ohne Handlungsbedarf

`WebSite` benutzt in beiden Sprachen dieselbe `@id`, trägt aber je Sprache ein
anderes `inLanguage` und eine andere `description`. Wer die Daten strikt nach
`@id` zusammenführt, sieht für einen Knoten zwei Werte.

Das ist **kein Fehler** und erzeugt keine Warnung im Rich-Results-Test —
Suchmaschinen werten strukturierte Daten seitenweise aus. Eine „Korrektur"
ginge nur über die Beschreibungstexte, und die sind bei dir gerade in
Überarbeitung. Ich lasse es deshalb bewusst stehen und nenne es nur, damit es
dir nicht als Neuigkeit begegnet.

`ProfilePage` hat dagegen bewusst zwei Kennungen (`/#profilepage` und
`/en#profilepage`) — es sind ja auch zwei verschiedene Seiten. Richtig so.

---

## Nachprüfen kannst du das so

`https://search.google.com/test/rich-results` mit einer Album-URL, zum
Beispiel `https://www.devinhauser.com/media/cremia-2026`. Erwartung: erkannte
Elemente ohne Fehler und ohne Warnungen. Für die Startseite dasselbe mit
`https://www.devinhauser.com/`.
