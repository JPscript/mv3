import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-restaurante-card',
  standalone: true,
  templateUrl: './restaurante-card.component.html',
  styleUrl: './restaurante-card.component.css'
})
export class RestauranteCardComponent {
  @Input() restaurante: any;
}
