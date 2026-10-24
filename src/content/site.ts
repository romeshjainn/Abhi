import { images, type SiteImage } from "@/config/images";

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#collections", label: "Collections" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export interface Collection {
  name: string;
  description: string;
  image: SiteImage;
  /** Background mood colour while this saree is on screen (see theme.css). */
  tone: string;
}

export const collections: Collection[] = [
  {
    name: "Silk Sarees",
    description: "Rich textures, graceful draping and timeless elegance.",
    image: images.collections.silk,
    tone: "var(--tone-silk)",
  },
  {
    name: "Banarasi Sarees",
    description: "Traditional patterns and luxurious, zari-inspired detail.",
    image: images.collections.banarasi,
    tone: "var(--tone-banarasi)",
  },
  {
    name: "Designer Sarees",
    description: "Contemporary styling, rooted in Indian craftsmanship.",
    image: images.collections.designer,
    tone: "var(--tone-designer)",
  },
  {
    name: "Bridal Lehengas",
    description: "Wedding elegance, detailed embroidery and celebratory colour.",
    image: images.collections.bridal,
    tone: "var(--tone-bridal)",
  },
  {
    name: "Festive Wear",
    description: "Traditional outfits for festivals and special occasions.",
    image: images.collections.festive,
    tone: "var(--tone-festive)",
  },
  {
    name: "Ethnic Wear",
    description: "Beautiful Indian attire for everyday celebrations and gatherings.",
    image: images.collections.ethnic,
    tone: "var(--tone-ethnic)",
  },
];

export const occasions = [
  {
    name: "Weddings",
    copy: "When every ritual becomes a memory, what you wear should be just as unforgettable.",
    image: images.occasions.weddings,
  },
  {
    name: "Festivals",
    copy: "Diya-lit evenings, vibrant colour — and you, at your most radiant.",
    image: images.occasions.festivals,
  },
  {
    name: "Family Celebrations",
    copy: "A touch of tradition in every moment spent with the ones you love.",
    image: images.occasions.family,
  },
  {
    name: "Special Gatherings",
    copy: "Quiet grace and confidence for every occasion that matters.",
    image: images.occasions.gatherings,
  },
] as const;
