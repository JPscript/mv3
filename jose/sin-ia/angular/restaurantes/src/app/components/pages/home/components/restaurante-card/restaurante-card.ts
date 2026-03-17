import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurante-card',
  imports: [],
  standalone: true,
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  @Input() nombre!:string;
  @Input() telefono!:string;
  @Input() direccion!:string;
  @Input() imagen!:string;

}
