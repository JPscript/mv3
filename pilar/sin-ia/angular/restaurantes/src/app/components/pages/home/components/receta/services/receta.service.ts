import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Receta } from '../../../../../../interfaces/receta-interface';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getRecetas(id: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recipes/restaurant/${id}`);
  }
}