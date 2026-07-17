type PlaceholderMediaProps = {
  label: string;
  aspect?: string;
  className?: string;
};

/**
 * Visueller Platzhalter für Fotos/Videos, die später durch echtes Bild-
 * bzw. Videomaterial ersetzt werden (siehe media/-Ordner im Projekt).
 * Bewusst als sichtbarer Platzhalter gestaltet, damit nichts versehentlich
 * als "fertig" durchgeht.
 */
export default function PlaceholderMedia({
  label,
  aspect = "aspect-[4/5]",
  className = "",
}: PlaceholderMediaProps) {
  return (
    <div
      className={`placeholder-block ${aspect} w-full bg-gradient-to-br from-ink-soft via-ink to-ink-soft p-6 ${className}`}
    >
      <span>PLATZHALTER — {label}</span>
    </div>
  );
}
