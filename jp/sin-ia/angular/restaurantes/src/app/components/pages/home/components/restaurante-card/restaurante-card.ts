import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurante-card',
  imports: [RouterLink],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  // `required` indica que este valor debe llegar desde el padre.
  // Aqui el `id` es obligatorio porque sin el no podemos navegar al detalle.
  id = input.required<number>();
  nombre = input<string>();
  descripcion = input<string>();
  imagen = input<string>();
  lat = input<number>();
  lng = input<number>();
}
