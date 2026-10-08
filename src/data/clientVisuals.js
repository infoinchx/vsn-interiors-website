import { pageImages } from "./imageLibrary";

const concept = (image, title, alt) => ({ image, title, alt, origin: "AI interior concept" });
export const clientVisuals = {
  home: [
    concept("client-2026/home-hall.webp", "A home, entirely yours.", "Warm Andhra villa living room with an ivory sofa, teak jaali and tropical courtyard"),
    concept("client-2026/home-kitchen.webp", "Made for everyday living.", "Indian modular kitchen with blue cabinets, teak pantry and a breakfast peninsula"),
    concept("client-2026/home-bedroom.webp", "A softer place to land.", "Modern Indian bedroom with a sage headboard, walnut details and integrated storage"),
  ],
  homeBanner: [
    concept("studio/contact-salon.webp", "Room for the everyday.", "Indian dining room with a blue alcove and cane seating"),
    concept("indian/contact-cover.webp", "A place for your ideas.", "Contemporary Indian interior consultation concept"),
  ],
  about: [
    concept("client-2026/about-dining.webp", "Rooted in the way we live.", "Teak dining table and terracotta cane chairs overlooking an Indian courtyard"),
    concept("studio/about-courtyard.webp", "Indian warmth. A fresh perspective.", "Warm Indian courtyard living concept with teak and terracotta"),
  ],
  principles: pageImages.homeHero,
  services: [
    concept("client-2026/services-living.webp", "Every space. Every detail.", "Connected Indian living and dining room with olive seating and bespoke joinery"),
    concept("client-2026/services-bedroom.webp", "Beautifully useful.", "Compact Indian bedroom with fitted wardrobes and an integrated window seat"),
    pageImages.services,
  ],
  gallery: pageImages.galleryHero,
  contact: [
    concept("client-2026/contact-lounge.webp", "Your next chapter starts here.", "Inviting Indian living room with sage seating, a terracotta armchair and garden arch"),
    concept("client-2026/contact-dining.webp", "A little room for conversation.", "Sunlit Indian dining room with cane chairs and a pale sage crockery cabinet"),
    concept("client-2026/contact-entry.webp", "Come home to your kind of space.", "Modern Indian entrance with a carved teak door, stone bench and brass urli"),
  ],
  contactMaterials: concept("client-2026/contact-materials.webp", "Bring your ideas. We’ll bring the possibilities.", "Interior design consultation concept with material samples, floor plans and cane chairs"),
};
