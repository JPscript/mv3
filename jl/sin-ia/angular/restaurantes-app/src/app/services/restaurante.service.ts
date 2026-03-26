import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  fotografia_url: string;
  latitud: number;
  longitud: number;
  rating_summary?: { average: number; count: number };
}

@Injectable({ providedIn: 'root' })
export class RestaurantesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/restaurants';

  getAllRestaurantes() {
    return this.http.get<Restaurante[]>(this.apiUrl);
  }
}
