import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoryView, { storyMetadata } from "@/views/StoryView";
import { getStoryBySlug, getVisibleStories } from "@/lib/stories";

const LANG = "de" as const;

type Params = { slug: string };

// Nur Seiten für Geschichten, die gebaut werden dürfen: im Normalfall die
// veröffentlichten, mit STORY_PREVIEW=1 zusätzlich die Entwürfe. Alles andere
// ist ein 404 — auch ein Entwurf, dessen Adresse jemand errät.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getVisibleStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: "Geschichte nicht gefunden" };
  return storyMetadata(story, LANG);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();
  return <StoryView story={story} lang={LANG} />;
}
