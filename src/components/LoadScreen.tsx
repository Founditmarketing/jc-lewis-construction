import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export default function LoadScreen({ onComplete }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="loadscreen"
          className="fixed inset-0 z-[9999] bg-[#1e2820] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Hex grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hexgrid"
                x="0"
                y="0"
                width="52"
                height="90"
                patternUnits="userSpaceOnUse"
              >
                {/* Pointy-top hex, circumradius R=30, tile 52×90 */}
                <path
                  d="M26,0 L52,15 L52,45 L26,60 L0,45 L0,15 Z M26,60 L26,90"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.065"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexgrid)" />
          </svg>

          {/* Vignette — darkens edges, draws focus inward */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Brand-color center glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(105,117,102,0.14) 0%, transparent 100%)',
            }}
          />

          {/* Logo */}
          <div className="relative w-64 sm:w-80 md:w-96 select-none z-10">
            {/* J & C LEWIS — slides from left */}
            <motion.img
              src="/loadscreen/jclewis-loadscreen.png"
              alt="J & C Lewis"
              draggable={false}
              initial={{ x: -90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="w-full invert mix-blend-screen pointer-events-none"
            />
            {/* CONSTRUCTION GROUP — slides from right */}
            <motion.img
              src="/loadscreen/constructiongroup-loadscreen.png"
              alt="Construction Group"
              draggable={false}
              initial={{ x: 90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="absolute inset-0 w-full invert mix-blend-screen pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
