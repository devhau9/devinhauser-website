// Anker sind root-relativ ("/#..."), nicht rein hash-basiert ("#...").
// Grund: Seit es echte Unterseiten gibt (/iqfoil, /media, /imprint, ...) wuerde
// ein reiner Hash-Link dort ins Leere zeigen — er sucht den Anker auf der
// aktuellen Seite. "/#ueber-mich" springt von jeder Seite aus korrekt zurueck
// auf die Startseite.
//
// "Gallery" hiess frueher so, zeigte aber auf die Social-Media-Sektion. Das war
// irrefuehrend: Wer "Gallery" klickt, erwartet Bilder. Umbenannt zu "Social";
// die echte Galerie liegt unter /media und wird verlinkt, sobald das erste
// freigegebene Album existiert.
import { getPublicAlbums } from "@/lib/albums";

const BASE_LINKS = [
  { href: "/#ueber-mich", label: "About" },
  { href: "/iqfoil", label: "IQFoil" },
  { href: "/#highlights", label: "Results" },
  { href: "/#social-media", label: "Social" },
  { href: "/#partner", label: "Partners" },
];

/**
 * "Media" erscheint automatisch, sobald das erste freigegebene Album existiert.
 *
 * Vorher war das eine Luecke: /media wurde zwar automatisch in Sitemap und
 * Indexierung aufgenommen, aber in KEINER Navigation verlinkt — die Galerie
 * waere also dauerhaft unauffindbar geblieben, bis jemand daran denkt, diese
 * Datei von Hand zu aendern. Jetzt haengt beides an derselben Bedingung.
 */
function navLinks() {
  if (getPublicAlbums().length === 0) return BASE_LINKS;
  return [
    ...BASE_LINKS.slice(0, 3),
    { href: "/media", label: "Media" },
    ...BASE_LINKS.slice(3),
  ];
}

export default function Navigation() {
  const links = navLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a
          href="/#hero"
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-xl tracking-widest2 text-paper">
            DH
          </span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-widest2 text-slate-light opacity-0 transition-all duration-300 ease-out group-hover:max-w-[10rem] group-hover:opacity-100 md:inline-block">
            Devin Hauser
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest2 text-slate-light transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/#kontakt"
          className="hidden rounded-sm border border-red bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-transparent hover:text-red md:inline-block"
        >
          Contact
        </a>

        {/* Mobile: einfacher Anker-Link statt Burger-Menü, bewusst simpel gehalten */}
        <a
          href="/#kontakt"
          className="rounded-sm border border-red px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-red md:hidden"
        >
          Contact
        </a>
      </div>

      {/* Zweite Zeile, nur unter md sichtbar.
          Vorher gab es auf dem Handy ueberhaupt keine Navigation: Die Links
          oben stehen in einem `hidden ... md:flex`-Container, und ein
          Burger-Menue existiert nicht. Auf einem Telefon blieb damit nur der
          Contact-Knopf — Resultate, Partner und die neue IQFoil-Seite waren
          ausschliesslich durch Scrollen der gesamten Startseite erreichbar,
          und /iqfoil war als eigene Seite gar nicht erreichbar.
          Bewusst KEIN Burger-Menue: Das braeuchte Client-State, eine
          Fokusfalle und eine Schliessen-Logik. Eine horizontal scrollbare
          Zeile loest dasselbe Problem ohne eine einzige Zeile JavaScript.
          `scrollbar-none` gibt es nicht als Tailwind-Klasse — deshalb bleibt
          die Leiste bewusst sichtbar scrollbar. */}
      <nav
        aria-label="Sections"
        className="flex gap-6 overflow-x-auto border-t border-ink-line px-6 py-3 md:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="whitespace-nowrap font-mono text-xs uppercase tracking-widest2 text-slate-light transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
