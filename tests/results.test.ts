/**
 * Regeltests der Resultatliste (src/components/Highlights.tsx), seit 04.10.2026.
 *
 * Highlights.tsx ist eine TSX-Komponente und laesst sich mit `node --test`
 * nicht importieren. Geprueft wird deshalb der Quelltext — genau die Stellen,
 * an denen eine falsche Zahl im Browser nicht auffaellt, weil die Seite normal
 * aussieht.
 *
 * Puck 2026: Rang 64, Feldgroesse 108 laut offizieller Rangliste «IQ FOIL Men»
 * (sailti, Stand 03.10.2026 13:59:33). Die frueher bekannten 112 (Meldestand
 * 24.09.) und 155 (Maenner + Frauen) duerfen NIE als Feldgroesse erscheinen.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const source = fs.readFileSync(path.join(process.cwd(), "src/components/Highlights.tsx"), "utf8");
const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** Alle Resultatzeilen einer Sprache aus dem Quelltext. */
function rows(lang: "de" | "en"): string[] {
  const start = code.indexOf(`${lang}: {`);
  const block = code.slice(start, code.indexOf("note:", start));
  return [...block.matchAll(/\{ placement: "[^"]+",[^}]*\}/g)].map((m) => m[0]);
}

describe("Ausgewählte Resultate", () => {
  test("DE und EN fuehren dieselbe Anzahl Zeilen", () => {
    assert.equal(rows("de").length, rows("en").length);
    assert.equal(rows("de").length, 7);
  });

  test("Puck-WM-Resultat auf Wunsch von Devin nicht öffentlich ausgewählt", () => {
    assert.doesNotMatch(code, /Puck|64th|von 108|of 108/);
  });

  test("keine Meldezahl und keine Gesamtzahl als Feldgroesse", () => {
    assert.doesNotMatch(code, /(von|of) (112|155)\b/);
  });

});
