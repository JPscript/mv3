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
      id: 1,
      name: 'Restaurant 1',
      description: 'Description of Restaurant 1',
      image: 'https://cdn.7tv.app/emote/01JGP80CAP3W1A8FWMEZYK3V2C/4x.png',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060,
      },
    },
    {
      id: 2,
      name: 'Restaurant 2',
      description: 'Description of Restaurant 2',
      image: 'https://via.placeholder.com/150',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
    },
    {
      id: 3,
      name: 'Restaurant 3',
      description: 'Description of Restaurant 3',
      image: 'https://via.placeholder.com/150',
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
  ];
}
