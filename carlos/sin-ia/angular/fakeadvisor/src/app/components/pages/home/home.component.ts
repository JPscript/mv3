import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCardComponent } from '../home/components/restaurante-card/restaurante-card.component';
import { restaurantes } from '../../../data/restaurantes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RestauranteCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  restaurantes = restaurantes;
}
