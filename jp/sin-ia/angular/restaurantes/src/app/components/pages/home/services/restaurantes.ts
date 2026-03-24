import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../../../../interfaces/restaurante';

@Injectable({
  providedIn: 'root',
})
export class Restaurantes {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';
  
  getAllRestaurants(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
  }

  getById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
  }
}
