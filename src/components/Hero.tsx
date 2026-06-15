import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const trustItems = [
  '35+ Years Experience',
  'Custom Metal Fences',
  'Custom Metal Gates',
  'Ornamental Ironwork',
  'Free Estimates',
  'Licensed & Insured',
  'Serving All of Texas',
  '5-Star Rated',
];

const heroImages = [
  '/jclewis-hero-a.png',
  '/jclewis-hero-b.png',
  '/jclewis-hero-c.png',
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const headline = "Extensive Industry Experience.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.012, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[260px] lg:pt-64 pb-32 lg:pb-48">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-slate-100 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt="Hero background"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-[82%] flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-none w-full flex flex-col items-center lg:items-start">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/70 font-bold tracking-[0.25em] uppercase text-sm mb-6"
          >
            Bellmead, TX &nbsp;·&nbsp; 35 Years Experience
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight mb-8 leading-[1.05] drop-shadow-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headline.split(' ').map((word, wordIndex, array) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <motion.span key={charIndex} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
                {wordIndex !== array.length - 1 && (
                  <span className="inline-block w-[0.25em]">&nbsp;</span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-sm md:text-base text-white/80 font-medium mb-12 leading-relaxed max-w-lg"
          >
            Drawing on 35 years of experience, we craft precision metalwork on every project.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-50"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#4d574b] transition-colors duration-200 cursor-pointer w-full tracking-wide">
                Start Your Project
              </button>
            </Link>
            <Link to="/gallery" className="w-full sm:w-auto">
              <button className="bg-white/15 border border-white/40 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/30 hover:border-white/70 transition-colors duration-200 cursor-pointer w-full tracking-wide">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pb-5 pt-3">
        <div
          className="flex flex-nowrap"
          style={{ animation: 'marquee-scroll 18s linear infinite', willChange: 'transform' }}
        >
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={i} className="inline-flex flex-shrink-0 items-center">
              <span className="text-white/25 font-thin text-xl leading-none select-none mx-6">|</span>
              <span className="text-white/75 text-[11px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-1 flex items-center justify-end cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block transition-all duration-300 ${currentSlide === index
                ? 'w-[3px] h-40 bg-primary'
                : 'w-[2px] h-20 bg-white/35 group-hover:bg-white/60 group-hover:h-28'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
