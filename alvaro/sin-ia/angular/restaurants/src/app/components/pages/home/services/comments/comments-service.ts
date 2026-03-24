import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../../../../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getCommentsByRestaurantId(restaurantId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/restaurants/${restaurantId}/comments`);
  }
}
