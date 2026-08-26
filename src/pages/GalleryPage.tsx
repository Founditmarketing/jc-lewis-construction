import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const images = Array.from({ length: 19 }, (_, i) => ({
  id: `${i + 1}`,
  src: `/jclewis-g${String(i + 1).padStart(2, '0')}.png`,
  alt: `J & C Lewis Construction Group — Custom Metalwork ${i + 1}`,
  className: (i % 6 === 0)
    ? 'col-span-2 row-span-2'
    : 'col-span-1 row-span-1'
}));

export default function GalleryPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedId) return;
    const currentIndex = images.findIndex(img => img.id === selectedId);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedId(images[nextIndex].id);
  }, [selectedId]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedId) return;
    const currentIndex = images.findIndex(img => img.id === selectedId);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedId(images[prevIndex].id);
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleNext, handlePrev]);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageSEO
        title="Project Gallery | J & C Lewis Construction Group"
        description="Browse our gallery of custom metal fences, gates, and ornamental ironwork projects across Bellmead, Waco & Central Texas."
        path="/gallery"
      />
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Project <span className="text-primary gap-2">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            A look at our custom metalwork — fences, gates, and ornamental ironwork crafted across Texas.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[250px] gap-2 sm:gap-3 md:gap-4 grid-flow-row-dense"
          >
            {images.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`gallery-image-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-shadow border border-slate-200 ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 border border-white/20 shadow-xl">
                    <ZoomIn size={28} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fullscreen Lightbox */}
          <AnimatePresence>
            {selectedId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
              >
                <button
                  className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-3 sm:p-4 rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg z-50 focus:outline-none"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-3 sm:p-4 rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg z-50 focus:outline-none"
                  onClick={handleNext}
                >
                  <ChevronRight size={32} />
                </button>

                {images.filter(img => img.id === selectedId).map(item => (
                  <div key={item.id} className="relative z-10 flex flex-col items-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="absolute -top-14 right-2 md:top-auto md:-bottom-14 md:right-0 text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors border border-white/20 shadow-xl z-50 transform md:-translate-x-2"
                      onClick={() => setSelectedId(null)}
                    >
                      <X size={24} />
                    </button>
                    <motion.img
                      layoutId={`gallery-image-${item.id}`}
                      src={item.src}
                      alt={item.alt}
                      className="max-w-[100vw] sm:max-w-7xl max-h-[80vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10 cursor-default"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
