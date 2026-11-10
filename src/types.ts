// Tipos del sistema de reservas de Salón & Piscina - Eventos Palo Negro

export type ModoTema = 'oasis' | 'terracotta';

// Representa un espacio alquilable del enclave (Piscina o Salón)
export interface EspacioLugar {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  capacityMax: number;
  capacityCocktail: number;
  capacityBanquet: number;
  areaSqM: number;
  basePrice: number; // Tarifa base en divisa ($)
  image: string;
  description: string;
  features: string[];
}

// Servicio o adicional que el cliente puede agregar
export interface ServicioAdicional {
  id: string;
  name: string;
  category: 'comida' | 'electricidad' | 'mobiliario' | 'decoracion';
  price: number; // Precio en divisa ($)
  priceType: 'flat' | 'perGuest'; // 'flat' = costo fijo, 'perGuest' = por unidad
  description: string;
  iconName: string;
}

// Datos de la solicitud de reserva
export interface DatosReserva {
  espacioId: string;
  fecha: string; // YYYY-MM-DD
  invitados: number;
  horaInicio: string;
  tipoCelebracion: string;
  serviciosSeleccionados: string[]; // IDs de servicios adicionales
  cantidadesServicios: Record<string, number>;
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente: string;
  observaciones: string;
}

// Alias de retrocompatibilidad si se requieren en importaciones
export type ThemeMode = ModoTema;
export type VenueSpace = EspacioLugar;
export type AddOnItem = ServicioAdicional;
export type BookingDetails = DatosReserva;
