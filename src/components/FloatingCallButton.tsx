import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Phone, Send, MapPin, Loader, CheckCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success';

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
    <>
      <div className="bg-[#1e2820] px-5 py-4 flex justify-between items-center">
        <div>
          <p className="text-white font-bold text-sm tracking-wide leading-tight">J & C Lewis Construction</p>
          <p className="text-white/50 text-[11px] mt-0.5">Get your free estimate today</p>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors ml-4 flex-shrink-0">
          <X size={15} />
        </button>
      </div>

      <div className="p-4 border-b border-slate-100">
        <a
          href="tel:254-332-1303"
          className="flex items-center justify-center gap-2.5 bg-primary text-white py-3 font-bold text-sm tracking-wider hover:bg-[#4d574b] transition-colors w-full"
        >
          <Phone size={14} fill="currentColor" strokeWidth={0} />
          Call (254) 332-1303
        </a>
      </div>

      {status === 'success' ? (
        <div className="p-7 text-center">
          <CheckCircle className="text-primary mx-auto mb-3" size={28} />
          <p className="font-bold text-slate-900 text-sm">Message received!</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">We'll be in touch shortly.</p>
          <button onClick={onReset} className="text-xs text-primary underline underline-offset-2 hover:text-[#4d574b]">
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-4 space-y-2.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">— or send a message —</p>
          <input
            required name="name" type="text" placeholder="Your Name"
            value={form.name} onChange={onChange}
            className="w-full border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
          />
          <input
            required name="contact" type="text" placeholder="Phone or Email"
            value={form.contact} onChange={onChange}
            className="w-full border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
          />
          <div className="relative">
            <select
              required name="service"
              value={form.service} onChange={onChange}
              className="w-full border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              style={{ color: form.service ? '#1e293b' : '#94a3b8' }}
            >
              <option value="" disabled>Select a Service</option>
              <option value="Custom Metal Fences">Custom Metal Fences</option>
              <option value="Custom Metal Gates">Custom Metal Gates</option>
              <option value="Ornamental Ironwork">Ornamental Ironwork</option>
              <option value="Other">Other / Not Sure</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <textarea
            required name="message" placeholder="Brief message..." rows={2}
            value={form.message} onChange={onChange}
            className="w-full border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <button
            type="submit" disabled={status === 'submitting'}
            className="w-full bg-[#1e2820] text-white py-3 text-sm font-bold tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === 'submitting'
              ? <><Loader size={13} className="animate-spin" /> Sending…</>
              : <><Send size={13} /> Send Message</>}
          </button>
        </form>
      )}
    </>
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
      {/* ── Desktop floating widget (lg+) ────────────────────── */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-[72px] right-0 w-80 bg-white shadow-2xl shadow-black/20 border border-slate-100 overflow-hidden"
            >
              <PopupContent {...popupProps} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#697566] text-white flex items-center justify-center hover:bg-[#4d574b] transition-colors shadow-2xl shadow-[#697566]/40"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
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

      {/* ── Mobile sticky footer (<lg) ────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-full left-3 right-3 mb-2 bg-white shadow-2xl shadow-black/25 border border-slate-100 overflow-hidden"
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
            className="flex-1 flex flex-col items-center justify-center gap-2 py-3.5 group active:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 bg-white/[0.06] flex items-center justify-center group-active:bg-primary/25 transition-colors">
              <Phone size={17} className="text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-white/45 text-[9px] font-bold uppercase tracking-[0.18em] group-active:text-white/80 transition-colors">
              Call
            </span>
          </a>

          {/* Message — center, emphasized */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-3.5 border-x border-white/[0.06] relative transition-colors active:bg-white/5"
          >
            {isOpen && (
              <span className="absolute top-0 inset-x-0 h-[2px] bg-primary" />
            )}
            <div className={`w-9 h-9 flex items-center justify-center transition-all duration-200 ${
              isOpen ? 'bg-primary scale-105 shadow-lg shadow-primary/40' : 'bg-white/[0.06]'
            }`}>
              <MessageSquare
                size={17}
                className={isOpen ? 'text-white' : 'text-primary'}
                strokeWidth={1.5}
              />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-[0.18em] transition-colors ${
              isOpen ? 'text-white' : 'text-white/45'
            }`}>
              Message
            </span>
          </button>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=Bellmead,+TX+76705"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-2 py-3.5 group active:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 bg-white/[0.06] flex items-center justify-center group-active:bg-primary/25 transition-colors">
              <MapPin size={17} className="text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-white/45 text-[9px] font-bold uppercase tracking-[0.18em] group-active:text-white/80 transition-colors">
              Address
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
