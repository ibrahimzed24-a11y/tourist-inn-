import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import TopNavBar from './components/TopNavBar';
import HeroSection from './components/HeroSection';
import BookingBar, { BookingState } from './components/BookingBar';
import SanctuaryStory from './components/SanctuaryStory';
import PricingTable from './components/PricingTable';
import IslandExperiences from './components/IslandExperiences';
import FeaturesGrid from './components/FeaturesGrid';
import ReviewsAndLocation from './components/ReviewsAndLocation';
import TravelerFAQ from './components/TravelerFAQ';
import FooterSection from './components/FooterSection';
import BookingModal from './components/BookingModal';

export default function App() {
  const [currency, setCurrency] = useState<string>('USD');
  const [typoTriggerKey, setTypoTriggerKey] = useState<number>(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const [booking, setBooking] = useState<BookingState>({
    checkin: '2026-10-29',
    checkout: '2026-10-31',
    guests: 2,
    roomType: 'deluxe',
  });

  const handleBookingChange = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const handleReplayTypo = () => {
    setTypoTriggerKey((prev) => prev + 1);
  };

  const handleSelectTier = (roomType: string) => {
    handleBookingChange({ roomType });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#051d2d] flex flex-col selection:bg-[#ff5a36] selection:text-white">
      {/* Scroll Progress indicator at the very top of viewport */}
      <ScrollProgress />

      {/* 1. Navigation Bar (Sticky geometric header with sound toggle & magnetic CTA) */}
      <TopNavBar
        onOpenBooking={() => setIsBookingModalOpen(true)}
        onReplayTypo={handleReplayTypo}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main className="flex-1" id="top">
        {/* 2. Hero Section (Live Video Loop, Ambient Ocean Sound, Typographic Snap-In & MagnetLines) */}
        <HeroSection
          onOpenBooking={() => setIsBookingModalOpen(true)}
          typoTriggerKey={typoTriggerKey}
          onReplayTypo={handleReplayTypo}
        />

        {/* Dynamic Stay Dates & Rate Calculator Bar */}
        <BookingBar
          booking={booking}
          onBookingChange={handleBookingChange}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          currency={currency}
        />

        {/* 3. Sanctuary Story (Maldivian atoll heritage, depth layers & Scroll Reveal) */}
        <SanctuaryStory typoTriggerKey={typoTriggerKey} />

        {/* 4. Suites & Pricing Table (Multi-tier layout, "Most Popular" highlight, 3D card tilt) */}
        <PricingTable
          booking={booking}
          onSelectTier={handleSelectTier}
          currency={currency}
          typoTriggerKey={typoTriggerKey}
        />

        {/* 5. Authentic Atoll Experiences (Bridge Highway, Sandbank Swims, Market Cooking) */}
        <IslandExperiences typoTriggerKey={typoTriggerKey} />

        {/* 6. Curated Advantages (3D perspective card tilt, kitchenettes, 24/7 concierge) */}
        <FeaturesGrid typoTriggerKey={typoTriggerKey} />

        {/* 7. Geography & Verified Reputation (Scorecard, distance facts, walking POIs) */}
        <ReviewsAndLocation typoTriggerKey={typoTriggerKey} />

        {/* 8. Traveler FAQ (Interactive accordion, bridge questions, seaplane connections) */}
        <TravelerFAQ typoTriggerKey={typoTriggerKey} />
      </main>

      {/* 9. Grand Editorial Footer (Newsletter channel, physical address, direct hotline) */}
      <FooterSection />

      {/* 10. Interactive Reservation Drawer / Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        booking={booking}
        onBookingChange={handleBookingChange}
        currency={currency}
      />
    </div>
  );
}
