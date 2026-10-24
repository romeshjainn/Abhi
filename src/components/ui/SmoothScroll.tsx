"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { scrollToTarget, setLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/scroll";

/** Buttery smooth scrolling + smooth in-page anchor links. */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      setLenis(lenis);
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "";
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      event.preventDefault();
      scrollToTarget(target);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
