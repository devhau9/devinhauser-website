# Alben

Eine `.json`-Datei je Album. Vorlage: `_TEMPLATE.json.example`.
Vollstaendige Anleitung inklusive Rechtemodell: `docs/media-library.md`.

Dateien, die nicht auf `.json` enden, werden vom Loader ignoriert — deshalb
traegt die Vorlage die Endung `.json.example`.

## Aktueller Stand — veroeffentlicht

Dreizehn Eventalben, 76 Bilder, alle `"noindex": false`. Sortierung neueste
zuerst; die Startseite zeigt die drei neuesten.

| Slug | Bilder | Datum | Credit |
|---|---:|---|---|
| `cremia-2026` | 16 | 2026-06-27 | `Photo: Tobias Meier` |
| `cadiz-2026` | 5 | 2026-03-10 | `© Sailing Energy` |
| `lanzarote-2026` | 3 | 2026-02-07 | `© Sailing Energy` |
| `arzachena-2025` | 6 | 2025-10-19 | `Sailing Energy` |
| `portimao-2025` | 2 | 2025-09-11 | `Sailing Energy` |
| `silvaplana-2025` | 15 | 2025-08-19 | `© Sailing Energy` |
| `brest-2025` | 5 | 2025-07-26 | `Sailing Energy` |
| `cadiz-2025` | 3 | 2025-03-10 | `© Sailing Energy` |
| `sa-rapita-2024` | 3 | 2024-10-28 | `© Sailing Energy / Iqfoil Class` |
| `silvaplana-worlds-2024` | 3 | 2024-08-20 | `© Sailing Energy` |
| `embrun-2024` | 6 | 2024-07-05 | `© Sailing Energy / iQfoil Class` |
| `swiss-sm-pumpfoil-2023` | 7 | 2023-08-18 | `Photo: Lukas Pitsch` |
| `swissfoiling-2023` | 2 | 2023-05-06 | `Photo: Marc Weiler` |

**Die sieben Creditformen sind kein Fehler.** Jede stammt aus dem Feld
`photoshop:Credit` beziehungsweise dem EXIF-Feld `Artist` der jeweiligen
Dateien und wird bewusst nicht vereinheitlicht — weder ein `©` ergaenzt noch
eines entfernt. `© Sailing Energy / iQfoil Class` und
`© Sailing Energy / Iqfoil Class` unterscheiden sich nur in einem Buchstaben
und bleiben trotzdem getrennt. Ein Test haelt das fest.

## Was hier NICHT hingehoert

`*.provenance.json` und `ALBUM-MANIFEST-*.json` aus dem Auswahl-Pack. Beide
erfuellen das Albumschema nicht — der Loader wuerde sie als kaputtes Album
abweisen. Sie bleiben im Review-Pack.

Die SHA-256-Summen aller 76 Bilddateien stehen in `tests/asset-sha256.csv` und
werden bei jedem Testlauf geprueft.

## Noch nicht integriert

Aus Devins Auswahl bleiben 21 Dateien draussen, weil zu ihnen **kein Fotograf
dokumentiert** ist — nicht wegen einer Rechtefrage: elf Bilder Trainingscamp
Cremia 2025, neun Bilder Trainingscamp Sils, ein Teambild. Der Loader verlangt
fuer Fremdmaterial einen belegten Credit, und einen erfundenen gibt es nicht.
Sobald der Fotograf benannt ist, koennen sie nachruecken.
