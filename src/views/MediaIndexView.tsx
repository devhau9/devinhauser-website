import Image from "next/image";
import Link from "next/link";
import { getListedAlbums, localized } from "@/lib/albums";
import {
  SECTION_ID,
  UI,
  formatDate,
  localizedPath,
  sectionHref,
  type Lang,
} from "@/lib/i18n";
import { breadcrumbJsonLd, jsonLdHtml } from "@/lib/site";

/**
 * Galerie — Übersicht (Route bleibt technisch /media).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM DIE ROUTE /media HEISST, DIE SEITE ABER „GALERIE"
 * ─────────────────────────────────────────────────────────────────────────────
 * Der Pfad ist seit Juli 2026 verlinkt, in der Sitemap und in der Media
 * Library verankert (`content/albums/*.json`, `public/media/<slug>/`). Ihn
 * umzubenennen brächte einen neuen Namen und einen Umleitungsteppich — ohne
 * jeden Nutzen für Besucher, die den Pfad nie lesen. Die Vorgabe vom
 * 21.08.2026 erlaubt das ausdrücklich: sichtbar „Galerie", technisch /media.
 *
 * INDEXIERUNG: Solange kein freigegebenes Album existiert, ist die Seite auf
 * `noindex` und steht nicht in der Sitemap — eine leere Galerie im Index wäre
 * eine Thin Page ohne Nutzen. Sobald das erste Album existiert, schaltet sich
 * beides automatisch ein, ohne Codeänderung. In der NAVIGATION steht die
 * Galerie trotzdem dauerhaft (siehe src/components/Navigation.tsx): verlinkt
 * und nicht indexiert sind zwei verschiedene Fragen.
 */

export const MEDIA_TITLE: Record<Lang, string> = {
  de: "Galerie — Bilder vom Wasser",
  en: "Gallery — Photos from the Water",
};

export const MEDIA_DESCRIPTION: Record<Lang, string> = {
  de: "Fotoalben von Trainingstagen, Regattawochen und Shootings — aufgenommen rund um Devin Hauser, IQFoil- und Wingfoil-Racer aus der Schweiz.",
  en: "Photo albums from training sessions, race weeks and shoots, from around Swiss IQFoil and Wingfoil athlete Devin Hauser.",
};

const COPY: Record<
  Lang,
  {
    home: string;
    crumb: string;
    eyebrow: string;
    heading: string;
    lead: string;
    rights: string;
    emptyLabel: string;
    emptyText: string;
    emptyCta: string;
    reviewBadge: string;
    reviewNotice: string;
    photoCount: (count: number) => string;
    coverAlt: (title: string) => string;
  }
> = {
  de: {
    home: "Startseite",
    crumb: "Galerie",
    eyebrow: "Galerie",
    heading: "BILDER VOM WASSER",
    lead: "Alben von Trainingstagen, Regattawochen und Shootings. Vieles davon entsteht zwischen den Sessions, mit der Kamera.",
    rights:
      "Diese Galerie ist keine öffentliche Pressebild-Datenbank. Die Bilder werden zum Anschauen gezeigt und nicht zum freien Herunterladen angeboten. Wo die Urheberschaft belegt ist, steht der Fotograf beim Bild; wo sie es nicht ist, steht die sachliche Herkunftszeile. Für eine konkrete Nutzung bitte kurz anfragen.",
    emptyLabel: "Die ersten Alben entstehen gerade",
    emptyText:
      "Sobald das erste Album freigegeben ist, erscheint es hier. Wer mit mir auf dem Wasser war und Bilder sucht, meldet sich am besten direkt — den Link zum Album gibt es, sobald es steht.",
    emptyCta: "Kontakt aufnehmen",
    reviewBadge: "Review",
    reviewNotice:
      "Als Review sichtbar: Die so gekennzeichneten Alben sind noch nicht freigegeben. Sie werden nicht indexiert und stehen nicht in der Sitemap.",
    photoCount: (count) => (count === 1 ? "1 Bild" : `${count} Bilder`),
    coverAlt: (title) => `${title} — Titelbild des Albums`,
  },
  en: {
    home: "Home",
    crumb: "Gallery",
    eyebrow: "Gallery",
    heading: "PHOTOS FROM THE WATER",
    lead: "Albums from training days, race weeks and shoots. A lot of it comes together between sessions, with a camera.",
    rights:
      "This gallery is not a public press image library. Photos are shown for viewing and are not offered as free downloads. Where authorship is documented, the photographer is credited with the image; where it is not, a factual source line is shown instead. For a specific use, please get in touch first.",
    emptyLabel: "The first albums are being prepared",
    emptyText:
      "As soon as the first album is cleared it will appear here. If you were on the water with me and are looking for photos, just get in touch — I'll send you the link as soon as the album is up.",
    emptyCta: "Get in touch",
    reviewBadge: "Review",
    reviewNotice:
      "Visible for review: the albums marked this way are not released yet. They are not indexed and are not in the sitemap.",
    photoCount: (count) => (count === 1 ? "1 photo" : `${count} photos`),
    coverAlt: (title) => `${title} — album cover image`,
  },
};

