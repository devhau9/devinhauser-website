# Wechsel auf `devin@devinhauser.com` — Vorschlag

**Stand:** 26.08.2026 · **Nicht angewendet.**

Erst umstellen, wenn das Postfach existiert und Mails empfängt. Sonst zeigt
die Website eine Adresse, die ins Leere läuft — und zwar genau in dem Moment,
in dem die Sponsorenanfragen ankommen.

---

## Der eigentliche Befund

`src/lib/site.ts` Zeile 76 exportiert bereits die Konstante:

```ts
export const CONTACT_EMAIL = "devinhauser9@gmail.com";
```

**Sie wird nirgends importiert.** Stattdessen steht die Adresse **siebenmal**
einzeln im Code: dreimal als lokale Konstante mit demselben Namen, viermal als
Literal mitten im JSX. Ein Wechsel heisst heute also: sieben Stellen finden,
sieben Stellen ändern, hoffen, dass keine vergessen wurde.

Deshalb zwei Schritte. Schritt 1 ist ungefährlich, Schritt 2 ist dann eine
Zeile.

---

## Schritt 1 — alle Fundstellen auf die eine Konstante ziehen

Ändert **nichts** an der sichtbaren Adresse, nur daran, woher sie kommt. Der
gerenderte Text bleibt zeichengleich; das kollidiert also nicht mit der
laufenden Textüberarbeitung.

| Datei | Zeile | heute | danach |
|---|---:|---|---|
| `src/components/PartnerPortalForm.tsx` | 69 | eigene lokale Konstante | Zeile löschen, `import { CONTACT_EMAIL } from "@/lib/site";` |
| `src/components/Footer.tsx` | 73 | eigene lokale Konstante | dito |
| `src/components/Contact.tsx` | 4 | eigene lokale Konstante | dito |
| `src/views/ImprintView.tsx` | 172–173 | Literal in `href` **und** Linktext | `href={\`mailto:${CONTACT_EMAIL}\`}` und `{CONTACT_EMAIL}` |
| `src/views/legal/PrivacyDe.tsx` | 406–409 | Literal in `href` **und** Linktext | dito |
| `src/views/legal/PrivacyEn.tsx` | 376–379 | Literal in `href` **und** Linktext | dito |

Danach existiert die Adresse genau einmal: `src/lib/site.ts` Zeile 76.

---

## Schritt 2 — der eigentliche Wechsel

```diff
--- a/src/lib/site.ts
+++ b/src/lib/site.ts
-export const CONTACT_EMAIL = "devinhauser9@gmail.com";
+export const CONTACT_EMAIL = "devin@devinhauser.com";
```

Eine Zeile. Alle sieben Fundstellen ziehen automatisch nach.

---

## Was ausserdem zu prüfen ist

**Web3Forms — der wichtigste Punkt.** Die Empfängeradresse des Partner-Portals
hängt **nicht** am Code, sondern am Access Key im Web3Forms-Konto. Der
Codewechsel ändert nur die Ausweichadresse in der Fehlermeldung. Damit die
Anfragen selbst an die neue Adresse gehen, muss die Zieladresse **im
Web3Forms-Dashboard** umgestellt und die Bestätigungsmail abgearbeitet werden.
Danach einmal `docs/partnerportal-test.md` durchlaufen.

**Impressum.** Die dort genannte Adresse muss die sein, unter der du
tatsächlich erreichbar bist. Wenn das Gmail-Postfach weiterhin gelesen wird
und das neue nicht, wäre die Umstellung dort ein Rückschritt.

**Datenschutzerklärung.** Beide Sprachfassungen nennen die Adresse als
Anlaufstelle für Auskunfts- und Löschbegehren. Sie muss zuverlässig zugestellt
werden und darf nicht im Spam landen.

**Zustellbarkeit.** Vor der Umstellung mindestens einmal von aussen an
`devin@devinhauser.com` schreiben und prüfen, dass die Mail ankommt und nicht
im Spam liegt. Für eine eigene Domain lohnen sich **SPF und DKIM**; ohne die
landen Mails an Firmenpostfächer wie die von Eberhard oder der Mobiliar
überdurchschnittlich oft im Spam-Ordner — und dort schaut in einem
Beschaffungsprozess niemand nach.

---

## Reihenfolge

1. Postfach `devin@devinhauser.com` anlegen
2. SPF und DKIM setzen
3. Zustellung von aussen testen (auch Spam-Ordner)
4. Empfängeradresse im Web3Forms-Dashboard umstellen
5. `docs/partnerportal-test.md` komplett durchlaufen
6. **Erst dann** Schritt 1 und Schritt 2 im Code
