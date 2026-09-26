# IBI ScannerC v2.4.1

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

- **v2.4.1 (26 Sep 2026)** — *Install app* is always at the top of Settings: one-tap install when Chrome offers it, *Installed ✓* inside the installed app, otherwise step-by-step instructions (Android Chrome, Samsung Internet, iPhone Safari) with a warning and copy-link for WhatsApp's in-app browser.
- **v2.4.0 (26 Sep 2026)** — storage: asks the browser for protected (persistent) storage and shows the status in Settings with a *Protect my scans* button; the kept original photo is stored at ≤ 3000 px / JPEG 85 % (about 3x less space), existing scans are tidied once in the background; Settings shows average page size and room left.
- **v2.3.0 (26 Sep 2026)** — reliable edge detection on white / low-contrast surfaces: 4 edge detectors (Canny, CLAHE, morphological gradient, colour) at two scales; every outline scored by edge support and a paper-vs-table brightness step; the largest strong outline wins; steadier live outline; the live outline is reused if the photo misses; a hint appears when edges are unclear. Test set: 112 cases, 109 found, 0 wrong outlines, 0 false pages.
- **v2.2.0 (26 Sep 2026)** — full-width camera: requests the 4:3 photo stream and fills the camera area edge to edge (no side bars); the saved photo is trimmed to exactly what the screen showed.
- **v2.1.1 (26 Sep 2026)** — custom domain scanner.indiabusinessinternational.online; share-preview tags point at it.
- **v2.1.0 (26 Sep 2026)** — Auto | Manual switch on the camera (Manual → corner adjustment after every shot, like WhatsApp); press-and-hold drag to re-arrange pages on phones.
- **v2.0.0 (26 Sep 2026)** — complete rebuild as a document scanner (the v1.x page was an OCR/GST invoice analyser). Everything above is new.
- v1.1 (Jul 2026) — OCR + GST field extraction prototype.
