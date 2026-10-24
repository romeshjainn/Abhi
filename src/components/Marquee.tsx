import { collections } from "@/content/site";

/** Endless band of collection names between the hero and the collection. */
export function Marquee() {
  const items = collections.map((c) => c.name);

  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line-dark bg-primary-deep py-5 sm:py-7">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((name, i) => (
              <span key={name} className="flex items-center">
                <span
                  className={`display px-6 text-[clamp(2rem,4.5vw,4rem)] leading-none sm:px-10 ${
                    i % 2 ? "italic text-accent-soft" : "text-on-dark"
                  }`}
                >
                  {name}
                </span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                  <path d="M12 0c.7 6.6 5.4 11.3 12 12-6.6.7-11.3 5.4-12 12-.7-6.6-5.4-11.3-12-12C6.6 11.3 11.3 6.6 12 0Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