export default function MediaIndexView({ lang }: { lang: Lang }) {
  // `getListedAlbums()` ist ohne den Vorschauschalter identisch mit
  // `getPublicAlbums()`. Siehe `galleryPreviewEnabled()` in src/lib/albums.ts.
  const albums = getListedAlbums();
  const c = COPY[lang];
  const t = UI[lang];
  const hasReviewAlbums = albums.some((album) => album.noindex === true);

  return (
    <main className="section-pad !pt-24 sm:!pt-28 md:!pt-40 lg:!pt-48 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: c.home, path: localizedPath("/", lang) },
              { name: c.crumb, path: localizedPath("/media", lang) },
            ])
          ),
        }}
      />

      <div className="mx-auto max-w-content">
        {/* Sichtbarer Breadcrumb. Das BreadcrumbList-Markup oben darf nichts
            behaupten, was auf der Seite nicht steht — genau davor warnt Google
            bei strukturierten Daten. */}
        <nav aria-label={t.breadcrumbLabel} className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite">
            <li>
              <Link href={localizedPath("/", lang)} className="hover:text-ink">
                {c.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{c.crumb}</li>
          </ol>
        </nav>

        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
          {c.heading}
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">{c.lead}</p>

        {/* Rechtehinweis ganz oben und nicht im Fussbereich: Wer eine Galerie
            öffnet, entscheidet in den ersten Sekunden, ob er die Bilder für
            frei verwendbar hält. */}
        <p className="mt-6 max-w-2xl border-l-2 border-red/40 pl-5 text-sm leading-relaxed text-graphite">
          {c.rights}
        </p>

        {/* Ehrlichkeit vor Vollstaendigkeit: Wenn die Uebersicht ein noch nicht
            freigegebenes Album zeigt, sagt sie das auch. Sonst sieht eine
            lokale Vorschau exakt aus wie eine Veroeffentlichung. */}
        {hasReviewAlbums ? (
          <p className="mt-4 max-w-2xl border-l-2 border-ink/20 pl-5 text-sm leading-relaxed text-graphite">
            {c.reviewNotice}
          </p>
        ) : null}

        {albums.length > 0 ? (
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.slug} className="min-w-0">
                <Link
                  href={localizedPath(`/media/${album.slug}`, lang)}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist">
                    <Image
                      src={album.coverImage}
                      alt={c.coverAlt(localized(album.title, lang))}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-2xl tracking-wide text-ink">
                      {localized(album.title, lang)}
                    </h2>
                    {album.noindex ? (
                      <span className="rounded-sm border border-ink/20 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest2 text-graphite">
                        {c.reviewBadge}
                      </span>
                    ) : null}
                  </div>
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
          <div className="card-surface mt-14 p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              {c.emptyLabel}
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink">{c.emptyText}</p>
            <Link
              href={sectionHref(lang, SECTION_ID.contact)}
              className="mt-6 inline-block rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              {c.emptyCta}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
