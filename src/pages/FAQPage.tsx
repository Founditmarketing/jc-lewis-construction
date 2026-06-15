import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What types of custom metalwork do you offer?",
    answer: "J & C Lewis Construction Group specializes in three core services: Custom Metal Fences, Custom Metal Gates, and Ornamental Ironwork. Each project is designed and fabricated to your exact specifications — from simple residential fencing to complex decorative ironwork for commercial properties."
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes! We offer free estimates on all projects. Simply contact us by phone, email, or through our website contact form, and we'll schedule a time to assess your project and provide a detailed quote at no cost."
  },
  {
    question: "How long does a typical fence or gate project take?",
    answer: "Project timelines vary depending on scope and complexity. A standard residential fence installation typically takes 1–3 days. Custom gates and ornamental ironwork may take longer due to fabrication time. We'll give you a clear timeline estimate during your free consultation."
  },
  {
    question: "What materials do you use for fences and gates?",
    answer: "We work primarily with high-grade steel and wrought iron, selected for strength, durability, and appearance. All our metal is sourced from trusted suppliers, and we use premium powder-coat finishes to protect against rust and weathering — ensuring your investment lasts for decades."
  },
  {
    question: "What is ornamental ironwork?",
    answer: "Ornamental ironwork refers to decorative metal elements crafted for both functional and aesthetic purposes. This includes railings, balusters, decorative gates, scrollwork, and architectural accents. Our craftsmen hand-forge and weld each piece to create unique, custom designs that complement your property's style."
  },
  {
    question: "Can my metal gate be automated?",
    answer: "Yes. We can design and install custom gates compatible with automated opening systems (swing, slide, or overhead). Whether you need a remote-operated residential gate or a commercial access-control system, we'll work with you to spec the right solution."
  },
  {
    question: "What areas of Texas do you serve?",
    answer: "We are based in Bellmead, TX and serve communities across Texas including Waco, Austin, Dallas, Fort Worth, Temple, Gatesville, McGregor, Corsicana, Odessa, and more. Contact us if you don't see your city listed — we travel for the right project."
  },
  {
    question: "How do I maintain my metal fence or gate?",
    answer: "Metal fences and gates are low-maintenance compared to wood. We recommend periodic inspection for rust or paint chips, touching up any damaged areas with rust-inhibiting primer and matching paint or powder-coat. A light coat of wax or oil on moving parts (hinges, latches) annually will keep them operating smoothly. Our powder-coat finishes are designed to last years without significant upkeep."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes. J & C Lewis Construction Group is fully licensed and insured. We carry liability insurance on all projects to protect you and your property. You can have peace of mind knowing your project is backed by professionals."
  },
  {
    question: "What is the difference between a custom fence and a standard fence?",
    answer: "A standard fence is a pre-fabricated, off-the-shelf product installed without modification. A custom fence is designed and fabricated specifically for your property — matching your exact dimensions, style preferences, gate requirements, and security needs. Custom metalwork costs more upfront but delivers superior quality, longevity, and curb appeal."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Frequently Asked <span className="text-primary gap-2">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Everything you need to know about our custom metal fences, gates, and ornamental ironwork.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'border-primary shadow-xl shadow-primary/10'
                    : 'border-slate-200 shadow-md hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none cursor-pointer"
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${openIndex === index ? 'text-primary' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'bg-stone-100 rotate-180' : 'bg-slate-50'}`}>
                    <ChevronDown className={`w-6 h-6 ${openIndex === index ? 'text-primary' : 'text-slate-500'}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 text-slate-600 space-y-4">
                        <div className="w-full h-px bg-slate-100 mb-6"></div>
                        {faq.answer.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="leading-relaxed text-base md:text-lg whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
