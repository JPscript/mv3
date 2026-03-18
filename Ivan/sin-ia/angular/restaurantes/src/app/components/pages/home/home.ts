import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // 👈 MUY IMPORTANTE
  imports: [RestauranteCard, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  restauranteFake = [
    {
      id: 1,
      nombre: "Restaurante 1",
      descripcion: "Descripción del restaurante 1",
      imagen: "https://picsum.photos/id/292/300/200",
      coordenadas: {
        latitud: 40.416775,
        longitud: -3.703790
      }
    },
    {
      id: 2,
      nombre: "Restaurante 2",
      descripcion: "Descripción del restaurante 2",
      imagen: "https://picsum.photos/id/1080/300/200",
      coordenadas: {
        latitud: 40.416775,
        longitud: -3.703790
      }
    }
  ];
}