import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SpecializationsBanner from '../components/SpecializationsBanner';

const servicesData = {
  'custom-metal-fences': {
    title: 'Custom Metal Fences',
    subtitle: 'Protecting property boundaries with precision and longevity',
    image: '/Custom%20Metal%20Fences.webp',
    paragraphs: [
      'Protecting property boundaries with precision and longevity is our focus when fabricating custom metal fences for homeowners and businesses in Bellmead, TX. At J & C Lewis Construction Group, we combine 35 years of experience with advanced metal work to create fences from aluminum, stainless steel, or iron that match blueprints, CAD files, or a customer sketch. We handle cutting, bending, and forming in-house and offer welding services, including MIG, TIG, and stick, to ensure every joint meets structural expectations while serving residential, commercial, and industrial clients.',
      'Our crews manage projects from initial design through installation and can start with prebuilt components or fabricate from scratch to fit landscaping and security needs. We can also fabricate and install metal patios, patio covers, and provide carport installation to create functional outdoor spaces while maintaining strong structural integrity. We provide free estimates for fence contracts and can produce one-off prototypes or small-batch runs depending on the scope. Choose a local Bellmead, TX fabricator that delivers robust custom metal fences with certified welding and full construction capabilities — request a free estimate now and schedule an on-site consultation with J & C Lewis Construction Group to secure your property.',
    ],
    features: [
      'Custom Design from Blueprints, CAD & Sketches',
      'MIG, TIG & Stick Welding',
      'Aluminum, Stainless Steel & Iron',
      'Residential, Commercial & Industrial',
      'Metal Patios & Patio Covers',
      'Carport Installation',
      'In-House Cutting, Bending & Forming',
      'Free Estimates & On-Site Consultation',
    ],
  },
  'custom-metal-gates': {
    title: 'Custom Metal Gates',
    subtitle: 'Crafting ornate entryways and secure perimeter access',
    image: '/Custom%20Metal%20Gates.webp',
    paragraphs: [
      'Crafting ornate entryways and secure perimeter access, we specialize in custom metal gates tailored for style, durability, and smooth operation for properties in Bellmead, TX. J & C Lewis Construction Group works from customer designs, blueprints, or CAD files to build gates in iron, stainless steel, or aluminum, integrating decorative elements and structural reinforcement. Our metal work process includes precise cutting, forming, and finishing, and we coordinate subcontractors when projects require electrical operators, masonry pillars, or matching railings to meet residential, commercial, and industrial needs.',
      'We have 6 years in business, backed by decades of staff experience, and offer prototyping as well as larger production runs for developments. For projects needing coordination with landscaping or concrete work, we handle the scheduling and on-site assembly while ensuring ornamental ironwork details are installed to specification. Our team also provides professional welding services to guarantee strong, durable joints that support long-term performance. Protect your property with a gate that complements your architecture and stands up to daily use — request a personalized estimate from J & C Lewis Construction Group and book your start date today.',
    ],
    features: [
      'Iron, Stainless Steel & Aluminum',
      'Custom Designs, Blueprints & CAD Files',
      'Electrical Operators & Masonry Pillars',
      'Decorative Elements & Structural Reinforcement',
      'Residential, Commercial & Industrial',
      'Prototyping & Production Runs',
      'Professional Welding Services',
      'Free Personalized Estimates',
    ],
  },
  'ornamental-ironwork': {
    title: 'Ornamental Ironwork',
    subtitle: 'Elevating entrances, stairways, and decorative features',
    image: '/Ornamental%20Ironwork.webp',
    paragraphs: [
      'Elevating entrances, stairways, and decorative features, our ornamental ironwork services bring bespoke metal artistry to renovation and construction projects across Bellmead, TX. At J & C Lewis Construction Group, we fabricate railings, stairs, handrails, and decorative panels in iron and stainless steel, creating architectural elements that combine durability with refined design. Our team also crafts custom metal gates that complement these iron features while enhancing both security and curb appeal. Every component is carefully measured and fabricated to integrate seamlessly with surrounding structures and landscaping.',
      'Our professional welding services ensure that each piece is built with strong, precise joints that meet structural expectations and long-term performance standards. Whether producing elegant balustrades, decorative panels, or functional entry features, we focus on quality craftsmanship and attention to detail. We also offer remodeling services for properties that require new ironwork to match or enhance existing finishes. For a free estimate and a tailored ornamental ironwork proposal, contact J & C Lewis Construction Group today to schedule a site review and design consultation.',
    ],
    features: [
      'Custom Railings, Stairs & Handrails',
      'Decorative Panels & Balustrades',
      'Iron & Stainless Steel Fabrication',
      'Custom Metal Gates & Entry Features',
      'Professional Welding Services',
      'Remodeling & Matching Existing Finishes',
      'Precise Measurement & Fabrication',
      'Free Estimates & Design Consultation',
    ],
  },
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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70" />
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
            key={service.subtitle}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {service.subtitle}
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Service image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              key={service.image}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full lg:sticky lg:top-32"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </motion.div>

            {/* Service details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              key={`text-${service.title}`}
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">Uncompromising Quality</h2>

              <p className="text-lg text-slate-600 mb-5 leading-relaxed">
                {service.paragraphs[0]}
              </p>
              <p className="text-base text-slate-500 mb-8 leading-relaxed">
                {service.paragraphs[1]}
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-stone-100 text-primary flex items-center justify-center shrink-0">★</span>
                  Features &amp; Details
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
                  Request a Free Estimate
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <SpecializationsBanner />
    </main>
  );
}
