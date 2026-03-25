import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurante-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurante-card.component.html',
  styleUrl: './restaurante-card.component.css'
})
export class RestauranteCardComponent {
  @Input() restaurante: any;
}
