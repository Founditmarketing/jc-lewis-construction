import Hero from '../components/Hero';
import FlexExpandServices from '../components/FlexExpandServices';
import MissionStatement from '../components/MissionStatement';
import StatBanner from '../components/StatBanner';
import ContactBanner from '../components/ContactBanner';
import LegacyAbout from '../components/LegacyAbout';
import InteractiveGallery from '../components/InteractiveGallery';
import InteractiveMapSection from '../components/InteractiveMapSection';
import SpecializationsBanner from '../components/SpecializationsBanner';
import PageSEO from '../components/PageSEO';
import JsonLd from '../components/JsonLd';
import { BUSINESS } from '../data/business';
import { SERVICE_AREAS } from '../data/serviceAreas';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: BUSINESS.name,
  image: BUSINESS.logo,
  url: BUSINESS.url,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  address: BUSINESS.address,
  areaServed: SERVICE_AREAS.map((area) => area.name),
  sameAs: BUSINESS.sameAs,
  openingHoursSpecification: BUSINESS.openingHoursSpecification,
};

export default function HomePage() {
  return (
    <main>
      <PageSEO
        title="J & C Lewis Construction Group | Custom Metal Fences, Gates & Ornamental Ironwork"
        description="J & C Lewis Construction Group — Custom Metal Fences, Gates & Ornamental Ironwork. Serving Waco, Austin, Dallas, Fort Worth & all of Texas."
        path="/"
      />
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <FlexExpandServices />
      <SpecializationsBanner />
      <MissionStatement />
      <StatBanner />
      <ContactBanner />
      <LegacyAbout />
      <InteractiveGallery />
      <InteractiveMapSection />
    </main>
  );
}
