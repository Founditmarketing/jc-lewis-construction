import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';

type BannerStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactBanner() {
  const [status, setStatus] = useState<BannerStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          formSource: 'Quick Estimate Banner',
        }),
      });

      let data: { error?: string; success?: boolean } = {};
      try { data = await res.json(); } catch { /* ignore parse errors */ }

      if (!res.ok) {
        setErrorMsg(data.error || `Error ${res.status}: Please try again.`);
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '' });
    } catch (err) {
      console.error('Banner form fetch error:', err);
      setErrorMsg('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="w-full bg-[#1e2820] py-12 md:py-16 relative z-30 overflow-hidden">

      {/* Decorative rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/8 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full bg-primary/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-stone-300 font-bold tracking-[0.25em] uppercase text-sm mb-5">Free Estimate</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Get A Quick Estimate
          </h2>
        </div>

        {/* Success state */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center gap-4 py-8"
            >
              <CheckCircle className="text-green-400 w-14 h-14" />
              <h3 className="text-2xl font-black text-white">Request Received!</h3>
              <p className="text-stone-200 max-w-sm">We'll be in touch with your free estimate shortly.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 text-stone-300 font-bold underline underline-offset-2 hover:text-white transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form row */}
        {status !== 'success' && (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base"
                  required
                />
              </div>

              <div className="flex-1 hidden lg:block">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (Optional)"
                  className="w-full px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base"
                />
              </div>

              <div className="flex-1">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base"
                  required
                />
              </div>

              <div className="flex-1 relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 text-white font-medium transition-all appearance-none cursor-pointer text-base"
                >
                  <option value="" disabled>Select Service...</option>
                  <option value="Custom Metal Fences">Custom Metal Fences</option>
                  <option value="Custom Metal Gates">Custom Metal Gates</option>
                  <option value="Ornamental Ironwork">Ornamental Ironwork</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full md:w-auto bg-primary hover:bg-[#1e2820] hover:scale-[1.03] text-white font-black text-lg py-5 px-10 rounded-2xl border border-transparent hover:border-white/25 transition-all duration-300 cursor-pointer whitespace-nowrap tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 btn-shimmer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Request Estimate'
                  )}
                </button>
              </div>
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl px-4 py-3"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span className="text-sm font-medium">{errorMsg}</span>
              </motion.div>
            )}
          </motion.form>
        )}
      </div>
    </section>
  );
}
