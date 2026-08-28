import { Fragment, type ReactNode } from "react";

/**
 * Schreibt den Markennamen `iQFOiL` auch dort korrekt, wo die Umgebung per CSS
 * in Versalien gesetzt ist.
 *
 * Das Gestaltungssystem setzt Mono-Beschriftungen durchgehend mit
 * `text-transform: uppercase`. Fuer normale Woerter ist das richtig; aus
 * `iQFOiL` macht es aber `IQFOIL`, und die Schreibweise der Klasse ist
 * verbindlich. Statt die Versalien an diesen Stellen ganz abzuschalten — was
 * die Beschriftung aus dem System herausfallen liesse — wird nur der
 * Markenname selbst mit `normal-case` von der Umwandlung ausgenommen.
 *
 * Bewusst kein Regex ueber beliebige Schreibweisen: gesucht wird genau der
 * korrekte Wortlaut. Wo im Quelltext etwas anderes steht, soll es auffallen
 * und nicht still repariert werden.
 */
const BRAND = "iQFOiL";

export function brandText(text: string): ReactNode {
  if (!text.includes(BRAND)) return text;
  const teile = text.split(BRAND);
  return teile.map((teil, i) => (
    <Fragment key={i}>
      {teil}
      {i < teile.length - 1 ? (
        <span className="normal-case">{BRAND}</span>
      ) : null}
    </Fragment>
  ));
}
