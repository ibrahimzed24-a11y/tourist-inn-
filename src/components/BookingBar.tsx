import React from 'react';
import { Calendar, Users, BedDouble, ArrowRight } from 'lucide-react';
import { useMagneticOrbit } from '../hooks/useMagneticOrbit';

export interface BookingState {
  checkin: string;
  checkout: string;
  guests: number;
  roomType: string;
}

interface BookingBarProps {
  booking: BookingState;
  onBookingChange: (updates: Partial<BookingState>) => void;
  onOpenBooking: () => void;
  currency: string;
}

export default function BookingBar({
  booking,
  onBookingChange,
  onOpenBooking,
  currency,
}: BookingBarProps) {
  const ctaRef = useMagneticOrbit<HTMLButtonElement>({ radius: 30, maxDisplacementRatio: 0.2 });

  // Calculate nights
  const nights = React.useMemo(() => {
    try {
      const d1 = new Date(booking.checkin);
      const d2 = new Date(booking.checkout);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  }, [booking.checkin, booking.checkout]);

  const basePricePerNight = booking.roomType === 'deluxe' ? 109 : booking.roomType === 'family' ? 189 : 106;
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'AED' ? 'AED ' : '$';
  const currencyMultiplier = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : currency === 'AED' ? 3.67 : 1;
  const estimatedTotal = Math.round(basePricePerNight * nights * currencyMultiplier);

  return (
    <div className="relative -mt-6 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#0d1527]/15 p-4 sm:p-6 shadow-2xl transition-all">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpenBooking();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Check-In */}
          <div className="space-y-1.5">
            <label
              htmlFor="checkin"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#0d1527]/60 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0d1527]/70" />
              Check-In Date
            </label>
            <input
              id="checkin"
              type="date"
              value={booking.checkin}
              onChange={(e) => onBookingChange({ checkin: e.target.value })}
              className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs font-mono font-medium text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527]"
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label
              htmlFor="checkout"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#0d1527]/60 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0d1527]/70" />
              Check-Out Date
            </label>
            <input
              id="checkout"
              type="date"
              value={booking.checkout}
              onChange={(e) => onBookingChange({ checkout: e.target.value })}
              className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs font-mono font-medium text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527]"
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label
              htmlFor="guests"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#0d1527]/60 flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#0d1527]/70" />
              Guests
            </label>
            <select
              id="guests"
              value={booking.guests}
              onChange={(e) => onBookingChange({ guests: Number(e.target.value) })}
              className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527] cursor-pointer"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests (Standard)</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests (Family)</option>
            </select>
          </div>

          {/* Room Selection & Dynamic Night Calculation */}
          <div className="space-y-1.5">
            <label
              htmlFor="roomType"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#0d1527]/60 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#0d1527]/70" />
                Room Tier
              </span>
              <span className="font-mono text-amber-900 font-bold">
                {nights} night{nights > 1 ? 's' : ''}
              </span>
            </label>
            <select
              id="roomType"
              value={booking.roomType}
              onChange={(e) => onBookingChange({ roomType: e.target.value })}
              className="w-full bg-[#f8f7f4] border border-[#0d1527]/15 rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0d1527] focus:outline-none focus:ring-1 focus:ring-[#0d1527] cursor-pointer"
            >
              <option value="superior">Superior Double ($106/n)</option>
              <option value="deluxe">Deluxe Double ($109/n)</option>
              <option value="family">Family Suite ($189/n)</option>
            </select>
          </div>

          {/* Submission with Magnetic Orbit */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#0d1527]/60 text-right pr-1">
              Est: <strong className="text-[#0d1527] font-bold tabular-nums">{currencySymbol}{estimatedTotal}</strong> total
            </div>
            <button
              ref={ctaRef}
              type="submit"
              className="w-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0d1527] hover:bg-[#1f305a] rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 will-change-transform"
            >
              <span>Check Rates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
