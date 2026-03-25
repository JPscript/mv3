import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../../../../interfaces/restaurante';

@Injectable({
  providedIn: 'root',
})
export class Restaurantes {
  private readonly http = inject(HttpClient);
  private readonly api = "http://localhost:3000";

  getAllRestaurants(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.api}/restaurants`);
  }
}
