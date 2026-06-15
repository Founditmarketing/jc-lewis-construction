import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UltraHeader from './components/UltraHeader';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import ReviewsPage from './pages/ReviewsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FatFooter from './components/FatFooter';
import FloatingCallButton from './components/FloatingCallButton';

// Service Area City Pages
import HighPointPage from './pages/service-areas/HighPointPage';
import WinstonSalemPage from './pages/service-areas/WinstonSalemPage';
import GreensboroPage from './pages/service-areas/GreensboroPage';
import KernersvillePage from './pages/service-areas/KernersvillePage';
import ThomasvillePage from './pages/service-areas/ThomasvillePage';
import ClemmonsPage from './pages/service-areas/ClemmonsPage';
import BermudaRunPage from './pages/service-areas/BermudaRunPage';
import LewisvillePage from './pages/service-areas/LewisvillePage';
import MocksvillePage from './pages/service-areas/MocksvillePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-clip bg-slate-50 text-slate-900 font-sans">
        <UltraHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/service-area" element={<ServiceAreaPage />} />
          <Route path="/service-areas" element={<ServiceAreaPage />} />
          <Route path="/service-area/high-point" element={<HighPointPage />} />
          <Route path="/service-areas/high-point" element={<HighPointPage />} />
          <Route path="/service-area/winston-salem" element={<WinstonSalemPage />} />
          <Route path="/service-areas/winston-salem" element={<WinstonSalemPage />} />
          <Route path="/service-area/greensboro" element={<GreensboroPage />} />
          <Route path="/service-areas/greensboro" element={<GreensboroPage />} />
          <Route path="/service-area/kernersville" element={<KernersvillePage />} />
          <Route path="/service-areas/kernersville" element={<KernersvillePage />} />
          <Route path="/service-area/thomasville" element={<ThomasvillePage />} />
          <Route path="/service-areas/thomasville" element={<ThomasvillePage />} />
          <Route path="/service-area/clemmons" element={<ClemmonsPage />} />
          <Route path="/service-areas/clemmons" element={<ClemmonsPage />} />
          <Route path="/service-area/bermuda-run" element={<BermudaRunPage />} />
          <Route path="/service-areas/bermuda-run" element={<BermudaRunPage />} />
          <Route path="/service-area/lewisville" element={<LewisvillePage />} />
          <Route path="/service-areas/lewisville" element={<LewisvillePage />} />
          <Route path="/service-area/mocksville" element={<MocksvillePage />} />
          <Route path="/service-areas/mocksville" element={<MocksvillePage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        <FatFooter />
        <FloatingCallButton />
      </div>
    </BrowserRouter>
  );
}
