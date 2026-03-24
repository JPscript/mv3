import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RestauranteUnico } from '../../../../../interfaces/restaurante-unico';

@Injectable({
  providedIn: 'root',
})
export class UnRestaurante {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:3000";

  getRestauranteById(restaurantId: number): Observable<RestauranteUnico> {
    
    return this.http.get<RestauranteUnico>(`${this.apiUrl}/restaurants/${restaurantId}`);
  }
}
