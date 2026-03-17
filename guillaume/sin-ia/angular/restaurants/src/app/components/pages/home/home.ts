import { Component } from '@angular/core';
import { RestaurantCard } from './components/restaurant-card/restaurant-card';

@Component({
  selector: 'app-home',
  imports: [RestaurantCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  fakeRestaurants = [
    {
      'name': 'Chez Guigui',
      'description': 'A wonderful restaurant',
      'picture': '/images/restau1.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443'
    },
    {
      'name': 'Maison Guillaume',
      'description': 'An incredible restaurant',
      'picture': '/images/restau2.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443'
    }
  ]
}
