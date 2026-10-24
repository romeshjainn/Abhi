"use client";

import { useEffect, useRef } from "react";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { clamp, onScrollFrame, prefersReducedMotion } from "@/lib/scroll";
import { revealDelay } from "@/lib/style";
import { SafeImage } from "./ui/SafeImage";

// Words wrapped in *asterisks* are set in gold italics.
const STATEMENT =
  "Abhinandan NX is where the beauty of Indian *tradition* meets *modern* style — sarees, lehengas and ethnic wear, chosen to make every special moment of yours more *beautiful.*";

const values = [
  { title: "Tradition", text: "The beauty of Indian weaves, zari and embroidery." },
  { title: "Modern Grace", text: "Designs shaped for the way you dress today." },
  { title: "Every Occasion", text: "From everyday celebrations to the wedding day." },
];

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const words = STATEMENT.split(" ");

  // Words light up one by one as the statement scrolls through the viewport.
  useEffect(() => {
    const el = statementRef.current;
    if (!el || prefersReducedMotion()) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    return onScrollFrame(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.35));
      const lit = progress * spans.length * 1.1;
      spans.forEach((span, i) => {
        span.style.opacity = (0.16 + 0.84 * clamp(lit - i)).toFixed(3);
      });
    });
  }, []);

  return (
    <section id="about" aria-labelledby="about-title" className="section-space relative bg-ivory text-on-light">
      <div className="container-site">
        <div className="flex items-center gap-4">
          <h2 id="about-title" className="label text-primary">
            About Us
          </h2>
          <span className="h-px flex-1 bg-line-light" />
          <span className="label text-on-light-muted">
            {business.location.city}, {business.location.state}
          </span>
        </div>

        <p ref={statementRef} className="display mt-12 text-[clamp(2.2rem,5.2vw,5.4rem)] leading-[1.04] sm:mt-16">
          {words.map((word, i) => {
            const accent = word.startsWith("*");
            return (
              <span key={i}>
                <span data-word className={`transition-opacity duration-300 ${accent ? "italic text-primary" : ""}`}>
                  {word.replaceAll("*", "")}
                </span>{" "}
              </span>
            );
          })}
        </p>

        <div className="mt-20 grid gap-14 sm:mt-28 lg:grid-cols-12 lg:gap-8">
          {/* Images with opposing parallax */}
          <div className="relative lg:col-span-6">
            <div data-reveal="image" className="img-frame relative aspect-[4/5] w-[82%] rounded-[var(--radius-card)]">
              <div data-parallax="-0.06" className="absolute -inset-y-[8%] inset-x-0">
                <SafeImage
                  src={images.about.main.src}
                  alt={images.about.main.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 82vw"
                  className="object-cover"
                  style={{ objectPosition: images.about.main.position }}
                />
              </div>
            </div>
            <div className="absolute -bottom-10 right-0 w-[42%]">
              <div
                data-parallax="0.12"
                className="img-frame aspect-[3/4] rounded-[var(--radius-card)] border-[6px] border-ivory shadow-2xl"
              >
                <SafeImage
                  src={images.about.detail.src}
                  alt={images.about.detail.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 42vw"
                  className="object-cover"
                  style={{ objectPosition: images.about.detail.position }}
                />
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p data-reveal className="text-lg leading-relaxed text-on-light-muted sm:text-xl">
              A women&apos;s ethnic wear destination in {business.location.city}, {business.location.state} — from silk
              and Banarasi sarees to bridal lehengas and festive wear. Our purpose is simple: a beautiful look for
              every special moment of yours.
            </p>

            <ul className="mt-12 border-t border-line-light">
              {values.map((value, i) => (
                <li
                  key={value.title}
                  data-reveal
                  style={revealDelay(i * 120)}
                  className="group flex items-baseline gap-6 border-b border-line-light py-6"
                >
                  <span className="label text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[2rem] transition-transform duration-700 ease-out-soft group-hover:translate-x-2">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-on-light-muted">{value.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
