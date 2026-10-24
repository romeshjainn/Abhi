import { contact } from "@/lib/contact";
import { heroDelay } from "@/lib/style";
import { WhatsAppIcon } from "./ui/Icons";

/** Floating WhatsApp button — only rendered once a valid number is configured. */
export function WhatsAppFloat() {
  if (!contact.whatsapp) return null;

  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="anim-fade fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-[0_12px_30px_-10px_var(--overlay)] transition-transform duration-500 ease-out-soft hover:-translate-y-1 sm:bottom-8 sm:right-8"
      style={heroDelay(2600)}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
