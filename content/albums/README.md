# Alben

Eine `.json`-Datei je Album. Vorlage: `_TEMPLATE.json.example`.
Vollstaendige Anleitung inklusive Rechtemodell: `docs/media-library.md`.

Dateien, die nicht auf `.json` enden, werden vom Loader ignoriert — deshalb
traegt die Vorlage die Endung `.json.example`.

## Aktueller Stand

Zwei Alben liegen vor, beide mit `"noindex": true`:

| Slug | Bilder | Rechteklasse | Credit |
|---|---:|---|---|
| `silvaplana-2025` | 15 | `licensed-use` | `© Sailing Energy` |
| `cremia-2026` | 15 | `licensed-use` | `Photo: Tobias Meier` |

`noindex` heisst hier: fertig gebaut, aber noch nicht freigegeben — es fehlt
Devins Freigabe der Einleitungstexte. Solange kein Album freigegeben ist,
bleibt `/media` auf `noindex` und steht nicht in der Sitemap. Die
Albumseiten selbst sind gebaut und tragen einen sichtbaren Review-Hinweis.

Lokal vollstaendig ansehen:

```bash
npm run preview && npm start
```

Livegang eines Albums ist genau eine Aenderung: `"noindex"` auf `false`.

## Was hier NICHT hingehoert

`*.provenance.json` aus dem Auswahl-Pack. Diese Dateien belegen die Herkunft
jeder Bilddatei und erfuellen das Albumschema nicht — der Loader wuerde sie als
kaputtes Album abweisen. Sie bleiben im Review-Pack auf der Platte.
