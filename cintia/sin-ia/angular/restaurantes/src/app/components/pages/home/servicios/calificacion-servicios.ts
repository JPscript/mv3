import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Calificacion } from '../../../../interfaces/calificacion';

@Injectable({
  providedIn: 'root',
})
export class Calificaciones{
  private readonly http = inject(HttpClient);
  private readonly api = "http://localhost:3000";

  getCalificacionByRestaurante(id: number): Observable<Calificacion[]> {
      return this.http.get<Calificacion[]>(`${this.api}/restaurants`).pipe(
        map(calificaciones => calificaciones.filter(r => r.id === id))
      );
    }
  
    getAllCalificaciones(): Observable<Calificacion[]> {
      return this.http.get<Calificacion[]>(`${this.api}/restaurants`);
    }



}
