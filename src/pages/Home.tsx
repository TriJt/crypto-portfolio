import SectionWrapper from "../components/layout/SectionWrapper";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedCarousel from "../components/home/FeaturedCarousel";
import CommunityLinks from "../components/home/CommunityLinks";

export default function Home() {
  return (
    <SectionWrapper>
      <Hero />
      <Stats />
      <FeaturedCarousel />
      <CommunityLinks />
    </SectionWrapper>
  );
}
