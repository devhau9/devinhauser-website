/**
 * Regeltests für den Partner-Nachtrag vom 12.10.2026 (Trockentech AG,
 * GHB Ground-Engineering AG) — und für die Unterstützer, die bewusst NOCH
 * NICHT auf der Website stehen (Logo oder Nennungsfreigabe fehlt).
 *
 * Grundlage: Originalmails, Vault «WEBSITE — PARTNER-NACHTRAG — 2026-10-12».
 * Ausführen aus dem Repository-Wurzelverzeichnis: `npm test`
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const ROOT = process.cwd();
const SOURCE = fs.readFileSync(path.join(ROOT, "src/components/Partners.tsx"), "utf8");
const CODE = SOURCE.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

function entry(name: string): string {
  const start = CODE.indexOf(`name: "${name}"`);
  assert.ok(start > 0, `${name} fehlt`);
  const open = CODE.lastIndexOf("{", start);
  return CODE.slice(open, CODE.indexOf("}", start) + 1);
}

describe("Partner-Nachtrag 12.10.2026", () => {
  test("Trockentech AG: eigenes Logo, direkter offizieller Link, Alt-Text", () => {
    const e = entry("Trockentech AG");
    assert.match(e, /src: "\/logos\/trockentech\.png"/);
    assert.match(e, /href: "https:\/\/www\.trockentech\.ch"/);
    assert.match(e, /alt: "Trockentech AG logo"/);
  });

  test("GHB Ground-Engineering AG: Link auf ghb.swiss, nie auf die Casino-Domain", () => {
    const e = entry("GHB Ground-Engineering AG");
    assert.match(e, /href: "https:\/\/www\.ghb\.swiss"/);
    assert.match(e, /alt: "GHB Ground-Engineering AG logo"/);
    assert.doesNotMatch(SOURCE.replace(/\/\/.*$/gm, ""), /georges-bovier/);
  });

  test("keine Weiterleitungs-Links, keine Beträge, keine Sponsor-Bezeichnung", () => {
    // Nur Partnerdaten und Texte — Tailwind-Klassen wie «duration-200» zählen nicht.
    const data = CODE.slice(CODE.indexOf("const PARTNERS"), CODE.indexOf("const NOTE_PADDING"));
    assert.ok(data.length > 500, "Partnerdaten gefunden");
    assert.doesNotMatch(CODE, /google\.com\/url|[?&]q=http/);
    assert.doesNotMatch(data, /CHF|Franken|\b1['’]?000\b|\b500\b|\b300\b|\b200\b/);
    assert.doesNotMatch(CODE, /name: "[^"]*Sponsor/i);
  });

  test("noch nicht freigegeben: Micco, KID, Meuli, Steinauer, Komeo fehlen bewusst", () => {
    assert.doesNotMatch(CODE, /Micco|KID Sanit|Meuli|Steinauer|Komeo/i);
  });

  test("Logodateien existieren und tragen keine EXIF-Daten", () => {
    for (const file of ["trockentech.png", "ghb-ground-engineering.png"]) {
      const bytes = fs.readFileSync(path.join(ROOT, "public/logos", file));
      assert.ok(bytes.length > 1000, file);
      assert.equal(bytes.includes(Buffer.from("Exif")), false, `${file}: EXIF`);
    }
  });
});
