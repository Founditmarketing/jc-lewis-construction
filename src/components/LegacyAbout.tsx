import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  {
    eyebrow: 'Commercial Services',
    title: (<>Supporting<br /><span className="text-primary">Businesses</span><br />With Metal Work.</>),
    description: 'Working with commercial clients, we deliver structural steel, railings, and ornamental ironwork while ensuring projects meet operational and aesthetic requirements.',
    stats: [{ value: '35+', label: 'Years Experience' }, { value: 'A+', label: 'Quality Standard' }],
    imgSrc: '/jclewis-about1.png',
    imgAlt: 'Commercial metalwork project',
  },
  {
    eyebrow: 'Residential Services',
    title: (<>Creating Custom<br /><span className="text-primary">Solutions</span><br />For Homes.</>),
    description: 'Serving residential clients, we design and fabricate fences, gates, and other metalwork to enhance curb appeal and home functionality.',
    stats: [{ value: 'Free', label: 'Estimates' }, { value: '100%', label: 'Satisfaction' }],
    imgSrc: '/jclewis-about2.png',
    imgAlt: 'Residential custom metalwork',
  },
  {
    eyebrow: 'Industrial Services',
    title: (<>Engineering<br /><span className="text-primary">Durable Solutions</span><br />For Industry.</>),
    description: 'Collaborating with industrial clients, we fabricate heavy-duty metal structures while maintaining precision, safety, and compliance for large-scale operations.',
    stats: [{ value: '3', label: 'Core Services' }, { value: 'TX', label: 'Statewide Service' }],
    imgSrc: '/jclewis-about3.png',
    imgAlt: 'Industrial metalwork fabrication',
  },
];

export default function LegacyAbout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight / 2;
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom >= triggerY) setActiveIndex(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="legacy" className="bg-slate-50">

      {/* MOBILE version */}
      <div className="flex flex-col lg:hidden w-full px-6 py-24 bg-white">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6">What We Do</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            Supporting Businesses.<br /><span className="text-primary">Serving Homes.</span><br />Built for Industry.
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">{sections[0].description}</p>
          <p className="text-lg text-slate-600 mb-14 leading-relaxed">{sections[1].description}</p>
          <img src="/jclewis-about1.png" alt="J & C Lewis Construction Group metalwork" className="w-full h-72 object-cover rounded-3xl shadow-xl" />
        </div>
      </div>

      {/* DESKTOP sticky scroll */}
      <div className="hidden lg:flex w-full bg-white">
        {/* Left sticky text */}
        <div className="w-1/2 px-16 py-40 pb-40">
          <div className="w-full max-w-xl sticky top-36 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6">{sections[activeIndex].eyebrow}</p>
                <h2 className="text-5xl xl:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                  {sections[activeIndex].title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-14">
                  {sections[activeIndex].description}
                </p>
                <div className="flex gap-16 border-t border-slate-100 pt-10">
                  {sections[activeIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-5xl font-black text-primary mb-2">{stat.value}</div>
                      <div className="text-slate-500 font-semibold uppercase tracking-widest text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right scrolling photos */}
        <div className="w-1/2 flex flex-col">
          {sections.map((section, index) => (
            <img
              key={index}
              ref={(el) => { sectionRefs.current[index] = el; }}
              src={section.imgSrc}
              alt={section.imgAlt}
              className="w-full h-screen object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
