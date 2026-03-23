import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { RecetaCard } from './components/receta-card/receta-card';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard, RecetaCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  restaurantesFake = [
    {
      id: 1,
      nombre: 'Restaurante A',
      descripcion: 'Descripción del Restaurante A',
      imagen: '/sushi-svgrepo-com.svg',
      coordenadas: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: 2,
      nombre: 'Restaurante B',
      descripcion: 'Descripción del Restaurante B',
      imagen: '/lobster-svgrepo-com.svg',
      coordenadas: { lat: 34.0522, lng: -118.2437 },
    },
  ];
  recetasFake = [
    {
      id: 1,
      nombre: 'Receta A',
      descripcion: 'Descripción de la Receta A',
      imagen: '/sushi-svgrepo-com.svg',
    },
    {
      id: 2,
      nombre: 'Receta B',
      descripcion: 'Descripción de la Receta B',
      imagen: '/lobster-svgrepo-com.svg',
    },
  ];

}
