import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-card',
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  fotografia_url = input<string | null>();
  latitud = input<number>();
  longitud = input<number>();
  // rating_sumary = input<number>();
}
