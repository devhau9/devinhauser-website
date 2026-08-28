/**
 * Regeltests der Media Library.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM OHNE TESTFRAMEWORK
 * ─────────────────────────────────────────────────────────────────────────────
 * Das Projekt installiert bewusst keine neuen Abhängigkeiten. Node 24 führt
 * TypeScript direkt aus und bringt mit `node:test` einen vollwertigen Runner
 * mit. Ausführen:
 *
 *   node --test tests/
 *
 * Muss aus dem Repository-Wurzelverzeichnis laufen — `getAllAlbums()` liest
 * relativ zu `process.cwd()`.
 *
 * Getestet werden die Regeln, die eine RECHTSAUSSAGE erzeugen: Rechteklasse,
 * Credit-Pflicht, Download-Sperre, Urheberangabe im JSON-LD. Das sind genau
 * die Stellen, an denen ein stiller Fehler nicht als Fehler auffällt, weil die
 * Seite normal aussieht.
 */

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

import {
  albumAuthorJsonLd,
  albumHasDownloads,
  albumProblem,
  canDownload,
  displayCredit,
  effectiveRights,
  getAllAlbums,
  getListedAlbums,
  getPublicAlbums,
  imageCredit,
  rightsClassesInAlbum,
} from "../src/lib/albums.ts";
import type { Album, AlbumImage } from "../src/lib/album-types.ts";

/** Ein gültiges Minimalalbum, das jeder Test gezielt verbiegt. */
function baseAlbum(overrides: Partial<Album> = {}): Album {
  return {
    slug: "test-album",
    date: "2026-01-01",
    title: { de: "Testalbum", en: "Test album" },
    description: { de: "Beschreibung", en: "Description" },
    location: "Zürich, Schweiz",
    sport: "IQFoil",
    photographer: "Devin Hauser",
    credit: "Photo: Devin Hauser",
    rights: "own",
    downloadAllowed: true,
    coverImage: "/media/test-album/001.jpg",
    images: [image()],
    ...overrides,
  };
}

