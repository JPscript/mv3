import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
  standalone: true,
})
export class RestauranteCard {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() imagen: string = '';
  @Input() latitud: number = 0; // ✅ coincide con el template
  @Input() longitud: number = 0; // ✅ coincide con el template
}
