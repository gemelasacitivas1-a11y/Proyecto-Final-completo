import React, { useState } from 'react';
import { EspacioLugar, ServicioAdicional, ModoTema } from '../types';
import { CalendarCard } from './CalendarCard';
import { DualSummaryReceipt } from './DualSummaryReceipt';
import { Sparkles, Utensils, ShieldCheck, Clock, Users, Check, MapPin, Copy, Phone } from 'lucide-react';

interface PropsSeccionReserva {
  spaces: EspacioLugar[];
  addOns: ServicioAdicional[];
  selectedSpaceId: string;
  onSelectSpaceId: (id: string) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  guestCount: number;
  onChangeGuestCount: (count: number) => void;
  addonQuantities: Record<string, number>;
  onChangeAddonQuantity: (addonId: string, quantity: number) => void;
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
  theme: ModoTema;
  onOpenBookingModal: () => void;
}

export const BookingSection: React.FC<PropsSeccionReserva> = ({
  spaces,
  addOns,
  selectedSpaceId,
  onSelectSpaceId,
  selectedDate,
  onSelectDate,
  guestCount,
  onChangeGuestCount,
  addonQuantities,
  onChangeAddonQuantity,
  selectedAddOns,
  onToggleAddOn,
  theme,
  onOpenBookingModal
}) => {
  const esModoOasis = theme === 'oasis';
  const [horaInicioEvento, setHoraInicioEvento] = useState<string>('');
  const [contactoCopiado, setContactoCopiado] = useState<boolean>(false);

  const copiarContacto = () => {
    const numeroAdmin = '+34 600 892 210';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(numeroAdmin);
    }
    setContactoCopiado(true);
    setTimeout(() => setContactoCopiado(false), 2500);
  };

  const espacioActual = spaces.find(s => s.id === selectedSpaceId) || spaces[0];
  const serviciosActivos = addOns.filter(a => selectedAddOns.includes(a.id));

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Cabecera Principal */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.08em] text-slate-500 mb-2">
            <span>Precios en Divisa</span>
            <span aria-hidden="true">·</span>
            <span>Tarifas Oficiales del 2026</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
            Programe su celebración en Eventos Palo Negro
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-sans-body leading-relaxed">
            Opte por un salón festivo o una zona de piscina, verifique disponibilidad inmediata en el calendario oficial y personalice servicios para obtener un desglose transparente al instante.
          </p>
        </div>

        {/* Cuadrícula Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: Selección de Espacio, Calendario, Invitados y Adicionales */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Paso 1: Selección del Espacio */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-slate-900">
                  1. Selección del Espacio
                </h2>
                <span className="text-xs text-slate-500">
                  Capacidad hasta {espacioActual.capacityMax} comensales
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spaces.map(espacio => {
                  const estaSeleccionado = espacio.id === selectedSpaceId;
                  return (
                    <button
                      key={espacio.id}
                      type="button"
                      onClick={() => onSelectSpaceId(espacio.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                        estaSeleccionado
                          ? esModoOasis
                            ? 'bg-white border-[#0284C7] ring-2 ring-sky-200 shadow-md'
                            : 'bg-white border-[#8B3A3A] ring-2 ring-rose-200 shadow-md'
                          : 'bg-white/80 border-[#E7E1D8] hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="h-28 -mx-4 -mt-4 mb-3 rounded-t-xl overflow-hidden relative">
                        <img
                          src={espacio.image}
                          alt={espacio.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                          Hasta {espacio.capacityMax} pdas
                        </span>
                      </div>

                      <h3 className="font-serif-display font-semibold text-sm sm:text-base text-slate-900 leading-snug">
                        {espacio.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {espacio.subtitle}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Precio</span>
                        <span className="font-semibold text-slate-900 text-sm tabular-nums">
                          {espacio.basePrice}$
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paso 2: Calendario */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-slate-900">
                  2. Selección de Fecha
                </h2>
                <span className="text-xs text-slate-500">
                  Haga clic en un día disponible
                </span>
              </div>
              <CalendarCard
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                theme={theme}
              />
            </div>

            {/* Paso 3: Aforo y Horarios */}
            <div
              className={`p-6 rounded-2xl bg-white border transition-colors ${
                esModoOasis ? 'border-[#E7E1D8]' : 'border-[#EADCCE]'
              }`}
            >
              <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-slate-900 mb-1">
                3. Aforo y Horarios de Celebración
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Indique la cantidad estimada de personas.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      Número de Invitados
                    </span>
                    <span className="font-serif-display text-2xl font-bold text-slate-900 tabular-nums">
                      {guestCount} <span className="text-xs font-normal text-slate-500">personas</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={Math.min(guestCount, 100)}
                    onChange={e => onChangeGuestCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
                    style={{
                      accentColor: esModoOasis ? '#0284C7' : '#8B3A3A'
                    }}
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                    <span>Mín. 20</span>
                    <span>Recomendado 60</span>
                    <span>Máx. 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                  <div className="flex flex-col justify-between">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hora de Inicio de la Celebración
                      </label>
                      <input
                        type="text"
                        value={horaInicioEvento}
                        onChange={e => setHoraInicioEvento(e.target.value)}
                        placeholder="Ej. 3 PM"
                        className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 leading-snug flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Cierre del área de piscina a las <strong>6:00 PM</strong> y fiesta en el salón hasta las <strong>4:00 AM</strong>.
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Tipo de Celebración
                      </label>
                      <select className="w-full h-12 px-3.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7] transition-all cursor-pointer">
                        <option value="cumpleanos">Fiesta de Cumpleaños</option>
                        <option value="boda">Boda</option>
                        <option value="baby-shower">Baby Shower</option>
                        <option value="revelacion-sexo">Revelación de Sexo</option>
                        <option value="aniversario">Aniversario</option>
                        <option value="ninguna">Ninguna de las anteriores</option>
                      </select>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 leading-snug flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        Contamos con contactos de decoradores, pregunte al privado.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paso 4: Servicios y Adicionales */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-slate-900">
                  4. Servicios y Complementos Especiales
                </h2>
                <span className="text-xs text-slate-500">
                  {selectedAddOns.length} seleccionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map(addon => {
                  const estaMarcado = selectedAddOns.includes(addon.id);
                  const etiquetaPrecio =
                    addon.priceType === 'perGuest'
                      ? `${addon.price}$ c/u`
                      : `${addon.price.toLocaleString()} $`;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => onToggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        estaMarcado
                          ? esModoOasis
                            ? 'bg-sky-50/60 border-sky-400 shadow-xs'
                            : 'bg-rose-50/60 border-rose-400 shadow-xs'
                          : 'bg-white/80 border-[#E7E1D8] hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            estaMarcado
                              ? esModoOasis
                                ? 'bg-[#0284C7] border-[#0284C7] text-white'
                                : 'bg-[#8B3A3A] border-[#8B3A3A] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {estaMarcado && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900">
                            {addon.name}
                          </h4>
                          <span className="font-bold text-xs text-slate-900 tabular-nums shrink-0">
                            {etiquetaPrecio}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                          {addon.description}
                        </p>

                        {/* Recuadro de cantidad para Puesto de perros calientes */}
                        {addon.id === 'perros-calientes' && (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              if (!estaMarcado) onToggleAddOn(addon.id);
                            }}
                            className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2"
                          >
                            <label className="text-[11px] font-medium text-slate-600">
                              Cantidad deseada:
                            </label>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`flex items-center rounded-lg border px-3 py-1 bg-white transition-all shadow-2xs ${
                                  esModoOasis
                                    ? 'border-sky-300 focus-within:ring-2 focus-within:ring-[#0284C7]'
                                    : 'border-[#EADCCE] focus-within:ring-2 focus-within:ring-[#8B3A3A]'
                                }`}
                              >
                                <input
                                  type="number"
                                  min={1}
                                  max={1000}
                                  value={addonQuantities['perros-calientes'] ?? 100}
                                  onFocus={() => {
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  onChange={e => {
                                    const val = parseInt(e.target.value);
                                    const nuevaCantidad = isNaN(val) ? 0 : val;
                                    onChangeAddonQuantity(addon.id, nuevaCantidad);
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  placeholder="100"
                                  className="w-16 text-center text-xs font-semibold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                                />
                                <span className="text-[11px] font-medium text-slate-400 pl-1.5 border-l border-slate-200">
                                  unid.
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Recuadro para Mesas Redondas vestidas (min 1 max 15) */}
                        {addon.id === 'mesas-redondas' && (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              if (!estaMarcado) onToggleAddOn(addon.id);
                            }}
                            className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2"
                          >
                            <label className="text-[11px] font-medium text-slate-600">
                              Cantidad de mesas:
                            </label>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`flex items-center rounded-lg border px-3 py-1 bg-white transition-all shadow-2xs ${
                                  esModoOasis
                                    ? 'border-sky-300 focus-within:ring-2 focus-within:ring-[#0284C7]'
                                    : 'border-[#EADCCE] focus-within:ring-2 focus-within:ring-[#8B3A3A]'
                                }`}
                              >
                                <input
                                  type="number"
                                  min={1}
                                  max={15}
                                  value={addonQuantities['mesas-redondas'] ?? 5}
                                  onFocus={() => {
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  onChange={e => {
                                    const parsed = parseInt(e.target.value);
                                    let val = isNaN(parsed) ? 1 : parsed;
                                    if (val > 15) val = 15;
                                    if (val < 1) val = 1;
                                    onChangeAddonQuantity(addon.id, val);
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  placeholder="5"
                                  className="w-16 text-center text-xs font-semibold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                                />
                                <span className="text-[11px] font-medium text-slate-400 pl-1.5 border-l border-slate-200">
                                  mesas
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Recuadro para Mesón vestido (max 1) */}
                        {addon.id === 'meson-vestido' && (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              if (!estaMarcado) onToggleAddOn(addon.id);
                            }}
                            className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2"
                          >
                            <label className="text-[11px] font-medium text-slate-600">
                              Cantidad de mesones:
                            </label>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`flex items-center rounded-lg border px-3 py-1 bg-white transition-all shadow-2xs ${
                                  esModoOasis
                                    ? 'border-sky-300 focus-within:ring-2 focus-within:ring-[#0284C7]'
                                    : 'border-[#EADCCE] focus-within:ring-2 focus-within:ring-[#8B3A3A]'
                                }`}
                              >
                                <input
                                  type="number"
                                  min={1}
                                  max={1}
                                  value={addonQuantities['meson-vestido'] ?? 1}
                                  onFocus={() => {
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  onChange={e => {
                                    const parsed = parseInt(e.target.value);
                                    let val = isNaN(parsed) ? 1 : parsed;
                                    if (val > 1) val = 1;
                                    if (val < 1) val = 1;
                                    onChangeAddonQuantity(addon.id, val);
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  placeholder="1"
                                  className="w-16 text-center text-xs font-semibold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                                />
                                <span className="text-[11px] font-medium text-slate-400 pl-1.5 border-l border-slate-200">
                                  mesón
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Recuadro para Puf (max 30) */}
                        {addon.id === 'puf' && (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              if (!estaMarcado) onToggleAddOn(addon.id);
                            }}
                            className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2"
                          >
                            <label className="text-[11px] font-medium text-slate-600">
                              Cantidad de puf:
                            </label>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`flex items-center rounded-lg border px-3 py-1 bg-white transition-all shadow-2xs ${
                                  esModoOasis
                                    ? 'border-sky-300 focus-within:ring-2 focus-within:ring-[#0284C7]'
                                    : 'border-[#EADCCE] focus-within:ring-2 focus-within:ring-[#8B3A3A]'
                                }`}
                              >
                                <input
                                  type="number"
                                  min={1}
                                  max={30}
                                  value={addonQuantities['puf'] ?? 10}
                                  onFocus={() => {
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  onChange={e => {
                                    const parsed = parseInt(e.target.value);
                                    let val = isNaN(parsed) ? 1 : parsed;
                                    if (val > 30) val = 30;
                                    if (val < 1) val = 1;
                                    onChangeAddonQuantity(addon.id, val);
                                    if (!estaMarcado) onToggleAddOn(addon.id);
                                  }}
                                  placeholder="10"
                                  className="w-16 text-center text-xs font-semibold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                                />
                                <span className="text-[11px] font-medium text-slate-400 pl-1.5 border-l border-slate-200">
                                  puf
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Resumen de Presupuesto y Contacto */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Tarjeta del Espacio Seleccionado */}
            <div
              className={`rounded-2xl overflow-hidden border bg-white ${
                esModoOasis ? 'border-[#E7E1D8]' : 'border-[#EADCCE]'
              }`}
            >
              <div className="h-52 relative">
                <img
                  src={espacioActual.image}
                  alt={espacioActual.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                    Espacio Seleccionado
                  </span>
                  <h3 className="font-serif-display text-xl font-semibold">
                    {espacioActual.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 text-xs text-slate-700 bg-slate-50/50 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium">
                  {espacioActual.id === 'piscina'
                    ? 'Ambiente de 10 x 10 metros'
                    : 'Ambiente de 8x22 metros con cocina integrada'}
                </span>
              </div>
            </div>

            {/* Recibo y Desglose de Presupuesto */}
            <DualSummaryReceipt
              selectedSpace={espacioActual}
              selectedDate={selectedDate}
              guestCount={guestCount}
              addonQuantities={addonQuantities}
              selectedAddOns={serviciosActivos}
              theme={theme}
              onProceedToBooking={onOpenBookingModal}
            />

            {/* Botón de Contacto con Administración */}
            <button
              type="button"
              onClick={copiarContacto}
              className={`w-full p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left shadow-xs ${
                contactoCopiado
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : esModoOasis
                  ? 'bg-white hover:bg-sky-50/50 border-[#E7E1D8] text-slate-800'
                  : 'bg-white hover:bg-rose-50/50 border-[#EADCCE] text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    contactoCopiado
                      ? 'bg-emerald-500 text-white'
                      : esModoOasis
                      ? 'bg-[#E0F2FE] text-[#0284C7]'
                      : 'bg-[#F4E7DE] text-[#8B3A3A]'
                  }`}
                >
                  {contactoCopiado ? <Check className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Pago & Contacto Privado
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900">
                    {contactoCopiado ? '¡Número copiado al portapapeles!' : 'Contacto privado de administración'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    +34 600 892 210
                  </div>
                </div>
              </div>

              <div
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                  contactoCopiado
                    ? 'bg-emerald-600 text-white'
                    : esModoOasis
                    ? 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
                    : 'bg-[#8B3A3A] text-white hover:bg-[#752E2E]'
                }`}
              >
                {contactoCopiado ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </div>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
