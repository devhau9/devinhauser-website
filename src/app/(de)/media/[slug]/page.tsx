import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumView, { albumMetadata } from "@/views/AlbumView";
import { getAlbumBySlug, getAllAlbums } from "@/lib/albums";

const LANG = "de" as const;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllAlbums().map((album) => ({ slug: album.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const album = getAlbumBySlug(params.slug);
  if (!album) return { title: "Album nicht gefunden" };
  return albumMetadata(album, LANG);
}

export default function Page({ params }: { params: Params }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) notFound();
  return <AlbumView album={album} lang={LANG} />;
}
