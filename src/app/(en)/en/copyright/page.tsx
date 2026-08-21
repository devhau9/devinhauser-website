import type { Metadata } from "next";
import CopyrightView, {
  COPYRIGHT_DESCRIPTION,
  COPYRIGHT_TITLE,
} from "@/views/CopyrightView";
import { pageMetadata } from "@/lib/metadata";

const LANG = "en" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/copyright",
  title: COPYRIGHT_TITLE[LANG],
  description: COPYRIGHT_DESCRIPTION[LANG],
});

export default function Page() {
  return <CopyrightView lang={LANG} />;
}
