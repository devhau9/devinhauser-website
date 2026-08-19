# Devin Hauser – Personal-Brand-Website

Langfristige Hauptplattform für Devin Hauser als IQFoil- und Wingfoil-Racing-Athlet.
Zielgruppe: Sponsoren, Partner, Medien, Verbände, Wassersport-Community.

Status: **Version 1 live**, seit 10.08.2026 um eine Erklärseite (`/iqfoil`) und eine
Media Library (`/media`) erweitert.

## Domain
Öffentliche Markenadresse: **https://www.devinhauser.com** (Entscheid 19.08.2026).
`devinhauser.com` (Apex) und der stabile Produktionshost auf vercel.app leiten
per 308 auf die www-Form weiter (siehe `next.config.mjs`). Registriert bei
Hosttech. Preview-Deployments bleiben direkt erreichbar und sind bei Vercel
standardmässig auf noindex.

## Lokal starten

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # muss vor jedem Deploy fehlerfrei durchlaufen
npm run lint
```

## Ziele der Website
- Sponsoren gewinnen
- Sportkarriere professionell präsentieren
- IQFoil und Wingfoil Racing zeigen
- Resultate präsentieren
- Social-Media-Kanäle zeigen
- Hochwertigen Foto- und Videocontent präsentieren
- Kontakt für Sponsoren, Medien und Partner ermöglichen

## Design-Richtung
Modern, minimalistisch, hochwertig. Inspiration: Red Bull, On, Apple, Nike, moderne Athleten-Websites.
Grosse Bilder und Videos, viel Weissraum, hochwertige Animationen, schnelle Ladezeit,
Mobile First, Desktop ebenfalls perfekt.

## Tech-Stack
Next.js 14 (App Router) + TypeScript + Tailwind CSS, Hosting auf Vercel,
Code-Verwaltung über GitHub. Kein Login, keine Datenbank, Inhalte in
strukturierten Dateien unter `/content`.

## Ordnerstruktur
- `src/app` — Routen. `/`, `/iqfoil`, `/media`, `/media/[slug]`, Legal-Seiten, `/partner-portal` (noindex)
- `src/components` — Sektionen der Startseite und geteilte Bausteine
- `src/lib/site.ts` — **einzige Quelle** für Domain, Titel, Beschreibung, strukturierte Daten
- `src/lib/albums.ts` — Media Library: Laden der Alben und das Rechtemodell
- `content/albums` — je Album eine JSON-Datei
- `public/media/<slug>` — die Bilder eines Albums

## Dokumentation
- `docs/content-plan.md` — Inhalt und Aufbau jeder Sektion
- `docs/media-library.md` — **wie ein Album veröffentlicht wird**, inkl. Export und Rechte
- `docs/seo-media-sprint-2026-08-10.md` — Suchsichtbarkeit, Audit und offene Entscheidungen

## Wichtige Regel für alle Inhalte
Keine Resultate, Zahlen oder Angaben erfinden. Alle unklaren oder unbestätigten
Angaben werden mit **[PRÜFEN]** markiert, bis sie von Devin freigegeben sind.

## Rechte an Bildern
Bilder Dritter dürfen nicht ohne geklärte Rechte veröffentlicht werden, und eine
Nutzungserlaubnis für Devin ist **nicht** das Recht, eine Datei an Dritte
weiterzugeben. Die drei Rechteklassen und ihre Wirkung stehen in
`docs/media-library.md`; `canDownload()` in `src/lib/albums.ts` erzwingt sie im Code.
