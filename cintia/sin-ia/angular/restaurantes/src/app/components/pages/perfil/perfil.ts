import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  user = {
    name: 'John Doe',
    location: 'New York, USA',
    profilePicture: 'https://via.placeholder.com/150',
    bio: 'Food lover and restaurant enthusiast.',
    interests: ['Italian cuisine', 'Sushi', 'Vegan food', 'Food photography'],
    reviews: [
      {
        restaurant: 'La Trattoria',
        rating: 4,
        comment: 'Great pasta and cozy atmosphere!',
      },
      {
        restaurant: 'Sushi World',
        rating: 5,
        comment: 'Best sushi in town, highly recommend!',
      },
    ],
  }
}
