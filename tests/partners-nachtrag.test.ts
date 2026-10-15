/**
 * Regeltests für den Partner-Nachtrag vom 12.10.2026 (Trockentech AG,
 * GHB Ground-Engineering AG) — und für die Unterstützer, die bewusst NOCH
 * NICHT auf der Website stehen (Logo oder Nennungsfreigabe fehlt).
 *
 * Grundlage: Originalmails, Vault «WEBSITE — PARTNER-NACHTRAG — 2026-10-12».
 * Ausführen aus dem Repository-Wurzelverzeichnis: `npm test`
 */

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const ROOT = process.cwd();
const SOURCE = fs.readFileSync(path.join(ROOT, "src/components/Partners.tsx"), "utf8");
const CODE = SOURCE.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

// Wer ausdrücklich nicht genannt werden möchte, steht auch in diesem öffentlichen
// Test nicht im Klartext: Geprüft wird jedes Wort gegen den SHA-256 des
// kleingeschriebenen Namens.
const OHNE_NENNUNG = new Set(["8195f0dd302f467e2eaf10359028cebe55908db00b67f017e40c040192d4466c"]);

function nennungen(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}-]+/u)
    .filter((w) => OHNE_NENNUNG.has(crypto.createHash("sha256").update(w).digest("hex")));
}

function quelltexte(dir: string): string[] {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((d) => {
    const rel = path.join(dir, d.name);
    if (d.isDirectory()) return quelltexte(rel);
    return /\.(tsx?|mjs|js|json|md|css)$/.test(d.name) ? [rel] : [];
  });
}

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

  test("Unterstützer ohne Nennungswunsch: nirgends in src/ und tests/, auch nicht in Kommentaren", () => {
    for (const file of quelltexte("src").concat(quelltexte("tests"))) {
      assert.deepEqual(nennungen(fs.readFileSync(path.join(ROOT, file), "utf8")), [], file);
    }
  });

  test("Gradmann und Komeo: Original-Logo, offizieller Link, Alt-Text (14.10.2026)", () => {
    const gradmann = entry("Unternehmensberatung Gradmann");
    assert.match(gradmann, /src: "\/logos\/gradmann\.png"/);
    assert.match(gradmann, /href: "https:\/\/www\.gradmann\.ch"/);
    assert.match(gradmann, /alt: "Unternehmensberatung Gradmann logo"/);
    const komeo = entry("Komeo AG");
    assert.match(komeo, /group: "equipment"/);
    assert.match(komeo, /src: "\/logos\/komeo\.png"/);
    assert.match(komeo, /href: "https:\/\/www\.komeo\.ch"/);
    assert.match(komeo, /alt: "Komeo AG logo"/);
  });

  test("Textkarten 13.10.2026: geprüfter Name, offizieller Link, kein Logo", () => {
    const expected: [string, string, string][] = [
      ["Business Solution Group AG", "sponsors", "https://www.bsgroup.ch"],
      ["KID Sanitär & Heizung GmbH", "sponsors", "https://www.kid-sanitaer.ch"],
      ["Künzle Druck AG", "equipment", "https://www.kuenzledruck.ch"],
    ];
    for (const [name, group, href] of expected) {
      const e = entry(name);
      assert.match(e, /src: null/, name);
      assert.ok(e.includes(`group: "${group}"`), name);
      assert.ok(e.includes(`href: "${href}"`), name);
      assert.doesNotMatch(e, /alt:/, name);
    }
  });

  test("R. Meuli Elektro AG: Firmenlogo und Firmenlink, keine Person genannt", () => {
    const e = entry("R. Meuli Elektro AG");
    assert.match(e, /src: "\/logos\/meuli-elektro\.png"/);
    assert.match(e, /href: "https:\/\/www\.meulielektro\.ch"/);
    assert.match(e, /alt: "R\. Meuli Elektro AG logo"/);
    assert.doesNotMatch(CODE, /Schmidli|Siegrist/);
  });

  test("Steinauer Immobilien AG: Logo vom 15.10.2026, offizieller Link, Alt-Text", () => {
    const e = entry("Steinauer Immobilien AG");
    assert.match(e, /src: "\/logos\/steinauer-immobilien\.png"/);
    assert.match(e, /group: "sponsors"/);
    assert.match(e, /href: "https:\/\/www\.steinauer-immo\.ch"/);
    assert.match(e, /alt: "Steinauer Immobilien AG logo"/);
  });

  test("Micco und Arctic Plunge: eigenes Logo, offizieller Link, Alt-Text", () => {
    const micco = entry("Micco Fugen- und Bauabdichtungen GmbH");
    assert.match(micco, /src: "\/logos\/micco-fugen\.png"/);
    assert.match(micco, /href: "https:\/\/www\.micco-fugen\.ch"/);
    assert.match(micco, /alt: "Micco Fugen- und Bauabdichtungen GmbH logo"/);
    const arctic = entry("Arctic Plunge");
    assert.match(arctic, /src: "\/logos\/arctic-plunge\.svg"/);
    assert.match(arctic, /href: "https:\/\/www\.arcticplunge\.ch"/);
    const svg = fs.readFileSync(path.join(ROOT, "public/logos/arctic-plunge.svg"), "utf8");
    assert.doesNotMatch(svg, /<script|\son\w+=|foreignObject|href="http/i);
  });

  test("Logodateien existieren und tragen keine EXIF-Daten", () => {
    for (const file of ["trockentech.png", "ghb-ground-engineering.png", "micco-fugen.png", "meuli-elektro.png", "gradmann.png", "komeo.png", "steinauer-immobilien.png"]) {
      const bytes = fs.readFileSync(path.join(ROOT, "public/logos", file));
      assert.ok(bytes.length > 1000, file);
      assert.equal(bytes.includes(Buffer.from("Exif")), false, `${file}: EXIF`);
    }
  });
});
