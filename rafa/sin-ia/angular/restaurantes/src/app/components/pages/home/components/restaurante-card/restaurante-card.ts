import { Component, input } from '@angular/core';

@Component({
  selector: 'app-restaurante-card',
  imports: [],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  nombre= input<string>();
  direccion= input<string>();
  telefono= input<string>();
  email= input<string>();
  image= input<string>();
}
