import { Component } from '@angular/core';
import { RestaurantCard } from './components/restaurant-card/restaurant-card';

/**
 * Home Component
 *
 * This component displays a grid of restaurant cards.
 * - Each restaurant has: id, name, description, image, and coordinates
 * - The data is hardcoded here but could come from a service later
 * - Guides the template with the 'restaurants' array
 */
@Component({
  selector: 'app-home',
  imports: [RestaurantCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  /**
   * Array of restaurants to display in the grid.
   * 
   * Each restaurant object has:
   * - id: unique identifier
   * - name: restaurant name
   * - description: short info about the restaurant
   * - image: URL to restaurant image
   * - coordinates: { lat, lng } for map location
   */
  restaurants = [
    {
      id: 1,
      name: 'Brick Oven Table',
      description: 'Cozy Italian spot known for wood-fired pizzas, fresh pasta, and a relaxed neighborhood vibe.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=900',
      coordinates: {
        lat: 40.4168,
        lng: -3.7038,
      },
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
    },
  ];
}
