/**
 * Regeltests der Pumpfoil-Lernseite (seit 02.10.2026).
 *
 * Getestet werden die Stellen, an denen die Seite etwas BEHAUPTEN koennte, was
 * Stand heute nicht stimmt: ein Kursort, ein Preis, eine Qualifikation, ein
 * buchbares Angebot im Markup. Eine solche Zeile faellt im Browser nicht als
 * Fehler auf — die Seite sieht normal aus. Deshalb steht es hier.
 *
 * Ausfuehren aus dem Repository-Wurzelverzeichnis: `node --test tests/`
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

import {
  LESSON_STATUS,
  PUMPFOIL_FAQ,
  PUMPFOIL_META,
  PUMPFOIL_NAME,
  PUMPFOIL_PATH,
  PUMPFOIL_UPDATED,
  lessonMailto,
} from "../src/lib/pumpfoil.ts";

const ROOT = process.cwd();
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const VIEW_DE = "src/views/pumpfoil/PumpfoilDe.tsx";
const VIEW_EN = "src/views/pumpfoil/PumpfoilEn.tsx";
const DIAGRAM = "src/components/pumpfoil/PumpfoilDiagram.tsx";
const DATA = "src/lib/pumpfoil.ts";
const JSONLD = "src/lib/pumpfoil-jsonld.ts";
const ROUTES = ["src/app/(de)/pumpfoil/page.tsx", "src/app/(en)/en/pumpfoil/page.tsx"];

/** Sichtbarer Text einer Quelldatei ohne Kommentare — Kommentare duerfen erklaeren, was NICHT drinsteht. */
function withoutComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const PAGE_TEXT = [VIEW_DE, VIEW_EN, DIAGRAM, DATA].map((f) => withoutComments(read(f))).join("\n");

