import type { Metadata } from "next";
import ImprintView, {
  IMPRINT_DESCRIPTION,
  IMPRINT_TITLE,
} from "@/views/ImprintView";
import { pageMetadata } from "@/lib/metadata";

const LANG = "en" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/imprint",
  title: IMPRINT_TITLE[LANG],
  description: IMPRINT_DESCRIPTION[LANG],
});

export default function Page() {
  return <ImprintView lang={LANG} />;
}
