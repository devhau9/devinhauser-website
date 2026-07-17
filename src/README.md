# src/ – Code-Verzeichnis

**Status: Version 1 aufgebaut (16.07.2026)** — lauffähige One-Page-Website mit
Platzhalterinhalten, bereit für lokale Vorschau.

## Struktur

- `app/` — Next.js App Router: `layout.tsx` (Fonts, Meta, Navigation/Footer-Rahmen),
  `page.tsx` (Reihenfolge der Sektionen), `globals.css` (Tailwind + Design-Tokens)
- `components/` — eine Komponente pro Sektion (Hero, About, SportGoals, Highlights,
  SocialMedia, Sponsoring, Partners, Contact) plus Navigation, Footer und
  PlaceholderMedia (wiederverwendbarer Bild-/Video-Platzhalter)
- `lib/` — aktuell ungenutzt, vorgesehen für spätere Content-Loader (z. B. wenn
  Texte künftig aus strukturierten Dateien statt hart codiert kommen sollen)
- `styles/` — bewusst leer gelassen; globale Styles liegen aus Next.js-Konvention
  in `app/globals.css`, nicht hier. Ordner bleibt als Reserve bestehen.

## Design-Tokens (siehe tailwind.config.ts)

- Farben: `ink` (Basis-Dunkelblau/Schwarz), `ink-soft` (Panel-Hintergrund),
  `paper` (Weiss), `red` (Akzent), `slate` (sekundärer Text)
- Schriften: `font-display` (Bebas Neue, Headlines), `font-body` (Inter,
  Fliesstext), `font-mono` (JetBrains Mono, für Resultate/Labels im
  Renn-Timing-Stil)
- Signatur-Element: Devins tatsächliche Segelnummer SUI-134 als
  zurückhaltendes Wasserzeichen im Hero sowie im Footer

## Platzhalter-Konvention

Alle noch nicht bestätigten Inhalte sind im Code sichtbar mit "Platzhalter"
oder "PLATZHALTER" markiert — sowohl in Bildflächen (gestrichelter Rahmen)
als auch im Text (kursiv). So ist beim Durchklicken der Seite sofort
erkennbar, was noch echten Inhalt braucht.