describe("Pumpfoil-Lernseite", () => {
  test("Pfad und Datum: /pumpfoil, echtes Aenderungsdatum, keine Build-Zeit", () => {
    assert.equal(PUMPFOIL_PATH, "/pumpfoil");
    assert.match(PUMPFOIL_UPDATED, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(PUMPFOIL_UPDATED, "2026-10-02");
    const sitemap = read("src/app/sitemap.ts");
    assert.match(
      sitemap,
      /\{ path: PUMPFOIL_PATH, lastModified: PUMPFOIL_UPDATED,/,
      "Sitemap fuehrt /pumpfoil mit dem gepflegten Datum"
    );
    assert.doesNotMatch(withoutComments(sitemap), /new Date\(\)/, "kein Build-Datum in der Sitemap");
  });

  test("Titel und Beschreibung passen in die Suchergebnisse", () => {
    for (const lang of ["de", "en"] as const) {
      const { title, description } = PUMPFOIL_META[lang];
      // Das Layout haengt " | Devin Hauser" (15 Zeichen) an.
      assert.ok(title.length + 15 <= 60, `${lang} Titel ${title.length + 15} Zeichen`);
      assert.ok(description.length >= 120 && description.length <= 160, `${lang} Beschreibung ${description.length} Zeichen`);
      assert.ok(PUMPFOIL_NAME[lang].length > 0);
    }
    assert.match(PUMPFOIL_META.de.title, /^Pumpfoil lernen/);
    assert.match(PUMPFOIL_META.en.title, /pump foil/i);
  });

  test("Schweizer Hochdeutsch: kein Eszett", () => {
    const de = [
      PUMPFOIL_META.de.title,
      PUMPFOIL_META.de.description,
      ...PUMPFOIL_FAQ.de.flatMap((f) => [f.q, f.a]),
      ...LESSON_STATUS.de.flatMap((s) => [s.label, s.value]),
      read(VIEW_DE),
    ].join("\n");
    assert.doesNotMatch(de, /ß/);
  });

  test("FAQ: DE und EN parallel, Markup nur fuer belastbare Antworten", () => {
    assert.equal(PUMPFOIL_FAQ.de.length, PUMPFOIL_FAQ.en.length);
    assert.deepEqual(
      PUMPFOIL_FAQ.de.map((f) => f.structured),
      PUMPFOIL_FAQ.en.map((f) => f.structured)
    );
    for (const lang of ["de", "en"] as const) {
      for (const item of PUMPFOIL_FAQ[lang]) {
        // Lerndauer und Lektionen: sichtbar ja, im FAQPage-Markup nein.
        if (/lange|long|Lektion|lesson/i.test(item.q)) {
          assert.equal(item.structured, false, item.q);
        }
      }
      // Keine Zahl in den Antworten — weder Lerndauer noch Preis.
      for (const item of PUMPFOIL_FAQ[lang]) {
        assert.doesNotMatch(item.a, /\d/, item.q);
      }
    }
  });

  test("Lektionen: alles offen, keine Zahl, kein Ort", () => {
    for (const lang of ["de", "en"] as const) {
      assert.equal(LESSON_STATUS[lang].length, 6);
      for (const item of LESSON_STATUS[lang]) {
        assert.doesNotMatch(item.value, /\d/, `${lang} ${item.label}`);
      }
    }
  });

  test("keine unbelegten Behauptungen im Seitentext", () => {
    const verboten: [RegExp, string][] = [
      [/CHF|Fr\.\s*\d|€|EUR\b/, "Preis/Waehrung"],
      [/\bBuchs\b|Dielsdorf|Furttal/, "Wohnort — keine Wohngemeinde auf der Website"],
      [/Silvaplan|Engadin|St\.? ?Moritz|Zürichsee|Zuerichsee|Zugersee|Lake Zurich|Lake Zug/i, "Kursort — Zielregion noch offen"],
      [/zertifiziert|certified|VDWS|J\+S|Brevet|SLRG/i, "Qualifikation — keine belegt"],
      [/garantiert|guaranteed|in \d+ (Tagen|Stunden|days|hours)/i, "Erfolgs- oder Dauerversprechen"],
      [/Bewertung|review|Sterne|stars|Öffnungszeit|opening hours/i, "Bewertungen/Oeffnungszeiten"],
      [/<form|type="submit"|onSubmit/, "keine Buchungs- oder Formularfunktion"],
    ];
    for (const [muster, grund] of verboten) {
      assert.doesNotMatch(PAGE_TEXT, muster, grund);
    }
  });

  test("Markup: kein Angebot, kein Kurs, kein Ort", () => {
    const quellen = [JSONLD, ...ROUTES].map(read).join("\n");
    assert.doesNotMatch(
      quellen,
      /"@type":\s*"(Course|CourseInstance|Event|SportsEvent|LocalBusiness|SportsActivityLocation|Organization|Offer|AggregateOffer|Product|Review|AggregateRating|Place)"/,
      "kein Angebots-, Kurs-, Orts- oder Bewertungs-Markup"
    );
    assert.doesNotMatch(withoutComments(read(JSONLD)), /openingHours|priceRange|offers|aggregateRating|location/);
    for (const typ of ["Article", "BreadcrumbList", "FAQPage"]) {
      assert.match(read(JSONLD), new RegExp(`"@type": "${typ}"|breadcrumbJsonLd`), typ);
    }
  });

  test("E-Mail-Weg: mailto mit Betreff und Leitfragen, keine Datenerfassung", () => {
    const email = "kontakt@example.org";
    for (const lang of ["de", "en"] as const) {
      const href = lessonMailto(email, lang);
      assert.ok(href.startsWith(`mailto:${email}?subject=`), href);
      const params = new URLSearchParams(href.slice(href.indexOf("?") + 1));
      assert.match(params.get("subject") ?? "", /Pumpfoil|pump foil/i);
      assert.match(params.get("body") ?? "", /Region/);
    }
    for (const view of [VIEW_DE, VIEW_EN]) {
      assert.match(read(view), /lessonMailto\(CONTACT_EMAIL, "(de|en)"\)/, view);
    }
  });

  test("E-Mail-Weg: keine Antwortzusage, keine Warteliste, Seite wird aktualisiert", () => {
    // Nachbesserung 02.10.2026: Es gibt kein System, mit dem Devin allen
    // Interessenten spaeter zuverlaessig antworten kann. Deshalb keine
    // pauschale Zusage, sich zu melden — stattdessen: Die E-Mail hilft beim
    // Einschaetzen von Interesse und Region, ist weder Buchung noch
    // Warteliste, und die SEITE wird aktualisiert.
    assert.doesNotMatch(
      PAGE_TEXT,
      /melde ich mich|ich melde mich|melde mich bei|get back to you|I will (contact|reply|write to) you|I'll get back|Platz auf der Warteliste|place on the waiting list|added to (a|the) waiting list/i,
      "keine Antwort- oder Wartelisten-Zusage"
    );
    const de = withoutComments(read(VIEW_DE));
    assert.match(de, /keine Buchung und kein Platz auf einer\s+Warteliste/);
    assert.match(de, /wie gross das Interesse ist und in welchen Regionen/);
    assert.match(de, /aktualisiere ich diese Seite/);
    const en = withoutComments(read(VIEW_EN));
    assert.match(en, /not a\s+booking or a place on a waiting list/);
    assert.match(en, /how much interest there is\s+and in which regions/);
    assert.match(en, /I will update\s+this page/);
  });

  test("interne Links: Startseite, iQFOiL-Seite und 404 verweisen auf /pumpfoil", () => {
    for (const f of [
      "src/components/About.tsx",
      "src/views/iqfoil/IqfoilDe.tsx",
      "src/views/iqfoil/IqfoilEn.tsx",
      "src/views/NotFoundView.tsx",
    ]) {
      assert.match(read(f), /localizedPath\(PUMPFOIL_PATH, (lang|"de"|"en")\)/, f);
    }
  });

  test("Bilder: nur das eigene Schaubild, kein Foto", () => {
    for (const view of [VIEW_DE, VIEW_EN]) {
      const source = read(view);
      assert.doesNotMatch(source, /next\/image|<img|\.jpe?g|\.png|\.webp/i, view);
      assert.match(source, /<PumpfoilDiagram lang="(de|en)" \/>/, view);
    }
  });
});
