# Domains, 404, Canonicals und hreflang — 26.08.2026

Geprüft gegen die **Live-Seite**, Stand `ee66e9c`. 19 Sprachpaare, also 38
Seiten, dazu die Hostvarianten.

---

## Deine Beobachtung zu www und Apex: geprüft, kein Fehler

Du hast von aussen unterschiedliche Antworten auf `/` und `/media` gesehen.
Das stimmt — und ist trotzdem richtig so. Der Unterschied liegt im
**Antwortstatus**, nicht im Inhalt.

| Aufruf | Status | Inhaltstyp |
|---|---|---|
| `https://devinhauser.com/` | **308** | `text/plain`, `location: https://www.devinhauser.com/` |
| `https://www.devinhauser.com/` | **200** | `text/html` |
| `https://devinhauser.com/media` | **308** | `text/plain`, `location: https://www.devinhauser.com/media` |
| `https://www.devinhauser.com/media` | **200** | `text/html` |

Wer den Apex ohne Weiterleitungsverfolgung abruft — `curl` ohne `-L`, viele
Prüfwerkzeuge, manche SEO-Scanner — sieht also eine kurze Textantwort statt
der Seite. Das sieht nach „andere Seite" aus, ist aber die Weiterleitung
selbst.

**Der Inhalt ist identisch, byteweise:**

| URL | SHA-256 (gekürzt) | Bytes |
|---|---|---:|
| `devinhauser.com/` → gefolgt | `9e4350da316c765f` | 156 975 |
| `www.devinhauser.com/` | `9e4350da316c765f` | 156 975 |
| `devinhauser.com/media` → gefolgt | `9d8c0ae6b9ffdf29` | 97 229 |
| `www.devinhauser.com/media` | `9d8c0ae6b9ffdf29` | 97 229 |

Gleiche Prüfsumme, gleiche Länge. **Es gibt keine zwei Fassungen der Seite.**
Die Weiterleitung ist eine 308, also permanent — Suchmaschinen übertragen das
Ranking auf `www` und indexieren den Apex nicht doppelt. Auch Query-Strings
bleiben erhalten (`/media?x=1` → `www…/media?x=1`).

**Handlungsbedarf: keiner.**

---

## Was dagegen wirklich kaputt ist: `devinhauser.ch`

Das hatte ich nicht auf dem Zettel, es fiel bei der Hostprüfung auf.

```
devinhauser.ch      A  80.74.148.30      (nicht Vercel)
www.devinhauser.ch  A  80.74.148.30
```

| Aufruf | Ergebnis |
|---|---|
| `https://devinhauser.ch/` | **TLS-Fehler.** Das Zertifikat auf dem Server lautet `*.metanet.ch` und deckt `devinhauser.ch` nicht ab → der Browser zeigt eine Sicherheitswarnung |
| `http://devinhauser.ch/` | HTTP 200 von `nginx`, aber eine 1076 Byte grosse Seite mit dem Titel **`Error`** |
| `https://www.devinhauser.ch/` | derselbe TLS-Fehler |

Wer die alte Adresse eintippt oder auf einem alten Link landet, bekommt also
entweder eine Sicherheitswarnung oder eine Fehlerseite. Für jemanden, der auf
eine Sponsorenanfrage hin nach dir sucht, ist das der denkbar schlechteste
erste Eindruck.

**Im Code ist alles vorbereitet.** `next.config.mjs` enthält bereits
Weiterleitungen für `devinhauser.ch` und `www.devinhauser.ch` auf
`https://www.devinhauser.com`, dazu die alten Inhaltspfade `/impressum` →
`/imprint` und `/meine-ziele` → `/`. Diese Regeln **schlafen**, weil sie erst
greifen, wenn die Anfrage überhaupt bei Vercel ankommt.

**Die Korrektur ist eine DNS-Änderung, keine Codeänderung:** Bei Hosttech die
A-/CNAME-Einträge von `devinhauser.ch` und `www.devinhauser.ch` auf Vercel
zeigen lassen und die Domain im Vercel-Projekt hinzufügen. Vercel stellt dann
automatisch ein gültiges Zertifikat aus, und die vorbereiteten
Weiterleitungen greifen von selbst.

**Das ist eine DNS-Änderung — die mache ich nicht ohne deine ausdrückliche
Freigabe.** Solange sie aussteht, bleibt `.ch` kaputt; die `.com` ist davon
nicht betroffen.

---

## Weiterleitungsketten

| Aufruf | Sprünge | Kette |
|---|---:|---|
| `http://devinhauser.com/media` | 2 | http-Apex → https-Apex → https-www |
| `http://devinhauser.com/media/` | 3 | zusätzlich noch der Schrägstrich weg |
| `https://www.devinhauser.com/media/` | 1 | Schrägstrich weg |

Zwei bis drei Sprünge sind unschön, aber unkritisch: Sie treffen nur getippte
Adressen, nicht die verlinkten. Google folgt bis zu fünf Sprüngen ohne
Wertverlust. Auflösen liesse sich das nur auf DNS-Ebene, nicht im Code — dafür
lohnt der Eingriff nicht.

---

## Canonicals, hreflang, x-default: sauber

38 Seiten geprüft — 7 Standardseiten und 12 Alben, je Deutsch und Englisch.

| Prüfpunkt | Ergebnis |
|---|---|
| Canonical zeigt auf sich selbst, immer auf `https://www.` | **38 von 38** |
| `hreflang="de"` und `hreflang="en"` auf beiden Fassungen, wechselseitig | **38 von 38** |
| `x-default` zeigt auf **Deutsch** | **38 von 38** |
| `<html lang>` passend zur Fassung | **38 von 38** |

Der Wechsel vom 25.08. auf Deutsch als Standard ist damit vollständig
durchgezogen. Nirgends zeigt ein `x-default` mehr auf `/en`.

---

## Echte 404

| Pfad | Status | robots |
|---|---|---|
| `/gibtsnicht` | **404** | `noindex` |
| `/en/gibtsnicht` | **404** | `noindex` |
| `/media/gibtsnicht` | **404** | `noindex` |
| `/en/media/gibtsnicht` | **404** | `noindex` |
| `/media/swiss-sm-pumpfoil-2023` | **404** | `noindex` |

Keine Soft-404. Das zurückgezogene Pumpfoil-Album liefert korrekt 404 statt
einer leeren Seite mit Status 200.

---

## Sitemap und robots.txt

- 36 Einträge, davon 24 Album-URLs (12 Alben × zwei Sprachen)
- alle auf `https://www.`
- kein `x-default` auf Englisch
- **kein Pumpfoil mehr enthalten**
- `robots.txt`: `Allow: /` plus Sitemap-Verweis, keine versehentliche Sperre

---

## Was ich geändert habe

Nichts. Für `.com` gab es nichts zu korrigieren, und `.ch` ist mit Code nicht
erreichbar.
