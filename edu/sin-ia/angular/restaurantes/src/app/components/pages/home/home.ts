import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  listadoRestaurantes = [
    {
      id: 1,
      nombre: 'Restaurante A',
      descripcion: 'Descripción del Restaurante A',
      img: 'https://placehold.co/300x200',
      coordenadas: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      nombre: 'Restaurante B',
      descripcion: 'Descripción del Restaurante B',
      img: 'https://placehold.co/300x200',
      coordenadas: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 3,
      nombre: 'Restaurante C',
      descripcion: 'Descripción del Restaurante C',
      img: 'https://placehold.co/300x200',
      coordenadas: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 4,
      nombre: 'Restaurante D',
      descripcion: 'Descripción del Restaurante D',
      img: 'https://placehold.co/300x200',
      coordenadas: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 5, // Asegúrate de que el ID sea 5
      nombre: 'Restaurante E',
      descripcion: 'Descripción del Restaurante E',
      img: 'https://placehold.co/300x200',
      coordenadas: { lat: 40.7128, lng: -74.0060 }
    }
  ];
}