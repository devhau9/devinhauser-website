const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#ueber-mich", label: "About" },
  { href: "#highlights", label: "Results" },
  { href: "#social-media", label: "Gallery" },
  { href: "#partner", label: "Partners" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a
          href="#hero"
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
          {NAV_LINKS.map((link) => (
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
          href="#kontakt"
          className="hidden rounded-sm border border-red bg-red px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-transparent hover:text-red md:inline-block"
        >
          Contact
        </a>

        {/* Mobile: einfacher Anker-Link statt Burger-Menü in V1, bewusst simpel gehalten */}
        <a
          href="#kontakt"
          className="rounded-sm border border-red px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-red md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
