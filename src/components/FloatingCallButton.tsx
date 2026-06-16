import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Phone, Send, MapPin, Loader, CheckCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success';

// CSS data-URI hex tile — avoids SVG ID conflicts when both desktop & mobile popup mount simultaneously
const HEX_BG = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="52" height="90"><path d="M26,0 L52,15 L52,45 L26,60 L0,45 L0,15 Z M26,60 L26,90" fill="none" stroke="rgba(255,255,255,0.065)" stroke-width="0.8"/></svg>')}")`;

type PopupProps = {
  onClose: () => void;
  form: { name: string; contact: string; service: string; message: string };
  status: Status;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

function PopupContent({ onClose, form, status, onChange, onSubmit, onReset }: PopupProps) {
  return (
    <div className="relative overflow-hidden bg-[#1e2820] text-white">

      {/* Hex grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: HEX_BG, backgroundRepeat: 'repeat' }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 25%, rgba(0,0,0,0.5) 100%)' }}
      />

      {/* Top accent bar */}
      <div className="relative z-10 h-[3px] bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

      {/* Header */}
      <div className="relative z-10 px-5 py-4 flex justify-between items-start border-b border-white/10">
        <div>
          <p
            className="text-white font-black text-xl leading-none tracking-wide uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            J &amp; C Lewis
          </p>
          <p className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase mt-1.5">
            Construction Group
          </p>
          <p className="text-white/30 text-[10px] tracking-widest mt-0.5">
            Free Estimates · 24 / 7
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/35 hover:text-white hover:bg-white/10 transition-colors ml-4 flex-shrink-0 mt-0.5 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Call CTA */}
      <div className="relative z-10 p-4 border-b border-white/10">
        <a
          href="tel:254-332-1303"
          className="flex items-center justify-center gap-2.5 bg-primary text-white py-3.5 font-bold text-sm tracking-wider hover:bg-primary/80 transition-all duration-300 w-full btn-shimmer"
        >
          <Phone size={15} fill="currentColor" strokeWidth={0} />
          Call (254) 332-1303
        </a>
      </div>

      {/* Success / Form */}
      {status === 'success' ? (
        <div className="relative z-10 p-7 text-center">
          <CheckCircle className="text-primary mx-auto mb-3" size={28} />
          <p className="font-bold text-white text-sm">Message received!</p>
          <p className="text-xs text-white/50 mt-1 mb-4">We'll be in touch shortly.</p>
          <button
            onClick={onReset}
            className="text-xs text-primary underline underline-offset-2 hover:text-primary/70 cursor-pointer"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="relative z-10 p-4 space-y-2.5">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest text-center pb-0.5">
            — or send a message —
          </p>
          <input
            required name="name" type="text" placeholder="Your Name"
            value={form.name} onChange={onChange}
            className="w-full bg-white/8 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/70 transition-colors"
          />
          <input
            required name="contact" type="text" placeholder="Phone or Email"
            value={form.contact} onChange={onChange}
            className="w-full bg-white/8 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/70 transition-colors"
          />
          <div className="relative">
            <select
              required name="service"
              value={form.service} onChange={onChange}
              className="w-full bg-white/8 border border-white/15 px-3 py-2.5 text-sm focus:outline-none focus:border-primary/70 transition-colors appearance-none cursor-pointer"
              style={{ color: form.service ? 'white' : 'rgba(255,255,255,0.3)' }}
            >
              <option value="" disabled style={{ color: '#1e2820' }}>Select a Service</option>
              <option value="Custom Metal Fences" style={{ color: '#1e2820' }}>Custom Metal Fences</option>
              <option value="Custom Metal Gates" style={{ color: '#1e2820' }}>Custom Metal Gates</option>
              <option value="Ornamental Ironwork" style={{ color: '#1e2820' }}>Ornamental Ironwork</option>
              <option value="Other" style={{ color: '#1e2820' }}>Other / Not Sure</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <textarea
            required name="message" placeholder="Brief message..." rows={2}
            value={form.message} onChange={onChange}
            className="w-full bg-white/8 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/70 transition-colors resize-none"
          />
          <button
            type="submit" disabled={status === 'submitting'}
            className="w-full bg-primary text-white py-3 text-sm font-bold tracking-wider border border-transparent hover:bg-[#1e2820] hover:border-white/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer btn-shimmer"
          >
            {status === 'submitting'
              ? <><Loader size={13} className="animate-spin" /> Sending…</>
              : <><Send size={13} /> Send Message</>}
          </button>
        </form>
      )}

      {/* Bottom micro-text */}
      <div className="relative z-10 px-4 pb-3.5 text-center">
        <p className="text-white/18 text-[9px] tracking-widest uppercase">
          Licensed · Insured · Bellmead, TX
        </p>
      </div>
    </div>
  );
}

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', service: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name, phone: form.contact,
          service: form.service, message: form.message,
          formSource: 'Quick Contact Widget',
        }),
      });
      setStatus(res.ok ? 'success' : 'idle');
      if (res.ok) setForm({ name: '', contact: '', service: '', message: '' });
    } catch {
      setStatus('idle');
    }
  };

  const popupProps: PopupProps = {
    onClose: () => setIsOpen(false),
    form, status,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onReset: () => setStatus('idle'),
  };

  return (
    <>
      {/* ── Desktop floating widget (lg+) ──────────────────────────── */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[76px] right-0 w-80 border border-white/10 overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(105,117,102,0.18)' }}
            >
              <PopupContent {...popupProps} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring — only when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.75], opacity: [0.45, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.8 }}
            />
          )}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-14 h-14 rounded-full text-white flex items-center justify-center cursor-pointer transition-colors ${
              isOpen
                ? 'bg-[#1e2820] border border-white/20'
                : 'bg-primary'
            }`}
            style={{
              boxShadow: isOpen
                ? '0 8px 24px rgba(0,0,0,0.4)'
                : '0 8px 30px rgba(105,117,102,0.5)',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            title="Contact us"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? 'x' : 'msg'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile sticky footer (<lg) ─────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-full left-3 right-3 mb-2 border border-white/10 overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 -10px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(105,117,102,0.15)' }}
            >
              <PopupContent {...popupProps} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accent gradient line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Footer bar */}
        <div
          className="bg-[#141b15] flex items-stretch"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Call */}
          <a
            href="tel:254-332-1303"
            className="flex-1 flex items-center justify-center py-3 group active:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center group-active:bg-primary/25 transition-colors">
              <Phone size={17} className="text-primary" strokeWidth={1.5} />
            </div>
          </a>

          {/* Message */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex items-center justify-center py-3 border-x border-white/[0.06] relative transition-colors active:bg-white/5 cursor-pointer"
          >
            {isOpen && (
              <span className="absolute top-0 inset-x-0 h-[2px] bg-primary" />
            )}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isOpen ? 'bg-primary scale-105 border border-primary/60' : 'bg-white/[0.06] border border-white/20'
            }`}>
              <MessageSquare
                size={17}
                className={isOpen ? 'text-white' : 'text-primary'}
                strokeWidth={1.5}
              />
            </div>
          </button>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=Bellmead,+TX+76705"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-3 group active:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center group-active:bg-primary/25 transition-colors">
              <MapPin size={17} className="text-primary" strokeWidth={1.5} />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
