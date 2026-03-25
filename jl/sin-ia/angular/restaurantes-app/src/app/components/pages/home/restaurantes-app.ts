import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RestaurantesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost.3000';

  getAllRestaurantes() {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
  }
}

export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  fotografía_url: string;
  latitud: number;
  longitud: number;
  total_recetas: number;
  rating_summary?: {
    average: number;
    count: number;
    distribution: Record<string, number>;
  };
}
