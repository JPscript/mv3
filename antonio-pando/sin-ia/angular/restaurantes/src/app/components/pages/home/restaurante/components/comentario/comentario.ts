import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css',
})
export class Comentario {
  id = input<number>();
  comentario = input<string>();
  created_at = input<string>();
  updated_at = input<string>();
  nombre = input<string>();
  image_url = input<string>();
}
