import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../../../interfaces/restaurant';

interface Recipe {
  id: number;
  restaurant_id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  tiempo_min: number;
  dificultad: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class Restaurants {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }
}
