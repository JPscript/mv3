import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Receta } from '../../../../../interfaces/receta';

@Injectable({
  providedIn: 'root',
})
export class Recetas {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:3000";

  getRecetasByRestaurantId(restaurantId: number): Observable<Receta[]> {

    return this.http.get<Receta[]>(`${this.apiUrl}/recipes/restaurant/${restaurantId}`);
  }
}
