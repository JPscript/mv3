import { Component, input } from '@angular/core';

@Component({
  selector: 'app-restaurante-card',
  imports: [],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  nombre= input<string>();
  descripcion= input<string>();
  imagen= input<string>();
  lat = input<number>();
  lng = input<number>();
}
