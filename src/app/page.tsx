import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Occasions } from "@/components/Occasions";
import { SareeStory } from "@/components/SareeStory";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { business } from "@/config/business";
import { images } from "@/config/images";
import { contact } from "@/lib/contact";

// Structured data for local search — only includes details that are configured.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: business.name.english,
  description: business.description,
  image: images.ogImage,
  address: {
    "@type": "PostalAddress",
    ...(contact.streetAddress ? { streetAddress: contact.streetAddress } : {}),
    addressLocality: business.location.city,
    addressRegion: business.location.state,
    addressCountry: "IN",
  },
  ...(contact.phone ? { telephone: contact.phone.label } : {}),
  ...(business.siteUrl ? { url: business.siteUrl } : {}),
  ...(contact.maps ? { hasMap: contact.maps } : {}),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <SareeStory />
        <About />
        <Occasions />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <div aria-hidden className="grain" />
      <SmoothScroll />
      <ScrollEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
