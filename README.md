# IBI ScannerC v2.8.0

Scan documents with your phone, the way Google Scan and Adobe Scan do — in the browser, with nothing uploaded.

**Live:** https://scanner.indiabusinessinternational.online/

## What it does

- **Camera scanning** with live edge detection (blue outline). WhatsApp-style **Auto | Manual** switch: Auto (default) takes the photo when the page is steady; Manual gives a shutter and goes straight to corner adjustment. Also torch, zoom, grid, front/back camera.
- **Perspective correction** — the four corners are straightened into a flat page. Adjust them any time with **Crop** (draggable corners, edge handles, magnifier).
- **Filters:** Auto (shadow removal + white balance), Original, Colour+, Grayscale, Black & white. Brightness / contrast. Rotate.
- **Multi-page documents:** batch capture, re-arrange (press-and-hold and drag on phones, drag on computers, or arrows), delete, retake, add pages from the camera, photos or an existing PDF, merge documents.
- **Modes:** Document, **ID card** (front + back on one A4 page), Photo (no crop), **QR / Barcode** reader.
- **OCR** on-device (Tesseract): English, Tamil, Hindi. Copy or share the text; full-text search across the library.
- **Export:** PDF (A4 / Letter / Legal / fit-to-scan, three quality levels, optional **searchable text layer**, optional **password**), JPG, PNG, TXT. Print.
- **Share:** the phone's share sheet (WhatsApp, Gmail, Google Drive, Telegram, …) via the Web Share API; desktop browsers download the file first. The app is also a **share target** — send photos from the Gallery straight into ScannerC.
- **Library** stored on the device (IndexedDB): search, sort, rename, select-to-merge/share/delete, backup all as a ZIP of PDFs.
- **PWA:** installable, works offline after the first visit (libraries and OCR data are cached).

## Files

| File | Purpose |
|---|---|
| `index.html` | the whole app (single file) |
| `service-worker.js` | offline shell + library cache + share-target intake — bump `CACHE_VERSION` with every release |
| `manifest.json` | PWA manifest (icons, share target, shortcut) |
| `icons/`, `logo.png`, `og-banner.png` | brand assets |

## Libraries (loaded on demand from CDNs, then cached)

OpenCV.js 4.x (edge detection only — warping and filters are pure JS in a Web Worker), jsPDF 2.5.1, Tesseract.js 5.1.1, JSZip 3.10.1, pdf.js 3.11.174, jsQR 1.4.0.

## Versioning

Badge (`versionTag`), `ibi-build` meta, footer, `service-worker.js` `CACHE_VERSION`, this README heading and the git tag all carry the same `vX.Y.Z`.

## Changelog

