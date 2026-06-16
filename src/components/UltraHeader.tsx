import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Mail, Clock, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICE_AREAS } from '../data/serviceAreas';
import { useSiteReady } from '../context/SiteReadyContext';

const NAV_ITEMS = ['Home', 'Services', 'Gallery', 'Service Area', 'Leave A Review', 'Contact'];

const DRAWER_HEX_BG = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="52" height="90"><path d="M26,0 L52,15 L52,45 L26,60 L0,45 L0,15 Z M26,60 L26,90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.8"/></svg>')}")`;

const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place/J+%26+C+Lewis+Construction+Group/@31.6227618,-97.1161271,17z/data=!4m18!1m9!3m8!1s0x864f9d5447423393:0x20a1ba27efd4cd18!2sJ+%26+C+Lewis+Construction+Group!8m2!3d31.56237!4d-97.158492!9m1!1b1!16s%2Fg%2F11xfvmgwwb!3m7!1s0x864f9d5447423393:0x20a1ba27efd4cd18!8m2!3d31.56237!4d-97.158492!9m1!1b1!16s%2Fg%2F11xfvmgwwb?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D';

const SERVICES_MEGA = [
  {
    id: 'custom-metal-fences',
    title: 'Custom Metal Fences',
    shortDesc: 'Aluminum, steel & iron fencing built to your exact specs.',
    image: '/jclewis-fence.png',
    path: '/services/custom-metal-fences',
  },
  {
    id: 'custom-metal-gates',
    title: 'Custom Metal Gates',
    shortDesc: 'Ornate, secure entryways crafted for style and longevity.',
    image: '/jclewis-gate.png',
    path: '/services/custom-metal-gates',
  },
  {
    id: 'ornamental-ironwork',
    title: 'Ornamental Ironwork',
    shortDesc: 'Railings, balustrades & decorative metalwork panels.',
    image: '/jclewis-ironwork.png',
    path: '/services/ornamental-ironwork',
  },
];

function navPath(item: string) {
  if (item === 'Gallery') return '/gallery';
  if (item === 'Contact') return '/contact';
  if (item === 'Service Area') return '/service-areas';
  if (item === 'Leave A Review') return GOOGLE_REVIEW_URL;
  if (item === 'Home') return '/';
  return `/#${item.toLowerCase().replace(' ', '-')}`;
}

