import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import UltraHeader from './components/UltraHeader';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import ServiceAreaCityPage from './pages/ServiceAreaCityPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import ReviewsPage from './pages/ReviewsPage';
import FatFooter from './components/FatFooter';
import FloatingCallButton from './components/FloatingCallButton';
import LoadScreen from './components/LoadScreen';
import { SiteReadyCtx } from './context/SiteReadyContext';

if (typeof window !== 'undefined') window.history.scrollRestoration = 'manual';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <SiteReadyCtx.Provider value={!isLoading}>
        <div className="overflow-x-clip bg-slate-50 text-slate-900 font-sans">
          <LoadScreen onComplete={() => setIsLoading(false)} />
          <ScrollToTop />
          <UltraHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/service-area" element={<ServiceAreaPage />} />
            <Route path="/service-areas" element={<ServiceAreaPage />} />
            <Route path="/service-areas/:slug" element={<ServiceAreaCityPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
          <FatFooter />
          <FloatingCallButton />
          <Analytics />
        </div>
      </SiteReadyCtx.Provider>
    </BrowserRouter>
  );
}
