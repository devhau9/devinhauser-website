# Partner-Portal: Zustelltest vor dem 1. September

**Stand:** 26.08.2026 · Betrifft `https://www.devinhauser.com/partner-portal`
und `/en/partner-portal`.

Der Code wurde am 26.08. gehärtet (Commit `ee66e9c`) und gegen alle
Fehlerantworten geprüft — aber **es ist nie eine echte Mail durchgelaufen**.
Genau das macht dieser Test. Er dauert rund zehn Minuten und muss vor dem
Versand der Sponsorenanfragen einmal komplett durch sein.

Wenn am 1. September Anfragen an Firmen wie Eberhard oder die Mobiliar
rausgehen und das Formular schweigt, ist die ganze Welle wertlos. Deshalb
lieber jetzt zehn Minuten.

---

## Was das Formular technisch tut

Vier Pflichtfelder gehen per HTTPS an `api.web3forms.com`. Web3Forms schickt
daraus eine Mail an die Adresse, die **im Web3Forms-Konto** hinterlegt ist —
nicht an eine Adresse aus dem Code. Kommt keine Mail an, liegt es fast immer
dort und nicht am Formular.

Mitgesendet werden: Vorname, Nachname, Firma, E-Mail, ein Betreff mit dem
Firmennamen, die Antwortadresse (`replyto`) und ein leeres Spamfeld
(`botcheck`).

---

## Test 1 — Deutsch, der Normalfall

1. `https://www.devinhauser.com/partner-portal` öffnen.
2. Ausfüllen:

   | Feld | Eingabe |
   |---|---|
   | Vorname | `Test` |
   | Nachname | `Absender` |
   | Firma / Organisation | **`ZZZ Testfirma`** |
   | E-Mail-Adresse | **eine Adresse, die du sonst nicht benutzt** — dein zweites Postfach, nicht die, an die die Anfrage geht |

   Das `ZZZ` macht die Testmail im Posteingang und in der Suche sofort
   auffindbar. Die zweite Adresse brauchst du für Schritt 5.

3. **„Zugang anfragen"** klicken.

**Was du sehen musst, in dieser Reihenfolge:**

| Zeitpunkt | Erwartung |
|---|---|
| sofort | Knopf wird blass und lässt sich nicht mehr drücken, Text wechselt auf „Wird gesendet…" |
| nach 1–3 Sekunden | Das Formular verschwindet, an seiner Stelle steht **„Danke."** und darunter „Ihre Anfrage ist eingegangen und wird geprüft." |

**Länger als 15 Sekunden darf es nie dauern.** Danach bricht das Formular von
sich aus ab und zeigt die rote Fehlerzeile — das ist eingebaut, damit du nie
vor einem ewig drehenden Knopf sitzt.

---

## Test 2 — Kommt die Mail an?

4. Das Postfach öffnen, das im Web3Forms-Konto als Empfänger eingetragen ist
   (heute `devinhauser9@gmail.com`).

   | Prüfpunkt | Erwartung |
   |---|---|
   | Betreff | `Neue Anfrage Partner-Portal — ZZZ Testfirma` |
   | Inhalt | alle vier Felder, so wie eingegeben |
   | Ankunft | **innerhalb von 2 Minuten**. Länger als 5 Minuten heisst: es klemmt |

   **Auch in den Spam-Ordner schauen.** Liegt die Mail dort, sofort „Kein
   Spam" beziehungsweise „Nie blockieren" wählen — sonst landen die echten
   Sponsorenanfragen genauso dort und du merkst es nicht.

5. **In der Mail auf „Antworten" drücken.** Im An-Feld muss **die in Schritt 2
   eingegebene Adresse** stehen — nicht deine eigene. Das prüft, ob du auf eine
   Anfrage direkt antworten kannst, ohne die Adresse von Hand herauszukopieren.

---

## Test 3 — Englisch

6. `https://www.devinhauser.com/en/partner-portal`, dieselben Daten, Firma
   diesmal **`ZZZ Test Company`**.

   | Prüfpunkt | Erwartung |
   |---|---|
   | Knopftext während des Sendens | „Sending…" |
   | Erfolgsmeldung | **„Thank you."** und „Your request has been received and will be reviewed." |
   | Betreff der Mail | `New Partner Portal request — ZZZ Test Company` |

