/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Moderne Bildformate zuerst. AVIF ist deutlich kleiner als WebP, WebP bleibt
  // als Fallback. Betrifft nur die von next/image ausgelieferten Derivate —
  // die Quelldateien in /public bleiben unverändert.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Kein X-Powered-By-Header. Kein Sicherheitsgewinn im engeren Sinn, aber
  // auch kein Grund, die eingesetzte Technik ungefragt mitzuliefern.
  poweredByHeader: false,
};

export default nextConfig;
