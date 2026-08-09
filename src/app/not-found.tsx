import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Devin Hauser",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/iqfoil", label: "What is IQFoil" },
  { href: "/#highlights", label: "Results" },
  { href: "/#kontakt", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="section-pad bg-white">
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-5">404</p>
        <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-ink sm:text-5xl">
          PAGE NOT FOUND
        </h1>
        <p className="mt-6 max-w-lg leading-relaxed text-graphite">
          That page doesn&apos;t exist — it may have been moved or the link may be
          out of date. Here is where to go instead.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-sm border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-mist"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
