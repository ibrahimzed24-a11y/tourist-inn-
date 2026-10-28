import React, { useState } from 'react';
import { useMagneticOrbit } from '../hooks/useMagneticOrbit';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const submitButtonRef = useMagneticOrbit<HTMLButtonElement>({ radius: 30, maxDisplacementRatio: 0.2 });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <footer className="bg-[#082436] text-white/80 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Physical Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              TOURIST INN
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              A boutique collection of guesthouses in Malé City, Maldives. Engineered for business
              travelers, expats, and island vacationers demanding architectural serenity and
              dependable connectivity.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-white/70">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Ma. leaves, Maaveyo Magu, Malé, Kaafu Atoll, Republic of Maldives</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+960786-0029" className="hover:text-white transition-colors font-mono">
                  +960 786-0029
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Amenities & Facilities
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Nightly Rates & Availability
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Verified Guest Scores
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Getting There via Bridge
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Guest Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 font-bold">
              POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>Check-in: 14:00</li>
              <li>Check-out: 12:00</li>
              <li>Free Fiber Wi-Fi</li>
              <li>Non-smoking rooms</li>
              <li>Pets: Not permitted</li>
            </ul>
          </div>

          {/* Col 4: Newsletter Submission Channel (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 font-bold">
              ISLAND DISPATCH
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Subscribe for seasonal Malé guesthouse tariffs, transit tips, and priority room releases.
            </p>

            {submitted ? (
              <div className="p-3.5 bg-white/10 rounded-lg border border-emerald-400/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you. You have been subscribed to Island Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                {error && <p className="text-[11px] text-rose-400 font-mono">{error}</p>}
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#082436] bg-white hover:bg-white/90 rounded-lg flex items-center justify-center gap-2 transition-colors will-change-transform font-mono"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} TOURIST INN · Malé, Maldives. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Restrained Maximalism Edition</span>
            <span>·</span>
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
