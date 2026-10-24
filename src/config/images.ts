/* ==========================================================================
   SITE IMAGES — replace any photo here.
   --------------------------------------------------------------------------
   Current photos are from Unsplash (free to use under the Unsplash License).
   To use your own boutique photos, put them in /public/images and set
   `src: "/images/your-photo.jpg"`.
   `position` is the focal point used when a photo is cropped
   (CSS object-position, e.g. "50% 20%" keeps the face in frame).
   ========================================================================== */

export interface SiteImage {
  src: string;
  alt: string;
  position?: string;
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  hero: {
    src: unsplash("1756483482418-3f3e4c13f9b0"),
    alt: "Two women in a wine velvet saree and an emerald saree beneath an archway",
    position: "50% 72%",
  },

  // Full-length photos so the whole drape is visible in the collection story.
  collections: {
    silk: {
      src: unsplash("1641699862936-be9f49b1c38d"),
      alt: "Woman in a purple and gold silk saree",
      position: "50% 40%",
    },
    banarasi: {
      src: unsplash("1609748513078-9ff6232781c5"),
      alt: "Navy Banarasi saree with a gold zari pallu and red border",
      position: "50% 45%",
    },
    designer: {
      src: unsplash("1756483509177-bbabd67a3234"),
      alt: "Woman in an emerald green ruffled designer saree with gold trim",
      position: "50% 55%",
    },
    festive: {
      src: unsplash("1767955694884-d4bf352c23c2"),
      alt: "Woman in an embroidered yellow and maroon festive lehenga",
      position: "50% 40%",
    },
    ethnic: {
      src: unsplash("1617627143750-d86bc21e42bb"),
      alt: "Woman in a red-orange saree and gold jewellery between trees",
      position: "50% 30%",
    },
    bridal: {
      src: unsplash("1746372283841-dbb3838f9935"),
      alt: "Bride in a pink embroidered bridal lehenga beneath stone arches",
      position: "50% 40%",
    },
  },

  about: {
    main: {
      src: unsplash("1721324807083-e9ddaa99310e"),
      alt: "Woman in an embroidered pink bridal outfit with kundan jewellery",
      position: "50% 22%",
    },
    detail: {
      src: unsplash("1610030469983-98e550d6193c"),
      alt: "Purple saree with a wide gold border",
      position: "50% 60%",
    },
  },

  occasions: {
    weddings: {
      src: unsplash("1759906760638-eeffcb471e53"),
      alt: "Bride in a red embroidered lehenga and veil against evening lights",
      position: "50% 45%",
    },
    festivals: {
      src: unsplash("1678705730064-a7ecbab4b3fb"),
      alt: "Smiling woman in a white and red festive saree with flowers in her hair",
      position: "50% 30%",
    },
    family: {
      src: unsplash("1610189026205-27510cfc52f8"),
      alt: "Three women together in purple sarees",
      position: "50% 35%",
    },
    gatherings: {
      src: unsplash("1732381917604-bc8f046965ee"),
      alt: "Woman in a pink silk saree in front of a floral stage",
      position: "50% 35%",
    },
  },

  gallery: [
    {
      src: unsplash("1610047614301-13c63f00c032"),
      alt: "Bride in a red lehenga on a carved gold chair",
      aspect: "lg:aspect-[3/4]",
    },
    {
      src: unsplash("1621801306185-8c0ccf9c8eb8"),
      alt: "Hands with mehendi and red bangles",
      aspect: "lg:aspect-[4/5]",
    },
    {
      src: unsplash("1633685894176-9f715a092b79"),
      alt: "Back view of a maroon lehenga with gold embroidery",
      aspect: "lg:aspect-[2/3]",
    },
    {
      src: unsplash("1676696706907-0e04665b80bd"),
      alt: "Flowing folds of silk fabric",
      aspect: "lg:aspect-[4/5]",
    },
    {
      src: unsplash("1692992193981-d3d92fabd9cb"),
      alt: "Woman in a richly woven multicolour saree",
      aspect: "lg:aspect-[2/3]",
    },
    {
      src: unsplash("1610047881689-fc68ff7b2a89"),
      alt: "Model in a gold embroidered outfit and sheer dupatta",
      aspect: "lg:aspect-[3/4]",
    },
    {
      src: unsplash("1707576618343-26a1b377ca7a"),
      alt: "Bride in a flared red bridal lehenga",
      aspect: "lg:aspect-[2/3]",
    },
    {
      src: unsplash("1610189026297-df356264479c"),
      alt: "Draped purple floral saree",
      aspect: "lg:aspect-[3/4]",
    },
    {
      src: unsplash("1732381917488-39f31539cd4f"),
      alt: "Pink and gold silk saree with a traditional necklace",
      aspect: "lg:aspect-[4/5]",
    },
  ],

  /** Social-share preview (WhatsApp, Facebook…). 1200×630 crop. */
  ogImage: `${unsplash("1756483482418-3f3e4c13f9b0")}?auto=format&fit=crop&crop=focalpoint&fp-y=0.65&w=1200&h=630&q=80`,
} as const;
