import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  private lista = signal([
    { id: 1, nombre: 'Pizzería Roma', tipo: 'Italiano', imagen: '🍕', rating: 4.5 },
    { id: 2, nombre: 'Sushi Zen', tipo: 'Japonés', imagen: '🍣', rating: 4.8 },
  ]);

  // Este nombre debe coincidir con el que llamas en el componente
  getRestaurantes() {
    return this.lista;
  }
}
