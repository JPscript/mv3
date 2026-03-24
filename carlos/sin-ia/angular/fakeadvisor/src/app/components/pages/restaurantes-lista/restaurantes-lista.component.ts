import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../../../models/restaurante.model';
import { restaurantes } from '../../../data/restaurantes';

@Component({
  selector: 'app-restaurantes-lista',
  templateUrl: './restaurantes-lista.component.html',
  styleUrls: ['./restaurantes-lista.component.css']
})
export class RestaurantesListaComponent implements OnInit {

  restaurantesOrdenados: { nombre: string; puntuacion: number }[] = [];

  ngOnInit(): void {
    this.restaurantesOrdenados = restaurantes
      .map((r: Restaurante) => ({
        nombre: r.nombre,
        puntuacion: r.puntuacion
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
}
