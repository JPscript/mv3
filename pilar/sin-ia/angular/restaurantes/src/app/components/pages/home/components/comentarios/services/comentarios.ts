import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id: number;
  mensaje: string;
  rating: number;
  fecha_creacion: string;
  restaurant_id?: number;
  user_id?: number;
  user_nombre?: string;
  user_image_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getRestaurantComments(restaurantId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comments/restaurant/${restaurantId}`);
  }

  getUserComments(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comments/user/my-comments`);
  }

  createComment(comment: Partial<Comentario>): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/comments`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`);
  }
}
