import Image from "next/image";
import Link from "next/link";
import { getPublicAlbums } from "@/lib/albums";
import { SECTION_ID, formatDate, localizedPath, type Lang } from "@/lib/i18n";

/**
 * Galerie-Einstieg auf der Startseite.
 *
 * ═════════════════════════════════════════════════════════════════════════════
 * WAS DIESE SEKTION IST — UND WAS SIE AUSDRUECKLICH NICHT IST
 * ═════════════════════════════════════════════════════════════════════════════
 * Sie ist der zweite Teil der am 21.08.2026 verlangten Trennung: Social Media
 * fuehrt die Kanaele, die Galerie fuehrt die Bilder. Beides stand vorher unter
 * einer Ueberschrift und war fuer Besucher nicht auseinanderzuhalten.
 *
 * Sie ist KEIN zweites Galeriesystem. Diese Sektion liest dieselbe Media
 * Library (`content/albums/*.json`) wie /media und zeigt nur eine Vorschau;
 * jede Bildseite, jedes Rechtemodell und jede Download-Entscheidung bleibt an
 * genau einer Stelle — in `src/lib/albums.ts`.
 *
 * Sie ist KEINE oeffentliche Pressebild-Datenbank. Das steht hier nicht als
 * juristische Fussnote, sondern als erster sichtbarer Satz unter dem Titel:
 * Wer eine Galerie sieht, nimmt sonst an, die Bilder seien zur freien
 * Verwendung gedacht. `public_download = NO` gilt fuer den gesamten aktuellen
 * Bestand (Rechte-Manifest V1.1) — technisch erzwungen durch `canDownload()`,
 * das ohne `rights === "own"` UND `downloadAllowed === true` niemals `true`
 * zurueckgibt.
 *
 * LEERZUSTAND: Solange kein freigegebenes Album existiert, sagt die Sektion
 * genau das — sie taeuscht keine gefuellte Galerie vor und verschwindet auch
 * nicht spurlos, denn „Galerie" ist ein fester Navigationspunkt.
 */

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    rights: string;
    cta: string;
    emptyTitle: string;
    emptyText: string;
    photoCount: (count: number) => string;
    coverAlt: (title: string) => string;
  }
> = {
  de: {
    eyebrow: "Galerie",
    heading: "GALERIE",
    lead: "Bilder vom Wasser: Trainingstage, Regattawochen und Shootings. Hier liegen die Fotos — die laufende Geschichte dazu läuft über Social Media.",
    rights:
      "Die Galerie ist keine öffentliche Pressebild-Datenbank. Die Bilder werden zum Anschauen gezeigt und nicht zum freien Herunterladen angeboten. Wo die Urheberschaft belegt ist, steht der Fotograf beim Bild. Für eine konkrete Nutzung bitte kurz anfragen.",
    cta: "Zur Galerie",
    emptyTitle: "Die ersten Alben entstehen gerade",
    emptyText:
      "Sobald das erste Album freigegeben ist, erscheint es hier und in der Galerie. Wer mit mir auf dem Wasser war und Bilder sucht, meldet sich am besten direkt.",
    photoCount: (count) => (count === 1 ? "1 Bild" : `${count} Bilder`),
    coverAlt: (title) => `${title} — Titelbild des Albums`,
  },
  en: {
    eyebrow: "Gallery",
    heading: "GALLERY",
    lead: "Photos from the water: training days, race weeks and shoots. The pictures live here — the running story behind them is on social media.",
    rights:
      "The gallery is not a public press image library. Photos are shown for viewing and are not offered as free downloads. Where authorship is documented, the photographer is credited with the image. For a specific use, please get in touch first.",
    cta: "Open the gallery",
    emptyTitle: "The first albums are being prepared",
    emptyText:
      "As soon as the first album is cleared it will appear here and in the gallery. If you were on the water with me and are looking for photos, just get in touch.",
    photoCount: (count) => (count === 1 ? "1 photo" : `${count} photos`),
    coverAlt: (title) => `${title} — album cover image`,
  },
};

export default function GalleryTeaser({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const albums = getPublicAlbums().slice(0, 3);

  return (
    <section
      id={SECTION_ID.gallery}
      className="section-pad border-t border-hairline bg-white"
    >
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {c.heading}
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">{c.lead}</p>

        {albums.length > 0 ? (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.slug} className="min-w-0">
                <Link
                  href={localizedPath(`/media/${album.slug}`, lang)}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist">
                    <Image
                      src={album.coverImage}
                      alt={c.coverAlt(album.title)}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-wide text-ink">
                    {album.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                    {formatDate(album.date, lang)} · {album.location} · {album.sport}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">
                    {c.photoCount(album.images.length)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card-surface mt-12 p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.emptyTitle}
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink">{c.emptyText}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col items-start gap-6 border-t border-hairline pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-graphite">
            {c.rights}
          </p>
          <Link
            href={localizedPath("/media", lang)}
            className="shrink-0 rounded-sm border border-ink px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
