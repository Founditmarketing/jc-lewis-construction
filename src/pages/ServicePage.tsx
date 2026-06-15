import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicesData = {
  'custom-metal-fences': {
    title: 'Custom Metal Fences',
    description: 'Precision-built metal fencing combining security, style, and longevity.',
    fullText: 'Your fence is the first line of defense and the first impression your property makes. We design, fabricate, and install high-strength metal fencing built to your exact specifications — engineered to protect, impress, and last for decades without compromise.',
    image: '/jclewis-fence.png',
    features: ['Custom Design & Fabrication', 'Heavy-Gauge Steel Construction', 'Powder-Coat Finish Options', 'Residential & Commercial Grades']
  },
  'custom-metal-gates': {
    title: 'Custom Metal Gates',
    description: 'Make a statement at every entrance with a gate built to last.',
    fullText: 'A custom metal gate does more than secure your property — it sets the tone for everything inside. Our gates are designed for strength and curb appeal, crafted to complement your property\'s aesthetic while standing up to daily use and the elements for years to come.',
    image: '/jclewis-gate.png',
    features: ['Sliding & Swing Gate Options', 'Automated & Manual Configurations', 'Custom Sizing & Designs', 'Durable All-Weather Finish']
  },
  'ornamental-ironwork': {
    title: 'Ornamental Ironwork',
    description: 'Handcrafted ironwork that elevates any space with artistry and strength.',
    fullText: 'Ornamental ironwork is where craft meets architecture. From decorative railings and balusters to intricate custom details, our skilled metalworkers fuse artistry with structural integrity — creating pieces that are as functional as they are beautiful.',
    image: '/jclewis-ironwork.png',
    features: ['Custom Railings & Balusters', 'Decorative Scrollwork & Details', 'Interior & Exterior Applications', 'Hand-Forged & Welded Finishes']
  }
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id || !servicesData[id as keyof typeof servicesData]) {
    return <Navigate to="/#services" replace />;
  }

  const service = servicesData[id as keyof typeof servicesData];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={service.title}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={service.description}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Service Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              key={service.image}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
            </motion.div>

            {/* Service Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              key={`text-${service.title}`}
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">Uncompromising Quality</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {service.fullText}
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-stone-100 text-primary flex items-center justify-center shrink-0">★</span>
                  Features & Details
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact">
                <button className="bg-primary text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-[#4d574b] transition-all shadow-xl active:scale-[0.98] flex items-center gap-2 group cursor-pointer inline-flex">
                  Request an Estimate
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
