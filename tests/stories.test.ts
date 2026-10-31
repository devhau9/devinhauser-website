/**
 * Regeltests für Geschichten, Startseite und Partner-Weg (seit 31.10.2026).
 *
 * Geprüft wird, was im Browser nicht auffällt, weil die Seite normal aussieht:
 * ein vorweggenommenes Resultat, ein Entwurf in der Sitemap, ein verlinktes
 * Dossier, eine Newsletter-Ankündigung, die wieder auftaucht.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { getAllStories, getPublishedStories, getVisibleStories, storyProblem } from "../src/lib/stories.ts";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");
const ibiza = JSON.parse(read("content/stories/ibiza-2026.json"));

describe("Geschichten", () => {
  test("Ibiza-Entwurf ist gültig, Entwurf und ohne Resultat", () => {
    assert.equal(storyProblem(ibiza), null);
    assert.equal(ibiza.status, "draft");
    assert.equal(ibiza.result, null);
  });

  test("Ibiza: nur belegte Eckdaten, nicht als iQFOiL- oder Olympia-WM bezeichnet", () => {
    assert.equal(ibiza.startDate, "2026-11-04");
    assert.equal(ibiza.endDate, "2026-11-08");
    assert.equal(ibiza.discipline.de, "Wingfoil");
    const text = JSON.stringify([ibiza.title, ibiza.summary, ibiza.challenge, ibiza.event]);
    assert.doesNotMatch(text, /iQFOiL|olymp|World Sailing|Weltmeister(?!schaft)|Champion\b|Podest|podium/i);
    assert.doesNotMatch(JSON.stringify(ibiza), /EUR|CHF|€/);
  });

  test("kein vorweggenommenes Resultat", () => {
    const early = {
      ...ibiza,
      result: { placement: 5, field: 80, scoring: { de: "x", en: "x" }, sourceUrl: "https://example.org", sourceLabel: "x" },
    };
    assert.match(storyProblem(early) ?? "", /bevor das Event zu Ende ist/);
  });

  test("veröffentlichte Regatta braucht vollständigen Text und ein Resultat", () => {
    assert.match(storyProblem({ ...ibiza, status: "published" }) ?? "", /fehlt/);
  });

  test("Resultat nur mit https-Quelle und Rang innerhalb des Feldes", () => {
    const base = { ...ibiza, updated: "2026-11-09" };
    const r = { placement: 5, field: 80, scoring: { de: "x", en: "x" }, sourceUrl: "https://example.org", sourceLabel: "x" };
    assert.equal(storyProblem({ ...base, result: r }), null);
    assert.match(storyProblem({ ...base, result: { ...r, sourceUrl: "" } }) ?? "", /Quelle/);
    assert.match(storyProblem({ ...base, result: { ...r, placement: 81 } }) ?? "", /ausserhalb/);
  });

  test("Video nur mit eigenem Vorschaubild", () => {
    assert.match(storyProblem({ ...ibiza, video: { youtubeId: "qtws3inEID0", title: "x" } }) ?? "", /Vorschaubild/);
  });

  test("ohne STORY_PREVIEW werden Entwürfe nicht gebaut und stehen nie in der Sitemap", () => {
    delete process.env.STORY_PREVIEW;
    assert.ok(getAllStories().some((s) => s.slug === "ibiza-2026"));
    assert.equal(getVisibleStories().some((s) => s.status === "draft"), false);
    assert.equal(getPublishedStories().some((s) => s.status === "draft"), false);
    process.env.STORY_PREVIEW = "1";
    assert.ok(getVisibleStories().some((s) => s.slug === "ibiza-2026"));
    assert.equal(getPublishedStories().some((s) => s.status === "draft"), false);
    delete process.env.STORY_PREVIEW;
  });
});

describe("Startseite und Partner-Weg", () => {
  const home = read("src/views/HomeView.tsx");
  const sponsoring = read("src/components/Sponsoring.tsx");

  test("keine Newsletter-Ankündigung mehr", () => {
    assert.equal(fs.existsSync(path.join(process.cwd(), "src/components/Newsletter.tsx")), false);
    assert.doesNotMatch(home, /<Newsletter\b/);
  });

  test("Partner werden: Beispiele ausdrücklich nach Vereinbarung", () => {
    assert.match(sponsoring, /badge: "Nach Vereinbarung"/);
    assert.match(sponsoring, /badge: "By agreement"/);
  });

  test("Partner werden: kein Dossier-Download, keine Beträge, keine Reichweite, keine Exklusivität", () => {
    const code = sponsoring.replace(/^\s*\/\/.*$/gm, "");
    assert.doesNotMatch(code, /\.pdf|download/i);
    assert.doesNotMatch(code, /CHF|EUR|€|\d['’]\d{3}/);
    assert.doesNotMatch(code, /Follower|Reichweite von|reach of|exklusiv|exclusive/i);
  });

  test("Partner werden: Resultate nur aus der belegten Liste", () => {
    const highlights = read("src/components/Highlights.tsx");
    for (const [rank, field] of [["2", "27"], ["3", "45"], ["5", "13"]]) {
      assert.match(sponsoring, new RegExp(`${rank}\\. von ${field}`));
      assert.match(highlights, new RegExp(`placement: "${rank}\\.", suffix: "von ${field}"`));
    }
  });

  test("YouTube lädt erst nach Klick, über youtube-nocookie", () => {
    const facade = read("src/components/YouTubeFacade.tsx");
    assert.match(facade, /\{playing \? \(\s*<iframe/);
    assert.match(facade, /youtube-nocookie\.com\/embed/);
    assert.doesNotMatch(facade, /i\.ytimg\.com|img\.youtube\.com/);
  });
});
