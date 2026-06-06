import { AboutSection } from "@/components/landing/about-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LocationSection } from "@/components/landing/location-section";
import { Navbar } from "@/components/landing/navbar";
import { PackagesSection } from "@/components/landing/packages-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ServicesSection } from "@/components/landing/services-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <PackagesSection />
        <PricingSection />
        <AboutSection />
        <ContactSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
