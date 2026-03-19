import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {user = {
    id:1,
    name: 'Pilar Salvador',
    avatar: 'user.svg',
    location: 'Granada, España',
    bio: 'Amante de los viajes, la gastronomía y descubrir rincones únicos.',
    interests: ['Viajes', 'Restaurantes', 'Naturaleza', 'Cultura'],
    reviews: [
      {
        title: 'Restaurante increíble',
        rating: 5,
        comment: 'La comida espectacular y el servicio excelente.'
      },
      {
        title: 'Buen restaurante, pero ruidoso',
        rating: 4,
        comment: 'Muy cómodo, aunque algo ruidoso.'
      }
    ]
  };}

