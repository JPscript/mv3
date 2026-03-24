import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comentario-card',
  imports: [],
  templateUrl: './comentario-card.html',
  styleUrl: './comentario-card.css',
})
export class ComentarioCard {

  id = input<number>();
  nombre = input<string>();
  comentario = input<string>();
  
}
