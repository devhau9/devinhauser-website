import type { Metadata } from "next";
import PrivacyView from "@/views/PrivacyView";
import {
  PRIVACY_DE_TITLE as TITLE,
  PRIVACY_DE_DESCRIPTION as DESCRIPTION,
} from "@/views/legal/PrivacyDe";
import { pageMetadata } from "@/lib/metadata";

const LANG = "de" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/privacy-policy",
  title: TITLE,
  description: DESCRIPTION,
});

export default function Page() {
  return <PrivacyView lang={LANG} />;
}
