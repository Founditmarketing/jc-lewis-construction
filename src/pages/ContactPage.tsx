import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader, AlertCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    smsOptIn: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }));
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
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          smsOptIn: form.smsOptIn,
          formSource: 'Contact Page',
        }),
      });

      let data: { error?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border border-slate-200 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white';

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
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Ready to start your next project? Get in touch for a free estimate or any questions.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Get In Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 text-primary p-4 rounded-full">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h3>
                    <a href="tel:254-332-1303" className="text-lg text-slate-600 hover:text-primary transition-colors font-medium">(254) 332-1303</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 text-primary p-4 rounded-full">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Email Address</h3>
                    <a href="mailto:info@jandclewisconstructiongroup.com" className="text-lg text-slate-600 hover:text-primary transition-colors font-medium">info@jandclewisconstructiongroup.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 text-primary p-4 rounded-full">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-lg text-slate-600 font-medium">Bellmead, TX 76705</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-stone-100 text-primary p-4 rounded-full">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-lg text-slate-600 font-medium">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-lg text-slate-600 font-medium">Saturday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-4 py-16"
                  >
                    <CheckCircle className="text-primary w-16 h-16" />
                    <h3 className="text-2xl font-black text-slate-900 uppercase">Message Sent!</h3>
                    <p className="text-slate-500 max-w-sm">We've received your message and will be in touch shortly with your free estimate.</p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setForm({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '', smsOptIn: false });
                      }}
                      className="mt-2 text-primary font-bold underline underline-offset-2 hover:text-[#4d574b] transition-colors text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <h2 className="text-2xl font-black text-slate-900 uppercase mb-2">Get a Free Estimate</h2>
                    <p className="text-slate-500 text-sm mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className={inputClass}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Smith"
                            className={inputClass}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(254) 000-0000"
                          className={inputClass}
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={inputClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Needed *</label>
                        <div className="relative">
                          <select
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            required
                            className={`${inputClass} appearance-none cursor-pointer`}
                            style={{ color: form.service ? '#1e293b' : '#94a3b8' }}
                          >
                            <option value="" disabled>Select a service...</option>
                            <option value="Custom Metal Fences" style={{ color: '#1e293b' }}>Custom Metal Fences</option>
                            <option value="Custom Metal Gates" style={{ color: '#1e293b' }}>Custom Metal Gates</option>
                            <option value="Ornamental Ironwork" style={{ color: '#1e293b' }}>Ornamental Ironwork</option>
                            <option value="Other" style={{ color: '#1e293b' }}>Other / Not Sure</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project — size, location, timeline, etc."
                          rows={5}
                          className={`${inputClass} resize-none`}
                          required
                        />
                      </div>

                      {/* SMS Opt-In */}
                      <label className="flex items-start gap-3 cursor-pointer mt-1">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            name="smsOptIn"
                            checked={form.smsOptIn}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border border-slate-300 bg-white peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            {form.smsOptIn && (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-slate-500 text-xs leading-relaxed">
                          I agree to receive text messages from J & C Lewis Construction Group regarding my inquiry, estimates, and project updates. Message &amp; data rates may apply. Reply <strong className="text-slate-700">STOP</strong> to opt out or <strong className="text-slate-700">HELP</strong> for assistance. View our{' '}
                          <Link to="/privacy-policy" className="text-primary hover:text-[#4d574b] underline underline-offset-2 transition-colors">Privacy Policy</Link>{' '}and{' '}
                          <Link to="/terms" className="text-primary hover:text-[#4d574b] underline underline-offset-2 transition-colors">Terms of Service</Link>.
                        </span>
                      </label>

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 text-sm"
                        >
                          <AlertCircle size={15} className="shrink-0" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-primary text-white font-black text-base py-5 border border-transparent hover:bg-[#1e2820] hover:scale-[1.02] hover:border-white/25 transition-all duration-300 cursor-pointer tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2 btn-shimmer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader size={18} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
