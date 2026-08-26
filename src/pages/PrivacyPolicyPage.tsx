import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import PageSEO from '../components/PageSEO';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen">
      <PageSEO
        title="Privacy Policy | J & C Lewis Construction Group"
        description="Read the privacy policy for J & C Lewis Construction Group, covering how we collect, use, and protect your information."
        path="/privacy-policy"
      />
      {/* Hero banner */}
      <section className="bg-[#1e2820] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #2563EB 0%, transparent 60%), radial-gradient(circle at 70% 50%, #1E40AF 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <ShieldCheck className="text-primary" size={26} />
            </div>
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-1">Legal</p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-slate-400 text-base">Last Updated: April 30, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-14 space-y-12 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
            J & C Lewis Construction Group ("Company," "we," "our," or "us") respects your privacy and is committed to protecting it through this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website: <a href="https://www.jandclewisconstruction.com" className="text-primary hover:underline">jandclewisconstruction.com</a>, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          <PolicySection number="1" title="Information We Collect">
            <p>We may collect the following types of personal information:</p>
            <SubHeading>Personal Information</SubHeading>
            <BulletList items={['Name', 'Phone number', 'Email address', 'Physical address']} />
            <SubHeading>Project Information</SubHeading>
            <BulletList items={['Property details', 'Project type (driveway, patio, slab, etc.)', 'Service requests and preferences']} />
            <SubHeading>Device &amp; Usage Data</SubHeading>
            <BulletList items={['IP address', 'Browser type', 'Pages visited', 'Referring URLs', 'Interaction data through cookies and analytics tools']} />
          </PolicySection>

          <PolicySection number="2" title="How We Collect Information">
            <p>We collect information when you:</p>
            <BulletList items={[
              'Submit a form on our website',
              'Call, text, or email us',
              'Request a quote or consultation',
              'Interact with our ads (Google, Facebook, etc.)',
              'Browse our website',
            ]} />
          </PolicySection>

          <PolicySection number="3" title="How We Use Your Information">
            <p>We use your information to:</p>
            <BulletList items={[
              'Respond to inquiries and provide estimates',
              'Schedule consultations and services',
              'Manage customer relationships',
              'Send updates regarding your project',
              'Improve our website and services',
              'Run advertising and remarketing campaigns',
              'Send promotional messages (only if you opt in)',
              'Comply with legal obligations',
            ]} />
          </PolicySection>

          <PolicySection number="4" title="Sharing of Your Information">
            <p>We do not sell or rent your personal information.</p>
            <p className="mt-3">We may share your data with:</p>
            <BulletList items={[
              'Employees, contractors, and team members',
              'CRM and marketing platforms (such as GoHighLevel or similar tools)',
              'Advertising platforms (Google Ads, Facebook Ads)',
              'Website hosting and analytics providers',
              'Legal authorities if required by law',
            ]} />
            <p className="mt-3">All third parties are required to protect your data.</p>
            <SubHeading>SMS Data Sharing and Usage</SubHeading>
            <p>
              No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
          </PolicySection>

          <PolicySection number="5" title="SMS, Calls, and Email Communications (A2P Compliance)">
            <p>
              By submitting your contact information, you expressly consent to receive communications from J & C Lewis Construction Group, including:
            </p>
            <BulletList items={['Phone calls', 'Text messages (SMS/MMS)', 'Emails']} />
            <p className="mt-3">These communications may include:</p>
            <BulletList items={['Appointment confirmations', 'Project updates', 'Estimates and follow-ups', 'Promotions and offers']} />

            <SubHeading>Message Frequency</SubHeading>
            <p>Message frequency may vary.</p>

            <SubHeading>Message &amp; Data Rates</SubHeading>
            <p>Standard message and data rates may apply.</p>

            <SubHeading>Opt-Out Instructions</SubHeading>
            <p>You can opt out at any time by:</p>
            <BulletList items={[
              'Replying STOP to any text message',
              'Clicking unsubscribe in emails',
              'Contacting us directly',
            ]} />
          </PolicySection>

          <PolicySection number="6" title="Data Security">
            <p>
              We implement reasonable security measures to protect your personal information. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection number="7" title="Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies to:</p>
            <BulletList items={[
              'Improve website performance',
              'Understand user behavior',
              'Support marketing and advertising campaigns',
            ]} />
            <p className="mt-3">You can manage cookie preferences through your browser settings.</p>
          </PolicySection>

          <PolicySection number="8" title="Your Rights and Choices">
            <p>You have the right to:</p>
            <BulletList items={[
              'Request access to your personal data',
              'Request corrections to your information',
              'Request deletion of your data',
              'Withdraw consent for communications',
            ]} />
            <p className="mt-3">To exercise these rights, contact us using the information below.</p>
          </PolicySection>

          <PolicySection number="9" title="Third-Party Links">
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Children's Privacy">
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy at any time. Updates will be posted on this page with a revised "Last Updated" date.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Contact Information">
            <p>J & C Lewis Construction Group</p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-semibold text-slate-800">Website: </span>
                <a href="https://www.jandclewisconstruction.com" className="text-primary hover:underline">jandclewisconstruction.com</a>
              </li>
              <li>
                <span className="font-semibold text-slate-800">Phone: </span>
                <a href="tel:3369627934" className="text-primary hover:underline">(336) 962-7934</a>
              </li>
            </ul>
          </PolicySection>

        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1e2820] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ─── Internal helper components ─── */

function PolicySection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
        <span className="text-primary font-black">{number}.</span>
        {title}
      </h2>
      <div className="space-y-3 text-slate-600">{children}</div>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-bold text-slate-800 mt-5 mb-1">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
