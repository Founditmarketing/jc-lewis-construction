import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Custom Metal Fences',
    description: 'Precision-built metal fencing that combines security with style. Every fence is designed and fabricated to your exact specifications — built to protect and impress for decades.',
    image: '/Custom%20Metal%20Fences.webp',
    slug: 'custom-metal-fences',
  },
  {
    id: '02',
    title: 'Custom Metal Gates',
    description: 'Make a statement at every entrance. Our custom metal gates are designed for strength and curb appeal — crafted to complement your property and stand up to daily use.',
    image: '/Custom%20Metal%20Gates.webp',
    slug: 'custom-metal-gates',
  },
  {
    id: '03',
    title: 'Ornamental Ironwork',
    description: 'Handcrafted ornamental ironwork that elevates any space. From decorative railings to intricate architectural details, we fuse artistry with structural integrity.',
    image: '/Ornamental%20Ironwork.webp',
    slug: 'ornamental-ironwork',
  },
];

export default function FlexExpandServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="bg-white">

      {/* Section Header */}
      <div className="pt-20 md:pt-28 pb-2 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-4">What We Do</p>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="lg:w-1/2 flex flex-col py-10 lg:py-14">
            <div className="flex flex-col divide-y divide-slate-100">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group cursor-pointer py-5 lg:py-6"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <span className={`text-xs font-black tracking-[0.3em] uppercase mb-3 block transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-slate-300'}`}>
                        {service.id}
                      </span>
                      <h3 className={`text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-300 ${activeIndex === index ? 'text-slate-900' : 'text-slate-400'}`}>
                        {service.title}
                      </h3>
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="lg:hidden mt-4 mb-4 overflow-hidden rounded-xl aspect-[16/9]">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mt-3 mb-4 max-w-md">
                              {service.description}
                            </p>
                            <Link
                              to={`/services/${service.slug}`}
                              className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:gap-3 transition-all"
                            >
                              Learn More <ArrowUpRight size={14} />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 ${activeIndex === index ? 'bg-primary border-primary text-white' : 'border-slate-200 text-slate-300'}`}>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — sticky photo */}
          <div className="hidden lg:flex lg:w-1/2 items-start py-14">
            <div className="sticky top-28 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl shadow-slate-200"
                >
                  <img
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-lg">
                    <p className="text-xs text-primary font-black tracking-[0.2em] uppercase">{services[activeIndex].id}</p>
                    <p className="text-slate-900 font-bold text-sm">{services[activeIndex].title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
