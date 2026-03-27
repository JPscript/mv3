import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../../../../interfaces/restaurante';

export interface CreateOrUpdateRestaurantPayload {
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
}

@Injectable({
  providedIn: 'root',
})
export class Restaurantes {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getAllRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
  }

  getRestauranteById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
  }

  createRestaurante(payload: CreateOrUpdateRestaurantPayload): Observable<Restaurante> {
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurants`, payload);
  }

  updateRestaurante(id: number, payload: Partial<CreateOrUpdateRestaurantPayload>): Observable<Restaurante> {
    return this.http.patch<Restaurante>(`${this.apiUrl}/restaurants/${id}`, payload);
  }

  deleteRestaurante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/restaurants/${id}`);
  }
}