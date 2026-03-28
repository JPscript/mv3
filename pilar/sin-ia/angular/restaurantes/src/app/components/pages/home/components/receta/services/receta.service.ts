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

  getRecetaById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/recipes/${id}`);
  }

  create(recipe: Partial<Receta>): Observable<Receta> {
    return this.http.post<Receta>(`${this.apiUrl}/recipes`, recipe);
  }

  update(id: number, recipe: Partial<Receta>): Observable<Receta> {
    return this.http.patch<Receta>(`${this.apiUrl}/recipes/${id}`, recipe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${id}`);
  }

  uploadRecipeImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload/recipe`, formData);
  }
}