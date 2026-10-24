import type Lenis from "lenis";

// Shared smooth-scroll instance (null when reduced motion is preferred).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Smoothly scrolls to a y position or element, with or without Lenis. */
export function scrollToTarget(target: number | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { force: true });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
