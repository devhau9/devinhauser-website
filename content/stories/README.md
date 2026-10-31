# Geschichten (Regatta / Training)

Eine Datei pro Geschichte. Aufbau immer gleich: **Ziel → Herausforderung → Verlauf → Resultat**, dazu optional Bilder und ein YouTube-Video. Vorlage: `_TEMPLATE.json.example`.

## Regeln (vom Code und von `tests/stories.test.ts` erzwungen)

- `status: "draft"` erscheint nur in der lokalen Vorschau (`STORY_PREVIEW=1`), ist immer `noindex` und steht nie in der Sitemap.
- `status: "published"` braucht Ziel, Herausforderung und Verlauf ohne `[FEHLT NOCH]`; eine Regatta zusätzlich ein Resultat mit Quelle.
- **Kein vorweggenommenes Resultat:** Solange `updated` vor dem Eventende liegt, muss `result` `null` sein.
- Resultat nur mit offizieller Quelle (`sourceUrl`), Feldgrösse aus der Rangliste — nicht aus Meldelisten.
- Bilder nur mit geklärten Rechten und Credit. Die Datei muss unter `public/` liegen.
- `notes` ist intern und wird nie ausgegeben — trotzdem keine Beträge und keine vertraulichen Namen (öffentliches Repo).

## Aufwand

Eine Geschichte pro wichtigem Event reicht. Es gibt keinen Rhythmus, der eingehalten werden muss.
