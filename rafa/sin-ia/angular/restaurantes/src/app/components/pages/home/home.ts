import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';


@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   restauranteFake = [
    {
      id: 1,
      nombre: "Restaurante 1",
      descripcion: 'Descripción del Restaurante 1',
      imagen: "https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      coordenadas: { lat: 40.7128, lng: -74.0060 },
    }, 
    {
      id: 2,
      nombre: "Restaurante 2",
      descripcion: 'Descripción del Restaurante 2',
      imagen: 'https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      coordenadas: { lat: 34.0522, lng: -118.2437 },
    },
    {
      id: 3,
      nombre: "Restaurante 3",
      descripcion: 'Descripción del Restaurante 3',
      imagen: 'https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      coordenadas: { lat: 35.0522, lng: -129.2437 },
    }
  ]
}