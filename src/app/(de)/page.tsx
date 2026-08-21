import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import { pageMetadata } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

const LANG = "de" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/",
  title: SITE_TITLE[LANG],
  description: SITE_DESCRIPTION[LANG],
  // Der Titel der Startseite enthaelt den Namen bereits — ohne `absoluteTitle`
  // ergaebe die Vorlage "… | Devin Hauser | Devin Hauser".
  absoluteTitle: true,
});

export default function Page() {
  return <HomeView lang={LANG} />;
}
