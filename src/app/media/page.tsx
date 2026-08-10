import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicAlbums, formatAlbumDate } from "@/lib/albums";
import { SITE_URL, breadcrumbJsonLd, jsonLdHtml } from "@/lib/site";

const albums = getPublicAlbums();

/**
 * Media Library — Übersicht.
 *
 * Solange kein einziges Album freigegeben ist, wird die Seite bewusst auf
 * `noindex` gesetzt und nicht in Navigation oder Sitemap geführt. Eine leere
 * Galerie im Google-Index wäre eine Thin Page ohne Nutzen. Sobald das erste
 * Album existiert, schaltet sich die Indexierung automatisch ein — es ist keine
 * Codeänderung nötig.
 */
const hasAlbums = albums.length > 0;

const PAGE_TITLE = "Media — Photos from the Water";
const PAGE_DESCRIPTION =
  "Photo albums from training sessions, race weeks and shoots — shot by Swiss IQFoil and Wingfoil athlete Devin Hauser.";

export const metadata: Metadata = {
  // Nur das Fragment: das Root-Layout haengt " | Devin Hauser" selbst an.
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/media" },
  robots: hasAlbums ? undefined : { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/media`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  // Ohne eigenen twitter-Block erbt die Seite den generischen aus dem Layout.
  // Derselbe Link saehe dann auf LinkedIn/WhatsApp (OpenGraph) anders aus als
  // auf X/Slack/iMessage (Twitter Card) — zwei widersprechende Vorschauen.
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function MediaIndexPage() {
  return (
    <main className="section-pad bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Media", path: "/media" },
            ])
          ),
        }}
      />

      <div className="mx-auto max-w-content">
        {/* Sichtbarer Breadcrumb. Das BreadcrumbList-Markup oben darf nichts
            behaupten, was auf der Seite nicht steht — genau davor warnt Google
            bei strukturierten Daten. */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">Media</li>
          </ol>
        </nav>

        <p className="eyebrow mb-5">Media</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl lg:text-6xl">
          PHOTOS FROM THE WATER
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          Albums from training days, race weeks and shoots. I shoot most of this
          myself — camera, drone and all — in between sessions.
        </p>

        {hasAlbums ? (
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.slug} className="min-w-0">
                <Link
                  href={`/media/${album.slug}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist">
                    <Image
                      src={album.coverImage}
                      alt={`${album.title} — cover image`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <h2 className="mt-5 font-display text-2xl tracking-wide text-ink">
                    {album.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
                    {formatAlbumDate(album.date)} · {album.location} · {album.sport}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">
                    {album.images.length} photos
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card-surface mt-14 p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
              Coming soon
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink">
              The first albums are being prepared. If you were on the water with
              me and are looking for photos, just get in touch — I&apos;ll send
              you the link as soon as the album is up.
            </p>
            <a
              href="/#kontakt"
              className="mt-6 inline-block rounded-sm bg-red px-7 py-3.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
