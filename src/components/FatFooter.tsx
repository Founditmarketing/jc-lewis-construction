import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

type FooterStatus = 'idle' | 'submitting' | 'success' | 'error';

const HEX_BG = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="52" height="90"><path d="M26,0 L52,15 L52,45 L26,60 L0,45 L0,15 Z M26,60 L26,90" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.8"/></svg>')}")`;

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61576222776400#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Google',
    href: 'https://www.google.com/maps/place/J+%26+C+Lewis+Construction+Group/@31.6227618,-97.1161271,17z/data=!4m6!3m5!1s0x864f9d5447423393:0x20a1ba27efd4cd18!8m2!3d31.6322485!4d-97.1052066!16s%2Fg%2F11xfvmgwwb?entry=tts&g_ep=EgoyMDI2MDIxMS4wIPu8ASoASAFQAw%3D%3D&skid=a4a7ec97-753e-48aa-a5f6-9ca809fef173',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    label: 'Yelp',
    href: 'https://www.yelp.com/biz/j-and-c-lewis-construction-group-waco',
    icon: <img src="/yelp.png" alt="Yelp" width="16" height="16" className="object-contain" />,
  },
];

export default function FatFooter() {
  const [status, setStatus] = useState<FooterStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '', smsOptIn: false });

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
          firstName: form.name,
          phone: form.phone,
          service: form.service,
          message: form.message,
          smsOptIn: form.smsOptIn,
          formSource: 'Footer Quick Contact',
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
      setForm({ name: '', phone: '', service: '', message: '', smsOptIn: false });
    } catch (err) {
      console.error('Footer form fetch error:', err);
      setErrorMsg('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

  return (
    <footer className="relative bg-[#1e2820] text-slate-300 pt-28 pb-12 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: HEX_BG, backgroundRepeat: 'repeat' }} />
      <div className="relative z-[1] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row gap-16 mb-24">

          {/* Left: Brand + Links + Contact */}
          <div className="lg:w-[58%] grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* Brand */}
            <div>
              <img src="/jclewislogonew.png" alt="J & C Lewis Construction Group" className="h-16 w-auto brightness-0 invert mb-6" />
              <p className="text-slate-400 leading-relaxed text-base mb-6">
                35 years of combined expertise in custom metalwork — Bellmead, TX. We craft fences, gates, and ornamental ironwork built to outlast the rest. Licensed, insured, and dedicated to precision.
              </p>
              <p className="text-white font-bold text-xs tracking-[0.15em] uppercase mb-3">Follow Us</p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/#services' },
                  { name: 'Project Gallery', path: '/gallery' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors flex items-center gap-3 text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Contact Us</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <Phone className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-white font-semibold mb-1">Phone</p>
                    <a href="tel:254-332-1303" className="text-slate-400 hover:text-white transition-colors">(254) 332-1303</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="text-primary shrink-0 mt-0.5" size={18} />
                  <div className="min-w-0">
                    <p className="text-white font-semibold mb-1">Email</p>
                    <a
                      href="mailto:info@jandclewisconstructiongroup.com"
                      className="text-slate-400 hover:text-white transition-colors break-all text-sm"
                    >
                      info@jandclewisconstructiongroup.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-white font-semibold mb-1">Location</p>
                    <p className="text-slate-400">Bellmead, TX 76705</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-white font-semibold mb-1">Hours</p>
                    <p className="text-slate-400">Open 24 Hours</p>
                    <p className="text-slate-500 text-xs mt-0.5">7 Days a Week</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Right: Quick Contact Form */}
          <div className="lg:w-[42%]">
            <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Quick Contact</h3>
            <p className="text-slate-400 mb-6 text-base leading-relaxed">
              Need an estimate? Drop us a line and we'll get right back to you.
            </p>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-3 py-6"
                >
                  <CheckCircle className="text-green-400 w-10 h-10" />
                  <p className="text-white font-bold">Message Sent!</p>
                  <p className="text-slate-400 text-sm">We'll be in touch shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-stone-300 text-sm underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {status !== 'success' && (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-white/8 border border-white/15 px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-white/8 border border-white/15 px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                  required
                />
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/8 border border-white/15 px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 transition-all appearance-none cursor-pointer"
                    style={{ color: form.service ? 'white' : '#6b7280' }}
                  >
                    <option value="" disabled style={{ color: '#1e2820' }}>Select a Service</option>
                    <option value="Custom Metal Fences" style={{ color: '#1e2820' }}>Custom Metal Fences</option>
                    <option value="Custom Metal Gates" style={{ color: '#1e2820' }}>Custom Metal Gates</option>
                    <option value="Ornamental Ironwork" style={{ color: '#1e2820' }}>Ornamental Ironwork</option>
                    <option value="Other" style={{ color: '#1e2820' }}>Other / Not Sure</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="bg-white/8 border border-white/15 px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none h-20 placeholder:text-slate-500"
                  required
                />

                {/* SMS Opt-In */}
                <label className="flex items-start gap-3 cursor-pointer group mt-1">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      name="smsOptIn"
                      checked={form.smsOptIn}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded-md border border-white/25 bg-white/8 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                      {form.smsOptIn && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs leading-relaxed">
                    I agree to receive text messages from J & C Lewis Construction Group regarding my inquiry, estimates, and project updates. Message &amp; data rates may apply. Reply <strong className="text-slate-300">STOP</strong> to opt out or <strong className="text-slate-300">HELP</strong> for assistance. View our{' '}
                    <Link to="/privacy-policy" className="text-stone-400 hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</Link>{' '}and{' '}
                    <Link to="/terms" className="text-stone-400 hover:text-white underline underline-offset-2 transition-colors">Terms of Service</Link>.
                  </span>
                </label>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-400/20 px-4 py-3 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-primary text-white font-bold px-5 py-4 border border-transparent hover:bg-[#1e2820] hover:scale-[1.02] hover:border-white/25 transition-all duration-300 cursor-pointer mt-1 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-shimmer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} J & C Lewis Construction Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
