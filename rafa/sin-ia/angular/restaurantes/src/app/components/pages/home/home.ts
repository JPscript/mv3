import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  restauranteFake=[
    {
      id: 1,
      nombre: "Restaurante 1",
      direccion: "Calle 123",
      telefono: "123456789",
      email: "restaurante1@example.com",
      image: "https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    }, 
    {
      id: 2,
      nombre: "Restaurante 2",
      direccion: "Avenida 456",
      telefono: "987654321",
      email: "restaurante2@example.com",
      image: "https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 3,
      nombre: "Restaurante 3",
      direccion: "Plaza 789",
      telefono: "456789123",
      email: "restaurante3@example.com",
      image: "https://th.bing.com/th/id/OIP.7Gv4IGTQRkLtrMkgJsRPHAHaEo?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    }
  ]
}
