import { Component, OnInit, inject, input, ChangeDetectorRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComentariosService, Comentario } from './services/comentarios';
import { AuthService } from '../../../../../services/auth.service/auth.service';

@Component({
  selector: 'app-comentarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css',
})
export class Comentarios implements OnInit {
  restaurantId = input<number>();
  
  private readonly comentariosService = inject(ComentariosService);
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  comentarios: Comentario[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // Formulario
  nuevoComentario = '';
  rating = 5;

  get currentUser() {
    return this.authService.currentUser();
  }

  constructor() {
    // Recargar comentarios cuando cambia el restaurantId
    effect(() => {
      const id = this.restaurantId();
      if (id) {
        this.loadComments();
      }
    });
  }

  ngOnInit(): void {
    if (this.restaurantId()) {
      this.loadComments();
    }
  }

  private loadComments(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const id = this.restaurantId();
    if (!id) return;

    this.comentariosService.getRestaurantComments(id).subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando comentarios:', err);
        this.comentarios = [];
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  submitComment(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.nuevoComentario.trim()) {
      this.errorMessage = 'El comentario no puede estar vacío';
      return;
    }

    if (!this.currentUser() || !this.restaurantId()) {
      this.errorMessage = 'Debes estar autenticado para comentar';
      return;
    }

    this.isSubmitting = true;

    const comment: Partial<Comentario> = {
      mensaje: this.nuevoComentario.trim(),
      rating: this.rating,
      restaurant_id: this.restaurantId(),
    };

    this.comentariosService.createComment(comment).subscribe({
      next: () => {
        this.successMessage = 'Comentario creado exitosamente';
        this.nuevoComentario = '';
        this.rating = 5;
        this.isSubmitting = false;
        this.loadComments();
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Error creando comentario:', err);
        this.isSubmitting = false;
        this.errorMessage = 'Error al crear el comentario';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  deleteComment(commentId: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      return;
    }

    this.comentariosService.deleteComment(commentId).subscribe({
      next: () => {
        this.loadComments();
      },
      error: (err) => {
        console.error('Error eliminando comentario:', err);
        this.errorMessage = 'Error al eliminar el comentario';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  canDeleteComment(commentUserId: number): boolean {
    return this.currentUser()?.id === commentUserId;
  }
}
