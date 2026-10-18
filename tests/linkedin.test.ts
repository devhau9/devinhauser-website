/**
 * Regeltests für den LinkedIn-Link vom 18.10.2026.
 *
 * LinkedIn ist Devins persönliches berufliches Profil — kein Content-Kanal,
 * kein Partner. Es steht im Kontaktbereich und im Footer, nicht in der
 * Kanal-Sektion und nicht in `SOCIAL_PROFILES` (die iQFOiL-Seiten beschriften
 * jene Liste als Instagram/TikTok/YouTube).
 * Ausführen aus dem Repository-Wurzelverzeichnis: `npm test`
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const ROOT = process.cwd();
const PROFIL = "https://www.linkedin.com/in/devin-h-8155662bb/";

function code(file: string): string {
  return fs
    .readFileSync(path.join(ROOT, file), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const SITE = code("src/lib/site.ts");
const FOOTER = code("src/components/Footer.tsx");
const CONTACT = code("src/components/Contact.tsx");
const SOCIAL = code("src/components/SocialMedia.tsx");

describe("LinkedIn-Profil", () => {
  test("die Adresse steht genau einmal, zentral in site.ts", () => {
    assert.ok(SITE.includes(`LINKEDIN_PROFILE = "${PROFIL}"`));
    for (const [name, src] of [["Footer", FOOTER], ["Kontakt", CONTACT], ["Social Media", SOCIAL]]) {
      assert.ok(!src.includes("linkedin.com"), `${name}: Adresse nicht doppelt im Klartext`);
    }
  });

  test("Footer und Kontakt verlinken das Profil je einmal", () => {
    assert.equal(FOOTER.match(/href: LINKEDIN_PROFILE/g)?.length, 1);
    assert.equal(CONTACT.match(/href=\{LINKEDIN_PROFILE\}/g)?.length, 1);
  });

  test("Kanal-Sektion und SOCIAL_PROFILES bleiben ohne LinkedIn", () => {
    assert.ok(!SOCIAL.includes("LINKEDIN_PROFILE"));
    const liste = SITE.match(/SOCIAL_PROFILES = \[([\s\S]*?)\]/)?.[1] ?? "";
    assert.equal(liste.match(/https:\/\//g)?.length, 3);
    assert.ok(!liste.toLowerCase().includes("linkedin"));
  });

  test("sameAs enthält das Profil zusätzlich zu den Kanälen", () => {
    assert.ok(SITE.includes("sameAs: [...SOCIAL_PROFILES, LINKEDIN_PROFILE]"));
  });

  test("neuer Tab mit noopener noreferrer und Linkname auf DE und EN", () => {
    const kontaktLink = CONTACT.match(/<a\s+href=\{LINKEDIN_PROFILE\}[\s\S]*?>/)?.[0] ?? "";
    assert.match(kontaktLink, /target="_blank"/);
    assert.match(kontaktLink, /rel="noopener noreferrer"/);
    assert.match(kontaktLink, /aria-label=/);
    assert.match(kontaktLink, /focus-visible:outline/);
    for (const text of [
      "LinkedIn – berufliches Profil",
      "LinkedIn – professional profile",
    ]) {
      assert.ok(FOOTER.includes(text), `Footer: ${text}`);
    }
    assert.ok(CONTACT.includes("LinkedIn – berufliches Profil von Devin Hauser"));
    assert.ok(CONTACT.includes("LinkedIn – Devin Hauser's professional profile"));
  });

  test("keine Followerzahlen oder Partnerzuordnung beim LinkedIn-Eintrag", () => {
    const eintrag = FOOTER.match(/name: "LinkedIn"[\s\S]*?\}\s*,\s*\]/)?.[0] ?? "";
    const kontaktTexte = (CONTACT.match(/^\s*linkedin(?:Label)?: ".*",$/gm) ?? []).join("\n");
    assert.ok(eintrag.length > 0);
    assert.equal(kontaktTexte.split("\n").length, 4);
    assert.doesNotMatch(eintrag + kontaktTexte, /follower|\d|sponsor|partner/i);
  });
});
