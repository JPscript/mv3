import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comentario } from '../../../../interfaces/comentario';

@Injectable({
  providedIn: 'root',
})
export class Comentarios {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

   // Todos los comentarios de un restaurante concreto
      getComentariosPorRestaurante(restaurantId: number): Observable<Comentario[]> {
      return this.http.get<Comentario[]>(`${this.apiUrl}/restaurants/${restaurantId}/comments`)
    }
}
