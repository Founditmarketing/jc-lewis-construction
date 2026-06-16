import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { SERVICE_AREAS } from '../data/serviceAreas';
import SpecializationsBanner from '../components/SpecializationsBanner';

const SERVICES = [
  {
    title: 'Custom Metal Fences',
    slug: 'custom-metal-fences',
    image: '/Custom%20Metal%20Fences.webp',
    desc: 'Precision-built metal fencing combining security, style, and longevity. Every fence is designed to your exact specs and built to last decades.',
  },
  {
    title: 'Custom Metal Gates',
    slug: 'custom-metal-gates',
    image: '/Custom%20Metal%20Gates.webp',
    desc: 'Make a statement at every entrance. Our custom metal gates are engineered for strength and curb appeal.',
  },
  {
    title: 'Ornamental Ironwork',
    slug: 'ornamental-ironwork',
    image: '/Ornamental%20Ironwork.webp',
    desc: 'Handcrafted ornamental ironwork that elevates any space — from decorative railings to architectural details.',
  },
];

export default function ServiceAreaCityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = SERVICE_AREAS.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (city) {
      document.title = `Metal Fences & Gates in ${city.name}, TX | J & C Lewis Construction Group`;
    }
  }, [city]);

  if (!city) return <Navigate to="/service-areas" replace />;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm block mb-4">
            Service Area {city.isHub ? '★' : ''}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Metal Fabrication in <span className="text-primary">{city.name}, TX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Custom metal fences, gates, and ornamental ironwork — proudly serving {city.name} and surrounding areas.
          </motion.p>
        </div>
      </div>

      {/* About section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-4">Serving {city.name}</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase mb-6">
                35 Years of Craftsmanship, Now in {city.name}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                J & C Lewis Construction Group brings over 35 years of combined metalwork expertise to {city.name}, TX. From custom residential fencing to large-scale commercial installations, our team delivers precision fabrication and professional installation every time.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {city.description} Our fully licensed and insured crew operates out of Bellmead, TX — ready to take on projects of any size across the region.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Custom Design & Fabrication', 'Licensed & Insured', 'Free Estimates', 'Open 24/7'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="text-slate-700 font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xl">
                <h3 className="text-xl font-black text-slate-900 uppercase mb-6">Get A Free Estimate</h3>
                <p className="text-slate-500 mb-6">Ready to start your project in {city.name}? Contact us today for a free, no-obligation estimate.</p>
                <Link to="/contact">
                  <button className="w-full bg-primary text-white font-bold py-4 text-base border border-transparent hover:bg-[#1e2820] hover:scale-[1.02] hover:border-white/25 transition-all duration-300 tracking-wide btn-shimmer mb-4 flex items-center justify-center gap-2">
                    Request Free Estimate
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <a href="tel:254-332-1303" className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-bold py-4 hover:border-primary hover:text-primary transition-colors">
                  <Phone size={16} />
                  (254) 332-1303
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-4">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase">
              Our Services in {city.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/services/${s.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
                    <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SpecializationsBanner />

    </main>
  );
}
