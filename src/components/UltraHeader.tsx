import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Mail, Clock, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = ['Home', 'Services', 'Gallery', 'Service Area', 'FAQs', 'Reviews', 'Contact'];

function navPath(item: string) {
  if (item === 'FAQs') return '/faqs';
  if (item === 'Gallery') return '/gallery';
  if (item === 'Contact') return '/contact';
  if (item === 'Service Area') return '/service-areas';
  if (item === 'Reviews') return '/reviews';
  if (item === 'Home') return '/';
  return `/#${item.toLowerCase().replace(' ', '-')}`;
}

export default function UltraHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

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

  return (
    <>
      {/* fixed on mobile, absolute on desktop (restores scroll-away behavior) */}
      <header className="fixed lg:absolute top-0 left-0 w-full flex flex-col z-50 pointer-events-none">
        <div className="pointer-events-auto">

          {/* Utility bar — collapses on mobile when scrolled */}
          <div className={`overflow-hidden transition-all duration-300 bg-primary border-b border-primary/20 ${isScrolled ? 'max-h-0 lg:max-h-16' : 'max-h-16'}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
                  animate={{ opacity: 1, x: 0 }}
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
                  animate={{ y: 0, x: '-50%', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden lg:flex items-center space-x-1 px-10 py-1 rounded fixed left-1/2 z-[100] transition-[top,background-color,box-shadow,transform] duration-500 ease-out ${isScrolled ? 'top-4 scale-95 shadow-2xl shadow-black/20 bg-white' : 'top-[56px] scale-100 shadow-transparent bg-transparent'}`}
                >
                  {NAV_ITEMS.map((item) => {
                    if (item === 'Services') {
                      return (
                        <div key={item} className="relative" onMouseEnter={() => setIsServicesHovered(true)} onMouseLeave={() => setIsServicesHovered(false)}>
                          <button className={`font-semibold tracking-wide transition-colors duration-150 px-4 py-1.5 cursor-pointer flex items-center gap-1.5 text-sm ${
                            activeItem === item || window.location.pathname.includes('/services')
                              ? 'bg-primary text-white rounded-sm'
                              : isScrolled
                                ? 'text-slate-600 hover:bg-primary hover:text-white hover:rounded-sm'
                                : 'text-white/90 hover:bg-white/20 hover:text-white hover:rounded-sm'
                          }`}>
                            Services <ChevronDown size={13} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {isServicesHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-12 left-0 mt-1 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 flex flex-col"
                              >
                                <Link to="/services/custom-metal-fences" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors border-b border-slate-50 font-medium text-sm">Custom Metal Fences</Link>
                                <Link to="/services/custom-metal-gates" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors border-b border-slate-50 font-medium text-sm">Custom Metal Gates</Link>
                                <Link to="/services/ornamental-ironwork" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors font-medium text-sm">Ornamental Ironwork</Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    return (
                      <Link key={item}
                        to={navPath(item)}
                        onClick={() => setActiveItem(item)}
                        className={`font-semibold tracking-wide transition-colors duration-150 px-4 py-1.5 cursor-pointer text-sm ${
                          activeItem === item
                            ? 'bg-primary text-white rounded-sm'
                            : isScrolled
                              ? 'text-slate-600 hover:bg-primary hover:text-white hover:rounded-sm'
                              : 'text-white/90 hover:bg-white/20 hover:text-white hover:rounded-sm'
                        }`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </motion.nav>

                {/* Desktop CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="hidden md:flex items-center"
                >
                  <Link to="/contact">
                    <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#4d574b] transition-colors duration-200 cursor-pointer tracking-wide">
                      Get a Free Estimate
                    </button>
                  </Link>
                </motion.div>

                {/* Mobile: Facebook + Hamburger */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:hidden flex items-center gap-2.5"
                >
                  {/* Facebook link */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61576222776400#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-lg ${
                      isMobileMenuOpen
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/95 backdrop-blur-md border border-slate-200 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]'
                    }`}
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
              className="fixed top-0 right-0 h-screen w-[310px] max-w-[88vw] bg-[#1e2820] z-[150] flex flex-col lg:hidden"
            >
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
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 * i + 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={navPath(item)}
                        onClick={() => { setActiveItem(item); closeMenu(); }}
                        className={`flex items-center px-6 py-4 border-b border-white/8 font-bold tracking-wide transition-colors ${activeItem === item ? 'text-primary bg-white/5' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
                      >
                        {item}
                      </Link>
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
                  className="block w-full bg-primary text-white py-4 font-bold text-center hover:bg-[#4d574b] transition-colors tracking-wide"
                >
                  Get a Free Estimate
                </Link>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
