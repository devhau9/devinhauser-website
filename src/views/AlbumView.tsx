import Link from "next/link";
import AlbumGallery from "@/components/AlbumGallery";
import {
  albumAuthorJsonLd,
  albumHasDownloads,
  canDownload,
  displayCredit,
  downloadHref,
  imageCredit,
  localized,
  rightsClassesInAlbum,
  rightsNotice,
} from "@/lib/albums";
import type { Album } from "@/lib/album-types";
import {
  SECTION_ID,
  UI,
  formatDate,
  localizedPath,
  sectionHref,
  type Lang,
} from "@/lib/i18n";
import {
  SHARE_FALLBACK_IMAGE,
  absoluteUrl,
  breadcrumbJsonLd,
  jsonLdHtml,
} from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const COPY: Record<
  Lang,
  {
    home: string;
    gallery: string;
    noDownload: string;
    outro: string;
    outroForeign: string;
    reviewNotice: string;
    aboutCta: string;
    workCta: string;
  }
> = {
  de: {
    home: "Startseite",
    gallery: "Galerie",
    noDownload: "Für dieses Album wird kein Download angeboten",
    outro:
      "Ich bin Devin Hauser, IQFoil- und Wingfoil-Racer aus der Schweiz. Fotos und Videos mache ich grösstenteils selbst — rund um Wettkämpfe und Training.",
    outroForeign:
      "Ich bin Devin Hauser, IQFoil- und Wingfoil-Racer aus der Schweiz. Die Aufnahmen in diesem Album sind nicht von mir — wer fotografiert hat, steht oben beim Album.",
    reviewNotice:
      "Review-Ansicht: Dieses Album ist noch nicht freigegeben. Es wird nicht indexiert und steht nicht in der Sitemap.",
    aboutCta: "Über mich",
    workCta: "Zusammenarbeiten",
  },
  en: {
    home: "Home",
    gallery: "Gallery",
    noDownload: "Download not available for this album",
    outro:
      "I'm Devin Hauser, a Swiss IQFoil and Wingfoil racing athlete. I shoot photo and video myself, mostly around racing and training.",
    outroForeign:
      "I'm Devin Hauser, a Swiss IQFoil and Wingfoil racing athlete. The photos in this album are not mine — the photographer is credited above.",
    reviewNotice:
      "Review view: this album is not released yet. It is not indexed and is not in the sitemap.",
    aboutCta: "About me",
    workCta: "Work with me",
  },
};

/**
 * Metadaten eines Albums.
 *
 * SHARING-BILD IST EINE RECHTEENTSCHEIDUNG, NICHT NUR GESTALTUNG.
 * Wird ein Link geteilt, holen Plattformen wie WhatsApp, Slack, LinkedIn oder X
 * das Vorschaubild aktiv ab und legen eine eigene Kopie auf ihren Servern an.
 * Das ist Weiterverbreitung an Dritte — voellig unabhaengig davon, ob auf der
 * Seite ein Download-Knopf steht. Fuer fremdes Material (licensed-use /
 * restricted) waere genau das der Fall, den das Rechtemodell verhindern soll.
 * Deshalb: nur eigenes Material wird als Vorschaubild ausgeliefert, sonst das
 * eigene Standardbild.
 */
export function albumMetadata(album: Album, lang: Lang): Metadata {
  const title = `${localized(album.title, lang)} — ${formatDate(album.date, lang)}`;
  const shareImage =
    album.rights === "own" ? album.coverImage : SHARE_FALLBACK_IMAGE;

  return pageMetadata({
    lang,
    path: `/media/${album.slug}`,
    title,
    description: localized(album.description, lang),
    image: shareImage,
    imageAlt: localized(album.title, lang),
    type: "article",
    noindex: album.noindex === true,
  });
}

/**
 * Einzelnes Album.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ALLE RECHTEENTSCHEIDUNGEN FALLEN HIER, AUF DEM SERVER
 * ─────────────────────────────────────────────────────────────────────────────
 * `canDownload()` entscheidet je Bild, ob ein Download angeboten wird;
 * `displayCredit()` entscheidet, welche Credit-Zeile ueberhaupt erscheinen
 * darf. Beides ist fertig berechnet, bevor die Galerie-Komponente im Browser
 * ueberhaupt existiert. Der Client bekommt Flags und fertige Textzeilen — er
 * kann eine Rechteentscheidung damit weder treffen noch umgehen.
 *
 * `ImageObject`-Markup mit `contentUrl` ist die ausdrueckliche Einladung an
 * Google Images, die Datei zu indexieren und in den Suchergebnissen selbst
 * auszuliefern. Fuer fremdes Material ist das das Gegenteil dessen, was das
 * Rechtemodell will. Deshalb bekommt nur eigenes Material die Bildliste.
 */
