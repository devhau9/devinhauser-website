/**
 * Steckbrief: Körpergrösse 177 cm (Devins Angabe vom 25.10.2026) in DE, EN
 * und in den strukturierten Daten — überall derselbe Wert.
 * Ausführen aus dem Repository-Wurzelverzeichnis: `npm test`
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const ROOT = process.cwd();
const ABOUT = fs.readFileSync(path.join(ROOT, "src/components/About.tsx"), "utf8");
const SITE = fs.readFileSync(path.join(ROOT, "src/lib/site.ts"), "utf8");

describe("Steckbrief", () => {
  test("Grösse 177 cm in DE und EN", () => {
    assert.match(ABOUT, /\{ label: "Grösse", value: "177 cm" \}/);
    assert.match(ABOUT, /\{ label: "Height", value: "177 cm" \}/);
    assert.doesNotMatch(ABOUT, /178 cm/);
  });

  test("strukturierte Daten mit derselben Grösse", () => {
    assert.match(SITE, /height: \{ "@type": "QuantitativeValue", value: 177, unitCode: "CMT" \}/);
  });
});
