import { pageImages } from "./imageLibrary";

const concept = (image, title, alt) => ({ image, title, alt, origin: "AI interior concept" });

function modern(name, title, alt) {
  const base = `modern-2026/${name}`;
  return {
    ...concept(`${base}-1672.webp`, title, alt),
    srcset: [960, 1672, 3840].map((width) => `images/${base}-${width}.webp ${width}w`).join(", "),
    width: 1672,
    height: 941,
  };
}

export const clientVisuals = {
  home: [
    modern("home-stone-lounge", "Modern warmth, beautifully lived.", "Contemporary villa living room with biscuit linen seating, a limestone media wall and a planted courtyard"),
    concept("client-2026/home-hall.webp", "A home, entirely yours.", "Warm Andhra villa living room with an ivory sofa, teak jaali and tropical courtyard"),
    modern("home-soft-bedroom", "A softer landing.", "Modern bedroom with a soft gray headboard, walnut wardrobes and a garden view"),
    concept("client-2026/home-bedroom.webp", "A softer place to land.", "Indian bedroom with a sage headboard, walnut details and integrated storage"),
  ],
  homeBanner: [
    modern("home-ribbed-dining", "Spaces made to gather.", "Contemporary dining room with a smoked oak table, ribbed built-ins and an open courtyard"),
    concept("studio/contact-salon.webp", "Room for the everyday.", "Indian dining room with a blue alcove and cane seating"),
  ],
  principles: [
    modern("about-light-stair", "Room to move.", "Light-filled modern foyer with an oak stair, slender railings and sandstone flooring"),
    pageImages.homeHero[0],
    modern("about-joinery-lounge", "Beauty in the details.", "Contemporary family room with a curved sofa, custom oak shelves and integrated lighting"),
    pageImages.homeHero[2],
  ],
  services: [
    modern("services-collaborative-office", "Spaces designed for ambition.", "Contemporary workplace with oak worktables, a glass meeting room and indoor planting"),
    concept("client-2026/services-living.webp", "Every space. Every detail.", "Connected Indian living and dining room with olive seating and bespoke joinery"),
    modern("services-modern-kitchen", "Thoughtfully planned kitchens.", "Contemporary modular kitchen with a gray-green island, handleless cabinets and limestone backsplash"),
    pageImages.services,
  ],
  gallery: [
    modern("gallery-sculptural-lounge", "Modern forms, natural finishes.", "Contemporary lounge with curved plaster walls, generous seating and overhead daylight"),
    pageImages.galleryHero[0],
    modern("gallery-walnut-bedroom", "Calm and contemporary.", "Modern walnut bedroom with blue linens, a textured wall and soft daylight"),
    pageImages.galleryHero[2],
  ],
  contact: [
    modern("contact-consultation-room", "Let’s design what comes next.", "Contemporary design studio lounge with olive seating and material samples on a walnut table"),
    concept("client-2026/contact-lounge.webp", "Your next chapter starts here.", "Inviting Indian living room with sage seating, a terracotta armchair and garden arch"),
    modern("contact-modern-entry", "Make yourself at home.", "Modern apartment entrance with a curved wall, floating timber console and upholstered bench"),
    concept("client-2026/contact-entry.webp", "Come home to your kind of space.", "Indian entrance with a carved teak door, stone bench and brass urli"),
  ],
  contactMaterials: concept("client-2026/contact-materials.webp", "Bring your ideas. We’ll bring the possibilities.", "Interior design consultation concept with material samples, floor plans and cane chairs"),
};
