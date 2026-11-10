/**
 * ============================================================================
 * ARCHIVO DE LA VENTANA EMERGENTE (MODAL) DE RESERVA:
 * Este archivo implementa la ventana emergente que se abre al hacer clic
 * en "Confirmar Reserva" o "Reservar Enclave Ahora".
 * 
 * Contiene dos pantallas:
 * 1. Formulario de contacto previo (líneas ~110 a ~225).
 * 2. Comprobante con checkmark verde y localizador que se muestra DESPUÉS de
 *    confirmar la reserva (a partir de la línea ~230).
 * ============================================================================
 */
import React, { useState } from 'react';
import { EspacioLugar, ServicioAdicional, ModoTema } from '../types';
import { X, CheckCircle2, Calendar, Users, MapPin } from 'lucide-react';

interface PropsModalConfirmacion {
  isOpen: boolean;
  onClose: () => void;
  selectedSpace: EspacioLugar;
  selectedDate: string;
  guestCount: number;
  addonQuantities?: Record<string, number>;
  selectedAddOns: ServicioAdicional[];
  theme: ModoTema;
}

export const BookingConfirmationModal: React.FC<PropsModalConfirmacion> = ({
  isOpen,
  onClose,
  selectedSpace,
  selectedDate,
  guestCount,
  addonQuantities,
  selectedAddOns,
  theme
}) => {
  if (!isOpen) return null;

  const esModoOasis = theme === 'oasis';

  // Estados del formulario del cliente
  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [estaConfirmado, setEstaConfirmado] = useState(false);

  // Cálculo de tarifas
  let costoEspacioEfectivo = selectedSpace.basePrice;
  if (selectedDate) {
    const partes = selectedDate.split('-');
    if (partes.length === 3) {
      const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      if (fecha.getDay() === 5) {
        costoEspacioEfectivo = selectedSpace.id === 'piscina' ? 120 : 150;
      }
    }
  }

  const totalAdicionales = selectedAddOns.reduce((acumulado, item) => {
    if (addonQuantities && item.id in addonQuantities) {
      return acumulado + item.price * (addonQuantities[item.id] || 0);
    }
    return acumulado + (item.priceType === 'perGuest' ? item.price * guestCount : item.price);
  }, 0);

  const totalPresupuesto = costoEspacioEfectivo + totalAdicionales;

  // Formato día/mes/año (DD/MM/YYYY)
  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return 'Fecha por confirmar';
    const partes = fechaStr.split('-');
    if (partes.length === 3) {
      const [anio, mes, dia] = partes;
      return `${dia}/${mes}/${anio}`;
    }
    return fechaStr;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEstaConfirmado(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera del modal */}
        <div className={`p-6 sm:p-7 flex items-center justify-between text-white ${
          esModoOasis ? 'bg-[#0F172A]' : 'bg-[#6D2325]'
        }`}>
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-amber-300 block">
              {estaConfirmado ? 'Reserva Confirmada' : 'Confirmación de Fecha y Solicitud'}
            </span>
            <h3 className="font-serif-display text-2xl font-semibold mt-0.5">
              {selectedSpace.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!estaConfirmado ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Resumen del Evento */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E1D8] space-y-3">
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Calendar className="w-4 h-4 text-[#0284C7]" />
                    <span className="font-semibold">{formatearFecha(selectedDate)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Users className="w-4 h-4 text-[#0284C7]" />
                    <span>{guestCount} invitados</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0284C7]" />
                    <span>{selectedSpace.name}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Presupuesto total estimado:</span>
                  <span className="font-serif-display text-lg font-bold text-slate-900 tabular-nums">
                    {totalPresupuesto.toLocaleString()}$
                  </span>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="space-y-4">
                <h4 className="font-serif-display text-base font-semibold text-slate-900">
                  Datos de Contacto del Anfitrión
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={nombreCliente}
                    onChange={e => setNombreCliente(e.target.value)}
                    placeholder="Ej. Carmen y Javier Romero"
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284C7] text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={correoCliente}
                      onChange={e => setCorreoCliente(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284C7] text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono de Contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefonoCliente}
                      onChange={e => setTelefonoCliente(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284C7] text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Modificar Selección
                </button>

                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer shadow-sm ${
                    esModoOasis
                      ? 'bg-[#0284C7] hover:bg-[#0369A1]'
                      : 'bg-[#8B3A3A] hover:bg-[#752E2E]'
                  }`}
                >
                  Emitir Comprobante de Reserva
                </button>
              </div>

            </form>
          ) : (
            /* ============================================================================
             * AQUÍ ESTÁ LA VENTANA EMERGENTE QUE SALE DESPUÉS DE CONFIRMAR RESERVA:
             * (Vista del comprobante de éxito con el checkmark verde, el código
             * localizador, los datos confirmados y el botón para imprimir)
             * ============================================================================ */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                  Bloqueo solicitado
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                  ¡Gracias, {nombreCliente || 'Estimado Huésped'}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Su fecha para ha sido apartada en nuestro calendario. Para confirmarla, comuníquese a este numero 38000 y  se le enviaran los datos necesarios para realizar el pago móvil; una vez completa su fecha quedara bloqueada.
                </p>
              </div>


              {/* Botones de acción del comprobante */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                
                <button
                  type="button"
                  onClick={() => {
                    setEstaConfirmado(false);
                    onClose();
                  }}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer ${
                    esModoOasis ? 'bg-[#0284C7] hover:bg-[#0369A1]' : 'bg-[#8B3A3A] hover:bg-[#752E2E]'
                  }`}
                >
                  Cerrar y Volver al Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
