# VSN Interiors, the distinct-page edition

A complete Vue 3 + Three.js website with five distinct pages, original interior concept images and a prebuilt Windows-ready version.

## Open it on Windows

1. Extract the ZIP into D:\ so the launcher is at D:\vsn-interiors\START-WINDOWS.bat.
2. Install Node.js 22 LTS or newer from https://nodejs.org/ if needed.
3. Double-click START-WINDOWS.bat.
4. The website opens at http://localhost:4173. Keep the terminal window open while using it.

No npm downloads are needed to view the included production build. Images and JavaScript are local. Typography uses the system Arial font. Do not open index.html by double-clicking it, as JavaScript modules need a web server. If another preview already uses port 4173, close its terminal and try again.

When replacing an earlier version, extract this ZIP into a clean folder first. Copy any personal changes from your old src/config.js before rebuilding. Keep your old folder until you have checked the new version.

## Pages and navigation

Home opens first. The five pages use distinct layouts and Arial throughout:

| Page | Route | Design |
| --- | --- | --- |
| Home | #/ | Eight unique sections, full-width photography and interactive living room |
| About Us | #/about | Editorial collage, Ganesh demo founder profile, manifesto and principles |
| Services | #/services | Panorama and filterable directory of 24 interior service areas |
| Gallery | #/gallery | Dark photographic collection, masonry cards and optional 3D exhibition |
| Contact Us | #/contact | Large Hello introduction, design brief, contact card and FAQs |

Home sections: photographic cover, room finder, selected projects, service preview, interactive 3D studio, material palettes, design process and consultation invitation.

Hash routes support direct links, refresh and Back/Forward without server rewrite rules. Room-finder links preselect the Gallery category. Unknown routes offer a return to Home.

The Home living room and optional Gallery exhibition support rotation, zoom, colour, day/evening lighting, pause, reset and expanded view. Escape exits expanded view. These are original procedural 3D concepts, not measured architectural models or filmed walkthroughs. Reduced-motion and WebGL-unavailable fallbacks are included.

## Image collection and identity

- 70 gallery designs: 62 original AI interior concepts and 8 curated stock images.
- 12 new concepts cover bathrooms, wardrobes, kids rooms, balconies, commercial spaces and architectural details.
- Full-resolution local WebP files plus compact thumbnails; 12 cards initially, with progressive loading.
- Category filters, search, empty state and previous/next image viewer.
- GENERATED-IMAGE-PROMPTS.json and EDITION3-IMAGE-PROMPTS.json document generated imagery.
- Ganesh is an explicitly labelled fictional demo founder with an AI-generated portrait. Replace this profile before presenting it as a real business biography.
- New teal/copper architectural logo symbol: public/images/logo-symbol.png. The website pairs it with exact live Arial text. public/images/vsn-interiors-logo.svg exports the lockup with an embedded raster symbol and Arial text; it is not a fully vectorised logo.
- IMAGE-CREDITS.json and ASSET-NOTES.md document stock photography. No portfolio completion claims are made.

## Edit and develop

Double-click EDIT-WINDOWS.bat, or use CMD:

```cmd
cd /d D:\vsn-interiors
npm ci
npm run dev
```

Open the local address Vite prints, normally http://localhost:5173.

To check the site on your phone, run npm run dev and open the Network URL printed by Vite on a phone connected to the same Wi-Fi.

After changing source code or business details:

```cmd
npm run build
```

START-WINDOWS.bat then serves the rebuilt version from dist. Use Ctrl+F5 if an old version remains cached.

## Add your business details

Edit src/config.js before publishing:

- email: displayed on Contact Us and connects the enquiry form to the visitor's email application.
- phone: displayed as a click-to-call link.
- whatsapp: digits only, including country code. Displays a WhatsApp link on Contact Us.
- address: displayed as studio address text.
- inquiryEndpoint: optional HTTPS backend URL accepting a JSON POST. It must validate inputs, limit abuse and return a successful 2xx status. Configure CORS for your domain when needed.

An endpoint takes priority over email. Email mode opens a draft in the visitor's email application, where they must send it themselves. With neither configured, the form explicitly stays in Preview mode and downloads a text design brief. No visitor information is silently stored or sent. Add your actual privacy notice when activating enquiries.

Contact information remains blank until configured. The requested Ganesh biography and portrait are clearly marked as demo content.

## Project structure

- src/App.vue: shared navigation, hash routing, transitions, footer and dialogs.
- src/pages/HomePage.vue: featured spaces, studio introduction, services and process.
- src/pages/AboutPage.vue: philosophy, design values, services and approach.
- src/pages/GalleryPage.vue: searchable collection and progressive loading.
- src/pages/ContactPage.vue: contact methods and embedded enquiry form.
- src/components/DesignStage.vue: independent interactive 3D section and controls.
- src/components/BrandLogo.vue: new symbol and Arial wordmark.
- src/pages/ServicesPage.vue: 24-service filterable directory.
- src/data/serviceCatalog.js: service descriptions and scope.
- src/data/edition3.js: 12 new gallery concepts.
- src/components/RoomScene.vue: original Home living room.
- src/components/AtelierScene.vue: About, Gallery and Contact world geometries.
- src/components/InquiryForm.vue: shared validated form and download/email/backend modes.
- src/data/content.js: services, retained images and combined gallery data.
- src/data/generated.js: 50 original concept records.
- src/config.js: real business information.
- src/style.css: responsive design system and animations.
- public: local image assets and retained legacy font licenses. Legacy font files are unused; all website typography is Arial.
- dist: production build, ready for a static host.
- serve.mjs: dependency-free localhost server.

## Hosting

Build command: npm run build
Output directory: dist

Upload the contents of dist to a static host. Never upload node_modules. Hash routing does not require a catch-all server rewrite. The Vite base is relative, so the compiled site can also be served beneath a directory path.

## Accessibility and performance

The site includes semantic navigation, active-page labels, skip navigation, keyboard-accessible image dialogs, visible focus styles, reduced-motion support and WebGL photo fallbacks. Animations pause when scenes are off screen or the tab is hidden. GPU resources are disposed when navigating between pages. Image thumbnails and lazy loading reduce transfer size on phones.

Responsive layouts cover desktop, tablet and mobile. The mobile navigation opens at 980px; gallery cards become one column at 420px. Build and DOM-based interaction checks were run. Actual WebGL rendering, touch interactions and device-specific layout still need a real-browser review before public launch.

## References

The original brief supplied Lagom, Livspace, InchX Interio, DesignCafe, Homzinterio and D'LIFE as design references. This edition preserves the accepted Vsn palette and adds the requested Home, About Us, Services, Gallery and Contact Us navigation. InchX's public homepage returned only its JavaScript shell through the research tool; no full visual inspection is claimed.
