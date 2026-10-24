"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/config/images";
import { getLenis } from "@/lib/lenis";
import { revealDelay } from "@/lib/style";
import { ChevronIcon, CloseIcon } from "./ui/Icons";
import { SafeImage } from "./ui/SafeImage";

const photos = images.gallery;
// Desktop columns drift at different speeds as you scroll.
const COLUMN_SPEEDS = ["0.04", "-0.08", "0.1"];

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = (index: number) => {
    setActive(index);
    getLenis()?.stop();
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback((delta: number) => {
    setActive((current) => (current === null ? current : (current + delta + photos.length) % photos.length));
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => {
      setActive(null);
      getLenis()?.start();
    };
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const tile = (index: number, sizes: string, mobileAspect: string) => {
    const photo = photos[index];
    return (
      <button
        type="button"
        onClick={() => open(index)}
        aria-label={`View larger: ${photo.alt}`}
        className={`img-frame group block w-full cursor-zoom-in rounded-[var(--radius-card)] ${mobileAspect} ${photo.aspect}`}
      >
        <SafeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-[scale] duration-[1400ms] ease-out-soft group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="label absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-overlay/80 to-transparent px-4 pb-4 pt-10 text-left normal-case tracking-normal text-on-dark transition-transform duration-700 ease-out-soft group-hover:translate-y-0"
        >
          {photo.alt}
        </span>
      </button>
    );
  };

  const columns = [0, 1, 2].map((c) => photos.map((_, i) => i).filter((i) => i % 3 === c));
  const current = active === null ? null : photos[active];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-space relative overflow-hidden bg-ivory text-on-light">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="label text-primary">
              The Gallery
            </p>
            <h2 id="gallery-title" data-reveal style={revealDelay(100)} className="display mt-6 text-[clamp(3rem,7vw,7rem)]">
              Silk, colour <span className="italic text-primary">&amp; craft</span>
            </h2>
          </div>
          <p data-reveal style={revealDelay(200)} className="max-w-md text-lg leading-relaxed text-on-light-muted lg:col-span-4 lg:col-start-9">
            Graceful pleats, the shimmer of zari, fine embroidery and traditional styling — a closer look at the beauty
            of Indian ethnic wear.
          </p>
        </div>

        {/* One set of photos: a two-column grid on phones and tablets,
            three drifting columns on desktop. */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:mt-20 lg:flex lg:gap-6">
          {columns.map((indexes, c) => (
            <div key={c} className={`contents lg:block lg:flex-1 ${c === 1 ? "lg:pt-24" : ""}`}>
              <ul data-parallax={COLUMN_SPEEDS[c]} className="contents lg:flex lg:flex-col lg:gap-6">
                {indexes.map((i) => {
                  const wide = i === photos.length - 1 && photos.length % 2 === 1;
                  return (
                    <li
                      key={photos[i].src}
                      data-reveal="image"
                      style={revealDelay(c * 120)}
                      className={wide ? "col-span-2" : ""}
                    >
                      {tile(i, "(min-width: 1024px) 30vw, 50vw", wide ? "aspect-[16/10]" : "aspect-[3/4]")}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Gallery image"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="lightbox m-auto max-h-none max-w-none bg-transparent p-0 text-on-dark"
      >
        {current && (
          <figure className="flex w-[min(92vw,68rem)] flex-col items-center">
            <div className="relative h-[min(78svh,54rem)] w-full">
              <SafeImage key={current.src} src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 flex w-full items-center justify-between gap-4 px-1">
              <span className="display text-xl text-on-dark">{current.alt}</span>
              <span className="label tabular-nums text-on-dark-muted">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="fixed right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-on-dark transition-colors hover:bg-on-dark hover:text-on-light"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous image"
          className="fixed left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-overlay/50 text-on-dark transition-colors hover:bg-on-dark hover:text-on-light sm:left-6"
        >
          <ChevronIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next image"
          className="fixed right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-overlay/50 text-on-dark transition-colors hover:bg-on-dark hover:text-on-light sm:right-6"
        >
          <ChevronIcon className="h-5 w-5" />
        </button>
      </dialog>
    </section>
  );
}
