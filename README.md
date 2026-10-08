# VSN Interiors — client update, 8 October 2026

Complete Vue 3 + Three.js website with five pages, local images, a production build and a double-click preview. All interface text uses Arial. The supplied official logo, founder photograph and business details are retained.

## Open on Windows

1. Download the complete ZIP before extracting it.
2. Extract into a new folder on `D:\`, such as `D:\vsn-interiors`.
3. Open `OPEN-PREVIEW.html` inside the extracted project folder. Keep `public` beside it.
4. Alternatively, double-click `START-WINDOWS.bat` to view the production build at `http://localhost:4173`. This option requires Node.js. Keep its terminal open.

Do not open the source `index.html` directly. Preserve your old project folder as a backup.

## Client changes

| Page | Updated design |
| --- | --- |
| Home | Three-image automatic hero, compact heading over the photograph, supporting content underneath, room links, another two-image banner, service overview, furnished 3D home and review highlights. |
| About Us | Two-image automatic opening, founder profile, automatically changing photos on the left of the design principles, material palettes and process. The final “Let’s make it feel like you” section is removed. |
| Services | Three-image opening with small overlay text. All 24 services now show their own photograph first, with details below. Category filters and service enquiries remain. |
| Gallery | Three-image automatic opening followed by 130 concepts, search, room filters and an enlarged image viewer. Exactly 10 designs in each of 13 categories. |
| Contact Us | New sage green and warm cream theme, three-image hero, call/WhatsApp/email cards, consultation photograph, studio address and directions, a simple enquiry form, FAQs and social links. |

The photo slideshows advance automatically with no arrows, pause buttons, dots or numbered controls. Hovering and focusing do not stop them. They suspend off screen or in a hidden tab and resume when visible. Reduced-motion settings remove the zoom and dissolve effects. The separate interactive 3D model retains its useful viewing controls.

There are seven photo slideshow locations. Main heroes use a 5.2-second interval, the About principles use 5.6 seconds, and the additional Home banner uses 6.1 seconds.

## Complete image collection

This package includes **182 distinct active design visuals**:

- 130 Gallery concepts across 13 categories.
- 24 service photographs, one for each service.
- 28 photographs for page heroes, additional banners, Home room links, About material study, Contact consultation image and the 3D fallback.

Eleven images were generated for this update, including a replacement for an empty banner in the earlier package. All 355 bundled raster image files were decoded successfully. No full design image is assigned to more than one site section. Thumbnails and their enlarged Gallery views intentionally represent the same design. Branding is reused consistently.

All photographs are local WebP files, with no external image hotlinks. The interior visuals are AI-generated design concepts, not photographs of completed VSN projects. `IMAGE-PLACEMENTS.json` records every active assignment. `IMAGE-GENERATION-2026.json` records this update's prompts; the earlier prompt records are also included.

## Business details

Edit `src/config.js` to change contact details, the founder, service areas or the optional enquiry endpoint.

- VSN Interiors, PJR Residency, Ayya Koneru, Dasannapeta, beside Gayathri Hospital, Vizianagaram, Andhra Pradesh 535002.
- Phone and WhatsApp: +91 97039 55686.
- Email: vsninterior55686@gmail.com.
- Instagram: https://www.instagram.com/v_s_n_interiors/
- Facebook: https://www.facebook.com/share/1De4CWwbMb/
- Google Maps: https://maps.app.goo.gl/wkB9M8cWYB8uzYCL8

The supplied founder photograph and existing Mahesh K profile are preserved. To add a co-founder, put their photograph in `public/images/brand` and fill in `business.coFounder.name`, `role` and `image`. The profile stays hidden until the name and image are supplied.

The footer includes the address, telephone, email, service areas and social links. The floating WhatsApp link is available across the website.

## Enquiries

The Contact form validates the visitor's name, phone number and project location. It opens a populated WhatsApp or email draft. The visitor reviews the message and presses Send in that app. The website does not claim a draft has been sent. No enquiry is stored locally.

`business.inquiryEndpoint` is blank by default. If configured, the forms send JSON to that endpoint and handle unsuccessful responses. A server must supply validation, delivery and any needed cross-origin configuration. This package does not include a backend or inbox.

The existing enquiry dialog from “Let us talk” and the service cards is retained.

## 3D home and reviews

The original furnished Three.js home includes living, dining, kitchen and pooja areas, custom joinery, lighting, appliances and an animated ceiling fan. Visitors can select viewpoints, rotate, zoom, choose colours and change the lighting. A dedicated image appears if WebGL is unavailable.

The supplied project's 15 review summaries and their source links are retained. Their displayed verification date is 23 September 2026. They are a dated selection, not a live review feed; this update did not refresh the Google listing.

## Edit and build

From the extracted project folder:

```cmd
npm ci
npm run dev
```

`EDIT-WINDOWS.bat` performs these steps and opens the development website.

To rebuild the production site and standalone preview:

```cmd
npm run build
```

This creates `dist` and `OPEN-PREVIEW.html`. Dependencies are locked in `package-lock.json`. The ZIP excludes `node_modules`.

## Upload to your hosting

Upload the **contents of `dist`** to your website's public hosting folder. Replace the matching old build files. Upload the included `images` and `assets` folders as well as `index.html`.

Do not upload the ZIP, the source folder or `OPEN-PREVIEW.html` as your public homepage. The site uses hash routes such as `#/contact`, so the five pages do not need separate server routing rules. This delivery does not modify the live domain.

## Main edit locations

| File | Purpose |
| --- | --- |
| `src/pages` | Home, About, Services, Gallery and Contact content |
| `src/components/ImageHero.vue` | Image-first hero with compact overlay heading and content underneath |
| `src/components/VisualCarousel.vue` | Automatic, preloaded photo slideshows |
| `src/components/StudioEnquiry.vue` | New Contact enquiry form |
| `src/client-update.css` | New hero, Contact, service card and responsive styles |
| `src/data/clientVisuals.js` | New slideshow photo assignments |
| `src/config.js` | Business and enquiry settings |
| `src/data/serviceCatalog.js` | Service information and individual photos |
| `src/data/imageLibrary.js` | Gallery, room and fallback image data |
| `src/components/RoomScene.vue` | Procedural 3D home |
| `src/components/SiteFooter.vue` | Footer details |
| `index.html` | Search and sharing metadata |
| `scripts/build-preview.mjs` | Standalone preview generation |

## Verification

Production and offline bundles compile successfully. Checks cover all five page openings, automatic slideshow progression without clicks, photo paths, unique photo assignments, Gallery counts and filters, service filtering and enquiries, About accordion changes, and valid/invalid Contact form behaviour. WhatsApp draft contents were inspected without sending a message.

Responsive stylesheet rules were checked at 320, 390, 768 and 1440 pixels in a DOM environment. The test used the same unminified source styles because that environment misinterprets some compact media-query syntax; it does not implement a real layout engine. A real-browser visual pass, physical phone testing and GPU-specific 3D rendering were not performed here. Please check those on your devices before publishing.

The archive is verified by CRC and an extraction comparison. Authored source code contains no comments. Required third-party notices are retained in `THIRD-PARTY-LICENSES.txt`.
