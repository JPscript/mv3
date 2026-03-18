import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface RecipeData {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
}

interface RestaurantData {
  id: number;
  name: string;
  recipes: RecipeData[];
}

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  private readonly restaurants: RestaurantData[] = [
    {
      id: 1,
      name: 'Brick Oven Table',
      recipes: [
        {
          id: 1,
          name: 'Margherita Pizza',
          ingredients: 'Pizza dough, tomato sauce, mozzarella, fresh basil, olive oil, salt.',
          instructions: 'Stretch the dough, spread tomato sauce, add mozzarella, bake at high heat until golden, finish with basil and olive oil.',
        },
        {
          id: 2,
          name: 'Mushroom Truffle Pizza',
          ingredients: 'Pizza dough, mozzarella, sautéed mushrooms, truffle oil, parmesan, black pepper.',
          instructions: 'Top stretched dough with cheese and mushrooms, bake until crisp, then finish with truffle oil and parmesan.',
        },
        {
          id: 3,
          name: 'Pesto Burrata Flatbread',
          ingredients: 'Flatbread dough, basil pesto, burrata, cherry tomatoes, olive oil, salt.',
          instructions: 'Bake flatbread with pesto, add burrata and tomatoes after baking, then season and drizzle with olive oil.',
        },
        {
          id: 4,
          name: 'Garlic Spinach Pasta',
          ingredients: 'Spaghetti, garlic, spinach, olive oil, chili flakes, parmesan.',
          instructions: 'Cook pasta, sauté garlic and spinach, combine with pasta water and finish with parmesan.',
        },
      ],
    },
    {
      id: 2,
      name: 'Harbor Spoon',
      recipes: [
        {
          id: 1,
          name: 'Grilled Sea Bass',
          ingredients: 'Sea bass fillets, lemon, garlic, parsley, olive oil, salt, pepper.',
          instructions: 'Season fish, grill skin-side down first, flip briefly, and serve with lemon, garlic and parsley dressing.',
        },
        {
          id: 2,
          name: 'Shrimp Rice Skillet',
          ingredients: 'Shrimp, short-grain rice, fish stock, paprika, garlic, peas, olive oil.',
          instructions: 'Sauté garlic and shrimp, add rice and stock, simmer until tender and finish with peas.',
        },
        {
          id: 3,
          name: 'Crispy Calamari',
          ingredients: 'Squid rings, flour, semolina, lemon zest, salt, pepper, frying oil.',
          instructions: 'Coat squid rings, fry until crisp and serve immediately with lemon.',
        },
      ],
    },
    {
      id: 3,
      name: 'Midnight Noodles',
      recipes: [
        {
          id: 1,
          name: 'Tonkotsu Ramen',
          ingredients: 'Ramen noodles, pork broth, chashu pork, soft egg, spring onion, nori.',
          instructions: 'Cook noodles, heat broth, assemble bowl with toppings and serve immediately while hot.',
        },
        {
          id: 2,
          name: 'Spicy Miso Ramen',
          ingredients: 'Ramen noodles, miso broth, chili oil, minced pork, corn, spring onion.',
          instructions: 'Simmer broth with miso and chili, cook noodles separately, then assemble with toppings.',
        },
        {
          id: 3,
          name: 'Gyoza Plate',
          ingredients: 'Dumpling wrappers, pork, cabbage, ginger, soy sauce, sesame oil.',
          instructions: 'Fill dumplings, pan-fry until golden, steam briefly and serve with soy dipping sauce.',
        },
      ],
    },
    {
      id: 4,
      name: 'Garden Fork Bistro',
      recipes: [
        {
          id: 1,
          name: 'Roasted Vegetable Plate',
          ingredients: 'Carrot, zucchini, red onion, pumpkin, thyme, olive oil, salt.',
          instructions: 'Cut vegetables, toss with oil and thyme, roast until tender and caramelized.',
        },
      ],
    },
    {
      id: 5,
      name: 'Copper Pan Kitchen',
      recipes: [
        {
          id: 1,
          name: 'Creamy Croquettes',
          ingredients: 'Butter, flour, milk, ham, nutmeg, breadcrumbs, eggs, oil.',
          instructions: 'Prepare thick béchamel, chill, shape croquettes, bread them and fry until golden.',
        },
      ],
    },
    {
      id: 6,
      name: 'North Flame Grill',
      recipes: [
        {
          id: 1,
          name: 'Smoked BBQ Ribs',
          ingredients: 'Pork ribs, paprika, garlic powder, brown sugar, BBQ sauce, salt.',
          instructions: 'Season ribs, slow-cook until tender, brush with sauce and finish on grill.',
        },
      ],
    },
    {
      id: 7,
      name: 'Saffron Yard',
      recipes: [
        {
          id: 1,
          name: 'Traditional Rice Stew',
          ingredients: 'Short-grain rice, chicken stock, chickpeas, chorizo, saffron, garlic.',
          instructions: 'Build sofrito, add stock and ingredients, simmer with rice until fully cooked.',
        },
      ],
    },
    {
      id: 8,
      name: 'Green Crumb Cafe',
      recipes: [
        {
          id: 1,
          name: 'Focaccia Veggie Sandwich',
          ingredients: 'Focaccia bread, grilled vegetables, hummus, arugula, olive oil.',
          instructions: 'Toast focaccia, spread hummus, add grilled vegetables and arugula, then serve warm.',
        },
      ],
    },
    {
      id: 9,
      name: 'Clear Ladle',
      recipes: [
        {
          id: 1,
          name: 'Daily Vegetable Soup',
          ingredients: 'Onion, carrot, leek, potato, stock, olive oil, salt.',
          instructions: 'Sauté vegetables, add stock, simmer until soft and blend lightly for texture.',
        },
      ],
    },
    {
      id: 10,
      name: 'Dockside Umami',
      recipes: [
        {
          id: 1,
          name: 'Miso Atlantic Cod',
          ingredients: 'Cod loin, white miso, soy sauce, honey, ginger, sesame oil.',
          instructions: 'Marinate cod, bake until flaky, and glaze with reduced marinade before serving.',
        },
      ],
    },
  ];

  restaurant: RestaurantData | undefined;
  recipe: RecipeData | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('restaurantId'));
    const recipeId = Number(this.route.snapshot.paramMap.get('recipeId'));

    this.restaurant = this.restaurants.find((item) => item.id === restaurantId);
    this.recipe = this.restaurant?.recipes.find((item) => item.id === recipeId);

    if (this.recipe && this.restaurant) {
      this.titleService.setTitle(`${this.recipe.name} · ${this.restaurant.name}`);
    }
  }

  goBackToRestaurant() {
    if (!this.restaurant) {
      this.router.navigate(['/restaurants']);
      return;
    }

    this.router.navigate(['/restaurants/restaurant', this.restaurant.id]);
  }
}
