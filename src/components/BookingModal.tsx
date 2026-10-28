import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Users, BedDouble, ShieldCheck, ArrowRight } from 'lucide-react';
import { BookingState } from './BookingBar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingState;
  onBookingChange: (updates: Partial<BookingState>) => void;
  currency: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  booking,
  onBookingChange,
  currency,
}: BookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [airportTaxiNeeded, setAirportTaxiNeeded] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  // Nights calculation
  const nights = (() => {
    try {
      const d1 = new Date(booking.checkin);
      const d2 = new Date(booking.checkout);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  })();

  const basePriceUSD = booking.roomType === 'deluxe' ? 109 : booking.roomType === 'family' ? 189 : 106;
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'AED' ? 'AED ' : '$';
  const currencyMultiplier = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : currency === 'AED' ? 3.67 : 1;
  const nightlyConverted = Math.round(basePriceUSD * currencyMultiplier);
  const totalCost = nightlyConverted * nights;

  const roomDisplayName =
    booking.roomType === 'deluxe'
      ? 'Deluxe Double Room'
      : booking.roomType === 'family'
      ? 'Executive Family Suite'
      : 'Superior Double Room';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    const code = `TIN-MV-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1527]/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#0d1527]/15 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0d1527]/10 bg-[#f8f7f4]">
          <div>
            <h2 id="booking-modal-title" className="text-xl font-serif font-bold text-[#0d1527]">
              {isSuccess ? 'Reservation Confirmed' : 'Reserve at TOURIST INN'}
            </h2>
            <p className="text-xs text-[#0d1527]/60 font-mono">
              Malé City · Republic of Maldives
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-1.5 text-[#0d1527]/60 hover:text-[#0d1527] hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="space-y-6 py-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-[#0d1527]">
                  Thank you, {fullName}!
                </h3>
                <p className="text-xs text-[#0d1527]/70 max-w-md mx-auto leading-relaxed">
                  Your reservation request has been received. Our 24/7 WhatsApp Concierge will contact you at <strong>{whatsapp || email}</strong> shortly with your bridge transfer pickup details.
                </p>
              </div>

              <div className="p-4 bg-[#f8f7f4] rounded-xl border border-[#0d1527]/10 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-[#0d1527]/10 pb-2">
                  <span className="text-[#0d1527]/60">Booking Reference:</span>
                  <strong className="text-[#0d1527]">{confirmationCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0d1527]/60">Room:</span>
                  <span className="text-[#0d1527]">{roomDisplayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0d1527]/60">Dates:</span>
                  <span className="text-[#0d1527]">{booking.checkin} → {booking.checkout} ({nights} nights)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#0d1527]/10 text-sm">
                  <span className="font-bold text-[#0d1527]">Total Payable on Arrival:</span>
                  <strong className="text-[#0d1527]">{currencySymbol}{totalCost}</strong>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0d1527] rounded-lg hover:bg-[#1e2f55] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Stay Summary Card */}
              <div className="p-4 bg-[#f8f7f4] rounded-xl border border-[#0d1527]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0d1527] flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4 text-[#ff5a36]" />
                    {roomDisplayName}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0d1527]">
                    {currencySymbol}{nightlyConverted} / night
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#0d1527]/75 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0d1527]/50" />
                    <span>{booking.checkin} → {booking.checkout}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Users className="w-3.5 h-3.5 text-[#0d1527]/50" />
                    <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''} ({nights} nights)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0d1527]/10 flex justify-between items-baseline text-sm">
                  <span className="text-xs font-medium text-[#0d1527]/70">Calculated Stay Total:</span>
                  <span className="text-xl font-serif font-bold text-[#0d1527]">
                    {currencySymbol}{totalCost}
                  </span>
                </div>
              </div>

              {/* Guest Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0d1527]/70 mb-1">
                    Guest Full Name *
                  </label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0d1527]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
                      required
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527]"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-[#0d1527]/70 mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      id="modal-whatsapp"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527]"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 pt-1 text-xs text-[#0d1527]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={airportTaxiNeeded}
                    onChange={(e) => setAirportTaxiNeeded(e.target.checked)}
                    className="rounded border-[#0d1527]/20 text-[#0d1527] focus:ring-0"
                  />
                  <span>Arrange Velana Airport (MLE) bridge taxi pickup on arrival</span>
                </label>
              </div>

              {/* Guarantees */}
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-600/15 flex items-start gap-2 text-xs text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero prepayment required. Free cancellation up to 48 hours prior to check-in.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-[#0d1527] hover:bg-[#1a2b50] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
