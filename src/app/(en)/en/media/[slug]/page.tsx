import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumView, { albumMetadata } from "@/views/AlbumView";
import { getAlbumBySlug, getAllAlbums } from "@/lib/albums";

const LANG = "en" as const;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllAlbums().map((album) => ({ slug: album.slug }));
}

// Next 15 reicht `params` als Promise herein — deshalb sind diese beiden
// Funktionen jetzt asynchron und lesen den Slug per `await`. Inhaltlich
// aendert sich nichts: die Albumlogik dahinter ist unveraendert.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) return { title: "Album not found" };
  return albumMetadata(album, LANG);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) notFound();
  return <AlbumView album={album} lang={LANG} />;
}
