import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Comentario } from '../../../../interfaces/comentario';

@Injectable({
  providedIn: 'root',
})
export class Comentarios {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getComentariosByRestaurantId(restaurantId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/restaurants/${restaurantId}/comments`);
  }
}