"use client";

import { useEffect, useRef } from "react";
import { occasions } from "@/content/site";
import { clamp, onScrollFrame } from "@/lib/scroll";
import { SafeImage } from "./ui/SafeImage";

/**
 * Desktop: the section pins and the occasions glide sideways as you scroll.
 * Mobile & tablet: a simple stacked layout.
 */
export function Occasions() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let distance = 0;

    const update = () => {
      if (!desktop.matches) return;
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / total);
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const measure = () => {
      if (!desktop.matches) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(track.scrollWidth - window.innerWidth, 0);
      section.style.height = `${distance + window.innerHeight}px`;
      update();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    desktop.addEventListener("change", measure);
    const stop = onScrollFrame(update);

    return () => {
      resizeObserver.disconnect();
      desktop.removeEventListener("change", measure);
      stop();
    };
  }, []);

  return (
    <section ref={sectionRef} id="occasions" aria-labelledby="occasions-title" className="relative bg-ink-soft">
      <div className="py-[var(--section-space)] lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden lg:py-0">
        <div
          ref={trackRef}
          className="flex flex-col gap-14 px-[var(--gutter)] will-change-transform sm:grid sm:grid-cols-2 sm:gap-x-6 lg:flex lg:w-max lg:flex-row lg:gap-8 lg:pr-[12vw]"
        >
          {/* Intro panel */}
          <div className="flex shrink-0 flex-col justify-between sm:col-span-2 lg:h-[72svh] lg:w-[36vw]">
            <div>
              <p className="label text-accent">For Every Occasion</p>
              <h2 id="occasions-title" className="display mt-6 text-[clamp(3rem,6vw,6.2rem)]">
                Dressed for <span className="italic text-accent-soft">every</span> moment
              </h2>
            </div>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-on-dark-muted">
              From wedding rituals to festive evenings — celebrate every moment in the colours of tradition.
              <span className="label mt-6 hidden items-center gap-3 text-on-dark/60 lg:flex">
                Scroll <span className="h-px w-10 bg-on-dark/30" />
              </span>
            </p>
          </div>

          {occasions.map((occasion, i) => (
            <article
              key={occasion.name}
              className="group shrink-0 lg:flex lg:h-[72svh] lg:w-[30vw] lg:flex-col"
            >
              <div className="img-frame aspect-[4/5] rounded-[var(--radius-card)] lg:aspect-auto lg:min-h-0 lg:flex-1">
                <SafeImage
                  src={occasion.image.src}
                  alt={occasion.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  loading="eager"
                  className="object-cover transition-[scale] duration-[1400ms] ease-out-soft group-hover:scale-105"
                  style={{ objectPosition: occasion.image.position }}
                />
                <span className="label absolute left-5 top-5 rounded-full bg-ink/50 px-3 py-1.5 text-on-dark backdrop-blur-md">
                  0{i + 1}
                </span>
              </div>
              <h3 className="display mt-5 text-[2.2rem] leading-none">{occasion.name}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-on-dark-muted">{occasion.copy}</p>
            </article>
          ))}
        </div>

        {/* Progress (desktop) */}
        <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-on-dark/10 lg:block">
          <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
