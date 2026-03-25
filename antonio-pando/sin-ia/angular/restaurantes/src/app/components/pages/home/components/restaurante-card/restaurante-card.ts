import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-restaurante-card',
  imports: [RouterLink],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  imagen = input<string>();
  lat = input<number>();
  lng = input<number>();
}
