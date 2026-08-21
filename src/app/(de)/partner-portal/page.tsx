import type { Metadata } from "next";
import PartnerPortalView, {
  PORTAL_DESCRIPTION,
  PORTAL_TITLE,
} from "@/views/PartnerPortalView";
import { pageMetadata } from "@/lib/metadata";

const LANG = "de" as const;

// Bewusst von der Indexierung ausgeschlossen: kein Mehrwert fuer die organische
// Suche, verhindert aber nicht den Zugriff fuer eingeladene Partner (kein
// Login-Schutz, nur kein Index).
export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/partner-portal",
  title: PORTAL_TITLE[LANG],
  description: PORTAL_DESCRIPTION[LANG],
  noindex: true,
});

export default function Page() {
  return <PartnerPortalView lang={LANG} />;
}
