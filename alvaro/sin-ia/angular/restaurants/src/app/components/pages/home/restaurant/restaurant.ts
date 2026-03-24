import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RecipeCard } from './components/recipe-card/recipe-card';
import { Restaurant as RestaurantInterface } from '../../../../interfaces/restaurant';
import { Restaurants } from '../services/restaurants';

interface Recipe {
  id: number;
  restaurant_id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  tiempo_min: number;
  dificultad: string;
  image_url: string;
}

/**
 * Restaurant Component
 *
 * Displays detailed information about a single restaurant.
 * - Gets the restaurant ID from the URL parameters
 * - Fetches restaurant and its recipes from the API
 * - Finds and displays the matching restaurant
 * - Shows the restaurant's recipes
 * - Allows navigation back to the list
 */
@Component({
  selector: 'app-restaurant',
  imports: [DecimalPipe, RecipeCard],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant implements OnInit {
  private readonly restaurantsService = inject(Restaurants);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Currently displayed restaurant (will be set from API data) */
  restaurant: RestaurantInterface | undefined;
  /** Array of recipes filtered by restaurant ID */
  recipes: Recipe[] = [];
  isLoading = false;
  errorMessage = '';

  /**
   * Angular Lifecycle Hook: runs when component initializes
   *
   * Steps:
   * 1. Get the restaurant ID from the URL
   * 2. Fetch restaurants from the API
   * 3. Find the matching restaurant
   * 4. Update the page title
   */
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.getRestaurant(id);
    this.getRecipes(id);
  }

  getRestaurant(id: number): void {
    this.errorMessage = '';
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurant = restaurants.find(r => r.id === id);
        if (this.restaurant) {
          this.titleService.setTitle(this.restaurant.nombre);
        } else {
          this.errorMessage = 'Restaurant not found';
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load restaurant';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getRecipes(restaurantId: number): void {
    this.restaurantsService.getRecipes().subscribe({
      next: (allRecipes) => {
        this.recipes = allRecipes.filter(r => r.restaurant_id === restaurantId);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load recipes', error);
        this.recipes = [];
      }
    });
  }
  /**
   * Navigate back to the restaurants list.
   * Called when user clicks the back button.
   */
  goBack() {
    this.router.navigate(['/restaurants']);
  }
}
