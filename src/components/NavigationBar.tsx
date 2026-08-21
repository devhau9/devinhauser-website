"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { UI, type Lang, type NavLink } from "@/lib/i18n";

type Props = {
  lang: Lang;
  links: NavLink[];
  homeHref: string;
};

const LINK_BASE =
  "font-mono text-xs uppercase tracking-widest2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red";

/**
 * Kopfzeile mit Hauptnavigation, Sprachumschalter und mobilem Menue.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM ES JETZT EIN ECHTES MOBILES MENUE GIBT
 * ─────────────────────────────────────────────────────────────────────────────
 * Vorher stand hier eine horizontal scrollbare Linkzeile — bewusst gewaehlt, um
 * ohne Javascript auszukommen. Mit sieben Eintraegen plus Sprachumschalter
 * traegt diese Loesung nicht mehr: Auf 375 px waeren die hinteren Eintraege
 * (Partner, Kontakt) nur noch durch seitliches Wischen erreichbar, und eine
 * seitlich wegscrollende Leiste sieht auf den meisten Geraeten aus wie eine
 * abgeschnittene Zeile, nicht wie eine Navigation. Ein Menue mit einem
 * eindeutigen Knopf ist hier die ehrlichere Loesung.
 *
 * Das Panel erfuellt, was ein modales Menue erfuellen muss:
 *   • `aria-expanded` und `aria-controls` am Knopf
 *   • Escape schliesst, der Fokus geht auf den Knopf zurueck
 *   • Fokusfalle: Tab verlaesst das offene Panel nicht
 *   • Klick auf den Hintergrund schliesst
 *   • Seiten-Scroll gesperrt, solange das Panel offen ist
 *   • Klick auf einen Link schliesst — sonst bleibt das Panel nach einem
 *     Ankersprung auf derselben Seite offen ueber dem Ziel stehen
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * KONTAKT IST EIN NAVIGATIONSEINTRAG *UND* DER HAUPTKNOPF
 * ─────────────────────────────────────────────────────────────────────────────
 * Die Vorgabe verlangt Kontakt in der Navigationsliste; das Design hatte
 * bisher einen separaten roten Kontakt-Knopf daneben. Beides nebeneinander
 * waere derselbe Link zweimal in derselben Zeile — und genau die zusaetzliche
 * Breite, die auf 1024 px zum Umbruch fuehrt. Deshalb ist der letzte
 * Listeneintrag (`cta: true`) der rote Knopf.
 */
export default function NavigationBar({ lang, links, homeHref }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = UI[lang];

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const root = panelRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (current instanceof Node && !root.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-16">
        <Link href={homeHref} className="group flex shrink-0 items-baseline gap-2">
          <span className="font-display text-xl tracking-widest2 text-paper">DH</span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-widest2 text-slate-light opacity-0 transition-all duration-300 ease-out group-hover:max-w-[10rem] group-hover:opacity-100 xl:inline-block">
            Devin Hauser
          </span>
        </Link>

        <nav
          aria-label={t.primaryNavLabel}
          className="hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {links
            .filter((link) => !link.cta)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${LINK_BASE} whitespace-nowrap text-slate-light hover:text-red`}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <LanguageSwitch lang={lang} />

          {links
            .filter((link) => link.cta)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${LINK_BASE} hidden whitespace-nowrap rounded-sm border border-red bg-red px-5 py-2.5 text-paper hover:bg-transparent hover:text-red lg:inline-block`}
              >
                {link.label}
              </Link>
            ))}

          {/* Menue-Knopf. Bewusst mit sichtbarem Wort statt nur drei Strichen:
              „Menü" ist auf jedem Geraet eindeutig, ein Hamburger-Symbol allein
              ist es fuer einen Teil der Besucher bis heute nicht. */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.closeMenu : t.openMenu}
            className={`${LINK_BASE} flex items-center gap-2 rounded-sm border border-ink-line px-4 py-2.5 text-paper hover:border-paper lg:hidden`}
          >
            <span aria-hidden className="flex w-4 flex-col gap-[3px]">
              <span className="h-px w-full bg-paper" />
              <span className="h-px w-full bg-paper" />
              <span className="h-px w-full bg-paper" />
            </span>
            {t.menuLabel}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <div
            aria-hidden
            onClick={close}
            className="fixed inset-0 top-[var(--header-h,73px)] z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t.menuLabel}
            className="absolute inset-x-0 z-50 border-b border-ink-line bg-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)] lg:hidden"
          >
            <nav aria-label={t.primaryNavLabel} className="px-6 py-4 sm:px-10">
              <ul className="divide-y divide-ink-line">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className={`${LINK_BASE} block py-4 ${
                        link.cta ? "text-red" : "text-slate-light hover:text-red"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-5">
                <span className="font-mono text-xs uppercase tracking-widest2 text-slate-light/60">
                  {t.languageSwitchLabel}
                </span>
                <LanguageSwitch lang={lang} onNavigate={close} />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
