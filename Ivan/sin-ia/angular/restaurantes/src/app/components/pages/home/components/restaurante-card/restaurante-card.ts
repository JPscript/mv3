import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurante-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {
  @Input() restaurante: any;
   abierto = false;

  toggle() {
    this.abierto = !this.abierto;
  }
  
}