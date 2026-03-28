import { Component, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta',
  imports: [RouterLink, CommonModule],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  id = input<number>();
  restaurant_id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  ingredientes = input<string>();
  tiempo_min = input<number>();
  dificultad = input<string>();
  image_url = input<string | null>();
  isOwner = input<boolean>(false);
}