# Alben

Eine `.json`-Datei je Album. Vorlage: `_TEMPLATE.json.example`.
Vollstaendige Anleitung inklusive Rechtemodell: `docs/media-library.md`.

Dateien, die nicht auf `.json` enden, werden vom Loader ignoriert — deshalb
traegt die Vorlage die Endung `.json.example`.

## Aktueller Stand

Sechs Alben, 53 Bilder, alle mit `"noindex": true`. Sortierung neueste zuerst.

| Slug | Bilder | Datum | Rechteklasse | Credit |
|---|---:|---|---|---|
| `cremia-2026` | 16 | 2026-06-27 | `licensed-use` | `Photo: Tobias Meier` |
| `cadiz-2026` | 5 | 2026-03-10 | `licensed-use` | `© Sailing Energy` |
| `arzachena-2025` | 6 | 2025-10-19 | `licensed-use` | `Sailing Energy` |
| `silvaplana-2025` | 15 | 2025-08-19 | `licensed-use` | `© Sailing Energy` |
| `brest-2025` | 5 | 2025-07-26 | `licensed-use` | `Sailing Energy` |
| `embrun-2024` | 6 | 2024-07-05 | `licensed-use` | `© Sailing Energy / iQfoil Class` |

**Die drei Sailing-Energy-Wortlaute sind kein Fehler.** Jeder stammt aus dem
Feld `photoshop:Credit` der jeweiligen Dateien und wird bewusst nicht
vereinheitlicht — weder ein `©` ergaenzt noch eines entfernt. Ein Test haelt
das fest.

`noindex` heisst hier: fertig gebaut, aber noch nicht freigegeben — es fehlt
Devins Freigabe der Einleitungstexte. Solange kein Album freigegeben ist,
bleibt `/media` auf `noindex` und steht nicht in der Sitemap. Die Albumseiten
selbst sind gebaut und tragen einen sichtbaren Review-Hinweis.

Lokal vollstaendig ansehen:

```bash
npm run preview && npm start
```

Livegang eines Albums ist genau eine Aenderung: `"noindex"` auf `false`.

## Was hier NICHT hingehoert

`*.provenance.json` und `ALBUM-MANIFEST-*.json` aus dem Auswahl-Pack. Die
Provenance-Dateien belegen die Herkunft jeder Bilddatei, die Manifest-Dateien
sind inhaltsgleiche Zweitkopien. Beide erfuellen das Albumschema nicht — der
Loader wuerde sie als kaputtes Album abweisen. Sie bleiben im Review-Pack.

Die SHA-256-Summen der 53 ausgelieferten Bilddateien stehen in
`tests/asset-sha256.csv` und werden bei jedem Testlauf geprueft.
