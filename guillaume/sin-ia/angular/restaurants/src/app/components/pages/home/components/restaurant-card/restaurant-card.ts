import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  imports: [NgOptimizedImage],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  name = input<string>();
  description = input<string>();
  picture = input<string>();
  lat = input<string>();
  lng = input<string>();
  rating = input<number>();
}
