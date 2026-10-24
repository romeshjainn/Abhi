import { business } from "@/config/business";
import { navLinks } from "@/content/site";
import { contact } from "@/lib/contact";
import { CurrentYear } from "./ui/CurrentYear";

export function Footer() {
  const { location } = business;
  const reach = [
    contact.whatsapp && { label: "WhatsApp", href: contact.whatsapp, external: true },
    contact.phone && { label: contact.phone.label, href: contact.phone.href, external: false },
    contact.email && { label: contact.email.label, href: contact.email.href, external: false },
    contact.instagram && { label: "Instagram", href: contact.instagram, external: true },
    contact.facebook && { label: "Facebook", href: contact.facebook, external: true },
  ].filter((item): item is { label: string; href: string; external: boolean } => Boolean(item));

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-on-dark">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display max-w-sm text-[2.2rem] leading-tight">
            The beauty of tradition, <span className="italic text-accent-soft">in every style.</span>
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="label text-on-dark-muted">Explore</p>
          <ul className="mt-5 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-line pb-0.5 text-on-dark/85 hover:text-on-dark">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label text-on-dark-muted">Visit</p>
          <address className="mt-5 not-italic leading-relaxed text-on-dark/85">
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
          {reach.length > 0 && (
            <ul className="mt-5 space-y-2">
              {reach.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link-line pb-0.5 text-on-dark/85 hover:text-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-site mt-16 flex flex-col gap-2 border-t border-line-dark py-6 text-sm text-on-dark-muted sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear buildYear={new Date().getFullYear()} /> {business.name.english}. All rights reserved.
        </p>
        <a href="#top" className="link-line self-start pb-0.5 hover:text-on-dark">
          Back to top ↑
        </a>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden
        className="display pointer-events-none select-none whitespace-nowrap px-[2vw] pb-[1vw] text-center text-[15.5vw] leading-[0.8] text-on-dark/[0.07]"
      >
        Abhinandan <span className="italic">NX</span>
      </p>
    </footer>
  );
}
