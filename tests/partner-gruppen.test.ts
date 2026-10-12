/**
 * Regeltests der Partnergruppen (12.10.2026): «Partner & Unterstützer» mit
 * drei Gruppen nach tatsächlicher Leistung — «Sponsoren & Gönner»,
 * «Ausrüstung & Services», «Sportliches Netzwerk».
 *
 * Geprüft wird, was eine Karte öffentlich BEHAUPTET: Gruppe, Zusatz, keine
 * Sponsor-Behauptung für Verbände und Vereine, keine Beträge oder Klassen.
 * Ausführen aus dem Repository-Wurzelverzeichnis: `npm test`
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const SOURCE = fs.readFileSync(path.join(process.cwd(), "src/components/Partners.tsx"), "utf8");
const CODE = SOURCE.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

function cards(): { group: string; name: string; note: string | null }[] {
  const block = CODE.slice(CODE.indexOf("const PARTNERS"), CODE.indexOf("const COPY"));
  return block
    .split(/\n  \{\n/)
    .slice(1)
    .map((entry) => ({
      group: entry.match(/group: "([a-z]+)"/)?.[1] ?? "",
      name: entry.match(/name: "([^"]+)"/)?.[1] ?? "",
      note: entry.match(/note: \{ de: "([^"]+)"/)?.[1] ?? null,
    }));
}
const byGroup = (group: string) => cards().filter((c) => c.group === group).map((c) => c.name);

describe("Partnergruppen", () => {
  test("drei Gruppen in Devins Reihenfolge, Überschrift «Partner & Unterstützer»", () => {
    assert.match(CODE, /GROUP_ORDER: Group\[\] = \["sponsors", "equipment", "network"\]/);
    assert.match(CODE, /heading: "PARTNER & UNTERSTÜTZER"/);
    assert.match(CODE, /heading: "PARTNERS & SUPPORTERS"/);
    assert.match(CODE, /sponsors: "Sponsoren & Gönner",\s*equipment: "Ausrüstung & Services",\s*network: "Sportliches Netzwerk"/);
    assert.match(CODE, /sponsors: "Sponsors & patrons",\s*equipment: "Equipment & services",\s*network: "Sporting network"/);
  });

  test("Einordnung nach tatsächlicher Leistung", () => {
    assert.equal(cards().length, 19);
    assert.deepEqual(byGroup("sponsors"), ["McDonald's Dielsdorf", "Heinz Bär AG", "Trockentech AG", "GHB Ground-Engineering AG", "Micco Fugen- und Bauabdichtungen GmbH", "PM Consulting"]);
    assert.deepEqual(byGroup("equipment"), ["ENSIS", "Drei Plus", "Arnold", "Fanagus", "Kinesiologie Weideli", "Fitnesspark Migros", "Arctic Plunge"]);
    assert.deepEqual(byGroup("network"), ["Swiss Sailing Team", "Swiss Sailing", "RVZS", "DRCS", "Schweizer Sporthilfe", "United School of Sports"]);
  });

  test("Verbände, Vereine, Schule und Stiftung nie als Sponsor", () => {
    for (const name of ["Swiss Sailing Team", "Swiss Sailing", "RVZS", "DRCS", "Schweizer Sporthilfe", "United School of Sports"]) {
      assert.ok(!byGroup("sponsors").includes(name), name);
    }
  });

  test("Zusätze: Teamkleidung, via Sporthilfe — sonst keine", () => {
    const notes = Object.fromEntries(cards().map((c) => [c.name, c.note]));
    assert.equal(notes["Drei Plus"], "Teamkleidung");
    assert.equal(notes["Arnold"], "Teamkleidung");
    assert.equal(notes["McDonald's Dielsdorf"], "via Sporthilfe");
    assert.equal(Object.values(notes).filter(Boolean).length, 3);
  });

  test("keine Klassen, keine Beträge, keine offenen Partner", () => {
    const data = CODE.slice(CODE.indexOf("const PARTNERS"), CODE.indexOf("const NOTE_PADDING"));
    assert.doesNotMatch(data, /Gold|Silber|Silver|Bronze|Premium|Haupt/i);
    assert.doesNotMatch(CODE, /Komeo|BSgroup|BS Group|business\|solution|KID Sanit|Meuli|Schmidli|Steinauer|KA-EX|KEEN/i);
  });
});
