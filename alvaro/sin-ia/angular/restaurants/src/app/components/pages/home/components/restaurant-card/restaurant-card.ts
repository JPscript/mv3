import { Component, input } from '@angular/core';
import { NgOptimizedImage, DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-restaurant-card',
  imports: [DecimalPipe],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  name = input<string>();
  description = input<string>();
  image = input<string>();
  coordinates = input<{ lat: number; lng: number }>();
}
