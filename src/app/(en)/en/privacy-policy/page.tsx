import type { Metadata } from "next";
import PrivacyView from "@/views/PrivacyView";
import {
  PRIVACY_EN_TITLE as TITLE,
  PRIVACY_EN_DESCRIPTION as DESCRIPTION,
} from "@/views/legal/PrivacyEn";
import { pageMetadata } from "@/lib/metadata";

const LANG = "en" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/privacy-policy",
  title: TITLE,
  description: DESCRIPTION,
});

export default function Page() {
  return <PrivacyView lang={LANG} />;
}