export default function UltraHeader() {
  const siteReady = useSiteReady();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isServiceAreaHovered, setIsServiceAreaHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileServiceAreaOpen, setIsMobileServiceAreaOpen] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState('custom-metal-fences');
  const serviceLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serviceAreaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleServicesEnter = () => {
    if (serviceLeaveTimer.current) clearTimeout(serviceLeaveTimer.current);
    setIsServicesHovered(true);
  };
  const handleServicesLeave = () => {
    serviceLeaveTimer.current = setTimeout(() => setIsServicesHovered(false), 120);
  };
  const handleServiceAreaEnter = () => {
    if (serviceAreaLeaveTimer.current) clearTimeout(serviceAreaLeaveTimer.current);
    setIsServiceAreaHovered(true);
  };
  const handleServiceAreaLeave = () => {
    serviceAreaLeaveTimer.current = setTimeout(() => setIsServiceAreaHovered(false), 120);
  };

  // mega menu top position tracks the nav pill bottom edge
  const megaMenuTop = isScrolled ? 56 : 96;

  return (
    <>
      {/* fixed on mobile, absolute on desktop (restores scroll-away behavior) */}
      <header className="fixed lg:absolute top-0 left-0 w-full flex flex-col z-50 pointer-events-none">
        <div className="pointer-events-auto">

          {/* Utility bar — collapses on mobile when scrolled */}
          <div className={`overflow-hidden transition-all duration-300 bg-primary border-b border-primary/20 ${isScrolled ? 'max-h-0 lg:max-h-16' : 'max-h-16'}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={siteReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="py-1.5 px-4 sm:px-6 lg:px-16 text-xs sm:text-sm text-white"
            >
              <div className="w-full flex flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-6">
                  <a href="tel:254-332-1303" className="flex items-center gap-2 hover:text-white/80 transition-colors tracking-wide">
                    <Phone size={13} />
                    <span>(254) 332-1303</span>
                  </a>
                  <a href="mailto:info@jandclewisconstructiongroup.com" className="hidden sm:flex items-center gap-2 hover:text-white/80 transition-colors tracking-wide">
                    <Mail size={13} />
                    <span>info@jandclewisconstructiongroup.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 tracking-wide">
                  <Clock size={13} />
                  <span>Open 24 Hours &nbsp;·&nbsp; 7 Days a Week</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main nav row — dark bg on mobile when scrolled */}
          <div className={`pt-2 pb-2 transition-colors duration-300 ${isScrolled ? 'bg-[#1e2820]/96 backdrop-blur-md shadow-md lg:bg-transparent lg:shadow-none lg:backdrop-blur-none' : 'bg-transparent'}`}>
            <div className="w-full px-4 sm:px-6 lg:px-16">
              <div className="flex justify-between items-center py-2 min-h-[4rem]">

                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={siteReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="flex-shrink-0 flex items-center"
                >
                  <Link to="/">
                    <img src="/jclewislogonew.png" alt="J & C Lewis Construction Group Logo" className="h-14 md:h-16 lg:h-20 w-auto brightness-0 invert drop-shadow-lg" />
                  </Link>
                </motion.div>

                {/* Desktop Nav Pill */}
                <motion.nav
                  initial={{ y: -30, x: '-50%', opacity: 0 }}
                  animate={siteReady ? { y: 0, x: '-50%', opacity: 1 } : { y: -30, x: '-50%', opacity: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden lg:flex items-center space-x-1 px-10 py-1 rounded fixed left-1/2 z-[100] transition-[top,background-color,box-shadow,transform] duration-500 ease-out ${isScrolled ? 'top-4 scale-95 shadow-2xl shadow-black/20 bg-white' : 'top-[56px] scale-100 shadow-transparent bg-transparent'}`}
                >
                  {NAV_ITEMS.map((item) => {
                    if (item === 'Service Area') {
                      return (
                        <div key={item} className="relative" onMouseEnter={handleServiceAreaEnter} onMouseLeave={handleServiceAreaLeave}>
                          <Link
                            to="/service-areas"
                            className={`font-semibold tracking-wide transition-colors duration-150 px-4 py-1.5 cursor-pointer flex items-center gap-1.5 text-sm ${
                              activeItem === item || window.location.pathname.includes('/service-area')
                                ? 'bg-primary text-white rounded-sm'
                                : isScrolled
                                  ? 'text-slate-600 hover:bg-primary hover:text-white hover:rounded-sm'
                                  : 'text-white/90 hover:bg-white/20 hover:text-white hover:rounded-sm'
                            }`}
                          >
                            Service Area <ChevronDown size={13} className={`transition-transform duration-300 ${isServiceAreaHovered ? 'rotate-180' : ''}`} />
                          </Link>
                        </div>
                      );
                    }
                    if (item === 'Services') {
                      return (
                        <div key={item} className="relative" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                          <button className={`font-semibold tracking-wide transition-colors duration-150 px-4 py-1.5 cursor-pointer flex items-center gap-1.5 text-sm ${
                            activeItem === item || window.location.pathname.includes('/services')
                              ? 'bg-primary text-white rounded-sm'
                              : isScrolled
                                ? 'text-slate-600 hover:bg-primary hover:text-white hover:rounded-sm'
                                : 'text-white/90 hover:bg-white/20 hover:text-white hover:rounded-sm'
                          }`}>
                            Services <ChevronDown size={13} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      );
                    }
                    const path = navPath(item);
                    const isExternal = path.startsWith('http');
                    const navClass = `font-semibold tracking-wide transition-colors duration-150 px-4 py-1.5 cursor-pointer text-sm ${
                      activeItem === item
                        ? 'bg-primary text-white rounded-sm'
                        : isScrolled
                          ? 'text-slate-600 hover:bg-primary hover:text-white hover:rounded-sm'
                          : 'text-white/90 hover:bg-white/20 hover:text-white hover:rounded-sm'
                    }`;
                    return isExternal ? (
                      <a key={item} href={path} target="_blank" rel="noopener noreferrer" className={navClass}>
                        {item}
                      </a>
                    ) : (
                      <Link key={item} to={path} onClick={() => setActiveItem(item)} className={navClass}>
                        {item}
                      </Link>
                    );
                  })}
                </motion.nav>

                {/* Desktop CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={siteReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                  className="hidden md:flex items-center"
                >
                  <Link to="/contact">
                    <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm border border-transparent hover:bg-[#1e2820] hover:scale-[1.04] hover:border-white/25 transition-all duration-300 cursor-pointer tracking-wide btn-shimmer">
                      Get a Free Estimate
                    </button>
                  </Link>
                </motion.div>

                {/* Mobile: Facebook + Hamburger */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={siteReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="lg:hidden flex items-center gap-2.5"
                >
                  {/* Facebook link */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61576222776400#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-colors text-white hover:text-white/70"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Hamburger */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-lg ${
                      isMobileMenuOpen
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-primary hover:text-white hover:border-primary'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <X size={22} />
                        </motion.span>
                      ) : (
                        <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <Menu size={22} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer + backdrop rendered at document.body via portal so they escape
          the header's z-50 stacking context and sit above the sticky footer (z-100) */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-[140] lg:hidden"
              onClick={closeMenu}
            />
          )}
          {isMobileMenuOpen && (
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-[310px] max-w-[88vw] bg-[#1e2820] z-[150] flex flex-col lg:hidden overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DRAWER_HEX_BG, backgroundRepeat: 'repeat' }} />
              <div className="relative z-[1] flex flex-col flex-1 min-h-0">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
                <Link to="/" onClick={closeMenu}>
                  <img src="/jclewislogonew.png" alt="J & C Lewis" className="h-11 w-auto brightness-0 invert" />
                </Link>
                <button onClick={closeMenu} className="p-2 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => {
                  if (item === 'Service Area') {
                    return (
                      <div key={item}>
                        <motion.button
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.07 * i + 0.1, duration: 0.3 }}
                          onClick={() => setIsMobileServiceAreaOpen(!isMobileServiceAreaOpen)}
                          className={`w-full flex items-center justify-between px-6 py-4 border-b border-white/8 font-bold tracking-wide transition-colors cursor-pointer text-left ${isMobileServiceAreaOpen ? 'text-primary bg-white/5' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
                        >
                          Service Area
                          <ChevronDown size={15} className={`transition-transform duration-300 text-white/30 ${isMobileServiceAreaOpen ? 'rotate-180 text-primary' : ''}`} />
                        </motion.button>
                        <AnimatePresence>
                          {isMobileServiceAreaOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-black/20 border-b border-white/8"
                            >
                              {SERVICE_AREAS.slice(0, 8).map((city) => (
                                <Link
                                  key={city.slug}
                                  to={`/service-areas/${city.slug}`}
                                  onClick={closeMenu}
                                  className="flex items-center gap-3 px-8 py-3.5 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium border-b border-white/5 last:border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                  {city.isHub ? '★ ' : ''}{city.name}
                                </Link>
                              ))}
                              <Link
                                to="/service-areas"
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-8 py-3.5 text-primary hover:text-white hover:bg-white/5 transition-colors text-sm font-bold border-b border-white/5"
                              >
                                View All Areas →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  if (item === 'Services') {
                    return (
                      <div key={item}>
                        <motion.button
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.07 * i + 0.1, duration: 0.3 }}
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`w-full flex items-center justify-between px-6 py-4 border-b border-white/8 font-bold tracking-wide transition-colors cursor-pointer text-left ${isMobileServicesOpen ? 'text-primary bg-white/5' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
                        >
                          Services
                          <ChevronDown size={15} className={`transition-transform duration-300 text-white/30 ${isMobileServicesOpen ? 'rotate-180 text-primary' : ''}`} />
                        </motion.button>
                        <AnimatePresence>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-black/20 border-b border-white/8"
                            >
                              {[
                                { label: 'Custom Metal Fences', path: '/services/custom-metal-fences' },
                                { label: 'Custom Metal Gates', path: '/services/custom-metal-gates' },
                                { label: 'Ornamental Ironwork', path: '/services/ornamental-ironwork' },
                              ].map((sub) => (
                                <Link key={sub.label} to={sub.path} onClick={closeMenu}
                                  className="flex items-center gap-3 px-8 py-3.5 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium border-b border-white/5 last:border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  const path = navPath(item);
                  const isExternal = path.startsWith('http');
                  const drawerClass = `flex items-center px-6 py-4 border-b border-white/8 font-bold tracking-wide transition-colors ${activeItem === item ? 'text-primary bg-white/5' : 'text-white/75 hover:text-white hover:bg-white/5'}`;
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 * i + 0.1, duration: 0.3 }}
                    >
                      {isExternal ? (
                        <a href={path} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className={drawerClass}>
                          {item}
                        </a>
                      ) : (
                        <Link to={path} onClick={() => { setActiveItem(item); closeMenu(); }} className={drawerClass}>
                          {item}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer — pb-24 clears the 88px mobile sticky footer */}
              <div className="flex-shrink-0 px-6 pt-6 pb-24 border-t border-white/10 space-y-4">
                <div className="flex flex-col gap-3">
                  <a href="tel:254-332-1303" className="flex items-center gap-3 text-white/55 hover:text-white transition-colors text-sm font-medium">
                    <Phone size={14} className="text-primary flex-shrink-0" />
                    (254) 332-1303
                  </a>
                  <a href="mailto:info@jandclewisconstructiongroup.com" className="flex items-start gap-3 text-white/55 hover:text-white transition-colors text-xs font-medium">
                    <Mail size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    info@jandclewisconstructiongroup.com
                  </a>
                </div>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="block w-full bg-primary text-white py-4 font-bold text-center hover:bg-[#1e2820] hover:tracking-widest transition-all duration-300 tracking-wide btn-shimmer"
                >
                  Get a Free Estimate
                </Link>
              </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Services Mega Menu ─────────────────────────────────────── */}
      {createPortal(
        <AnimatePresence>
          {isServicesHovered && (
            <motion.div
              key="services-mega"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 z-[95] bg-white border-t-[3px] border-primary shadow-2xl shadow-black/20 hidden lg:block"
              style={{ top: megaMenuTop, transition: 'top 0.5s ease-out' }}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <div className="max-w-7xl mx-auto px-12 py-8">
                <div className="flex gap-0">

                  {/* Left: large animated image preview */}
                  <div className="w-[38%] pr-10 flex flex-col justify-between border-r border-slate-100 shrink-0">
                    <div className="relative overflow-hidden rounded-2xl h-56 bg-slate-100">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={hoveredServiceId}
                          src={SERVICES_MEGA.find(s => s.id === hoveredServiceId)?.image}
                          alt=""
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </AnimatePresence>
                    </div>
                    <div className="mt-5">
                      <p
                        className="text-[11px] font-black text-slate-400 tracking-[0.22em] uppercase mb-1"
                      >
                        J &amp; C Lewis Construction Group
                      </p>
                      <p className="text-slate-500 text-sm leading-snug">
                        Custom metalwork for residential, commercial &amp; industrial clients across Texas.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[11px] text-slate-400 font-medium">35+ Yrs Experience</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-[11px] text-slate-400 font-medium">Bellmead, TX</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-[11px] text-slate-400 font-medium">Free Estimates</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: 3 service columns */}
                  <div className="flex-1 grid grid-cols-3 divide-x divide-slate-100">
                    {SERVICES_MEGA.map((svc) => (
                      <Link
                        key={svc.id}
                        to={svc.path}
                        onClick={() => { setIsServicesHovered(false); setActiveItem('Services'); }}
                        onMouseEnter={() => setHoveredServiceId(svc.id)}
                        className={`px-8 py-4 flex flex-col group transition-colors duration-150 cursor-pointer ${
                          hoveredServiceId === svc.id ? 'bg-slate-50' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="relative overflow-hidden rounded-xl h-32 mb-4 bg-slate-100">
                          <img
                            src={svc.image}
                            alt={svc.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className={`absolute inset-0 ring-1 ring-inset transition-colors duration-200 rounded-xl ${
                            hoveredServiceId === svc.id ? 'ring-primary/30' : 'ring-black/8'
                          }`} />
                        </div>
                        <h4
                          className="font-black text-slate-900 text-sm mb-1.5 tracking-wide uppercase"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {svc.title}
                        </h4>
                        <p className="text-slate-500 text-[13px] leading-snug mb-4 flex-1">
                          {svc.shortDesc}
                        </p>
                        <span className={`text-primary font-bold text-sm flex items-center gap-1.5 transition-all duration-200 ${
                          hoveredServiceId === svc.id ? 'gap-2.5' : 'group-hover:gap-2.5'
                        }`}>
                          View Service <ArrowRight size={13} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Service Area Mega Menu ─────────────────────────────────── */}
      {createPortal(
        <AnimatePresence>
          {isServiceAreaHovered && (
            <motion.div
              key="service-area-mega"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 z-[95] bg-white border-t-[3px] border-primary shadow-2xl shadow-black/20 hidden lg:block"
              style={{ top: megaMenuTop, transition: 'top 0.5s ease-out' }}
              onMouseEnter={handleServiceAreaEnter}
              onMouseLeave={handleServiceAreaLeave}
            >
              <div className="max-w-7xl mx-auto px-12 py-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3
                      className="text-base font-black text-slate-900 tracking-widest uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Our Service Areas
                    </h3>
                    <p className="text-slate-400 text-[12px] mt-0.5">Serving residential and commercial clients across Texas</p>
                  </div>
                  <Link
                    to="/service-areas"
                    onClick={() => setIsServiceAreaHovered(false)}
                    className="flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2.5 transition-all duration-200"
                  >
                    View All Areas <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {SERVICE_AREAS.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/service-areas/${city.slug}`}
                      onClick={() => setIsServiceAreaHovered(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      {city.isHub && (
                        <span className="text-primary text-[10px] flex-shrink-0 leading-none">★</span>
                      )}
                      <span className={`text-sm transition-colors duration-150 group-hover:text-primary ${
                        city.isHub ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                      }`}>
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
