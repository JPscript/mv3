import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RecipeCard } from './components/recipe-card/recipe-card';
import { Comments } from './components/comments/comments';
import { Restaurant as RestaurantInterface } from '../../../../interfaces/restaurant';
import { Recipe } from '../../../../interfaces/recipe';
import { Comment } from '../../../../interfaces/comment';
import { RestaurantsService } from '../services/restaurants/restaurants-service';
import { RecipesService } from '../services/recipes/recipes-service';
import { CommentsService } from '../services/comments/comments-service';

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
  imports: [DecimalPipe, RecipeCard, Comments],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant implements OnInit {
  private readonly restaurantsService = inject(RestaurantsService);
  private readonly recipesService = inject(RecipesService);
  private readonly commentsService = inject(CommentsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Currently displayed restaurant (will be set from API data) */
  restaurant: RestaurantInterface | undefined;
  /** Array of recipes filtered by restaurant ID */
  recipes: Recipe[] = [];
  comments: Comment[] = [];
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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!Number.isFinite(id) || id <= 0) {
        this.errorMessage = 'Invalid restaurant id';
        this.isLoading = false;
        this.restaurant = undefined;
        this.recipes = [];
        this.comments = [];
        this.cdr.detectChanges();
        return;
      }

      this.isLoading = true;
      this.getRestaurant(id);
      this.getRecipes(id);
      this.getComments(id);
    });
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
    this.recipesService.getRecipes().subscribe({
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

  getComments(restaurantId: number): void {
    this.commentsService.getCommentsByRestaurantId(restaurantId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load comments', error);
        this.comments = [];
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

  getRatingDistribution(): Array<{ stars: number; count: number }> {
    const distribution = this.restaurant?.rating_summary?.distribution;
    if (!distribution) {
      return [];
    }

    return Object.entries(distribution)
      .map(([stars, count]) => ({ stars: Number(stars), count }))
      .filter((entry) => Number.isFinite(entry.stars))
      .sort((a, b) => b.stars - a.stars);
  }
}
