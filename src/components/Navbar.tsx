import React from 'react';
import { ThemeMode } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenBookingModal
}) => {
  const isOasis = theme === 'oasis';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md border-b ${
      isOasis
        ? 'bg-[#FAF8F5]/90 border-[#E7E1D8] text-[#1B1C1A]'
        : 'bg-[#FDF8F4]/90 border-[#EADCCE] text-[#1D1B19]'
    }`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in Playfair Display) */}
        <button
          onClick={() => onSelectTab('booking')}
          className="font-serif-display text-xl sm:text-2xl font-semibold tracking-tight text-left cursor-pointer whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Salón & Piscina
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('booking')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'booking'
                ? isOasis
                  ? 'border-[#0284C7] text-[#0284C7] font-semibold'
                  : 'border-[#8B3A3A] text-[#8B3A3A] font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Reservas & Precios
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Clean Palette Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            title={isOasis ? 'Cambiar a Paleta Terracotta & Sand' : 'Cambiar a Paleta Oasis Salón & Piscina'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer bg-white/70 hover:bg-white text-slate-700 border-slate-200"
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: isOasis ? '#0284C7' : '#8B3A3A' }}
            />
            <span className="hidden sm:inline">
              {isOasis ? 'Modo Terracotta' : 'Modo Oasis'}
            </span>
          </button>

          <button
            onClick={onOpenBookingModal}
            className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm ${
              isOasis
                ? 'bg-[#0284C7] text-white hover:bg-[#0369A1] active:bg-[#0284C7]'
                : 'bg-[#8B3A3A] text-white hover:bg-[#752E2E] active:bg-[#8B3A3A]'
            }`}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </header>
  );
};
