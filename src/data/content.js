import { Layers, Armchair, Ruler, Palette } from "lucide-vue-next";
import { generatedProjects } from "./generated";
import { edition3Projects } from "./edition3";
export const stockProjects = [
  {
    title: "The art of slowing down",
    type: "Living",
    image: "living-1.jpg",
    style: "Warm contemporary",
    description:
      "Comfortable seating, natural textures and a considered balance of light and shade. A starting point for a living room that feels distinctly yours.",
  },
  {
    title: "A little more character",
    type: "Kitchen",
    image: "kitchen-1.jpg",
    style: "Modern functional",
    description:
      "Thoughtful storage, practical worktops and clean lines bring everyday cooking into focus.",
  },
  {
    title: "Your quiet corner",
    type: "Bedroom",
    image: "bedroom-1.jpg",
    style: "Soft minimalism",
    description:
      "Layered textiles and a quiet palette create a welcoming place to unwind at the end of the day.",
  },
  {
    title: "Gather beautifully",
    type: "Dining",
    image: "dining-1.jpg",
    style: "Natural elegance",
    description:
      "A warm, inviting setting for shared meals, long conversations and everyday celebrations.",
  },
  {
    title: "Room to breathe",
    type: "Living",
    image: "living-2.jpg",
    style: "Light & layered",
    description:
      "An open composition with generous seating and a relaxed, light-filled atmosphere.",
  },
  {
    title: "Made for everyday rituals",
    type: "Living",
    image: "living-3.jpg",
    style: "Timeless simplicity",
    description:
      "A sunlit living concept with natural materials, a statement bookcase and relaxed seating.",
  },
  {
    title: "Rest, beautifully reimagined",
    type: "Bedroom",
    image: "bedroom-2.jpg",
    style: "Modern retreat",
    description:
      "A bedroom direction that pairs tactile finishes with restrained detailing and comfortable proportions.",
  },
  {
    title: "A place at the table",
    type: "Dining",
    image: "dining-2.jpg",
    style: "Contemporary warmth",
    description:
      "An intimate dining concept with sculptural furniture and a warm material story.",
  },
];
export const services = [
  {
    icon: Layers,
    name: "Complete home interiors",
    text: "A cohesive vision for your entire home, from the first layout to the finishing details.",
  },
  {
    icon: Armchair,
    name: "Modular kitchens & storage",
    text: "Beautiful, useful cabinetry planned around how you cook, organise and live.",
  },
  {
    icon: Ruler,
    name: "Space planning & 3D design",
    text: "See the proportions, explore finishes and understand your space before execution.",
  },
  {
    icon: Palette,
    name: "Styling & material selection",
    text: "Colour, texture, furniture and lighting brought together with a clear point of view.",
  },
];

export const projects = [
  ...generatedProjects,
  ...edition3Projects,
  ...stockProjects.map((p) => ({ ...p, origin: "Curated inspiration" })),
];
export const categories = [
  "All spaces",
  ...new Set(projects.map((p) => p.type)),
];
