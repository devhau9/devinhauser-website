import type { Metadata } from "next";
import MediaIndexView, {
  MEDIA_DESCRIPTION,
  MEDIA_TITLE,
} from "@/views/MediaIndexView";
import { pageMetadata } from "@/lib/metadata";
import { getPublicAlbums } from "@/lib/albums";

const LANG = "de" as const;

// Solange kein Album freigegeben ist, bleibt die Seite auf `noindex` — eine
// leere Galerie im Google-Index waere eine Thin Page ohne Nutzen. Sobald das
// erste Album existiert, schaltet sich die Indexierung automatisch ein.
export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/media",
  title: MEDIA_TITLE[LANG],
  description: MEDIA_DESCRIPTION[LANG],
  noindex: getPublicAlbums().length === 0,
});

export default function Page() {
  return <MediaIndexView lang={LANG} />;
}
