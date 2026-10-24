import type { CSSProperties } from "react";
import type { SiteImage } from "@/config/images";
import { SafeImage } from "./SafeImage";

type PleatsProps = {
  image: SiteImage;
  sizes: string;
  /** Number of vertical pleat strips. */
  count?: number;
  /** "center" drops the middle pleats first; "left" sweeps left → right. */
  order?: "center" | "left";
  /** Highest fetch priority — use for the hero only. */
  priority?: boolean;
  /**
   * Load immediately instead of lazily. Needed for pleats that start fully
   * clipped: browsers treat clipped images as off-screen and would otherwise
   * only fetch them once they are already falling into view.
   */
  eager?: boolean;
};

/**
 * Renders one photo as vertical strips ("pleats"). Must sit inside a
 * `.pleat-stage` element; the falling-fabric motion comes from CSS in
 * globals.css (`.pleat-intro` for page load, `.story-slide` for scroll).
 */
export function Pleats({ image, sizes, count = 7, order = "center", priority = false, eager = false }: PleatsProps) {
  const middle = (count - 1) / 2;

  return (
    <>
      {Array.from({ length: count }, (_, k) => {
        const step = order === "center" ? Math.abs(k - middle) : k;
        const stripStyle = {
          "--i": step,
          left: `calc(${(k * 100) / count}% - 0.5px)`,
          width: `calc(${100 / count}% + 1px)`,
        } as CSSProperties;

        return (
          <div key={k} data-strip className="pleat" style={stripStyle}>
            <div className="pleat-inner" style={{ left: `calc(${(-k * 100) / count}cqw + 0.5px)` }}>
              <SafeImage
                src={image.src}
                alt={k === 0 ? image.alt : ""}
                aria-hidden={k === 0 ? undefined : true}
                fill
                sizes={sizes}
                loading={priority || eager ? "eager" : "lazy"}
                {...(priority ? { fetchPriority: "high" as const } : {})}
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
            </div>
            <span aria-hidden className="pleat-fold" />
            <span aria-hidden className="pleat-thread" />
          </div>
        );
      })}
    </>
  );
}
