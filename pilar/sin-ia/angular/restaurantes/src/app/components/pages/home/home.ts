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
    imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/2d/50/0e/diverxo.jpg?w=900&h=500&s=1',
    ubicacion: 'Madrid, España'
  },
  {
    id: 2,
    nombre: 'Central Restaurante',
    descripcion: 'Exploración de los ecosistemas peruanos a través de diferentes altitudes.',
    imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
    ubicacion: 'Lima, Perú',
  }, 
  {
    id: 3,
    nombre: 'Osteria Francescana',
    descripcion: 'El arte de la cocina italiana reinventado por Massimo Bottura en Módena.',
    imagen: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800',
    ubicacion: 'Módena, Italia', 
  },
  {
    id: 4,
    nombre: 'Eleven Madison Park',
    descripcion: 'Cocina de alta gama basada en plantas con vistas icónicas a Madison Park.',
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800',
    ubicacion: 'New York, USA',
  },
  {
    id: 5,
    nombre: 'Noma',
    descripcion: 'Pionero de la nueva cocina nórdica, enfocado en ingredientes locales y fermentación.',
    imagen: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800',
    ubicacion: 'Copenhague, Dinamarca', 
  },
  {
    id: 6,
    nombre: 'Azurmendi',
    descripcion: 'Sostenibilidad y alta gastronomía vasca integradas en un edificio bioclimático.',
    imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
     ubicacion: 'Larrabetzu, España', 
  }, 
  ];
}
