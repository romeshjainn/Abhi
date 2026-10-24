import type { CSSProperties } from "react";

/** Animation delay for hero entrance elements (reads --d in globals.css). */
export const heroDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Stagger delay for scroll reveals (reads --reveal-delay in globals.css). */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
