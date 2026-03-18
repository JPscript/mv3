import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   restaurantesFake = [
    {
      id: 1,
      nombre: 'Restaurante AB',
      descripcion: 'Descripción del Restaurante A',
      imagen: 'https://via.placeholder.com/150',
      coordenadas: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: 2,
      nombre: 'Restaurante BA',
      descripcion: 'Descripción del Restaurante B',
      imagen: 'https://via.placeholder.com/150',
      coordenadas: { lat: 34.0522, lng: -118.2437 },
    }
] 
}
