import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard,Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  restaurantesFake = [
{
    id: 1,
    nombre: 'DiverXO',
    descripcion: 'Cocina vanguardista y creativa del chef Dabiz Muñoz. Una experiencia surrealista única.',
    imagen: 'https://images.unsplash.com/photo-1550966842-30cae01003a6?q=80&w=800',
    coordenadas: { lat: 40.4583, lng: -3.6860 } // Madrid, España
  },
  {
    id: 2,
    nombre: 'Central Restaurante',
    descripcion: 'Exploración de los ecosistemas peruanos a través de diferentes altitudes.',
    imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
    coordenadas: { lat: -12.1301, lng: -77.0229 } // Lima, Perú
  },
  {
    id: 3,
    nombre: 'Osteria Francescana',
    descripcion: 'El arte de la cocina italiana reinventado por Massimo Bottura en Módena.',
    imagen: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800',
    coordenadas: { lat: 44.6448, lng: 10.9216 } // Módena, Italia
  },
  {
    id: 4,
    nombre: 'Eleven Madison Park',
    descripcion: 'Cocina de alta gama basada en plantas con vistas icónicas a Madison Park.',
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800',
    coordenadas: { lat: 40.7416, lng: -73.9872 } // New York, USA
  },
  {
    id: 5,
    nombre: 'Noma',
    descripcion: 'Pionero de la nueva cocina nórdica, enfocado en ingredientes locales y fermentación.',
    imagen: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800',
    coordenadas: { lat: 55.6828, lng: 12.6105 } // Copenhague, Dinamarca
  },
  {
    id: 6,
    nombre: 'Azurmendi',
    descripcion: 'Sostenibilidad y alta gastronomía vasca integradas en un edificio bioclimático.',
    imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
    coordenadas: { lat: 43.2641, lng: -2.8123 } // Larrabetzu, España
  }
  ];
}
