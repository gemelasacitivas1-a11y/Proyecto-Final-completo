// Datos del catálogo de Salón & Piscina - Eventos Palo Negro
import { EspacioLugar, ServicioAdicional } from '../types';

// Espacios disponibles para alquiler
export const ESPACIOS_DISPONIBLES: EspacioLugar[] = [
  {
    id: 'piscina',
    name: 'Zona de Piscina',
    subtitle: 'Entorno con techo y paso de la luz natural',
    tagline: 'Piscina cristalina, camas balinesas y atardeceres dorados',
    capacityMax: 100,
    capacityCocktail: 100,
    capacityBanquet: 80,
    areaSqM: 850,
    basePrice: 150,
    image: '/src/assets/images/hero_oasis_pool_1794171779676.jpg',
    description:
      'Amplia terraza con piscina cristalina con vistas abiertas. Equipada con camastros y barra exterior.',
    features: [
      'Piscina con iluminación subacuática',
      'Zona techada con luz natural',
      'Barra exterior con área para bebidas',
      'Ambiente de 10 x 10 metros'
    ]
  },
  {
    id: 'salon',
    name: 'Salón',
    subtitle: 'Lugar de encuentro elegante para Celebrar tus festividades',
    tagline: 'Candelabros forjados, techos abovedados y acústica impecable',
    capacityMax: 100,
    capacityCocktail: 100,
    capacityBanquet: 80,
    areaSqM: 620,
    basePrice: 200,
    image: '/src/assets/images/grand_salon_hall_1794171779021.jpg',
    description:
      'Salón cerrado y climatizado con piso marrón, paredes crema y columnas señoriales, ideal para festividades y reuniones.',
    features: [
      'Climatización silenciosa independiente',
      'Cocina integrada equipada',
      'Ambiente espacioso de 8 x 22 metros',
      'Acceso privado para organizadores'
    ]
  }
];

// Servicios y adicionales que el cliente puede solicitar
export const SERVICIOS_ADICIONALES: ServicioAdicional[] = [
  {
    id: 'perros-calientes',
    name: 'Puesto de perros calientes',
    category: 'comida',
    price: 1.5,
    priceType: 'perGuest',
    description: 'Servicio de comida ya preparada para tu evento',
    iconName: 'Utensils'
  },
  {
    id: 'planta-electrica',
    name: 'Planta Eléctrica',
    category: 'electricidad',
    price: 20,
    priceType: 'flat',
    description: 'En previsión de un posible corte de energía durante su celebración, fuente eléctrica de respaldo.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'mesas-redondas',
    name: 'Mesas Redondas vestidas',
    category: 'mobiliario',
    price: 7,
    priceType: 'perGuest',
    description: 'Todo está en un mismo lugar, solicita las mesas que necesitas para seguir equipando tu fiesta',
    iconName: 'Sparkles'
  },
  {
    id: 'meson-vestido',
    name: 'Mesón vestido',
    category: 'mobiliario',
    price: 10,
    priceType: 'perGuest',
    description: 'Todo está en un mismo lugar, solicita tu mesón extra que necesitas para tu celebración.',
    iconName: 'Sparkles'
  },
  {
    id: 'puf',
    name: 'Puf',
    category: 'mobiliario',
    price: 1.2,
    priceType: 'perGuest',
    description: 'Paquete que combina Puf con una alfombra de césped artificial y una mini mesa ataviada con mantelería',
    iconName: 'Sparkles'
  }
];

// Fechas reservadas en el calendario
export const FECHAS_RESERVADAS = new Set<string>();

// Alias en español / inglés para retrocompatibilidad
export const VENUE_SPACES = ESPACIOS_DISPONIBLES;
export const ADD_ON_SERVICES = SERVICIOS_ADICIONALES;
export const BOOKED_DATES_SET = FECHAS_RESERVADAS;
