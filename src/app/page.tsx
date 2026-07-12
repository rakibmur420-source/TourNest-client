import Hero from "@/components/Hero";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import PopularDestinations from "@/components/sections/PopularDestinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import TravelTips from "@/components/sections/TravelTips";
import Newsletter from "@/components/sections/Newsletter";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <PopularDestinations />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <TravelTips />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}
