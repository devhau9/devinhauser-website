import type { MetadataRoute } from "next";

// Web App Manifest nach Next.js App-Router-Konvention (wird automatisch
// unter /manifest.webmanifest ausgeliefert und von layout.tsx nicht manuell
// verlinkt werden muss — Next.js erledigt das automatisch).
//
// Die Icons hier sind ein einfacher, technischer Platzhalter (aus dem
// bestehenden "DH"-Markenzeichen generiert, siehe Navigation.tsx), bis ein
// finales Icon-Design vorliegt — bewusst KEINE neue Designentscheidung,
// sondern Wiederverwendung bestehender Marken-Farben/-Zeichen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devin Hauser — Swiss IQFoil & Wingfoil Racing Athlete",
    short_name: "Devin Hauser",
    description:
      "Official website of Devin Hauser, Swiss IQFoil and Wingfoil racing athlete.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0E14",
    theme_color: "#0A0E14",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
