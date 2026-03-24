import { Component, input } from '@angular/core';

@Component({
  selector: 'app-receta',
  imports: [],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  id = input<number>();
  restaurant_id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  ingredientes = input<string>();
  tiempo_min = input<number>();
  dificultad = input<string>();
  image_url = input<string>();
}