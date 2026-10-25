"use client";

import { useEffect, useRef } from "react";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { clamp, onScrollFrame, prefersReducedMotion } from "@/lib/scroll";
import { heroDelay } from "@/lib/style";
import { ArrowUpRightIcon } from "./ui/Icons";
import { Pleats } from "./ui/Pleats";

const BADGE_TEXT = "Sarees • Lehengas • Ethnic Wear • ";
const HIGHLIGHTS = ["Silk", "Banarasi", "Bridal", "Festive"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-out: the photo drifts inside its arch while the copy lifts away.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    return onScrollFrame(() => {
      const p = clamp(window.scrollY / section.offsetHeight);
      section.style.setProperty("--hero-p", p.toFixed(4));
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink lg:h-svh lg:min-h-[680px]"
    >
      {/* Wine glow behind the arch */}
      <div
        aria-hidden
        className="anim-fade pointer-events-none absolute -z-10 h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-3xl max-lg:left-1/2 max-lg:top-[8%] max-lg:-translate-x-1/2 lg:right-[-12vmax] lg:top-[-8vmax]"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 70%, transparent), transparent 65%)",
          ...heroDelay(200),
        }}
      />

      <div className="container-site grid h-full gap-10 pb-12 pt-24 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-10">
        {/* ---------- The arch ---------- */}
        <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:order-2 lg:col-span-5 lg:col-start-8 lg:mx-0 lg:h-full lg:max-w-none">
          {/* Gold outline arch, offset */}
          <div
            aria-hidden
            className="anim-fade absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-accent/40 sm:translate-x-4 sm:translate-y-4"
            style={heroDelay(1400)}
          />

          <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full lg:aspect-auto lg:h-full">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: "translateY(calc(var(--hero-p, 0) * 12%)) scale(calc(1 + var(--hero-p, 0) * 0.1))" }}
            >
              <div className="pleat-stage pleat-intro img-frame absolute inset-0">
                <Pleats image={images.hero} sizes="(min-width: 1024px) 40vw, 90vw" count={6} priority />
              </div>
            </div>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--ink) 55%, transparent), transparent 35%)" }}
            />
          </div>

          {/* Rotating badge */}
          <div
            aria-hidden
            className="anim-fade absolute -left-8 bottom-[12%] h-28 w-28 sm:-left-12 sm:h-32 sm:w-32 lg:-left-16 lg:h-36 lg:w-36"
            style={heroDelay(1800)}
          >
            <div className="h-full w-full rounded-full bg-ink/80 backdrop-blur-md">
              <svg viewBox="0 0 120 120" className="badge-spin h-full w-full text-accent-soft">
                <defs>
                  <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                {/* textLength = circle circumference, so the words wrap exactly once */}
                <text className="fill-current text-[9px] uppercase" style={{ fontFamily: "var(--typeface-sans)" }}>
                  <textPath href="#badge-circle" textLength="288" lengthAdjust="spacing">
                    {BADGE_TEXT}
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="display absolute inset-0 flex items-center justify-center text-3xl italic text-accent">NX</span>
          </div>
        </div>

        {/* ---------- The words ---------- */}
        <div
          className="flex flex-col justify-between lg:order-1 lg:col-span-7"
          style={{
            transform: "translateY(calc(var(--hero-p, 0) * -14%))",
            opacity: "calc(1 - var(--hero-p, 0) * 1.4)",
          }}
        >
          <div className="anim-fade-up hidden items-center gap-4 lg:flex" style={heroDelay(1100)}>
            <span className="h-px w-12 bg-accent" />
            <p className="label text-on-dark/75">
              Women&apos;s Ethnic Wear · {business.location.city}, {business.location.state}
            </p>
          </div>

          <div>
            <p
              className="display anim-fade-up text-center text-[clamp(1.5rem,2.6vw,2.3rem)] italic text-accent-soft lg:text-left"
              style={heroDelay(1300)}
            >
              A heartfelt welcome to
            </p>

            <h1
              id="hero-title"
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 lg:mt-7 lg:justify-start lg:gap-x-7"
            >
              <span className="mask-line font-devanagari text-[clamp(4.4rem,17vw,11rem)] font-light leading-[1.3] text-on-dark">
                <span style={heroDelay(600)}>{business.name.hindi}</span>
              </span>
              <span className="mask-line pt-[0.1em]">
                <span className="display text-[clamp(3.6rem,7.5vw,6.4rem)] italic leading-none text-accent" style={heroDelay(900)}>
                  EX
                </span>
              </span>
              <span className="sr-only"> — {business.name.english}</span>
            </h1>

            <p
              className="anim-fade-up mx-auto mt-8 max-w-md text-center text-lg leading-relaxed text-on-dark/80 lg:mx-0 lg:text-left"
              style={heroDelay(1500)}
            >
              {business.tagline} Silk and Banarasi sarees, bridal lehengas and festive wear — in the heart of{" "}
              {business.location.city}.
            </p>

            <div
              className="anim-fade-up mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={heroDelay(1700)}
            >
              <a href="#collections" className="btn btn-light">
                Explore the Collection
                <span className="btn-icon">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </a>
              <a href="#contact" className="btn btn-outline">
                Get in Touch
              </a>
            </div>
          </div>

          <ul className="anim-fade-up mt-12 hidden gap-8 border-t border-line-dark pt-6 lg:flex" style={heroDelay(1900)}>
            {HIGHLIGHTS.map((name, i) => (
              <li key={name} className="flex items-baseline gap-2">
                <span className="label text-accent">0{i + 1}</span>
                <span className="display text-2xl text-on-dark/85">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
