import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Restaurants } from '../../../services/restaurants';

interface RecipeData {
  id: number;
  restaurant_id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  tiempo_min: number;
  dificultad: string;
  image_url: string;
}

interface RestaurantData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  private readonly restaurantsService = inject(Restaurants);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = false;
  errorMessage = '';

  restaurant: RestaurantData | undefined;
  recipe: RecipeData | undefined;

  ngOnInit(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('restaurantId'));
    const recipeId = Number(this.route.snapshot.paramMap.get('recipeId'));
    this.loadRecipeDetail(restaurantId, recipeId);
  }

  loadRecipeDetail(restaurantId: number, recipeId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.restaurantsService.getAllRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurant = restaurants.find((item) => item.id === restaurantId);

        this.restaurantsService.getRecipes().subscribe({
          next: (recipes) => {
            this.recipe = recipes.find(
              (item) => item.id === recipeId && item.restaurant_id === restaurantId
            );

            if (this.recipe && this.restaurant) {
              this.titleService.setTitle(`${this.recipe.nombre} · ${this.restaurant.nombre}`);
            } else {
              this.errorMessage = 'Recipe not found';
            }

            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Failed to load recipe';
            this.isLoading = false;
            this.cdr.detectChanges();
          },
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load restaurant';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goBackToRestaurant() {
    if (!this.restaurant) {
      this.router.navigate(['/restaurants']);
      return;
    }

    this.router.navigate(['/restaurants', this.restaurant.id]);
  }
}
