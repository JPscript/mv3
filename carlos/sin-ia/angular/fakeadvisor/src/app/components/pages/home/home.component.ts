import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCardComponent } from './components/restaurante-card/restaurante-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RestauranteCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  restaurantes = [
    {
      id: 0,
      nombre: 'Casa Paco',
      direccion: 'Calle del Pulpo 15',
      puntuacion: 3.4,
      imagen: 'https://picsum.photos/300/200?1'
    },
    {
      id: 1,
      nombre: 'Casa Pepe',
      direccion: 'Calle del Agua 30',
      puntuacion: 4.2,
      imagen: 'https://picsum.photos/300/200?2'
    }
  ];

}
