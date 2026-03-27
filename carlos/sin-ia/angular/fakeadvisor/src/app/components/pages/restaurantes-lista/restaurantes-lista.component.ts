import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurante } from '../../../models/restaurante.model';
import { restaurantes } from '../../../data/restaurantes';

@Component({
  selector: 'app-restaurantes-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurantes-lista.component.html',
  styleUrls: ['./restaurantes-lista.component.css']
})
export class RestaurantesListaComponent implements OnInit {

  restaurantesOrdenados: { nombre: string; puntuacion: number; direccion: string }[] = [];

  ngOnInit(): void {
    this.restaurantesOrdenados = restaurantes
      .map((r: Restaurante) => ({
        nombre: r.nombre,
        puntuacion: r.puntuacion,
        direccion: r.direccion
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }
}
