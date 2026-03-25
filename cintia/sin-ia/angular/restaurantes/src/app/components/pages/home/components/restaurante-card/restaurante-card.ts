import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.html',
  styleUrls: ['./restaurante-card.css'],
})
export class RestauranteCard {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() imagen!: string;
  @Input() latitud!: number;
  @Input() longitud!: number;

  @Output() verRecetas = new EventEmitter<number>();
  @Output() verCalificacion = new EventEmitter<number>();
}

// Aqui tenia los output de actualizar y eliminar
  //@Output() actualizar = new EventEmitter<number>();
  //@Output() eliminar = new EventEmitter<number>();
