import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { rootMetadata } from "@/lib/metadata";

/**
 * Root-Layout der deutschn Fassung.
 *
 * Es gibt bewusst ZWEI Root-Layouts (siehe src/lib/i18n.ts und
 * src/components/RootShell.tsx). Beide sind absichtlich winzig: Das gesamte
 * Dokumentgeruest steht in RootShell, hier steht nur, welche Sprache dieser
 * Zweig ausliefert.
 */
export const metadata: Metadata = rootMetadata("de");

export default function DeRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="de">{children}</RootShell>;
}
