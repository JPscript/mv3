import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Receta } from '../../../../interfaces/receta';

@Injectable({
  providedIn: 'root',
})
export class Recetas {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';



  // Todas las recetas de un restaurante concreto
    getRecetasPorRestaurante(restaurantId: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recipes`).pipe(
      map(recetas => recetas.filter(r => r.restaurant_id === restaurantId))
    );
  }

}
