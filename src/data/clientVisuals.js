import { pageImages } from "./imageLibrary";

// These seven unique modern interior visuals are packaged in src/assets/modern.
// Bundled URLs are resolved by Vite; existing images/ URLs still use your original public folder.
import homeLiving from "../assets/modern/home-living.webp";
import homeDining from "../assets/modern/home-dining.webp";
import aboutHero from "../assets/modern/about-entry.webp";
import aboutPrinciples from "../assets/modern/about-principles.webp";
import servicesOffice from "../assets/modern/services-office.webp";
import galleryBedroom from "../assets/modern/gallery-bedroom.webp";
import contactLounge from "../assets/modern/contact-lounge.webp";

const concept = (image, title, alt) => ({ image, title, alt, origin: "AI interior concept" });
const modernConcept = (image, title, alt) => ({
  image,
  title,
  alt,
  origin: "AI interior concept",
  bundled: true,
});

// Preserve the original image counts: a 3-image slideshow gets 1 new image;
// a 2-image slideshow gets 1 new image. Each new photo appears only once.
export const clientVisuals = {
  home: [
    concept("client-2026/home-hall.webp", "A home, entirely yours.", "Warm Andhra villa living room with an ivory sofa, teak jaali and tropical courtyard"),
    modernConcept(homeLiving, "Modern warmth, beautifully lived.", "Modern open-plan luxury living and dining interior with warm wood, sage and terracotta details"),
    concept("client-2026/home-bedroom.webp", "A softer place to land.", "Modern Indian bedroom with a sage headboard, walnut details and integrated storage"),
  ],
  homeBanner: [
    concept("studio/contact-salon.webp", "Room for the everyday.", "Indian dining room with a blue alcove and cane seating"),
    modernConcept(homeDining, "Spaces made to gather.", "Sunlit contemporary luxury dining room with sage upholstered chairs and walnut finishes"),
  ],
  about: [
    concept("client-2026/about-dining.webp", "Rooted in the way we live.", "Teak dining table and terracotta cane chairs overlooking an Indian courtyard"),
    modernConcept(aboutHero, "A fresh perspective on home.", "Modern interior with feature marble wall, warmly illuminated cabinetry and open living space"),
  ],
  principles: [
    pageImages.homeHero[0],
    modernConcept(aboutPrinciples, "Beauty in the details.", "Contemporary interior living room with sage feature wall, walnut joinery and greenery"),
    pageImages.homeHero[2],
  ],
  services: [
    concept("client-2026/services-living.webp", "Every space. Every detail.", "Connected Indian living and dining room with olive seating and bespoke joinery"),
    modernConcept(servicesOffice, "Spaces designed for ambition.", "Contemporary commercial office with glass partitions, modern desks and natural plants"),
    pageImages.services,
  ],
  gallery: [
    pageImages.galleryHero[0],
    modernConcept(galleryBedroom, "Calm and contemporary.", "Modern luxury bedroom with wall panel detailing, walk-in wardrobe and soft natural light"),
    pageImages.galleryHero[2],
  ],
  contact: [
    concept("client-2026/contact-lounge.webp", "Your next chapter starts here.", "Inviting Indian living room with sage seating, a terracotta armchair and garden arch"),
    modernConcept(contactLounge, "Let’s design what comes next.", "Sophisticated contemporary living room with a large cream sofa and dramatic lighting"),
    concept("client-2026/contact-entry.webp", "Come home to your kind of space.", "Modern Indian entrance with a carved teak door, stone bench and brass urli"),
  ],
  contactMaterials: concept("client-2026/contact-materials.webp", "Bring your ideas. We’ll bring the possibilities.", "Interior design consultation concept with material samples, floor plans and cane chairs"),
};
