// Componente para mostrar la información de un restaurante en formato de "carta" visual.
// Senior Cat dice: Este componente es un ladrillo reutilizable, solo muestra los datos que recibe.
// Recibe los datos del restaurante como propiedades (inputs) desde el componente padre (Home).
// Cuando se hace click en la tarjeta, emite el id al padre para navegar al detalle.

import { Component, input, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restaurante-card', // Nombre de la etiqueta personalizada para usar este componente en el HTML
  imports: [], // No necesita importar otros módulos
  standalone: true, // Permite usar el componente sin necesidad de declararlo en un módulo
  templateUrl: './restaurante-card.html', // HTML asociado a la carta (vista)
  styleUrl: './restaurante-card.css', // CSS para estilos visuales de la carta
})
export class RestauranteCard {
  // Propiedades que recibe la carta desde el padre (Home) mediante binding.
  // Estas propiedades permiten que el componente sea flexible y reutilizable para cualquier restaurante.
  // input<string>() es la forma moderna de declarar inputs en Angular standalone.
  // Recibe el id del restaurante desde el padre (Home)
  id = input<number>(); // ID único del restaurante
  // Recibe el nombre del restaurante
  nombre = input<string>();
  // Recibe la descripción breve
  descripcion = input<string>();
  // Recibe la URL de la imagen
  imagen = input<string>();

  // Output: avisa al padre cuando se hace click en la tarjeta
  verDetalle = output<number>();

  // Cuando se hace click, emite el id al padre para que navegue al detalle
  onCardClick() {
    this.verDetalle.emit(this.id() ?? -1);
  }
}
