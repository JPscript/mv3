import { Component, input } from '@angular/core';

@Component({
  selector: 'app-receta-card',
  imports: [],
  templateUrl: './receta-card.html',
  styleUrl: './receta-card.css',
})
export class RecetaCard {
  id = input<number>();
  restaurant_id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  ingredientes = input<string>();
  tiempo_min = input<number>();
  dificultad = input<string>();
  image_url = input<string>();
}
