// Componente para mostrar la información de un restaurante en formato de "carta"
// Recibe los datos del restaurante como @Input desde el componente padre (Home)
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-restaurante-card', // Nombre de la etiqueta personalizada para usar este componente
  imports: [],
  standalone: true, // Permite usar el componente sin necesidad de declararlo en un módulo
  templateUrl: './restaurante-card.html', // HTML asociado a la carta
  styleUrl: './restaurante-card.css', // CSS para estilos de la carta
})
export class RestauranteCard {
  // Propiedades que recibe la carta desde el padre (Home) mediante binding
  /*@Input() nombre!: string; // Nombre del restaurante
  @Input() telefono!: string; // Teléfono de contacto
  @Input() direccion!: string; // Dirección física
  @Input() imagen!: string; // URL de la imagen*/
  nombre = input<string>();
  descripcion = input<string>();
  imagen = input<string>();

}
