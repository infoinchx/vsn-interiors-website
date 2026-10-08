# Complete logo in social previews

The logo update is now present in the public homepage. The previous share
image was 2048 x 683. The supplied WhatsApp screenshot showed that wide image
cropped into a square thumbnail, cutting off part of the business name.

This update uses a 1254 x 1254 square image with the complete horizontal
logo centered inside black padding. The static Open Graph and Twitter image
URLs point to vsn-share-square-v5.png. The image width and height metadata match the actual
PNG. The new filename avoids reusing the previous image URL.

## Update the source project

Replace index.html beside package.json and add:
public/images/brand/vsn-share-square-v5.png

Keep the existing public/images/brand/vsn-official-share-v4.png file because
the favicon still uses it. The source patch includes the two changed files
plus its instructions. It is not a standalone website.

Rebuild with npm run build and deploy the updated source or newly built dist
using the existing Vercel project. If Vercel deploys from Git, commit/push the
changes to the configured production branch and wait for a successful
production deployment. Build command: npm run build. Output directory: dist.

## Deploy the current built website

The dist folder contains the current compiled website, all assets and the
square share-preview image. Publish the contents of that folder through your
existing hosting workflow. For a Vercel project linked to Git, commit/push
the updated source, use npm run build and publish the dist output.

Use the current dist/index.html with the assets from this same build. Older
standalone hosting patches may refer to bundle names from an earlier build.

## Verify after deployment

1. Open https://www.vsninteriors.in/images/brand/vsn-share-square-v5.png
   It should show the complete logo on a square black canvas.
2. View the source of https://www.vsninteriors.in/ and search for vsn-share-square-v5.png.
   og:image, og:image:secure_url and twitter:image should all use that file.
3. Paste the homepage address into a new WhatsApp message and let the preview
   load. Already sent messages may retain their old cached image.

This prepares the files; it does not access or deploy to your hosting account.
The square image and the HTML references were checked locally. An actual
WhatsApp preview must be checked after deployment, because WhatsApp controls
its final display and cache.

The original website logo files are retained. The square preview was made
with the built-in ImageGen tool from the supplied official logo.
Prompt: Fit the complete original horizontal VSN Interiors logo within the
center of a square black canvas, with black padding around it. Preserve the
gold/olive VSN letters, silver interiors word and the entire roofline. Do not
crop, stretch, rearrange or add text. The output is 1254 x 1254 pixels.

Metadata reference: https://ogp.me/
