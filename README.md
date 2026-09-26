# IBI ScannerC v2.0.0

Scan documents with your phone, the way Google Scan and Adobe Scan do — in the browser, with nothing uploaded.

**Live:** https://indiabusinessinternational.github.io/ScannerC/ (moving to `scanner.indiabusinessinternational.online`)

## What it does

- **Camera scanning** with live edge detection (blue outline), **auto-capture** when the page is steady, torch, zoom, grid, front/back camera.
- **Perspective correction** — the four corners are straightened into a flat page. Adjust them any time with **Crop** (draggable corners, edge handles, magnifier).
- **Filters:** Auto (shadow removal + white balance), Original, Colour+, Grayscale, Black & white. Brightness / contrast. Rotate.
- **Multi-page documents:** batch capture, reorder (arrows or drag), delete, retake, add pages from the camera, photos or an existing PDF, merge documents.
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

- **v2.0.0 (26 Sep 2026)** — complete rebuild as a document scanner (the v1.x page was an OCR/GST invoice analyser). Everything above is new.
- v1.1 (Jul 2026) — OCR + GST field extraction prototype.
