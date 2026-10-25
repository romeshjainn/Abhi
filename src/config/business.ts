/* ==========================================================================
   BUSINESS DETAILS — the only file you need to edit for contact info.
   --------------------------------------------------------------------------
   Leave a field as "" until you have the real value. Empty fields are hidden
   on the website automatically: no fake numbers, addresses or hours are shown.
   ========================================================================== */

export interface BusinessConfig {
  /** `hindi` is used only for the hero centrepiece; everything else is English. */
  name: { hindi: string; english: string };
  tagline: string;
  description: string;
  location: { city: string; state: string; country: string };
  /** TODO: Store phone number for the "Call" button, e.g. "+91 98XXXXXXXX" or a landline with STD code. */
  phone: string;
  /** TODO: WhatsApp number — an Indian mobile number, with or without +91. */
  whatsapp: string;
  /** Message pre-filled when a visitor opens WhatsApp. */
  whatsappGreeting: string;
  /** TODO: Optional email address. */
  email: string;
  /** TODO: Optional street address shown above "Korba, Chhattisgarh". */
  streetAddress: string;
  /** TODO: Google Maps link to the store (Share → Copy link in Google Maps). */
  mapsUrl: string;
  /** TODO: Optional opening hours, e.g. "Mon – Sat, 10 am – 9 pm". */
  openingHours: string;
  /** TODO: Optional social profile links (full URLs). */
  instagramUrl: string;
  facebookUrl: string;
  /** TODO: Live website URL, e.g. "https://abhinandannx.in" — used for SEO / social previews. */
  siteUrl: string;
}

export const business: BusinessConfig = {
  name: { hindi: "अभिनंदन", english: "Abhinandan Ex" },
  tagline: "The beauty of tradition, in every style.",
  description:
    "Silk and Banarasi sarees, designer sarees, bridal lehengas and festive ethnic wear for women in Korba, Chhattisgarh.",
  location: { city: "Korba", state: "Chhattisgarh", country: "India" },

  phone: "",
  whatsapp: "",
  whatsappGreeting: "Hello Abhinandan Ex! I would like to know more about your collection.",
  email: "",
  streetAddress: "",
  mapsUrl: "",
  openingHours: "",
  instagramUrl: "",
  facebookUrl: "",
  siteUrl: "",
};
