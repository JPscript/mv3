import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurante-card',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css'
})
export class RestauranteCard {

  id = input<number>(); 
  nombre = input<string>();
  descripcion = input<string>();
  fotografia_url = input<string>();
  lat = input<number>();
  lng = input<number>();
}