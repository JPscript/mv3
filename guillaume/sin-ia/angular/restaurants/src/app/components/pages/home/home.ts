import { ChangeDetectorRef, OnInit, Inject, Component, inject } from '@angular/core';
import { RestaurantCard } from './components/restaurant-card/restaurant-card';
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from './services/restaurantes';

@Component({
  selector: 'app-home',
  imports: [RestaurantCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private readonly restaurantesService = inject(Restaurantes);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restaurantes: Restaurante[] = [];

  isLoading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAll().subscribe ({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = "my error message";

        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }


  fakeRestaurants = [
    {
      'name': 'Chez Guigui',
      'description': 'A wonderful restaurant',
      'picture': '/images/restau1.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443',
      'rating': 4
    },
    {
      'name': 'Maison Guillaume',
      'description': 'An incredible restaurant',
      'picture': '/images/restau2.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443',
      'rating': 3
    },
    {
      'name': 'La Mesa de Guillermo',
      'description': 'Fantàstico !',
      'picture': '/images/restau3.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443',
      'rating': 5
    },
        {
      'name': 'Guillermo desde 1981',
      'description': 'So typic',
      'picture': '/images/restau3.jpg',
      'lat': '2.000.444.12',
      'lng': '45.225.889.443',
      'rating': 5
    }
  ]
}
