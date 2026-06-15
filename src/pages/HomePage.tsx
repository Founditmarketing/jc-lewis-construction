import Hero from '../components/Hero';
import FlexExpandServices from '../components/FlexExpandServices';
import MissionStatement from '../components/MissionStatement';
import StatBanner from '../components/StatBanner';
import ContactBanner from '../components/ContactBanner';
import LegacyAbout from '../components/LegacyAbout';
import InteractiveGallery from '../components/InteractiveGallery';
import InteractiveMapSection from '../components/InteractiveMapSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FlexExpandServices />
      <MissionStatement />
      <StatBanner />
      <ContactBanner />
      <LegacyAbout />
      <InteractiveGallery />
      <InteractiveMapSection />
    </main>
  );
}
