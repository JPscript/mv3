import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

/**
 * RestaurantCard Component
 *
 * Displays a single restaurant as a clickable card.
 * - Uses Angular Signals (input()) for receiving data from parent component
 * - When clicked, navigates to the detail view for that restaurant
 * - DecimalPipe is used to format the coordinates nicely (e.g., 40.4168)
 */
@Component({
  selector: 'app-restaurant-card',
  imports: [DecimalPipe],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  // Input signals: data received from the parent component (home.ts)
  // Using input() is a modern Angular pattern for cleaner, reactive properties

  /** Unique identifier for the restaurant */
  id = input<number>();

  /** Name of the restaurant */
  name = input<string>();

  /** Description of what the restaurant offers */
  description = input<string>();

  /** URL of the restaurant's image */
  image = input<string>();

  /** Geographic coordinates (latitude and longitude) */
  coordinates = input<{ lat: number; lng: number }>();

  constructor(private router: Router) {}

  /**
   * Navigate to the restaurant detail page.
   * Called when the card is clicked.
   *
   * Example URL: /restaurants/restaurant/1
   */
  goToDetail() {
    // router.navigate takes an array:
    // ['/restaurants/restaurant'] is the route
    // this.id() is the route parameter (the restaurant's id)
    this.router.navigate(['/restaurants/restaurant', this.id()]);
  }
}
