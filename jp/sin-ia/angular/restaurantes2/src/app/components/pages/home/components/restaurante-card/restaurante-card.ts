// Este componente hijo solo se encarga de mostrar un restaurante en pantalla.
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  // Nombre de la etiqueta HTML del componente hijo.
  selector: 'app-restaurante-card',
  // No usa componentes hijos adicionales, por eso el array queda vacio.
  imports: [RouterLink],
  // Plantilla HTML del componente.
  templateUrl: './restaurante-card.html',
  // Hoja de estilos del componente.
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  // `input()` es la forma moderna de Angular para declarar entradas.
  // Estas propiedades las rellena el componente padre (`Home`).
  // Por eso en la plantilla luego se leen como funciones: `nombre()`, `imagen()`, etc.
  id = input.required<number>();
  nombre = input<string>();
  descripcion = input<string>();
  imagen = input<string | null>();
  lat = input<number>();
  lng = input<number>();
}
