import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RecipeCard } from './components/recipe-card/recipe-card';

interface RecipeData {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
}

/**
 * Interface: RestaurantData
 *
 * Defines the structure of a restaurant object.
 * All restaurants must have these properties.
 */
interface RestaurantData {
  id: number;
  name: string;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  recipes: RecipeData[];
}

/**
 * Restaurant Component
 *
 * Displays detailed information about a single restaurant.
 * - Gets the restaurant ID from the URL parameters
 * - Finds the matching restaurant from the data array
 * - Shows the restaurant's full details
 * - Allows navigation back to the list
 */
@Component({
  selector: 'app-restaurant',
  imports: [DecimalPipe, RecipeCard],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant implements OnInit {
  /** Array of all available restaurants (data source) */
  private readonly restaurants: RestaurantData[] = [
    {
      id: 1,
      name: 'Brick Oven Table',
      description: 'Cozy Italian spot known for wood-fired pizzas, fresh pasta, and a relaxed neighborhood vibe.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 40.4168,
        lng: -3.7038,
      },
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
      description: 'Casual seafood kitchen serving grilled fish, rice dishes, and seasonal tapas near the waterfront.',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 39.4699,
        lng: -0.3763,
      },
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
      description: 'Modern ramen bar with rich broths, handmade dumplings, and a small late-night menu.',
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 41.3851,
        lng: 2.1734,
      },
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
      description: 'Seasonal bistro focused on roasted vegetables, slow-cooked meats, and local wine pairings.',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 37.3891,
        lng: -5.9845,
      },
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
      description: 'Busy all-day restaurant offering brunch plates, creamy croquettes, and house-made desserts.',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 36.7213,
        lng: -4.4214,
      },
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
      description: 'Contemporary grill house with premium burgers, smoked ribs, and a strong craft beer list.',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 43.263,
        lng: -2.935,
      },
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
      description: 'Warm family-style restaurant serving traditional rice dishes, stews, and shareable starters.',
      image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 37.1773,
        lng: -3.5986,
      },
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
      description: 'Light bistro with salads, focaccia sandwiches, specialty coffee, and vegetarian comfort food.',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 39.8628,
        lng: -4.0273,
      },
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
      description: 'Small market-driven restaurant best known for soups, daily specials, and simple honest cooking.',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 42.2406,
        lng: -8.7207,
      },
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
      description: 'Creative fusion restaurant mixing Asian techniques with Atlantic seafood and bold sauces.',
      image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 43.3623,
        lng: -8.4115,
      },
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

  /** Currently displayed restaurant (will be set in ngOnInit) */
  restaurant: RestaurantData | undefined;

  /**
   * Constructor with Angular services injected:
   * - ActivatedRoute: to read URL parameters (like the restaurant ID)
   * - Router: to navigate between pages
   * - Title: to update the browser page title
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  /**
   * Angular Lifecycle Hook: runs when component initializes
   *
   * Steps:
   * 1. Get the restaurant ID from the URL
   * 2. Find the matching restaurant from the array
   * 3. Update the page title to the restaurant's name
   */
  ngOnInit() {
    // Get 'id' parameter from URL (e.g., /restaurants/restaurant/1 -> id = 1)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Find the restaurant matching this ID
    this.restaurant = this.restaurants.find(r => r.id === id);
    
    // If restaurant exists, set browser title to its name
    if (this.restaurant) {
      this.titleService.setTitle(this.restaurant.name);
    }
  }

  /**
   * Navigate back to the restaurants list.
   * Called when user clicks the back button.
   */
  goBack() {
    this.router.navigate(['/restaurants']);
  }
}
