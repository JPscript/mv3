// Componente principal de la página Home
// Aquí se gestiona la lista de restaurantes y se conecta con el componente restaurante-card
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home', // Nombre de la etiqueta personalizada para usar este componente
  imports: [CommonModule, RestauranteCard], // Importa CommonModule para directivas de Angular y RestauranteCard para mostrar cada carta
  templateUrl: './home.html', // HTML asociado a este componente
  styleUrl: './home.css', // CSS asociado a este componente
})
export class Home {
  // Array mock de restaurantes. En una app real, vendría de un servicio/API.
  restaurantes = [
    { id: 1,
      nombre: 'Restaurante A', 
      direccion: 'Dirección A', 
      telefono: '123456789',
      imagen: 'https://via.placeholder.com/150'},
    { id: 2,
      nombre: 'Restaurante B', 
      direccion: 'Dirección B', 
      telefono: '987654321',
      imagen: 'https://via.placeholder.com/150'},
    { id: 3,
      nombre: 'Restaurante C', 
      direccion: 'Dirección C', 
      telefono: '555555555',
      imagen: 'https://via.placeholder.com/150'},
  ]

  // trackId ayuda a Angular a optimizar el renderizado de listas usando un identificador único
  trackId(index: number, restaurante: any) {
    return restaurante.id;
  }
}
