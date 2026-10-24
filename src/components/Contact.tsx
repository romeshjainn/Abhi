import { business } from "@/config/business";
import { contact, hasDirectContact } from "@/lib/contact";
import { revealDelay } from "@/lib/style";
import { ArrowUpRightIcon, PhoneIcon, WhatsAppIcon } from "./ui/Icons";

export function Contact() {
  const { location } = business;
  const socials = [
    contact.instagram && { label: "Instagram", href: contact.instagram },
    contact.facebook && { label: "Facebook", href: contact.facebook },
  ].filter((s): s is { label: string; href: string } => Boolean(s));

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-space relative overflow-hidden bg-primary-deep text-on-dark"
    >
      {/* Soft pleat lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 80px, color-mix(in srgb, var(--accent) 7%, transparent) 80px 81px)",
        }}
      />

      <div className="container-site relative">
        <p data-reveal className="label text-accent">
          Contact
        </p>
        <h2 id="contact-title" data-reveal style={revealDelay(100)} className="display mt-6 text-[clamp(3.6rem,11vw,11rem)]">
          Visit us <br className="hidden sm:block" />
          <span className="italic text-accent-soft">in {location.city}.</span>
        </h2>

        <div className="mt-16 grid gap-12 border-t border-line-dark pt-10 md:grid-cols-3 md:gap-8">
          <div data-reveal>
            <p className="label text-on-dark-muted">The Store</p>
            <address className="display mt-4 text-[1.9rem] not-italic leading-tight">
              {business.name.english}
              <br />
              {contact.streetAddress && (
                <>
                  {contact.streetAddress}
                  <br />
                </>
              )}
              {location.city}, {location.state}
              <br />
              {location.country}
            </address>
            {contact.maps && (
              <a
                href={contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="label mt-6 inline-flex items-center gap-2 text-accent hover:text-on-dark"
              >
                <span className="link-line pb-1">Get directions</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>

          <div data-reveal style={revealDelay(120)}>
            <p className="label text-on-dark-muted">{contact.openingHours ? "Opening Hours" : "Come Say Hello"}</p>
            <p className="display mt-4 text-[1.9rem] leading-tight">
              {contact.openingHours ?? "Step in to see sarees, lehengas and traditional wear up close."}
            </p>
            {contact.email && (
              <a href={contact.email.href} className="link-line mt-6 inline-block pb-1 text-on-dark/85">
                {contact.email.label}
              </a>
            )}
          </div>

          <div data-reveal style={revealDelay(240)}>
            <p className="label text-on-dark-muted">Get in Touch</p>
            {hasDirectContact ? (
              <div className="mt-5 flex flex-col items-start gap-3">
                {contact.whatsapp && (
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    Chat on WhatsApp
                    <span className="btn-icon">
                      <WhatsAppIcon className="h-4 w-4" />
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={contact.phone.href} className="btn btn-light">
                    Call {contact.phone.label}
                    <span className="btn-icon">
                      <PhoneIcon className="h-4 w-4" />
                    </span>
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-4 text-lg leading-relaxed text-on-dark/85">
                We would love to welcome you at our store in {location.city}, {location.state}.
              </p>
            )}
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-6">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label inline-flex items-center gap-1.5 text-on-dark/80 hover:text-accent"
                    >
                      {social.label}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
