import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Receta } from '../../../../interfaces/receta';

@Injectable({
  providedIn: 'root',
})
export class Recetas {
  private readonly http = inject(HttpClient);
  private readonly api = "http://localhost:3000";

//No se me veian las recetas, he necesitado importar map y utilizar un .pipe 
// .pipe() es un método que sirve para: encadenar operaciones (transformaciones) sobre un Observable
// Es como una “tubería” por donde pasan los datos y tú decides qué hacer con ellos.
// map transforma los datos que vienen del Observable. Map recibe todas las recetas y las filtra por id

getRecetasByRestaurante(restauranteId: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.api}/recipes`).pipe(
      map(recetas => recetas.filter(r => r.restaurant_id === restauranteId))
    );
  }

  getAllRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.api}/recipes`);
  }
}

  


