import React, { useState } from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function TravelerFAQ({ typoTriggerKey }: { typoTriggerKey?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'How do I get to Tourist Inn from Velana International Airport (MLE)?',
      a: 'Airport taxis are readily available outside the arrivals hall connecting directly to Malé City via the 1.4km Sinamalé Bridge. The trip is approximately 4.0 km and takes 10–15 minutes. The fare is inexpensive (fixed at MVR 60–100 or about $4–$8 USD). We can also coordinate a private pickup through our 24/7 WhatsApp concierge.',
    },
    {
      q: 'Do rooms feature private kitchenettes?',
      a: 'Yes, both Superior Double and Deluxe Double rooms feature a private kitchenette equipped with a dining area, cookware, electric kettle, microwave, and mini refrigerator. In addition, guests have access to a spacious shared kitchen facility.',
    },
    {
      q: 'What are the breakfast options and timings?',
      a: 'Tourist Inn provides continental, Asian, and à la carte breakfast options prepared fresh daily. Rated "very good" by past guests, breakfast can be arranged upon request or included with your booking tier.',
    },
    {
      q: 'Can we store luggage before our resort speedboat or seaplane transfer?',
      a: 'Yes. If your outer island resort seaplane departs later in the day or your international flight arrives early, our team provides complimentary luggage storage and lounge access.',
    },
    {
      q: 'What is the Wi-Fi speed and mobile connectivity?',
      a: 'High-speed fiber optic Wi-Fi is provided complimentary across all suites and common areas, ideal for remote working, streaming, and business video conferencing.',
    },
    {
      q: 'Are family rooms available for children and groups?',
      a: 'Yes, family suites accommodating up to 4 guests with extra bed configurations are available upon request.',
    },
  ];

  return (
    <ScrollRevealSection id="faq" className="py-24 bg-[#f7f5ef] border-b border-[#051d2d]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-teal-800 font-bold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            ESSENTIAL DETAILS
          </span>
          <TypographicSnapIn
            as="h2"
            text="FREQUENT TRAVELER QUESTIONS"
            triggerKey={typoTriggerKey}
            delayMultiplier={0.018}
            className="text-3xl sm:text-5xl font-serif font-bold text-[#051d2d]"
          />
          <p className="text-xs sm:text-sm text-[#051d2d]/70 max-w-xl mx-auto font-normal">
            Everything you need to know about airport bridge transit, kitchen facilities, and island hospitality.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#051d2d]/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#051d2d] hover:text-teal-800 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-700 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#051d2d]/75 leading-relaxed border-t border-[#051d2d]/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