export default function AlbumView({ album, lang }: { album: Album; lang: Lang }) {
  const c = COPY[lang];
  const t = UI[lang];

  const downloadFlags = album.images.map((image) => canDownload(album, image));
  const downloadHrefs = album.images.map((image) => downloadHref(image));
  // Rechtebewusst: Fremdmaterial bekommt NIE die Archivzeile als Notnagel.
  const imageCredits = album.images.map((image) =>
    imageCredit(album, image, lang)
  );
  const anyDownloads = albumHasDownloads(album);
  const albumCredit = displayCredit(album.credit, lang);

  // Bildliste fuer Google Images nur, wenn JEDES Bild eigenes Material ist.
  // Ein einziges Fremdbild im Album genuegt, um die Liste wegzulassen.
  const listImages = rightsClassesInAlbum(album).every((r) => r === "own");

  // Urheber nur, wenn das Album ausdruecklich sagt, ob `photographer` eine
  // Person oder eine Organisation ist. Vorher stand hier fest "Person" — bei
  // "Sailing Energy" eine maschinenlesbare Falschangabe. Siehe
  // `albumAuthorJsonLd()`.
  const author = albumAuthorJsonLd(album);

  const imageObjectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: localized(album.title, lang),
    description: localized(album.description, lang),
    datePublished: album.date,
    inLanguage: lang,
    contentLocation: { "@type": "Place", name: album.location },
    ...(author ? { author } : {}),
    ...(listImages
      ? {
          image: album.images.slice(0, 12).map((image, index) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(image.src),
            caption: localized(image.caption ?? image.alt, lang),
            creditText: imageCredits[index] ?? undefined,
            width: image.width,
            height: image.height,
          })),
        }
      : {}),
  };

  return (
    <main className="section-pad !pt-24 sm:!pt-28 md:!pt-40 lg:!pt-48 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: c.home, path: localizedPath("/", lang) },
              { name: c.gallery, path: localizedPath("/media", lang) },
              {
                name: localized(album.title, lang),
                path: localizedPath(`/media/${album.slug}`, lang),
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(imageObjectsJsonLd) }}
      />

      <div className="mx-auto max-w-content">
        <nav aria-label={t.breadcrumbLabel} className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            <li>
              <Link href={localizedPath("/", lang)} className="-my-2 inline-flex min-h-[44px] items-center py-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red">
                {c.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={localizedPath("/media", lang)} className="-my-2 inline-flex min-h-[44px] items-center py-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red">
                {c.gallery}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{localized(album.title, lang)}</li>
          </ol>
        </nav>

        {/* Ein `noindex`-Album ist ueber seine URL erreichbar, auch ohne dass
            es irgendwo verlinkt waere. Wer hier landet, soll sofort sehen,
            dass es sich um einen Review-Stand handelt und nicht um eine
            veroeffentlichte Seite. */}
        {album.noindex ? (
          <p className="mb-6 max-w-2xl border-l-2 border-ink/20 pl-5 font-mono text-xs uppercase leading-relaxed tracking-widest2 text-graphite">
            {c.reviewNotice}
          </p>
        ) : null}

        <h1 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {localized(album.title, lang).toUpperCase()}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
          {formatDate(album.date, lang)} · {album.location} · {album.sport}
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          {localized(album.description, lang)}
        </p>

        <div className="card-surface mt-8 p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            {albumCredit}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink">
            {rightsNotice(album, lang)}
          </p>
          {!anyDownloads ? (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-graphite/60">
              {c.noDownload}
            </p>
          ) : null}
        </div>

        <AlbumGallery
          images={album.images}
          downloadFlags={downloadFlags}
          downloadHrefs={downloadHrefs}
          albumTitle={localized(album.title, lang)}
          imageCredits={imageCredits}
          lang={lang}
        />

        <div className="mt-16 border-t border-hairline pt-10">
          {/* „Fotos mache ich groesstenteils selbst" darf nicht unter einem
              Album stehen, das vollstaendig von einer Agentur oder einem
              fremden Fotografen stammt — das liest sich als Selbstzuschreibung
              genau dort, wo der Credit das Gegenteil sagt. `listImages` ist
              wahr, wenn JEDES Bild eigenes Material ist. */}
          <p className="max-w-xl leading-relaxed text-graphite">
            {listImages ? c.outro : c.outroForeign}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={sectionHref(lang, SECTION_ID.about)}
              className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
            >
              {c.aboutCta}
            </Link>
            <Link
              href={sectionHref(lang, SECTION_ID.contact)}
              className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              {c.workCta}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
