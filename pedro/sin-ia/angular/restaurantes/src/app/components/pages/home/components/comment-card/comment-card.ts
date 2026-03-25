import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  imports: [],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
})
export class CommentCard {
  usuario = input<string>();
  comentario = input<string>();
  fecha = input<string>();
}
