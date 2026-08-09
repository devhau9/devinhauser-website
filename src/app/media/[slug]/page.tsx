import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumGallery from "@/components/AlbumGallery";
import {
  getAllAlbums,
  getAlbumBySlug,
  canDownload,
  albumHasDownloads,
  downloadHref,
  formatAlbumDate,
  rightsNotice,
} from "@/lib/albums";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllAlbums().map((album) => ({ slug: album.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const album = getAlbumBySlug(params.slug);
  if (!album) return { title: "Album not found — Devin Hauser" };

  const title = `${album.title} — ${formatAlbumDate(album.date)} | Devin Hauser`;
  const description = album.description;

  return {
    title,
    description,
    alternates: { canonical: `/media/${album.slug}` },
    robots: album.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url: `${SITE_URL}/media/${album.slug}`,
      title,
      description,
      images: [{ url: album.coverImage, alt: `${album.title} — cover image` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [album.coverImage],
    },
  };
}

export default function AlbumPage({ params }: { params: Params }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) notFound();

  // Rechteentscheidung passiert ausschliesslich hier, auf dem Server.
  const downloadFlags = album.images.map((image) => canDownload(album, image));
  const downloadHrefs = album.images.map((image) => downloadHref(image));
  const anyDownloads = albumHasDownloads(album);

  const imageObjectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.description,
    datePublished: album.date,
    contentLocation: { "@type": "Place", name: album.location },
    author: { "@type": "Person", name: album.photographer },
    image: album.images.slice(0, 12).map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image.src),
      caption: image.caption ?? image.alt,
      creditText: image.credit ?? album.credit,
      width: image.width,
      height: image.height,
    })),
  };

  return (
    <main className="section-pad bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Media", path: "/media" },
              { name: album.title, path: `/media/${album.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectsJsonLd) }}
      />

      <div className="mx-auto max-w-content">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/media" className="hover:text-ink">
                Media
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{album.title}</li>
          </ol>
        </nav>

        <h1 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          {album.title.toUpperCase()}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-graphite/70">
          {formatAlbumDate(album.date)} · {album.location} · {album.sport}
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-graphite">
          {album.description}
        </p>

        <div className="card-surface mt-8 p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
            {album.credit}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink">
            {rightsNotice(album)}
          </p>
          {!anyDownloads ? (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-graphite/60">
              Download not available for this album
            </p>
          ) : null}
        </div>

        <AlbumGallery
          images={album.images}
          downloadFlags={downloadFlags}
          downloadHrefs={downloadHrefs}
          albumTitle={album.title}
          albumCredit={album.credit}
        />

        <div className="mt-16 border-t border-hairline pt-10">
          <p className="max-w-xl leading-relaxed text-graphite">
            I&apos;m Devin Hauser, a Swiss IQFoil and Wingfoil racing athlete. I
            shoot photo, video and drone content myself, mostly around racing and
            training.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="rounded-sm border border-hairline px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
            >
              About me
            </Link>
            <a
              href="/#kontakt"
              className="rounded-sm bg-red px-7 py-3.5 text-center font-mono text-xs uppercase tracking-widest2 text-paper transition-transform hover:-translate-y-0.5"
            >
              Work with me
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
