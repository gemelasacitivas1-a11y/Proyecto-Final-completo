import React from 'react';
import { ThemeMode } from '../types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  theme: ThemeMode;
  onSelectTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onSelectTab }) => {
  const isOasis = theme === 'oasis';

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isOasis
          ? 'bg-[#0F172A] text-slate-300 border-[#1E293B]'
          : 'bg-[#1D1B19] text-[#E6E2DE] border-[#32302E]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Narrative (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif-display text-2xl font-semibold text-white tracking-tight">
               Eventos Palo Negro
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-sans-body leading-relaxed max-w-sm">
               Un salón techado y climatizado, con piso marrón, paredes crema y realzado por columnas, y un área de piscina para disfrutar al aire libre. Ideal para cumpleaños, reuniones familiares y eventos privados. Se alquilan por separado con opciones de moviliario y manteleria
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Palo Negro, Calle 22 , Casa 93</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Contacto: 34 965 89 22 10</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 block">
              Explorar Enclave
            </span>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('booking')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calculadora & Calendario Oficial
                </button>
              </li>
            </ul>
          </div>

          {/* Visiting Protocol & Appointments (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 block">
              Estimado Cliente:
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-sans-body">
              Las fechas más solicitadas se ocupan primero, y quien aparta con anticipación tiene más margen para elegir el día que realmente quiere, coordinar la decoración, el mobiliario y los detalles del evento sin prisas, y asegurar el espacio que mejor se ajuste a su celebración. Asegurar la fecha hoy es la forma más sencilla de que, cuando llegue el día, lo único que quede por pensar sea disfrutar.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-white/5 p-3 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Horario de atención: 9:00 am a 8:00 pm </span>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Eventos Palo Negro S.L. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Aviso Legal</span>
            <span aria-hidden="true">·</span>
            <span>Política de Privacidad</span>
            <span aria-hidden="true">·</span>
            <span>Protocolo de Eventos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
