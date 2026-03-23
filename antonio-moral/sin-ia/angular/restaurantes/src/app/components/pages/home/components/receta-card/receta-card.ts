import { Component, input } from '@angular/core';

@Component({
  selector: 'app-receta-card',
  imports: [],
  templateUrl: './receta-card.html',
  styleUrl: './receta-card.css',
})
export class RecetaCard {
  nombre = input<string>();
  descripcion = input<string>();
  imagen = input<string>();
}