function image(overrides: Partial<AlbumImage> = {}): AlbumImage {
  return {
    src: "/media/test-album/001.jpg",
    alt: { de: "Alt-Text", en: "Alt text" },
    width: 2000,
    height: 1333,
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// JSON-LD — Urheberangabe
// ═══════════════════════════════════════════════════════════════════════════

describe("albumAuthorJsonLd", () => {
  test("natürliche Person wird als Person ausgezeichnet", () => {
    const album = baseAlbum({
      photographer: "Tobias Meier",
      photographerKind: "person",
    });
    assert.deepEqual(albumAuthorJsonLd(album), {
      "@type": "Person",
      name: "Tobias Meier",
    });
  });

  test("Organisation wird als Organization ausgezeichnet", () => {
    const album = baseAlbum({
      photographer: "Sailing Energy",
      photographerKind: "organization",
    });
    assert.deepEqual(albumAuthorJsonLd(album), {
      "@type": "Organization",
      name: "Sailing Energy",
    });
  });

  test("ohne photographerKind gibt es KEINEN Author", () => {
    // Der eigentliche Fehler, den dieser Code behebt: Vorher stand hier fest
    // "Person". Lieber gar keine Angabe als eine geratene.
    const album = baseAlbum({ photographer: "Sailing Energy" });
    assert.equal(albumAuthorJsonLd(album), null);
  });

  test("leerer Fotografenname gibt keinen Author", () => {
    const album = baseAlbum({ photographer: "   ", photographerKind: "person" });
    assert.equal(albumAuthorJsonLd(album), null);
  });

  test("es gibt keine Namensheuristik", () => {
    // „Marc Weiler Photography & Film“ enthält einen Personennamen und ist
    // trotzdem ein Betrieb. Ohne ausdrückliches Feld darf nichts abgeleitet
    // werden — in keine der beiden Richtungen.
    const firmaMitPersonennamen = baseAlbum({
      photographer: "Marc Weiler Photography & Film",
    });
    assert.equal(albumAuthorJsonLd(firmaMitPersonennamen), null);

    const einwortname = baseAlbum({ photographer: "Sailing Energy AG" });
    assert.equal(albumAuthorJsonLd(einwortname), null);
  });

  test("ungültiges photographerKind wird abgelehnt, nicht ignoriert", () => {
    const problem = albumProblem({
      ...baseAlbum(),
      photographerKind: "Person",
    });
    assert.match(String(problem), /photographerKind/);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Rechteklassen — gemischte Alben, Verschärfen erlaubt, Lockern verboten
// ═══════════════════════════════════════════════════════════════════════════

describe("Rechteklassen", () => {
  test("gemischtes Album own + licensed-use + restricted ist gültig", () => {
    const album = baseAlbum({
      rights: "own",
      images: [
        image({ src: "/media/test-album/001.jpg" }),
        image({
          src: "/media/test-album/002.jpg",
          rights: "licensed-use",
          credit: "Photo: Tobias Meier",
        }),
        image({
          src: "/media/test-album/003.jpg",
          rights: "restricted",
          credit: "© Sailing Energy",
        }),
      ],
    });
    assert.equal(albumProblem(album), null);
    assert.deepEqual(rightsClassesInAlbum(album), [
      "own",
      "licensed-use",
      "restricted",
    ]);
  });

  test("ein Bild darf die Album-Klasse nicht lockern", () => {
    const album = baseAlbum({
      rights: "restricted",
      credit: "© Sailing Energy",
      images: [image({ rights: "own" })],
    });
    const problem = albumProblem(album);
    assert.match(String(problem), /lockerer|einschränken/);
  });

  test("effectiveRights nimmt immer die strengere Klasse", () => {
    const album = baseAlbum({ rights: "licensed-use", credit: "© Agentur" });
    assert.equal(
      effectiveRights(album, image({ rights: "restricted" })),
      "restricted"
    );
    // Zweite Sicherung: Selbst wenn eine gelockerte Angabe am Loader vorbei
    // hierher käme, gilt die Albumklasse.
    assert.equal(effectiveRights(album, image({ rights: "own" })), "licensed-use");
    assert.equal(effectiveRights(album, image()), "licensed-use");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Credit-Pflicht
// ═══════════════════════════════════════════════════════════════════════════

describe("Credit-Pflicht", () => {
  test("Fremdmaterial ohne Credit wird abgelehnt", () => {
    const album = baseAlbum({
      rights: "own",
      images: [image({ rights: "licensed-use", credit: "   " })],
    });
    assert.match(String(albumProblem(album)), /Credit/);
  });

  test("Fremdalbum ohne Album-Credit wird abgelehnt", () => {
    const album = baseAlbum({ rights: "licensed-use", credit: "" });
    assert.match(String(albumProblem(album)), /Credit|credit/);
  });

  test("Fremdmaterial bekommt NIE die Archivzeile als Notnagel", () => {
    // Der gefährliche Fall: fehlender Credit + Fremdmaterial. `displayCredit()`
    // allein würde „Bild: Archiv Devin Hauser“ liefern und damit ein fremdes
    // Foto Devin zuschreiben. `imageCredit()` gibt stattdessen den Albumcredit
    // oder gar nichts zurück — nie die Archivzeile.
    const album = baseAlbum({ rights: "licensed-use", credit: "© Sailing Energy" });
    assert.equal(imageCredit(album, image(), "de"), "© Sailing Energy");

    const ohneJeden = baseAlbum({ rights: "licensed-use", credit: "  " });
    assert.equal(imageCredit(ohneJeden, image(), "de"), null);
    assert.equal(imageCredit(ohneJeden, image(), "en"), null);
  });

  test("ein leerer Bild-Credit fällt NICHT auf den Albumcredit zurück", () => {
    // `credit: ""` ist eine ausdrückliche Angabe, kein fehlender Wert — `??`
    // greift nur bei null/undefined. Das ist gewollt: Wer den Credit eines
    // Bildes bewusst leert, soll nicht stillschweigend den Albumcredit
    // untergeschoben bekommen. Der Loader lehnt so ein Album deshalb ab,
    // statt es mit fremdem Bild ohne Credit auszuliefern.
    const album = baseAlbum({
      rights: "licensed-use",
      credit: "© Sailing Energy",
      images: [image({ credit: "" })],
    });
    assert.match(String(albumProblem(album)), /Credit/);
    assert.equal(imageCredit(album, album.images[0], "de"), null);
  });

  test("unbelegtes „Photo: Hauser“ wird durch die Archivzeile ersetzt", () => {
    assert.equal(displayCredit("Photo: Hauser", "de"), "Bild: Archiv Devin Hauser");
    assert.equal(displayCredit("photo hauser", "en"), "Image: Devin Hauser archive");
    // Ein vollständiger Personenname bleibt unverändert.
    assert.equal(displayCredit("Photo: Tobias Meier", "de"), "Photo: Tobias Meier");
    assert.equal(displayCredit("Photo: Devin Hauser", "de"), "Photo: Devin Hauser");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Download-Sperre
// ═══════════════════════════════════════════════════════════════════════════

describe("Download-Sperre", () => {
  test("DOWNLOADS_ENABLED=false schlägt jede Inhaltsangabe", () => {
    // Bestmöglicher Fall für einen Download: eigenes Material, Album erlaubt,
    // Bild erlaubt. Trotzdem false.
    const album = baseAlbum({
      rights: "own",
      downloadAllowed: true,
      images: [image({ downloadAllowed: true })],
    });
    assert.equal(canDownload(album, album.images[0]), false);
    assert.equal(albumHasDownloads(album), false);
  });

  test("keines der ausgelieferten Alben bietet einen Download an", () => {
    for (const album of getAllAlbums()) {
      assert.equal(
        albumHasDownloads(album),
        false,
        `${album.slug} bietet einen Download an`
      );
    }
  });

  test("ein dokumentarisches Freigabefeld ist kein Freigabeschalter", () => {
    // `release_doc_reference` steht im Auswahl-Manifest und belegt, WOHER eine
    // Erlaubnis kommt. Es darf niemals wie ein Schalter wirken: Eine
    // Einwilligung zur Anzeige ist keine Erlaubnis zur Weitergabe.
    const album = {
      ...baseAlbum({ rights: "licensed-use", credit: "© Sailing Energy" }),
      release_doc_reference: "19 Sailing Energy Rights Declaration.md",
      display_approved: "YES",
    } as unknown as Album;
    assert.equal(albumProblem(album), null, "Zusatzfelder dürfen nicht stören");
    assert.equal(canDownload(album, album.images[0]), false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Zweisprachigkeit
// ═══════════════════════════════════════════════════════════════════════════

describe("Zweisprachigkeit", () => {
  test("fehlendes oder leeres `en` wird abgelehnt", () => {
    assert.match(
      String(albumProblem(baseAlbum({ title: { de: "Titel" } as never }))),
      /title/
    );
    assert.match(
      String(albumProblem(baseAlbum({ description: { de: "x", en: "  " } }))),
      /description/
    );
    assert.match(
      String(
        albumProblem(
          baseAlbum({ images: [image({ alt: { de: "x", en: "" } })] })
        )
      ),
      /Bild 1/
    );
  });

  test("DE und EN teilen sich denselben Bildpfad", () => {
    // Es darf keine sprachabhängige Datei geben — sonst liegt jedes Bild
    // zweimal im Repository und läuft bei Korrekturen auseinander.
    for (const album of getAllAlbums()) {
      for (const img of album.images) {
        assert.equal(typeof img.src, "string");
        assert.ok(
          !/\/(de|en)\//.test(img.src),
          `${img.src} enthält ein Sprachsegment`
        );
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Slug
// ═══════════════════════════════════════════════════════════════════════════

describe("Slug", () => {
  test("Pfadanteile und Grossbuchstaben werden abgelehnt", () => {
    for (const slug of ["../geheim", "Silvaplana", "a_b", "-a", "a--b", ""]) {
      assert.match(
        String(albumProblem(baseAlbum({ slug }))),
        /slug/,
        `${slug} hätte abgelehnt werden müssen`
      );
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Videos — Schema akzeptiert, Oberfläche zeigt nichts
// ═══════════════════════════════════════════════════════════════════════════

describe("Videos", () => {
  test("ein Album mit Videoeinträgen bleibt gültig", () => {
    const album = baseAlbum({
      videos: [
        {
          src: "/media/test-album/clip.mp4",
          poster: "/media/test-album/clip.jpg",
          alt: { de: "Clip", en: "Clip" },
        },
      ],
    });
    assert.equal(albumProblem(album), null);
  });

  test("die Albumansicht rendert keinen Player", () => {
    // Quelltextprüfung statt Renderer: Solange keine Darstellung gebaut ist,
    // darf `videos` nirgends in der Oberfläche ankommen. Ein halbfertiger
    // Player, der einen leeren Rahmen zeigt, wäre schlimmer als kein Player.
    const view = fs.readFileSync(
      path.join(process.cwd(), "src/views/AlbumView.tsx"),
      "utf8"
    );
    assert.ok(!/album\.videos/.test(view), "AlbumView greift auf videos zu");
    assert.ok(!/<video/i.test(view), "AlbumView enthält ein <video>-Element");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Galerie-Oberfläche — was sie nicht tun darf
// ═══════════════════════════════════════════════════════════════════════════

describe("Galerie-Oberfläche", () => {
  const gallery = fs.readFileSync(
    path.join(process.cwd(), "src/components/AlbumGallery.tsx"),
    "utf8"
  );

  test("kein Kontextmenü-Trick als vermeintlicher Rechteschutz", () => {
    // Ein blockiertes Rechtsklickmenü verhindert nichts und suggeriert einen
    // Schutz, den eine statisch ausgelieferte Website nicht leisten kann.
    assert.ok(!/onContextMenu/.test(gallery));
    assert.ok(!/user-select:\s*none|select-none/.test(gallery));
  });

  test("der Client entscheidet nicht über Rechte", () => {
    // Download-Flags kommen fertig vom Server. Die Komponente darf die
    // Rechtelogik nicht importieren — der Prosatext im Kopfkommentar darf
    // `canDownload()` selbstverständlich erwähnen, deshalb wird hier auf
    // Importe geprüft und nicht auf das blosse Vorkommen des Namens.
    const importe = gallery.match(/^import[\s\S]*?from\s+"[^"]+";$/gm) ?? [];
    assert.ok(importe.length > 0, "keine Importe gefunden — Regex kaputt?");
    for (const zeile of importe) {
      assert.ok(
        !/from\s+"@\/lib\/albums"/.test(zeile),
        `AlbumGallery importiert die Rechtelogik: ${zeile}`
      );
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Vorschaumodus — darf nichts veröffentlichen
// ═══════════════════════════════════════════════════════════════════════════

describe("Vorschaumodus", () => {
  test("`noindex`-Alben sind nie öffentlich", () => {
    const oeffentlich = getPublicAlbums();
    assert.equal(
      oeffentlich.some((album) => album.noindex === true),
      false,
      "getPublicAlbums() enthält ein noindex-Album"
    );
  });

  test("ohne GALLERY_PREVIEW ist die Liste identisch mit der öffentlichen", () => {
    const vorher = process.env.GALLERY_PREVIEW;
    delete process.env.GALLERY_PREVIEW;
    try {
      assert.deepEqual(
        getListedAlbums().map((a) => a.slug),
        getPublicAlbums().map((a) => a.slug)
      );
    } finally {
      if (vorher !== undefined) process.env.GALLERY_PREVIEW = vorher;
    }
  });

  test("mit GALLERY_PREVIEW=1 erscheinen auch Review-Alben in der Liste", () => {
    const vorher = process.env.GALLERY_PREVIEW;
    process.env.GALLERY_PREVIEW = "1";
    try {
      assert.deepEqual(
        getListedAlbums().map((a) => a.slug),
        getAllAlbums().map((a) => a.slug)
      );
    } finally {
      if (vorher === undefined) delete process.env.GALLERY_PREVIEW;
      else process.env.GALLERY_PREVIEW = vorher;
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Die tatsächlich ausgelieferten Alben
// ═══════════════════════════════════════════════════════════════════════════

describe("Ausgelieferte Alben", () => {
  const albums = getAllAlbums();

  test("AppleDouble-Sidecars werden nicht als Album gelesen", () => {
    // Auf exFAT legt macOS neben jeder Datei ein `._<name>` an. Bei
    // `._silvaplana-2025.json` endet das auf ".json". Der Loader darf solche
    // Dateien gar nicht erst oeffnen — sonst warnt jeder Build.
    const eintraege = fs.readdirSync(path.join(process.cwd(), "content/albums"));
    const sidecars = eintraege.filter((f) => f.startsWith("._"));
    const geladen = getAllAlbums().map((a) => a.slug);
    for (const sidecar of sidecars) {
      assert.ok(
        !geladen.includes(sidecar.replace(/^\._|\.json$/g, "")),
        `${sidecar} wurde als Album geladen`
      );
    }
    // Unabhaengig davon, ob gerade Sidecars existieren: Kein Slug faengt mit
    // einem Punkt an.
    for (const slug of geladen) assert.ok(!slug.startsWith("."), slug);
  });

  test("alle vierzehn Eventalben werden geladen, mit exakter Bildzahl", () => {
    const erwartet: Record<string, number> = {
      "cremia-2026": 16,
      "portimao-2026": 18,
      "cadiz-2026": 18,
      "lanzarote-2026": 16,
      "sferracavallo-2025": 15,
      "arzachena-2025": 18,
      "portimao-2025": 15,
      "silvaplana-2025": 18,
      "brest-2025": 15,
      "cadiz-2025": 3,
      "sa-rapita-2024": 14,
      "silvaplana-worlds-2024": 17,
      "embrun-2024": 20,
      "swissfoiling-2023": 2,
    };
    assert.deepEqual(albums.map((a) => a.slug).sort(), Object.keys(erwartet).sort());
    for (const album of albums) {
      assert.equal(album.images.length, erwartet[album.slug], album.slug);
    }
    assert.equal(
      albums.reduce((n, a) => n + a.images.length, 0),
      205,
      "205 Bilder insgesamt"
    );
  });

  test("Sortierung: neueste zuerst", () => {
    const daten = albums.map((a) => a.date);
    assert.deepEqual(daten, [...daten].sort().reverse());
  });

  test("jede referenzierte Bilddatei existiert und ist nicht leer", () => {
    for (const album of albums) {
      const alle = [album.coverImage, ...album.images.map((i) => i.src)];
      for (const src of alle) {
        const datei = path.join(process.cwd(), "public", src);
        assert.ok(fs.existsSync(datei), `fehlt: ${src}`);
        assert.ok(fs.statSync(datei).size > 0, `leer: ${src}`);
      }
    }
  });

  test("das Titelbild kommt auch im Album vor", () => {
    for (const album of albums) {
      assert.ok(
        album.images.some((i) => i.src === album.coverImage),
        `${album.slug}: coverImage steht nicht in images`
      );
    }
  });

  test("keine doppelten Bildpfade innerhalb eines Albums", () => {
    for (const album of albums) {
      const pfade = album.images.map((i) => i.src);
      assert.equal(new Set(pfade).size, pfade.length, `${album.slug}`);
    }
  });

  test("jedes Bild trägt einen Credit — in beiden Sprachen", () => {
    for (const album of albums) {
      for (const img of album.images) {
        for (const lang of ["de", "en"] as const) {
          const credit = imageCredit(album, img, lang);
          assert.ok(
            credit !== null && credit.trim().length > 0,
            `${album.slug} ${img.src} (${lang}) ohne Credit`
          );
          assert.ok(
            !/^photo\s*:?\s*hauser\.?$/i.test(credit),
            `${album.slug} ${img.src}: unbelegter Credit „${credit}“`
          );
        }
      }
    }
  });

  test("die Galerie ist freigegeben und erlaubt trotzdem keinen Download", () => {
    // Seit der Freigabe steht `noindex` ueberall auf false. Die Downloadsperre
    // haengt NICHT daran: sie kommt aus `DOWNLOADS_ENABLED` und aus
    // `downloadAllowed` an Album und Bild. Beide bleiben unabhaengig davon zu.
    for (const album of albums) {
      assert.equal(album.noindex ?? false, false, `${album.slug} ist noch noindex`);
      assert.equal(album.downloadAllowed, false, `${album.slug}`);
      assert.equal(albumHasDownloads(album), false, `${album.slug}`);
    }
    assert.equal(
      getPublicAlbums().length,
      albums.length,
      "jedes Album muss oeffentlich gelistet sein"
    );
  });

  test("`featured` ist gesetzt und bleibt ohne Dateikopie", () => {
    // „Best of“ darf nur aus diesem Flag entstehen. Ein eigenes Best-of-Album
    // mit kopierten Dateien würde denselben Bestand ein zweites Mal ablegen.
    for (const album of albums) {
      assert.equal(typeof album.featured, "boolean", `${album.slug}`);
    }
    // Kein Album darf sein Bildmaterial ein zweites Mal unter einem
    // Best-of-Slug ablegen. Geprueft ueber die Dateipfade, nicht ueber das Flag.
    const alleSrc = albums.flatMap((a) => a.images.map((i) => i.src));
    assert.equal(new Set(alleSrc).size, alleSrc.length, "doppelt abgelegte Datei");
  });

  test("die Urheberangabe ist für alle Alben ausdrücklich typisiert", () => {
    // Zwoelf Sailing-Energy-Alben sind eine Agentur; Tobias Meier und
    // Marc Weiler sind natuerliche Personen.
    const erwartet: Record<string, "Person" | "Organization"> = {
      "portimao-2026": "Organization",
      "sferracavallo-2025": "Organization",
      "silvaplana-2025": "Organization",
      "silvaplana-worlds-2024": "Organization",
      "embrun-2024": "Organization",
      "brest-2025": "Organization",
      "arzachena-2025": "Organization",
      "cadiz-2026": "Organization",
      "cadiz-2025": "Organization",
      "lanzarote-2026": "Organization",
      "portimao-2025": "Organization",
      "sa-rapita-2024": "Organization",
      "cremia-2026": "Person",
      "swissfoiling-2023": "Person",
    };
    for (const album of albums) {
      const author = albumAuthorJsonLd(album);
      assert.ok(author, `${album.slug}: kein Author`);
      assert.equal(author["@type"], erwartet[album.slug], `${album.slug}`);
    }
    const personen = albums.filter(
      (a) => albumAuthorJsonLd(a)?.["@type"] === "Person"
    );
    assert.equal(personen.length, 2, "zwei Alben nennen eine natuerliche Person");
  });

  test("die Credit-Wortlaute bleiben verschieden", () => {
    // Der Wortlaut stammt je Datei aus `photoshop:Credit`. Wenn zwei Alben
    // denselben Text zeigen, wurde irgendwo vereinheitlicht — genau das ist
    // untersagt.
    const erwartet: Record<string, string> = {
      "portimao-2026": "Sailing Energy",
      "sferracavallo-2025": "Sailing Energy",
      "silvaplana-2025": "© Sailing Energy",
      "silvaplana-worlds-2024": "© Sailing Energy",
      "cadiz-2026": "© Sailing Energy",
      "cadiz-2025": "© Sailing Energy",
      "lanzarote-2026": "© Sailing Energy",
      "brest-2025": "Sailing Energy",
      "arzachena-2025": "Sailing Energy",
      "portimao-2025": "Sailing Energy",
      "embrun-2024": "© Sailing Energy / iQfoil Class",
      "sa-rapita-2024": "© Sailing Energy / Iqfoil Class",
      "cremia-2026": "Photo: Tobias Meier",
      "swissfoiling-2023": "Photo: Marc Weiler",
    };
    for (const album of albums) {
      assert.equal(album.credit, erwartet[album.slug], `${album.slug} Album-Credit`);
      for (const img of album.images) {
        // Der Wortlaut steht zusätzlich am Bild, damit eine spätere Änderung
        // am Album-Credit die Einzelbilder nicht still überschreibt.
        assert.equal(
          imageCredit(album, img, "de"),
          erwartet[album.slug],
          `${album.slug} ${img.src}`
        );
      }
    }
    const wortlaute = new Set(
      albums.map((a) => a.credit).filter((c) => c.includes("Sailing Energy"))
    );
    assert.equal(wortlaute.size, 4, "vier verschiedene Sailing-Energy-Wortlaute");
    // `iQfoil Class` und `Iqfoil Class` unterscheiden sich nur in einem
    // Buchstaben. Genau solche Paare verschwinden bei einer Vereinheitlichung
    // zuerst, deshalb werden sie hier einzeln festgehalten.
    assert.ok(wortlaute.has("© Sailing Energy / iQfoil Class"));
    assert.ok(wortlaute.has("© Sailing Energy / Iqfoil Class"));
  });

  test("SHA-256 jeder Bilddatei stimmt mit dem Manifest", () => {
    const zeilen = fs
      .readFileSync(path.join(process.cwd(), "tests/asset-sha256.csv"), "utf8")
      .trim()
      .split("\n")
      .slice(1);
    assert.equal(zeilen.length, 205, "Manifest deckt 205 Dateien ab");
    const manifest = new Map(
      zeilen.map((z) => z.trim().split(",") as [string, string])
    );
    for (const album of albums) {
      for (const img of album.images) {
        const erwartet = manifest.get(img.src);
        assert.ok(erwartet, `nicht im Manifest: ${img.src}`);
        const ist = crypto
          .createHash("sha256")
          .update(fs.readFileSync(path.join(process.cwd(), "public", img.src)))
          .digest("hex");
        assert.equal(ist, erwartet, `SHA weicht ab: ${img.src}`);
      }
    }
  });

  test("keine Waisen unter public/media", () => {
    // Jede Datei im Medienordner muss von einem Album referenziert werden.
    // Eine Waise waere ein Ueberbleibsel einer aelteren Lieferung — sie liegt
    // oeffentlich unter ihrer URL, ohne dass eine Rechteangabe sie begleitet.
    const referenziert = new Set(albums.flatMap((a) => a.images.map((i) => i.src)));
    const wurzel = path.join(process.cwd(), "public/media");
    for (const slug of fs.readdirSync(wurzel)) {
      const ordner = path.join(wurzel, slug);
      if (!fs.statSync(ordner).isDirectory()) continue;
      for (const datei of fs.readdirSync(ordner)) {
        if (datei.startsWith(".")) continue;
        assert.ok(
          referenziert.has(`/media/${slug}/${datei}`),
          `Waise: /media/${slug}/${datei}`
        );
      }
    }
  });

  test("keine offenen PENDING-/UNKNOWN-/REQUIRED-Marker in den Alben", () => {
    const verdaechtig =
      /\b(PENDING|UNKNOWN|REQUIRED|TBD|TODO|NICHT BELEGT|DEVIN BESTÄTIGEN|HIER EINTRAGEN)\b/i;
    for (const album of albums) {
      const roh = fs.readFileSync(
        path.join(process.cwd(), `content/albums/${album.slug}.json`),
        "utf8"
      );
      const treffer = roh.match(verdaechtig);
      assert.equal(treffer, null, `${album.slug}: Marker ${treffer?.[0]}`);
    }
  });

  test("keine Testfixtures in content/albums oder public/media", () => {
    // Album-Dateien sind ausschliesslich die dreizehn echten plus die Vorlage
    // und die README. Ein liegengebliebenes Testalbum wuerde mitgebaut.
    const erlaubt = new Set([
      "README.md",
      "_TEMPLATE.json.example",
      ...albums.map((a) => `${a.slug}.json`),
    ]);
    for (const datei of fs.readdirSync(path.join(process.cwd(), "content/albums"))) {
      if (datei.startsWith(".")) continue;
      assert.ok(erlaubt.has(datei), `unerwartete Datei: content/albums/${datei}`);
    }
    const slugs = new Set(albums.map((a) => a.slug));
    for (const eintrag of fs.readdirSync(path.join(process.cwd(), "public/media"))) {
      if (eintrag.startsWith(".") || eintrag === ".gitkeep") continue;
      assert.ok(slugs.has(eintrag), `unerwarteter Ordner: public/media/${eintrag}`);
    }
  });
});
