import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import PageSEO from '../components/PageSEO';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen">
      <PageSEO
        title="Terms of Service | J & C Lewis Construction Group"
        description="Read the terms of service governing use of the J & C Lewis Construction Group website."
        path="/terms"
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
              <FileText className="text-primary" size={26} />
            </div>
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-1">Legal</p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
            </div>
          </div>
          <p className="text-slate-400 text-base">Last Updated: April 30, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-14 space-y-12 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
            Welcome to J & C Lewis Construction Group. By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree with these Terms, please do not use our website or services.
          </p>

          <TermsSection number="1" title="Agreement to Terms">
            <p>
              These Terms govern your access to and use of our website,{' '}
              <a href="https://www.jandclewisconstruction.com" className="text-primary hover:underline">jandclewisconstruction.com</a>,
              and any services provided by J & C Lewis Construction Group, including but not limited to concrete work, outdoor construction, and related services.
            </p>
            <p className="mt-3">
              By submitting information or contacting us through our website, phone, or forms, you agree to these Terms.
            </p>
          </TermsSection>

          <TermsSection number="2" title="Services Provided">
            <p>
              J & C Lewis Construction Group provides residential and commercial concrete and outdoor construction services, including but not limited to:
            </p>
            <BulletList items={[
              'Concrete driveways, patios, sidewalks, and slabs',
              'Stamped and decorative concrete',
              'Outdoor living spaces and hardscaping',
              'Additional services as offered from time to time',
            ]} />
            <p className="mt-3">All services are subject to project-specific agreements and availability.</p>
          </TermsSection>

          <TermsSection number="3" title="Use of Our Website">
            <p>You agree to use our website for lawful purposes only. You agree not to:</p>
            <BulletList items={[
              'Violate any applicable laws or regulations',
              'Upload or transmit malicious code or harmful content',
              'Attempt to interfere with website functionality or security',
              'Misrepresent your identity or submit false information',
            ]} />
          </TermsSection>

          <TermsSection number="4" title="Estimates, Contracts, and Project Scope">
            <p>
              All quotes and estimates provided by J & C Lewis Construction Group are based on the information available at the time of inspection or consultation.
            </p>
            <BulletList items={[
              'Final pricing may vary based on site conditions, material costs, or scope changes',
              'A signed agreement or proposal is required before work begins',
              'Any changes to the project scope may result in additional charges',
            ]} />
          </TermsSection>

          <TermsSection number="5" title="Payments and Billing">
            <p>Payment terms will be outlined in your project agreement and may include:</p>
            <BulletList items={[
              'Deposits prior to scheduling',
              'Progress payments based on project milestones',
              'Final payment upon completion',
            ]} />
            <p className="mt-3">Late payments may result in additional fees or delays in service.</p>
          </TermsSection>

          <TermsSection number="6" title="Scheduling and Delays">
            <p>Project timelines are estimates and may be affected by:</p>
            <BulletList items={[
              'Weather conditions',
              'Material availability',
              'Site conditions',
              'Unforeseen circumstances',
            ]} />
            <p className="mt-3">
              J & C Lewis Construction Group is not liable for delays outside of our control but will communicate any changes promptly.
            </p>
          </TermsSection>

          <TermsSection number="7" title="Warranties and Workmanship">
            <p>
              We strive to provide high-quality workmanship and materials. Any warranties will be clearly outlined in your project agreement.
            </p>
            <p className="mt-3">
              Due to the nature of concrete and outdoor construction, you acknowledge that:
            </p>
            <BulletList items={[
              'Minor cracking, color variations, and surface imperfections may occur',
              'Environmental conditions can affect long-term performance',
            ]} />
          </TermsSection>

          <TermsSection number="8" title="Property Access and Responsibility">
            <p>You agree to provide safe and reasonable access to the worksite.</p>
            <p className="mt-3">J & C Lewis Construction Group is not responsible for:</p>
            <BulletList items={[
              'Pre-existing property conditions',
              'Underground utilities not properly disclosed or marked',
              'Damage resulting from inaccurate site information provided by the client',
            ]} />
          </TermsSection>

          <TermsSection number="9" title="Privacy and Data Collection">
            <p>
              By using our website or submitting forms, you agree that we may collect and use your information for communication, estimates, and service delivery. You agree to provide accurate and complete information when interacting with our business.
            </p>
            <p className="mt-3">
              For full details, please review our{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
            </p>
          </TermsSection>

          <TermsSection number="10" title="Communication Consent">
            <p>By submitting your contact information, you consent to receive communications from J & C Lewis Construction Group, including:</p>
            <BulletList items={['Calls', 'Text messages', 'Emails']} />
            <p className="mt-3">
              These may relate to your project, estimates, scheduling, or promotions. You may opt out at any time.
            </p>
          </TermsSection>

          <TermsSection number="11" title="SMS/Text Messaging Terms">
            <p>
              By opting in to receive text messages from North American Consulting, Inc. dba J & C Lewis Construction Group, you agree to the following terms:
            </p>
            <BulletList items={[
              'Program Description: We send promotional offers, appointment reminders, and customer care messages.',
              'Message Frequency: Message frequency varies based on your interactions with us.',
              'Pricing: Message and data rates may apply.',
              'Opt-Out: You may opt-out of our text messaging program at any time by replying STOP to any message you receive from us.',
              'Customer Care: For assistance, reply HELP to any message you receive from us.',
              'Carrier Liability: Mobile carriers (such as AT&T, T-Mobile, Verizon, etc.) are not liable for delayed or undelivered messages.',
              'Age Restriction: By opting in to our SMS program, you confirm that you are at least 18 years of age or have the consent of a parent or legal guardian to enroll.',
            ]} />
          </TermsSection>

          <TermsSection number="12" title="Intellectual Property">
            <p>
              All content on our website, including text, images, logos, and design elements, is the property of J & C Lewis Construction Group. You may not copy, reproduce, or distribute content without written permission.
            </p>
          </TermsSection>

          <TermsSection number="13" title="Limitation of Liability">
            <p>To the fullest extent permitted by law, J & C Lewis Construction Group is not liable for:</p>
            <BulletList items={[
              'Indirect or consequential damages',
              'Loss of use, revenue, or property value',
              'Issues arising from misuse or lack of maintenance',
            ]} />
            <p className="mt-3">Our total liability is limited to the amount paid for the specific service provided.</p>
          </TermsSection>

          <TermsSection number="14" title="Indemnification">
            <p>
              You agree to indemnify and hold harmless J & C Lewis Construction Group, its owners, employees, and contractors from any claims or damages arising from:
            </p>
            <BulletList items={[
              'Your misuse of our services',
              'Violation of these Terms',
              'Inaccurate information provided by you',
            ]} />
          </TermsSection>

          <TermsSection number="15" title="Termination of Services">
            <p>We reserve the right to suspend or terminate services if:</p>
            <BulletList items={[
              'These Terms are violated',
              'Unsafe or hazardous conditions exist',
              'Payment obligations are not met',
            ]} />
            <p className="mt-3">You may terminate your agreement according to the terms outlined in your project contract.</p>
          </TermsSection>

          <TermsSection number="16" title="Governing Law">
            <p>
              These Terms shall be governed by the laws of the state of North Carolina. Any disputes shall be resolved in the appropriate courts within North Carolina.
            </p>
          </TermsSection>

          <TermsSection number="17" title="Changes to These Terms">
            <p>
              We may update these Terms at any time. Updates will be posted on this page with a revised "Last Updated" date. Continued use of our services constitutes acceptance of those changes.
            </p>
          </TermsSection>

          <TermsSection number="18" title="Contact Information">
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
          </TermsSection>

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

function TermsSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
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
