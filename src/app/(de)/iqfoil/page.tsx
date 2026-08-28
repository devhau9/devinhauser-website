import type { Metadata } from "next";
import IqfoilView from "@/views/IqfoilView";
import {
  IQFOIL_DE_TITLE as TITLE,
  IQFOIL_DE_DESCRIPTION as DESCRIPTION,
} from "@/views/iqfoil/IqfoilDe";
import { pageMetadata } from "@/lib/metadata";
import { CONTENT_UPDATED, SITE_URL, absoluteUrl, jsonLdHtml } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";

const LANG = "de" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: "/iqfoil",
  title: TITLE,
  description: DESCRIPTION,
  type: "article",
});

// Bewusst KEIN FAQPage-Structured-Data: Google zeigt FAQ-Rich-Results seit 2023
// praktisch nur noch fuer Behoerden- und Gesundheitsseiten. Das Markup hier
// einzubauen braechte keinen Nutzen und waere reine Optimierung fuer die
// Maschine. Der FAQ-Abschnitt existiert fuer Leserinnen und Leser.
const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${localizedPath("/iqfoil", LANG)}`,
  },
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
  image: absoluteUrl("/images/og-image.jpg"),
  datePublished: CONTENT_UPDATED,
  dateModified: CONTENT_UPDATED,
  inLanguage: LANG,
  about: [
    { "@type": "Thing", name: "iQFOiL" },
    { "@type": "Thing", name: "Olympic windsurfing" },
    { "@type": "Thing", name: "Hydrofoiling" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(ARTICLE_JSON_LD) }}
      />
      <IqfoilView lang={LANG} />
    </>
  );
}
