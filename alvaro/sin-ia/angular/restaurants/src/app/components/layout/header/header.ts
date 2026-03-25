import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Restaurant } from '../../../interfaces/restaurant';
import { RestaurantsService } from '../../pages/home/services/restaurants/restaurants-service';

/**
 * Header Component
 *
 * Displays the top navigation bar with:
 * - Brand logo and title (left)
 * - Search bar (center)
 * - Links to map and profile (right)
 *
 * It includes a live search that shows matching restaurants while typing.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly restaurantsService = inject(RestaurantsService);
  private readonly router = inject(Router);

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm = '';
  selectedResultIndex = -1;

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurants = restaurants;
      },
      error: () => {
        this.restaurants = [];
      },
    });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;

    const term = value.trim().toLowerCase();
    if (!term) {
      this.filteredRestaurants = [];
      this.selectedResultIndex = -1;
      return;
    }

    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.nombre.toLowerCase().includes(term)
    );

    this.selectedResultIndex = this.filteredRestaurants.length > 0 ? 0 : -1;
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.clearSearch();
      return;
    }

    if (!this.searchTerm.trim() || this.filteredRestaurants.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedResultIndex =
        this.selectedResultIndex < this.filteredRestaurants.length - 1
          ? this.selectedResultIndex + 1
          : 0;
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedResultIndex =
        this.selectedResultIndex > 0
          ? this.selectedResultIndex - 1
          : this.filteredRestaurants.length - 1;
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const targetIndex = this.selectedResultIndex >= 0 ? this.selectedResultIndex : 0;
      const selectedRestaurant = this.filteredRestaurants[targetIndex];
      if (selectedRestaurant) {
        this.navigateToRestaurant(selectedRestaurant);
      }
    }
  }

  navigateToRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/restaurants', restaurant.id]);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredRestaurants = [];
    this.selectedResultIndex = -1;
  }
}
