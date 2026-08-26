import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageSEO from '../components/PageSEO';

export default function ReviewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method: string, url: string | URL, ...args: any[]) {
      let targetUrl = typeof url === 'object' ? url.toString() : url;
      if (typeof targetUrl === 'string' && targetUrl.includes('trustindex.io')) {
        const separator = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${separator}t=${Date.now()}`;
      }
      return originalOpen.apply(this, [method, targetUrl, ...args] as any);
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?6701c21721f199069456c7a7999';
      script.async = true;
      script.defer = true;
      containerRef.current.appendChild(script);
    }

    return () => {
      XMLHttpRequest.prototype.open = originalOpen;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageSEO
        title="Client Reviews | J & C Lewis Construction Group"
        description="Read verified reviews from homeowners and businesses across Texas who trust J & C Lewis Construction Group for custom metalwork."
        path="/reviews"
      />
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8"
          >
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-white font-bold tracking-wider">5-STAR RATED</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            What Our <span className="text-primary">Clients</span> Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Read verified reviews from homeowners and businesses across Texas.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[400px]">
            <div ref={containerRef} className="trustindex-widget-container">
              {/* Trustindex script and widget will mount here */}
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Ready to start your own project?</h3>
            <Link to="/contact">
              <button className="bg-primary text-white font-bold text-xl py-4 px-10 rounded-xl hover:bg-[#4d574b] transition-all shadow-xl active:scale-[0.98] cursor-pointer">
                Get a Free Estimate
              </button>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
