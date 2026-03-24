import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RestaurantsService } from '../../../services/restaurants/restaurants-service';
import { RecipesService } from '../../../services/recipes/recipes-service';
import { Recipe } from '../../../../../../interfaces/recipe';
import { Restaurant } from '../../../../../../interfaces/restaurant';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  private readonly restaurantsService = inject(RestaurantsService);
  private readonly recipesService = inject(RecipesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = false;
  errorMessage = '';

  restaurant: Restaurant | undefined;
  recipe: Recipe | undefined;

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

        this.recipesService.getRecipes().subscribe({
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
