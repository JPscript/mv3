import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../../../../interfaces/restaurante';

export interface Comentario {
  id: number;
  mensaje: string;
  rating: number;
  fecha_creacion: string;
  restaurant_id: number;
  restaurant_nombre?: string;
}

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

  getUserRestaurants(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants/user/my-restaurants`);
  }

  getUserComments(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comments/user/my-comments`);
  }

  create(restaurant: Partial<Restaurante>): Observable<Restaurante> {
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurants`, restaurant);
  }

  update(id: number, restaurant: Partial<Restaurante>): Observable<Restaurante> {
    return this.http.patch<Restaurante>(`${this.apiUrl}/restaurants/${id}`, restaurant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/restaurants/${id}`);
  }

  remove(id: number): Observable<void> {
    return this.delete(id);
  }

  uploadRestaurantImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload/restaurant`, formData);
  }

  uploadProfileImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload/profile`, formData);
  }
}