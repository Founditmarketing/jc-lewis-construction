import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SpecializationsBanner from '../components/SpecializationsBanner';

const capabilities = [
  'Custom Metal Fences & Gates',
  'Ornamental Ironwork',
  'Railings, Stairs & Handrails',
  'Metal Patios & Patio Covers',
  'MIG, TIG & Stick Welding',
  'Cutting, Bending & Forming',
  'Barndominium Construction',
  'Steel Erection',
  'Carport Installation',
  'Remodeling Services',
  'Handyman Services',
  'Concrete, Decks & Brickwork',
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/Custom%20Metal%20Fences.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-4"
          >
            Bellmead, TX · Est. 2019
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            About J &amp; C Lewis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            35 years of metalwork experience. Built on craftsmanship, delivered with integrity.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-14"
          >
            <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Our Story</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              J &amp; C Lewis Construction Group brings 35 years of experience to Bellmead, TX, as a construction
              company specializing in metal work. With 6 years in business serving residential, commercial, and
              industrial clients, we handle projects from start to finish and have subcontractors available for
              additional work. Our capabilities include custom metal work in aluminum, stainless steel, and iron,
              working from customer designs, blueprints, or CAD files for prototyping, one-off pieces, small-batch
              runs, and large-scale production. We offer welding services, including MIG, TIG, and STICK, as well
              as cutting, bending, and forming of metal for railings, stairs, and handrails. Whether the job is
              warehouse fit-outs or barndominium construction, we provide free estimates and can begin with prebuilt
              components or build from scratch.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We take on remodeling services and barndominium construction, along with steel erection for projects
              that require careful planning and solid execution. From custom metal fences and custom metal gates to
              metal patios, patio covers, and ornamental ironwork, our focus is craftsmanship that fits your design
              and budget. Our team also provides carport installation and reliable handyman services to handle a wide
              range of property improvements with efficiency and attention to detail. Concrete, fences, decks,
              rockwork, and brickwork are part of our construction offerings so that we can manage every phase
              without unnecessary subcontracting. Reach out and contact us for a free estimate today — let us
              discuss how our experience and capabilities will bring your project to completion.
            </p>
          </motion.div>

          {/* Capabilities grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-14"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-stone-100 text-primary flex items-center justify-center shrink-0 text-base">★</span>
              What We Do
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 font-medium">{cap}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link to="/contact">
              <button className="bg-primary text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-[#4d574b] transition-all shadow-xl active:scale-[0.98] flex items-center gap-2 group cursor-pointer inline-flex">
                Get a Free Estimate
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SpecializationsBanner />
    </main>
  );
}
