import { business } from "@/config/business";

/** Returns the number as 91XXXXXXXXXX if it is a valid Indian mobile number, else null. */
function toIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value.trim());
}

const whatsappNumber = toIndianMobile(business.whatsapp);
const phoneDigits = business.phone.replace(/[^\d+]/g, "");
const phoneValid = phoneDigits.replace(/\D/g, "").length >= 10;

/** WhatsApp link, or null when no valid number is configured. */
export function whatsappHref(message: string = business.whatsappGreeting): string | null {
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  whatsapp: whatsappHref(),
  phone: phoneValid ? { href: `tel:${phoneDigits}`, label: business.phone.trim() } : null,
  email: /^\S+@\S+\.\S+$/.test(business.email.trim())
    ? { href: `mailto:${business.email.trim()}`, label: business.email.trim() }
    : null,
  maps: isHttpUrl(business.mapsUrl) ? business.mapsUrl.trim() : null,
  instagram: isHttpUrl(business.instagramUrl) ? business.instagramUrl.trim() : null,
  facebook: isHttpUrl(business.facebookUrl) ? business.facebookUrl.trim() : null,
  streetAddress: business.streetAddress.trim() || null,
  openingHours: business.openingHours.trim() || null,
};

/** True when visitors have at least one direct way to reach the store. */
export const hasDirectContact = Boolean(contact.whatsapp || contact.phone);
