import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
  trackId(index: number, restaurante: any) {
  return restaurante.id;
}
}
