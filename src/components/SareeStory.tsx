"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { collections } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { scrollToTarget } from "@/lib/lenis";
import { clamp, easeInOut, onScrollFrame, prefersReducedMotion } from "@/lib/scroll";
import { ArrowUpRightIcon } from "./ui/Icons";
import { Pleats } from "./ui/Pleats";

const STRIPS = 7;
const STAGGER = 0.07; // delay between neighbouring pleats (fraction of a transition)
const EDGE = 0.04; // scroll padding before the first / after the last saree

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The collection, told as one pinned scene: as you scroll, each saree falls
 * over the previous one pleat by pleat, and the room changes colour with it.
 */
export function SareeStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = collections.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const slides = Array.from(section.querySelectorAll<HTMLElement>("[data-slide]"));
    const strips = slides.map((slide) => Array.from(slide.querySelectorAll<HTMLElement>("[data-strip]")));
    const reduce = prefersReducedMotion();
    const span = 1 - (STRIPS - 1) * STAGGER;
    let current = -1;

    return onScrollFrame(() => {
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / total);
      const position = clamp((progress - EDGE) / (1 - 2 * EDGE)) * (count - 1);
      let next = 0;

      for (let i = 1; i < count; i++) {
        let t = clamp((position - (i - 1) - 0.1) / 0.8);
        if (reduce) t = t >= 0.5 ? 1 : 0;

        slides[i].style.setProperty("--t", t.toFixed(4));
        slides[i - 1].style.setProperty("--shade", t.toFixed(4));
        strips[i].forEach((strip, k) => {
          strip.style.setProperty("--q", easeInOut(clamp((t - k * STAGGER) / span)).toFixed(4));
        });

        if (t >= 0.5) next = i;
      }

      section.style.setProperty("--story-p", progress.toFixed(4));
      if (next !== current) {
        current = next;
        setActive(next);
      }
    });
  }, [count]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const progress = index === 0 ? 0 : EDGE + (1 - 2 * EDGE) * (index / (count - 1));
    scrollToTarget(section.getBoundingClientRect().top + window.scrollY + progress * total);
  };

  return (
    <section
      ref={sectionRef}
      id="collections"
      aria-labelledby="collections-title"
      className="relative"
      style={{
        height: `${count * 100}svh`,
        backgroundColor: collections[active].tone,
        transition: "background-color 1.2s var(--ease-out-curve)",
      }}
    >
      <h2 id="collections-title" className="sr-only">
        Our Collections
      </h2>

      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Giant index number */}
        <p
          aria-hidden
          className="display pointer-events-none absolute -bottom-[0.18em] -left-[0.04em] hidden text-[34vw] leading-none text-on-dark/[0.035] lg:block"
        >
          {pad(active + 1)}
        </p>

        {/* Image stage: full screen on mobile, right-hand panel on desktop */}
        {/* The placeholder backdrop sits on the stage, not on each slide, so a
            hidden slide never covers the sarees beneath it. */}
        <div className="pleat-stage img-frame absolute inset-0 lg:left-auto lg:w-[54%]">
          {collections.map((item, i) => (
            <div
              key={item.name}
              data-slide
              className="story-slide absolute inset-0"
              style={{ "--q": i === 0 ? 1 : 0, "--t": i === 0 ? 1 : 0 } as CSSProperties}
            >
              <Pleats image={item.image} sizes="(min-width: 1024px) 54vw, 100vw" count={STRIPS} order="left" eager />
            </div>
          ))}
          <div
            aria-hidden
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, var(--overlay) 0%, color-mix(in srgb, var(--overlay) 70%, transparent) 30%, transparent 62%), linear-gradient(to bottom, color-mix(in srgb, var(--overlay) 50%, transparent), transparent 22%)",
            }}
          />
        </div>

        {/* Copy */}
        <div className="container-site relative flex h-full flex-col justify-end pb-12 pt-28 lg:justify-center lg:pb-0">
          <div className="lg:w-[38%]">
            <p className="label flex items-center gap-3 text-accent">
              <span>The Collection</span>
              <span className="h-px w-10 bg-accent/50" />
              <span className="tabular-nums">
                {pad(active + 1)} / {pad(count)}
              </span>
            </p>

            <div className="mt-5 grid lg:mt-8">
              {collections.map((item, i) => {
                const isActive = i === active;
                const whatsapp = whatsappHref(`Hello Abhinandan NX! I would like to know more about your ${item.name}.`);
                const words = item.name.split(" ");

                return (
                  <div key={item.name} aria-hidden={!isActive} className="[grid-area:1/1]">
                    <h3 className="display text-[clamp(3.2rem,7vw,7.2rem)] text-on-dark">
                      {words.map((word, w) => (
                        <span key={word} className="-mb-[0.1em] mr-[0.22em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                          <span
                            className={`inline-block transition-transform duration-1000 ease-out-soft ${
                              isActive ? "translate-y-0" : i < active ? "-translate-y-[110%]" : "translate-y-[110%]"
                            } ${w === 1 ? "italic text-accent-soft" : ""}`}
                            style={{ transitionDelay: isActive ? `${200 + w * 90}ms` : "0ms" }}
                          >
                            {word}
                          </span>
                        </span>
                      ))}
                    </h3>
                    <p
                      className={`mt-4 max-w-sm text-lg leading-relaxed text-on-dark/80 transition-[opacity,translate] duration-700 ease-out-soft ${
                        isActive ? "translate-y-0 opacity-100 delay-500" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {item.description}
                    </p>
                    <a
                      href={whatsapp ?? "#contact"}
                      {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      tabIndex={isActive ? undefined : -1}
                      className={`label mt-7 inline-flex items-center gap-3 text-on-dark transition-[opacity,color] duration-700 hover:text-accent ${
                        isActive ? "opacity-100 delay-700" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <span className="link-line pb-1">Enquire about this collection</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Collection index (desktop) */}
            <ol className="mt-14 hidden flex-wrap gap-x-6 gap-y-3 lg:flex">
              {collections.map((item, i) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={`label transition-colors duration-500 ${
                      i === active ? "text-accent" : "text-on-dark/45 hover:text-on-dark"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Progress thread */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-on-dark/10">
          <div className="h-full origin-left bg-accent" style={{ transform: "scaleX(var(--story-p, 0))" }} />
        </div>
      </div>
    </section>
  );
}
