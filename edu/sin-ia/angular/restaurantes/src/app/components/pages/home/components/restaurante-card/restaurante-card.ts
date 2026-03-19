import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el *ngIf

@Component({
  selector: 'app-restaurante-card', // MIRA ESTO: quitamos el "app-app-" si lo tenías mal
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css'
})
export class RestauranteCard {
  @Input() id: number = 0;
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() img: string = '';
  @Input() coordenadas: any;
}