"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/content/site";
import { contact } from "@/lib/contact";
import { getLenis } from "@/lib/lenis";
import { ArrowUpRightIcon, WhatsAppIcon } from "./ui/Icons";

const CURTAIN_STRIPS = 6;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Floating pill once scrolled; hides while scrolling down, returns on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 400 && y > lastY.current + 4);
      if (Math.abs(y - lastY.current) > 4) lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    if (!lenis) document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-out-soft sm:px-5 sm:pt-4 ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-6 rounded-full border py-2 pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-700 ease-out-soft sm:pl-7 ${
            scrolled && !open
              ? "border-line-dark bg-ink/65 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" onClick={() => setOpen(false)} className="display text-[1.55rem] leading-none text-on-dark">
            Abhinandan <span className="italic text-accent">NX</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label rounded-full px-4 py-2.5 text-on-dark/80 transition-colors duration-500 hover:bg-on-dark/10 hover:text-on-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-light hidden min-h-11 sm:inline-flex">
              Visit Us
              <span className="btn-icon h-8 w-8">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-on-dark lg:hidden"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out-soft ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-soft ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — wine pleats fall like a curtain, then the links rise */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden ${open ? "visible" : "invisible transition-[visibility] delay-700"}`}
      >
        <div aria-hidden className="absolute inset-0 flex">
          {Array.from({ length: CURTAIN_STRIPS }, (_, i) => (
            <span
              key={i}
              className={`h-full flex-1 origin-top bg-primary-deep transition-transform duration-700 ease-drape ${
                open ? "scale-y-100" : "scale-y-0"
              }`}
              style={{ transitionDelay: `${(open ? i : CURTAIN_STRIPS - i) * 55}ms` }}
            />
          ))}
        </div>

        <div className="container-site relative flex h-full flex-col pb-10 pt-28">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-line-dark">
                <a
                  href={link.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 transition-transform duration-700 ease-out-soft ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: open ? `${380 + i * 70}ms` : "0ms" }}
                >
                  <span className="display text-[2.8rem] text-on-dark">{link.label}</span>
                  <span className="label text-accent">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`mt-auto transition-opacity duration-700 ${open ? "opacity-100 delay-700" : "opacity-0"}`}
          >
            <p className="label text-on-dark-muted">
              {business.location.city}, {business.location.state}
            </p>
            {contact.whatsapp && (
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? undefined : -1}
                className="btn btn-whatsapp mt-5 w-full"
              >
                Chat on WhatsApp
                <span className="btn-icon">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
