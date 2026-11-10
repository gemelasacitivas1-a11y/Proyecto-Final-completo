import React, { useState } from 'react';
import { ModoTema } from './types';
import { ESPACIOS_DISPONIBLES, SERVICIOS_ADICIONALES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { BookingSection } from './components/BookingSection';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [tema, setTema] = useState<ModoTema>('oasis');
  const [pestañaActual, setPestañaActual] = useState<string>('booking');

  // Estado de selección de reserva
  const [espacioSeleccionadoId, setEspacioSeleccionadoId] = useState<string>('piscina');
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('2026-11-20');
  const [cantidadInvitados, setCantidadInvitados] = useState<number>(95);
  const [cantidadesAdicionales, setCantidadesAdicionales] = useState<Record<string, number>>({
    'perros-calientes': 100,
    'mesas-redondas': 5,
    'meson-vestido': 1,
    'puf': 10
  });
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([
    'perros-calientes',
    'planta-electrica'
  ]);

  // Estado del modal de confirmación
  const [modalReservaAbierto, setModalReservaAbierto] = useState<boolean>(false);

  const alternarTema = () => {
    setTema(prev => (prev === 'oasis' ? 'terracotta' : 'oasis'));
  };

  const alternarServicio = (servicioId: string) => {
    setServiciosSeleccionados(prev =>
      prev.includes(servicioId) ? prev.filter(id => id !== servicioId) : [...prev, servicioId]
    );
  };

  const actualizarCantidadAdicional = (adicionalId: string, cantidad: number) => {
    setCantidadesAdicionales(prev => ({
      ...prev,
      [adicionalId]: cantidad
    }));
  };

  const espacioActual =
    ESPACIOS_DISPONIBLES.find(e => e.id === espacioSeleccionadoId) || ESPACIOS_DISPONIBLES[0];
  const serviciosActivos = SERVICIOS_ADICIONALES.filter(s =>
    serviciosSeleccionados.includes(s.id)
  );

  const esModoOasis = tema === 'oasis';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans-body ${
        esModoOasis ? 'bg-[#FAF8F5] text-[#1B1C1A]' : 'bg-[#FDF8F4] text-[#1D1B19]'
      }`}
    >
      {/* Barra de Navegación Superior */}
      <Navbar
        currentTab={pestañaActual}
        onSelectTab={setPestañaActual}
        theme={tema}
        onToggleTheme={alternarTema}
        onOpenBookingModal={() => setModalReservaAbierto(true)}
      />

      {/* Contenido Principal */}
      <main>
        {pestañaActual === 'booking' && (
          <BookingSection
            spaces={ESPACIOS_DISPONIBLES}
            addOns={SERVICIOS_ADICIONALES}
            selectedSpaceId={espacioSeleccionadoId}
            onSelectSpaceId={setEspacioSeleccionadoId}
            selectedDate={fechaSeleccionada}
            onSelectDate={setFechaSeleccionada}
            guestCount={cantidadInvitados}
            onChangeGuestCount={setCantidadInvitados}
            addonQuantities={cantidadesAdicionales}
            onChangeAddonQuantity={actualizarCantidadAdicional}
            selectedAddOns={serviciosSeleccionados}
            onToggleAddOn={alternarServicio}
            theme={tema}
            onOpenBookingModal={() => setModalReservaAbierto(true)}
          />
        )}
      </main>

      {/* ============================================================================ */}
      {/* AQUÍ SE RENDERIZA LA VENTANA EMERGENTE (MODAL) QUE SALE TRAS CONFIRMAR RESERVA */}
      {/* El archivo donde está programada es: src/components/BookingConfirmationModal.tsx */}
      {/* ============================================================================ */}
      <BookingConfirmationModal
        isOpen={modalReservaAbierto}
        onClose={() => setModalReservaAbierto(false)}
        selectedSpace={espacioActual}
        selectedDate={fechaSeleccionada}
        guestCount={cantidadInvitados}
        addonQuantities={cantidadesAdicionales}
        selectedAddOns={serviciosActivos}
        theme={tema}
      />

      {/* Pie de Página */}
      <Footer theme={tema} onSelectTab={setPestañaActual} />
    </div>
  );
}
