# Your Dream Home Renovations

An original website designed and implemented from scratch. The uploaded starter HTML is not used as a template or runtime dependency. The client's photographs, logo and business information are reference material.

The design uses a layered editorial hero, project photography, a responsive portfolio, a contrasting dark services section and a separate home-design concept feature. The quote form and business details remain those supplied by the client.

The client-supplied HTML is now also used as a copy reference. The extracted text and adaptation map are in `docs/copy-reference.md`. The new site's layout and code remain original.

The dedicated before-and-after section pairs the courtyard with its finished timber deck, the existing shed with its refreshed exterior, and the bathroom strip-out with the newly supplied finished bathroom. Photos retain their full frame, with clear Before and After labels. Each opens at the selected stage in the photo viewer. The bathroom gallery keeps strip-out, waterproofing and the finished result in sequence.

## Design and copy preferences

Use clearly labelled buttons for actions and keep decorative arrows out of the design. Project cards show the project name and a View project button. Omit photo commentary, visible photograph counts, decorative numbering and scroll prompts. Keep the Before/After labels and the reference/design classifications. The bathroom now has a finished photograph and no In progress badge.

Public copy should focus on the supplied business details, services, customer benefits and actual project results. Keep detailed image descriptions in accessibility text. The photo viewer uses labelled Previous, Next and Close buttons and concise stage captions.

The client feedback revision uses Bodoni Moda for headings, matching the high-contrast serif style in the supplied logo. The raster logo does not identify its original typeface. Main body copy is 20–21px after the final 3px increase, main buttons and navigation are 16px, and secondary buttons are 15px. Keep text readable on mobile; do not shrink it to fit an extra column.

The enlarged header logo uses a transparent PNG derivative. The original WebP remains untouched. A dedicated NDIS home modifications section follows the hero, with its own navigation link, service enquiry button and gallery of ramp examples. The user confirmed that the two ramp photographs are reference images. They are labelled Accessibility examples, are described as reference images in the viewer, and remain outside the completed-work portfolio. NDIS provider registration has not been confirmed and the page makes no registration claim.

## Motion

Motion uses native browser animations without an additional animation library. The headline and project card enter in stages, sections reveal as they approach the viewport, gallery filters animate card positions and grid height, and the photo viewer, service panels and mobile navigation have short transitions. The header adds a page-progress indicator and updates active navigation as visitors scroll.

The NDIS ramp image pans into place. Before-and-after photographs enter in sequence, portfolio photographs gently settle into their frames, the new strata/design sections reveal as they come into view, and the enlarged logo has a short entrance animation. These effects run once when the relevant content comes into view.

All content is visible by default. Do not add a CSS rule that hides sections until JavaScript or an observer runs. The downloads must continue to show the full page if scripts are blocked. Reduced-motion preferences skip or cancel animations, remove the photo parallax and leave all controls working. Gallery filter animations clean up temporary clipping on completion or cancellation.

## Development

Tested with Node.js 24.22.1 and npm 11.9.0. Use the existing isolated checkout. Do not create a Git worktree unless the user explicitly requests one.

```sh
cd /workspace/Your-Dream-House-Renovasions-Website
npm ci --no-audit --no-fund
npm run dev
```

The development server binds to `0.0.0.0` on port 3000. It reports a port conflict instead of choosing a different port. A cloud machine's loopback address is not a public preview URL.

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. The production preview uses port 4173. No API keys, database or application environment variables are required. Fonts and images are served locally.

## Files

- `index.html` is a new, minimal application entry with metadata and a JavaScript-disabled contact fallback. It is not the uploaded HTML file.
- `src/render.js` renders the original page markup for the live site and downloads.
- `src/main.js` mounts the page and binds navigation, filters, the image viewer and enquiries.
- `src/style.css` contains the original design and responsive layouts.
- `src/content.js` separates supplied business facts and photograph descriptions from presentation.
- `scripts/export-review.py` exports the current design, copy and comparison section as a self-contained HTML file, a direct-open ZIP and a hostable production ZIP.
- `public/assets/` preserves all 21 original WebP files without image edits, alongside the transparent logo derivative and earlier accessibility illustration. The 11 newly supplied JPEGs are preserved in `public/assets/originals/nov-11/`. `public/assets/enhanced/` contains the 31 restored project, reference and concept images used by the website.

