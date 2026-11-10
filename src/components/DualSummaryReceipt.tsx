import React from 'react';
import { EspacioLugar, ServicioAdicional, ModoTema } from '../types';
import { ArrowRight } from 'lucide-react';

interface PropsResumenPresupuesto {
  selectedSpace: EspacioLugar;
  selectedDate: string;
  guestCount: number;
  addonQuantities?: Record<string, number>;
  selectedAddOns: ServicioAdicional[];
  theme: ModoTema;
  onProceedToBooking: () => void;
}

export const DualSummaryReceipt: React.FC<PropsResumenPresupuesto> = ({
  selectedSpace,
  selectedDate,
  guestCount,
  addonQuantities,
  selectedAddOns,
  theme,
  onProceedToBooking
}) => {
  const esModoOasis = theme === 'oasis';

  // Tarifa promocional de los viernes: Piscina a 120$ y Salón a 150$
  let costoEspacioEfectivo = selectedSpace.basePrice;
  let esPromocionViernes = false;

  if (selectedDate) {
    const partes = selectedDate.split('-');
    if (partes.length === 3) {
      const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      if (fecha.getDay() === 5) {
        esPromocionViernes = true;
        costoEspacioEfectivo = selectedSpace.id === 'piscina' ? 120 : 150;
      }
    }
  }

  // Cálculo total de adicionales según cantidades seleccionadas
  const totalAdicionales = selectedAddOns.reduce((acumulado, servicio) => {
    if (addonQuantities && servicio.id in addonQuantities) {
      return acumulado + servicio.price * (addonQuantities[servicio.id] || 0);
    }
    return acumulado + (servicio.priceType === 'perGuest' ? servicio.price * guestCount : servicio.price);
  }, 0);

  // Total presupuestado y depósito fijo de 50$
  const totalPresupuesto = costoEspacioEfectivo + totalAdicionales;
  const depositoApartar = 50;
  const saldoRestante = Math.max(0, totalPresupuesto - depositoApartar);

  // Formato día/mes/año para mostrar al usuario
  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return 'Sin fecha seleccionada';
    const partes = fechaStr.split('-');
    if (partes.length === 3) {
      const [anio, mes, dia] = partes;
      return `${dia}/${mes}/${anio}`;
    }
    return fechaStr;
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
        esModoOasis
          ? 'border-[#E7E1D8] shadow-[0_12px_32px_-4px_rgba(2,132,199,0.08),0_4px_12px_-2px_rgba(15,23,42,0.05)]'
          : 'border-[#EADCCE] shadow-[0_12px_32px_rgba(139,58,58,0.08)]'
      }`}
    >
      {/* Sección Superior: Desglose del presupuesto */}
      <div className="bg-white p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200">
          <div>
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500">
              Desglose Transparente
            </span>
            <h3 className="font-serif-display text-2xl font-semibold text-slate-900 mt-0.5">
              Presupuesto del Evento
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Fecha seleccionada</span>
            <span className="font-semibold text-slate-800 tabular-nums text-sm">
              {formatearFecha(selectedDate)}
            </span>
          </div>
        </div>

        {/* Filas de servicios */}
        <div className="py-4 space-y-3.5 text-sm text-slate-700">
          {/* Alquiler de espacio */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold text-slate-900">{selectedSpace.name}</div>
                {esPromocionViernes && (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                    Promo Viernes
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500">Alquiler de espacio y áreas técnicas</div>
            </div>
            <span className="font-medium tabular-nums text-slate-900">
              {costoEspacioEfectivo}$
            </span>
          </div>

          {/* Adicionales seleccionados */}
          {selectedAddOns.length > 0 && (
            <>
              <div className="border-b border-dotted border-slate-200" />
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Servicios y Adicionales ({selectedAddOns.length})
                </div>
                {selectedAddOns.map(servicio => {
                  const cantidad = addonQuantities?.[servicio.id];
                  const costoItem =
                    cantidad !== undefined
                      ? servicio.price * (cantidad || 0)
                      : servicio.priceType === 'perGuest'
                      ? servicio.price * guestCount
                      : servicio.price;

                  const sufijoUnidad =
                    servicio.id === 'mesas-redondas'
                      ? 'mesas'
                      : servicio.id === 'meson-vestido'
                      ? 'mesón'
                      : servicio.id === 'puf'
                      ? 'puf'
                      : 'unid.';

                  return (
                    <div key={servicio.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 truncate max-w-[220px] sm:max-w-xs">
                        + {servicio.name} {cantidad !== undefined ? `(${cantidad} ${sufijoUnidad})` : ''}
                      </span>
                      <span className="tabular-nums font-medium text-slate-900 shrink-0">
                        {costoItem.toLocaleString()} $
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sección Inferior: Totales y depósito */}
      <div
        className={`p-6 sm:p-7 text-white transition-colors duration-300 ${
          esModoOasis ? 'bg-[#0F172A]' : 'bg-[#6D2325]'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-white/15">
          {/* Total Presupuestado */}
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-300/80 block">
              Total Presupuesto
            </span>
            <div className="font-serif-display text-2xl sm:text-3xl font-semibold mt-1 tabular-nums">
              {totalPresupuesto.toLocaleString()}$
            </div>
            <span className="text-[11px] text-slate-400">Tarifa oficial en divisa</span>
          </div>

          {/* Depósito para apartar */}
          <div className="sm:text-right">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 block">
              DEPÓSITO PARA APARTAR
            </span>
            <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1 tabular-nums">
              {depositoApartar}$
            </div>
            <span className="text-[11px] text-slate-300 block">
              Resto del monto por cancelar: {saldoRestante.toLocaleString()}$
            </span>
          </div>
        </div>

        {/* Botón de acción para reservar */}
        <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={onProceedToBooking}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md ${
              esModoOasis
                ? 'bg-[#0284C7] hover:bg-[#0369A1] text-white active:scale-[0.99]'
                : 'bg-[#D3624C] hover:bg-[#B84D37] text-white active:scale-[0.99]'
            }`}
          >
            <span>Reservar Enclave Ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
