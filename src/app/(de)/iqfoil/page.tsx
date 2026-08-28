import type { Metadata } from "next";
import IqfoilView from "@/views/IqfoilView";
import {
  IQFOIL_DE_TITLE as TITLE,
  IQFOIL_DE_DESCRIPTION as DESCRIPTION,
  FAQ_DE,
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

// FAQPage-Structured-Data, seit 29.08.2026 — die fruehere Begruendung dagegen
// ist ueberholt. Ausgeliefert werden ausschliesslich die Fragen, die auf der
// Seite WORTGLEICH sichtbar sind und in der Quelle als strukturiert markiert
// sind. Die Frage nach der Geschwindigkeit steht bewusst NICHT im Markup:
// Ihre Antwort nennt keine Zahl, taugt also nicht als Snippet — und eine Zahl
// waere unbelegt.
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

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DE
    .filter((item) => item.structured)
    .map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(ARTICLE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(FAQ_JSON_LD) }}
      />
      <IqfoilView lang={LANG} />
    </>
  );
}
