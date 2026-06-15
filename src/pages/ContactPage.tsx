import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const scriptId = 'lc-form-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
            Contact <span className="text-primary gap-2">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Ready to start your next project? Get in touch with us for a free estimate or any questions.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

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

            {/* LeadConnector Website Lead Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">Get a Free Estimate</h2>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/425O1hZM6GxZj9ev9HxU"
                style={{ width: '100%', height: '1304px', border: 'none', borderRadius: '3px' }}
                id="inline-425O1hZM6GxZj9ev9HxU"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Website Lead Form"
                data-height="1304"
                data-layout-iframe-id="inline-425O1hZM6GxZj9ev9HxU"
                data-form-id="425O1hZM6GxZj9ev9HxU"
                title="Website Lead Form"
              />
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
