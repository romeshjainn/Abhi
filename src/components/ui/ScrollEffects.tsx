"use client";

import { useEffect } from "react";
import { onScrollFrame, prefersReducedMotion } from "@/lib/scroll";

/**
 * Site-wide scroll effects:
 *  - [data-reveal]   → gets .is-revealed when it enters the viewport
 *  - [data-parallax] → drifts vertically at the given speed (e.g. "0.12")
 * New elements (re-renders, hot reload) are picked up automatically, so
 * nothing is ever left hidden.
 */
export function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const watched = new WeakSet<Element>();
    let layers: HTMLElement[] = [];

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        observer.observe(el);
      });
      layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    };
    scan();

    let pending = 0;
    const mutations = new MutationObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => ((pending = 0), scan()));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const stopParallax = prefersReducedMotion()
      ? undefined
      : onScrollFrame(() => {
          const vh = window.innerHeight;
          for (const el of layers) {
            // Measure the (untransformed) parent to avoid feedback loops.
            const rect = (el.parentElement ?? el).getBoundingClientRect();
            if (rect.bottom < -vh || rect.top > vh * 2 || rect.height === 0) continue;
            const offset = rect.top + rect.height / 2 - vh / 2;
            const speed = Number(el.dataset.parallax) || 0.1;
            el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
          }
        });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(pending);
      stopParallax?.();
    };
  }, []);

  return null;
}
