"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LANGS,
  LANG_LABEL,
  LANG_NAME,
  UI,
  localizedPath,
  splitLangPath,
  type Lang,
} from "@/lib/i18n";

type Props = {
  lang: Lang;
  /** Zusaetzliche Klassen fuer die Umschliessung (Desktop vs. mobiles Menue). */
  className?: string;
  /** Wird im mobilen Menue gebraucht, damit das Panel nach dem Klick zugeht. */
  onNavigate?: () => void;
};

/**
 * Sprachumschalter „DE | EN".
 *
 * SICHTBAR, ABER NICHT DOMINANT (Vorgabe 21.08.2026): zwei kurze Kuerzel in der
 * Mono-Schrift der Navigation, die aktive Sprache in Papierweiss, die andere
 * gedaempft. Kein Dropdown, keine Flagge — eine Flagge behauptet ein Land, nicht
 * eine Sprache, und waere fuer eine Schweizer Seite mit deutscher und englischer
 * Fassung schlicht falsch.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WARUM DER PFAD BERECHNET UND NICHT VERLINKT WIRD
 * ─────────────────────────────────────────────────────────────────────────────
 * Ein fester Link auf `/` bzw. `/en` waere einfacher — und falsch: Wer auf
 * `/media` steht und die Sprache wechselt, landete auf der Startseite statt auf
 * `/en/media`. Genau das ist der haeufigste Fehler zweisprachiger Seiten. Hier
 * wird deshalb aus dem aktuellen Pfad der kanonische Pfad gewonnen und daraus
 * die Adresse derselben Seite in der anderen Sprache gebaut.
 *
 * Der Anker (`#partner`) wird beim Klick uebernommen. Er ist serverseitig nicht
 * bekannt — der Browser sendet ihn nie mit —, deshalb passiert das im
 * Klick-Handler. Ohne Javascript bleibt der Link trotzdem korrekt, nur ohne
 * Sprungmarke: eine echte progressive Verbesserung, kein Javascript-Zwang.
 */
export default function LanguageSwitch({ lang, className = "", onNavigate }: Props) {
  const pathname = usePathname() ?? "/";
  const { canonicalPath } = splitLangPath(pathname);
  const t = UI[lang];

  return (
    <div
      className={`flex items-center gap-1 font-mono text-xs uppercase tracking-widest2 ${className}`}
    >
      <span className="sr-only">{t.languageSwitchLabel}:</span>
      {LANGS.map((code, index) => {
        const isActive = code === lang;
        const href = localizedPath(canonicalPath, code);

        return (
          <span key={code} className="flex items-center">
            {index > 0 ? (
              <span aria-hidden className="px-1.5 text-slate-light/40">
                |
              </span>
            ) : null}
            {isActive ? (
              <span
                aria-current="true"
                aria-label={t.currentLanguage(LANG_NAME[code])}
                className="text-paper"
              >
                {LANG_LABEL[code]}
              </span>
            ) : (
              <Link
                href={href}
                hrefLang={code}
                lang={code}
                aria-label={t.switchTo(LANG_NAME[code])}
                onClick={(event) => {
                  onNavigate?.();
                  const hash = window.location.hash;
                  if (!hash) return;
                  event.preventDefault();
                  window.location.assign(`${href}${hash}`);
                }}
                className="rounded-sm text-slate-light transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
              >
                {LANG_LABEL[code]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