## Material and behaviour

The logo appears in the header. The work portfolio has eight collections and 24 project photographs, including the finished bathroom and four strata paving photographs. Collections describe categories of work and do not imply every photograph shows the same property. The NDIS feature has a separate two-image ramp reference gallery. The expanded design showcase keeps Tina’s House and the four commercial 3D kitchen concepts in separate galleries, both labelled as concepts. All 31 project/reference/concept images are accessible in the viewer. No reviews, licence numbers, NDIS registration claims or completion statistics have been invented.

The project photographs and design concept use separately saved AI restorations. The ten smallest photographs were restored from roughly 250-pixel-wide originals to over 1,000 pixels wide. Larger images received clarity restoration; their generated pixel dimensions are recorded without claiming an increase over their source resolution. AI can reconstruct fine texture, so retain the originals for factual reference and avoid treating enhanced details as construction measurements. The restoration review checks the project stage, framing, main structures and objects; the concept's room labels and dimensions remain those supplied. `docs/image-enhancements.json` records each original and enhanced image, dimensions and file hashes. WebP encoding reduces file size without changing the generated pixel dimensions.

Service links select the matching enquiry option. The form prepares a `mailto:` draft to `infoydhr@gmail.com`; it does not send or store enquiries. Visitors can review and send the draft in their email application. A copyable text fallback remains available if no mail application opens or clipboard access is denied.

The strata feature and portfolio filter introduce paving/access repairs for strata managers and property owners. Its enquiry button selects Strata & Property Maintenance. The design showcase replaces the previous single-row Tina’s House feature; the new renders are not presented as rooms in Tina’s House or as completed construction.

## Browser validation

After changes, check:

- Desktop and mobile navigation, including Escape and keyboard focus.
- All portfolio filters and collection counts.
- Before-and-after labels, image pairings and direct opening of the selected stage.
- Every supplied work photograph, next/previous controls, wrapping, thumbnails, Escape and restored focus.
- Both design concept galleries, selected 3D preview thumbnails and the ramp reference gallery.
- Native service accordions and enquiry selection.
- Required fields and the encoded email subject and body. Prevent external email-app activation in automated tests.
- Clipboard success and failure paths.
- Image loading, console errors, internal anchors and horizontal overflow on narrow screens.
- Accessibility with both the page and image viewer open.
- Hero and scroll animation completion, rapid filter changes and temporary clipping cleanup.
- Reduced motion enabled at startup and changed while animations are running.

The static `dist/` output can be uploaded to a web host. No site deployment, domain changes or email-service changes are performed by the local build.

## Export an interactive review

After building, run the following with Python 3 and the project's Node.js runtime available.

```sh
npm run build
python3 scripts/export-review.py --output-dir review
```

The exporter writes four outputs:

- `index.html` is the self-contained download requested by the client. Save it and open it in a browser. Images, fonts, page content and interactions are included in the file.
- `OPEN-WEBSITE.zip` is the recommended local review download. Extract the entire ZIP so `index.html`, `favicon.svg` and `assets/` stay together, then open the extracted `index.html` in a browser. It has pre-rendered page content, relative image paths, embedded fonts and an ordinary script. It needs no installation or development server.
- `Your-Dream-Home-Interactive-Website.html` includes the entire page, images, fonts and interactions in one file. The full page content is present before scripts run. Browser previews that block scripts can still display the design; gallery controls require JavaScript.
- `your-dream-home-renovations-website.zip` contains the Vite production build for a static web host. Its `index.html` requires a web server and is separate from the direct-open review package.

Keep review exports pre-rendered. An earlier export contained an empty application container and depended on an inline module to create the page, which produced an empty page when that script was blocked. The corrected export uses pre-rendered markup and a scoped ordinary script that only binds controls.

The exporter evaluates the app’s gallery catalogue directly and serialises concrete image URLs. The single-file download reuses embedded images already present in the page and includes only the remaining views in its image bank. The portable ZIP uses relative asset paths. Gallery data stays in sync when projects, reference images or design concepts are added.