---

## Test 4 — Gegenprobe: der Fehlerfall muss sichtbar sein

Ein Formular, das bei einem Problem trotzdem „Danke" sagt, ist gefährlicher
als eines, das gar nicht funktioniert. Deshalb einmal absichtlich scheitern
lassen:

7. WLAN und Mobilfunk ausschalten, Formular ausfüllen, absenden.

   | Erwartung | |
   |---|---|
   | **Keine** Erfolgsmeldung | „Danke." darf **nicht** erscheinen |
   | Rote Zeile unter den Feldern | „Da ist etwas schiefgelaufen… " mit der E-Mail-Adresse als anklickbarem Ausweichweg |
   | Formular bleibt stehen | die eingegebenen Daten sind noch da |

8. Netz wieder einschalten, erneut absenden. Jetzt muss „Danke." kommen.

---

## Woran du merkst, dass es klemmt

| Symptom | Wahrscheinliche Ursache | Was zu tun ist |
|---|---|---|
| „Danke." erscheint, **aber keine Mail** | Empfängeradresse im Web3Forms-Konto falsch oder nicht bestätigt | Im Web3Forms-Dashboard die Zieladresse prüfen und die Bestätigungsmail von Web3Forms abarbeiten |
| Mail kommt, landet aber im Spam | fehlende Absenderreputation | Als „Kein Spam" markieren, Absender zu den Kontakten hinzufügen |
| Knopf bleibt dauerhaft auf „Wird gesendet…" | sollte nicht mehr vorkommen — nach 15 s bricht das Formular ab | Wenn doch: Browserkonsole öffnen und die Fehlermeldung notieren |
| Rote Fehlerzeile trotz funktionierendem Netz | Monatskontingent erschöpft oder Schlüssel ungültig | Web3Forms-Dashboard: Kontingent und Access Key prüfen |
| „Antworten" geht an dich selbst statt an den Absender | `replyto` kam nicht durch | Melden — dann stimmt etwas mit der Nutzlast nicht |
| Alles funktioniert, aber erst nach über 5 Minuten | Verzögerung bei Web3Forms | Nochmals testen; bleibt es dabei, vor dem 1.9. eskalieren |

---

## Nach dem Test

Die drei Testmails löschen, damit sie später nicht mit echten Anfragen
verwechselt werden. Das `ZZZ` im Firmennamen macht sie über die Suche in
Sekunden auffindbar.

---

## Ist der Web3Forms-Schlüssel im Quelltext ein Risiko?

**Nein.** Der Schlüssel steht bewusst im Client-Bundle; Web3Forms schreibt in
der eigenen Dokumentation wörtlich „Don't worry this can be public". Er ist
keine Zugangsberechtigung zu deinem Postfach, keine Zugangsdaten und kein
Passwort — er ist eine Zieladresse. Wer ihn liest, kann daraus weder Mails
abrufen noch die Empfängeradresse ändern noch auf das Konto zugreifen.

**Was im schlimmsten Fall passiert:** Jemand nimmt den Schlüssel und schickt
darüber Müll an dein Postfach. Zwei Folgen, beide unangenehm, keine
gefährlich:

1. Du bekommst Spam, den du aussortieren musst.
2. Und der wichtigere Punkt: Der Gratistarif deckt **250 Einreichungen pro
   Monat**. Ist das Kontingent aufgebraucht, werden weitere Anfragen abgewiesen
   — und dann trifft es die echten. Im September wäre das der teure Fall.

**Gegenmittel, falls es passiert:** Im Web3Forms-Konto **hCaptcha**
einschalten. Das ist im Gratistarif enthalten, braucht keine eigenen Schlüssel
und stoppt automatisierte Absender. Eine Domain-Sperre gäbe es auch, die ist
aber kostenpflichtig.

**Was du bis dahin tun solltest:** In den ersten Tagen nach dem Versand kurz
schauen, ob ungewöhnlich viele oder offensichtlich automatische Anfragen
ankommen. Solange nicht, ist nichts zu tun. Das Spamfeld und die
serverseitige Prüfung von Web3Forms laufen bereits.
