import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const allImages = [
  { src: '/jclewis-g03.png', alt: 'Custom Metal Fence' },
  { src: '/jclewis-g01.png', alt: 'Custom Metal Fence' },
  { src: '/jclewis-g02.png', alt: 'Custom Metal Gate' },
  { src: '/jclewis-g04.png', alt: 'Ornamental Ironwork' },
  { src: '/jclewis-g05.png', alt: 'Metal Gate Installation' },
  { src: '/jclewis-g06.png', alt: 'Custom Fencing' },
  { src: '/jclewis-g07.png', alt: 'Ironwork Detail' },
  { src: '/jclewis-g08.png', alt: 'Metal Railing' },
  { src: '/jclewis-g09.png', alt: 'Decorative Metalwork' },
];

const featured = allImages[0];
const grid = allImages.slice(1);

export default function InteractiveGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null), []);
  const goNext = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % allImages.length : null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev, closeLightbox]);

  return (
    <section id="gallery" className="bg-white pt-24 md:pt-32 pb-20">

      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-16 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-4">Portfolio</p>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              Our <span className="text-primary">Work</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm tracking-widest uppercase px-8 py-4 self-start md:self-end border border-transparent hover:bg-[#1e2820] hover:scale-[1.02] hover:border-white/25 transition-all duration-300 btn-shimmer"
          >
            View All Projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Gallery Grid — near full width */}
      <div className="px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-1">

          {/* Big image left */}
          <div
            className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-[680px] overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={featured.src}
              alt={featured.alt}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Small images right — 2×4 on desktop, 2×2 on mobile */}
          <div className="w-full md:w-1/2 md:h-[680px] grid grid-cols-2 gap-1 auto-rows-fr">
            {grid.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden cursor-pointer group aspect-square md:aspect-auto ${i >= 4 ? 'hidden md:block' : ''}`}
                onClick={() => setLightboxIndex(i + 1)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white bg-white/10 p-3 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                src={allImages[lightboxIndex].src}
                alt={allImages[lightboxIndex].alt}
                className="max-w-5xl w-full max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <ChevronRight size={28} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
              {lightboxIndex + 1} / {allImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
