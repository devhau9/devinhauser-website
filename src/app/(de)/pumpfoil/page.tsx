import type { Metadata } from "next";
import PumpfoilView from "@/views/PumpfoilView";
import { pageMetadata } from "@/lib/metadata";
import { pumpfoilJsonLd } from "@/lib/pumpfoil-jsonld";
import { PUMPFOIL_META, PUMPFOIL_PATH } from "@/lib/pumpfoil";
import { jsonLdHtml } from "@/lib/site";

const LANG = "de" as const;

export const metadata: Metadata = pageMetadata({
  lang: LANG,
  path: PUMPFOIL_PATH,
  title: PUMPFOIL_META[LANG].title,
  description: PUMPFOIL_META[LANG].description,
  type: "article",
});

export default function Page() {
  return (
    <>
      {pumpfoilJsonLd(LANG).map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(data) }}
        />
      ))}
      <PumpfoilView lang={LANG} />
    </>
  );
}
