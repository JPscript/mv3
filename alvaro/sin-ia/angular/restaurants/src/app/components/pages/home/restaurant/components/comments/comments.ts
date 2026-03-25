import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comment } from '../../../../../../interfaces/comment';

@Component({
  selector: 'app-comments',
  imports: [DatePipe],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  comments = input<Comment[]>([]);
}