- **v2.8.0 (18 Oct 2026)** — (1) **Book mode**: camera mode Book (and ⋮ › Split into two pages) turns an open book or diary into two straight pages — the spine is found as the darkest, smoothest column near the middle, each page's curved top and bottom edges are traced and straightened (bent text lines 2.0–2.4% of page height → 0.06–0.13%), and the spine shadow is lifted. (2) **Verified scan**: optional tamper-proof seal on PDFs — scan date, ID, SHA-256 fingerprint of the whole file and a QR code on every page; Settings › Verify a PDF says Genuine, Changed or No seal (one changed character or bytes added at the end are caught). The QR opens the Verify page.
- **v2.7.0 (18 Oct 2026)** — new standards: (1) **Portal-ready export** — Size limit in Share / Export (100 KB, 200 KB, 500 KB, 1 MB, 2 MB or Custom) for PDF and JPG; the sharpest file that fits (resolution first, then quality, grey only as a last resort), measured before use, 1 KB = 1000 bytes so it passes either meaning. (2) **Quality guard** — every page is checked for blur, glare, too dark, low resolution and a cut-off edge; the camera says what is wrong with Retake / Keep, and the editor marks the page. Also: after scanning, the editor opens on the page just scanned (first new page, or the retaken page), and **Magic colour** is now vivid and bold (S-curve contrast, vibrance that lifts soft colours most, brighter whites, stronger sharpening).
- **v2.6.4 (18 Oct 2026)** — magnetic snap: when a corner is released it snaps exactly onto the paper's corner (the meeting point of the two real paper edges found nearby), and a released side snaps onto the paper edge. Edges are brightness steps along a straight line close to the outline's own direction, so ruled lines and text are ignored; with no clear edge nearby the handle stays where it was left. The handle flashes green when it snaps.
- **v2.6.3 (18 Oct 2026)** — the page fills the screen: the page view opens at the top (app header one scroll up), the page uses the full width and the height down to the tool row, and filters open from a new Filters button (Microsoft Lens / Adobe Scan style). Tap the page (or the magnifier) for a full-screen viewer: pinch or double-tap to zoom up to 8x, drag to pan, swipe left/right for the next page, swipe down or close to exit; mouse wheel and +/- keys on a computer. Crop: a touch ANYWHERE on the photo takes the nearest handle (no need to hit the dot); Auto, Full, Retake and Apply sit in one even row. In a document the app header scrolls away.
- **v2.6.2 (18 Oct 2026)** — Crop is always on screen: the filters and the tool row (Crop, Rotate, Adjust, Text, Retake, Delete) are pinned just above Add page / Share on every screen size, and the page preview is sized to fit above them (before, the tools sat below a full-height preview, off-screen on phones). The ⋮ menu also has Crop this page. Corner dragging is smooth: the outline is moved, not rebuilt, once per frame; a touch grabs the nearest handle in finger reach; side handles move their edge straight in or out; the outline can never fold (the handle stops at the limit); the magnifier stays in a top corner away from the finger and shows both edges. Adjust replaces the filter strip and its sliders sit on one line, so the page stays in view.
- **v2.6.1 (18 Oct 2026)** — imported pictures that ARE the page (pre-cropped scans, forwarded document photos) keep the whole page instead of being cropped to a block inside it (text, table, photo, colour chart) or opening the corner screen; stills are detected at two sizes and the best outline from both is used (a header band no longer cuts the page short). Detection regression set: 14/14 (was 4/12).
- **v2.6.0 (18 Oct 2026)** — true-colour scanning engine. The paper is found by its tint and brightness only, so coloured bands, photos and pale boxes keep their real colour; light and colour cast are evened out in linear light; camera glare is removed so ink is black and colours regain their real strength; paper is cleaned to white only where it is neutral; text is sharpened. New filters Magic colour, Photo and Whiteboard; B&W keeps white lettering on coloured bands; Colour slider in Adjust; higher PDF image quality; edge to edge on every screen size. Measured on a colour test sheet: average colour error (ΔE) 25 → 4–7.
- **v2.5.3 (11 Oct 2026)** — long words wrap only where they would overflow (break-word instead of anywhere, so buttons and switches keep whole words on phones).
- **v2.5.2 (11 Oct 2026)** — phones edge to edge: no outer gutter, full-bleed flat boxes, 10px inner side padding, the page never wider than the screen.
- **v2.5.1 (26 Sep 2026)** — inside an installed copy, Settings offers *Reinstall* with steps (an old copy restored from a previous phone opens with an address bar).
- **v2.5.0 (26 Sep 2026)** — automatic Google Drive backup: each document is saved as a PDF in the “IBI ScannerC” Drive folder and updated after edits (Google Identity Services, `drive.file` scope, the IBI Documents OAuth client). Sign-in only on taps; backups run by themselves while the sign-in is valid; a *Back up now* banner otherwise. Cloud badge on each document. Service worker never caches Google traffic.
- **v2.4.1 (26 Sep 2026)** — *Install app* is always at the top of Settings: one-tap install when Chrome offers it, *Installed ✓* inside the installed app, otherwise step-by-step instructions (Android Chrome, Samsung Internet, iPhone Safari) with a warning and copy-link for WhatsApp's in-app browser.
- **v2.4.0 (26 Sep 2026)** — storage: asks the browser for protected (persistent) storage and shows the status in Settings with a *Protect my scans* button; the kept original photo is stored at ≤ 3000 px / JPEG 85 % (about 3x less space), existing scans are tidied once in the background; Settings shows average page size and room left.
- **v2.3.0 (26 Sep 2026)** — reliable edge detection on white / low-contrast surfaces: 4 edge detectors (Canny, CLAHE, morphological gradient, colour) at two scales; every outline scored by edge support and a paper-vs-table brightness step; the largest strong outline wins; steadier live outline; the live outline is reused if the photo misses; a hint appears when edges are unclear. Test set: 112 cases, 109 found, 0 wrong outlines, 0 false pages.
- **v2.2.0 (26 Sep 2026)** — full-width camera: requests the 4:3 photo stream and fills the camera area edge to edge (no side bars); the saved photo is trimmed to exactly what the screen showed.
- **v2.1.1 (26 Sep 2026)** — custom domain scanner.indiabusinessinternational.online; share-preview tags point at it.
- **v2.1.0 (26 Sep 2026)** — Auto | Manual switch on the camera (Manual → corner adjustment after every shot, like WhatsApp); press-and-hold drag to re-arrange pages on phones.
- **v2.0.0 (26 Sep 2026)** — complete rebuild as a document scanner (the v1.x page was an OCR/GST invoice analyser). Everything above is new.
- v1.1 (Jul 2026) — OCR + GST field extraction prototype.
