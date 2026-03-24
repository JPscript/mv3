import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  restaurantId = input<number>();
  id = input<number>();
  name = input<string>();
  ingredients = input<string>();

  constructor(private router: Router) {}

  goToRecipe() {
    this.router.navigate([
      '/restaurants',
      this.restaurantId(),
      'recipe',
      this.id(),
    ]);
  }
}
