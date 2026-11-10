import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { BOOKED_DATES_SET } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarCardProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  theme: ThemeMode;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  selectedDate,
  onSelectDate,
  theme
}) => {
  const isOasis = theme === 'oasis';

  // State for browsing months (default: November 2026 as per local clock)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(10); // 0-indexed: 10 = Nov

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Days calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust Monday-first (0 = Sunday in JS, so Monday is 1, etc.)
  const startingCol = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingCol }, (_, i) => i);

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
        isOasis
          ? 'bg-white border-[#E7E1D8] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]'
          : 'bg-white border-[#EADCCE] shadow-[0_12px_32px_rgba(139,58,58,0.06)]'
      }`}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
            Disponibilidad en tiempo real
          </span>
          <h3 className="font-serif-display text-xl font-semibold text-slate-900 mt-0.5">
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-slate-500 mb-2">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span className="text-amber-700">Sáb</span>
        <span className="text-amber-700">Dom</span>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {emptyDays.map(emptyIdx => (
          <div key={`empty-${emptyIdx}`} className="h-11" />
        ))}

        {daysArray.map(dayNum => {
          const monthPadded = String(currentMonth + 1).padStart(2, '0');
          const dayPadded = String(dayNum).padStart(2, '0');
          const dateString = `${currentYear}-${monthPadded}-${dayPadded}`;
          
          const isSelected = selectedDate === dateString;
          const isBooked = BOOKED_DATES_SET.has(dateString);
          
          // Weekend check (Saturday = 6, Sunday = 0)
          const dateObj = new Date(currentYear, currentMonth, dayNum);
          const dayOfWeek = dateObj.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <button
              key={dateString}
              type="button"
              disabled={isBooked}
              onClick={() => onSelectDate(dateString)}
              className={`relative h-11 rounded-lg flex flex-col items-center justify-center transition-all text-sm font-medium tabular-nums cursor-pointer ${
                isBooked
                  ? 'bg-[#F5F3F0] text-slate-400 line-through cursor-not-allowed border border-transparent'
                  : isSelected
                  ? isOasis
                    ? 'bg-[#0284C7] text-white font-semibold shadow-sm ring-2 ring-sky-300'
                    : 'bg-[#8B3A3A] text-white font-semibold shadow-sm ring-2 ring-amber-200'
                  : isOasis
                  ? 'text-slate-800 hover:bg-[#E0F2FE] hover:text-[#0284C7] border border-transparent hover:border-[#BAE6FD]'
                  : 'text-slate-800 hover:bg-[#F8EFE9] hover:text-[#8B3A3A] border border-transparent hover:border-[#DAC1BF]'
              }`}
            >
              <span>{dayNum}</span>

              {/* Friday & weekend special rate marker */}
              {(dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) && !isBooked && (
                <span
                  title="Piscina los viernes a 120$ y Salón a 150$"
                  className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                    isSelected
                      ? 'bg-amber-200'
                      : 'bg-[#D97706]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] text-white font-bold"
            style={{ backgroundColor: isOasis ? '#0284C7' : '#8B3A3A' }}
          >
            ✓
          </span>
          <span>Fecha seleccionada</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          <span>Piscina los viernes a 120$ y Salón a 150$</span>
        </div>
      </div>
    </div>
  );
};
