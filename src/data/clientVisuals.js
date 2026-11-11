import { pageImages } from "./imageLibrary";

const concept = (image, title, alt) => ({ image, title, alt, origin: "AI interior concept" });
export const clientVisuals = {
  home: [
    concept("vsn-2026/modern-living.webp", "A home, entirely yours.", "Modern sunlit Indian living room with warm walnut detailing, ivory sofa and greenery"),
    concept("client-2026/home-kitchen.webp", "Made for everyday living.", "Indian modular kitchen with blue cabinets, teak pantry and a breakfast peninsula"),
    concept("client-2026/home-bedroom.webp", "A softer place to land.", "Modern Indian bedroom with a sage headboard, walnut details and integrated storage"),
  ],
  homeBanner: [
    concept("vsn-2026/modern-lounge.webp", "Room for the everyday.", "Contemporary lounge with warm timber, stone finishes and generous natural light"),
    concept("indian/contact-cover.webp", "A place for your ideas.", "Contemporary Indian interior consultation concept"),
  ],
  about: [
    concept("vsn-2026/modern-bedroom.webp", "Rooted in the way we live.", "Modern Indian bedroom with walnut feature wall, lush green outlook and warm daylight"),
    concept("studio/about-courtyard.webp", "Indian warmth. A fresh perspective.", "Warm Indian courtyard living concept with teak and terracotta"),
  ],
  principles: [pageImages.homeHero[0], pageImages.homeHero[1], concept("vsn-2026/modern-office.webp", "Beautifully considered details.", "Contemporary lounge and home workspace with sage accent wall and fitted walnut shelving")],
  services: [
    concept("client-2026/services-living.webp", "Every space. Every detail.", "Connected Indian living and dining room with olive seating and bespoke joinery"),
    concept("client-2026/services-bedroom.webp", "Beautifully useful.", "Compact Indian bedroom with fitted wardrobes and an integrated window seat"),
    concept("vsn-2026/modern-kitchen.webp", "Functional. Beautiful. Yours.", "Premium Indian modular kitchen with bronze pendant lights, natural stone island and walnut cabinetry"),
  ],
  gallery: [pageImages.galleryHero[0], pageImages.galleryHero[1], concept("vsn-2026/modern-dining.webp", "Gather around good design.", "Warm modern dining room opening towards a garden-facing living area")],
  contact: [
    concept("client-2026/contact-lounge.webp", "Your next chapter starts here.", "Inviting Indian living room with sage seating, a terracotta armchair and garden arch"),
    concept("vsn-2026/modern-foyer.webp", "A welcoming place to begin.", "Modern Indian entrance lounge with sculptural seating, indoor trees and warm timber finish"),
    concept("client-2026/contact-entry.webp", "Come home to your kind of space.", "Modern Indian entrance with a carved teak door, stone bench and brass urli"),
  ],
  contactMaterials: concept("client-2026/contact-materials.webp", "Bring your ideas. We’ll bring the possibilities.", "Interior design consultation concept with material samples, floor plans and cane chairs"),
};
