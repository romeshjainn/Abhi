import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Noto_Serif_Devanagari } from "next/font/google";
import { business } from "@/config/business";
import { images } from "@/config/images";
import "./globals.css";

// Font variables are referenced by the font stacks in src/styles/theme.css.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

// Only used for the Hindi brand name in the hero.
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400"],
  variable: "--font-noto-serif-devanagari",
  display: "swap",
});

const title = `${business.name.english} — Sarees, Bridal Lehengas & Ethnic Wear in Korba`;
const description = `${business.name.english}: ${business.description}`;

export const metadata: Metadata = {
  ...(business.siteUrl ? { metadataBase: new URL(business.siteUrl) } : {}),
  title,
  description,
  applicationName: business.name.english,
  keywords: [
    "Abhinandan NX",
    "saree shop Korba",
    "Banarasi saree Korba",
    "silk saree Chhattisgarh",
    "bridal lehenga Korba",
    "designer saree Korba",
    "ethnic wear Korba",
  ],
  alternates: business.siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name.english,
    title,
    description,
    images: [{ url: images.ogImage, width: 1200, height: 630, alt: images.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [images.ogImage],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Browser UI colour on mobile — keep in sync with --ink in theme.css.
  themeColor: "#0e0a09",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${manrope.variable} ${notoSerifDevanagari.variable}`}
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
