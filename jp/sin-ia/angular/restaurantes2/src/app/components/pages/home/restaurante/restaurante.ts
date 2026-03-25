import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Comment } from '../../../../interfaces/comment';
import { RatingSummary, MyRating } from '../../../../interfaces/rating';
import { Restaurante as RestauranteModel } from '../../../../interfaces/restaurante';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-restaurante',
  imports: [FormsModule, RouterLink],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly isLoggedIn = this.authService.isLoggedIn;

  restaurante: RestauranteModel | null = null;
  comments: Comment[] = [];
  ratingSummary: RatingSummary | null = null;
  myRating: MyRating | null = null;

  commentText = '';
  ratingValue = 5;

  isLoading = false;
  isSubmittingComment = false;
  isSubmittingRating = false;
  errorMessage = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMessage = 'No se encontro el id del restaurante.';
      return;
    }

    this.loadRestaurantPage(id);
  }

  submitComment(): void {
    if (!this.restaurante) {
      return;
    }

    if (!this.commentText.trim()) {
      this.errorMessage = 'Debes escribir un comentario antes de enviarlo.';
      return;
    }

    this.isSubmittingComment = true;
    this.errorMessage = '';

    this.restaurantesService.createComment(this.restaurante.id, {
      comentario: this.commentText.trim(),
    }).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.commentText = '';
        this.isSubmittingComment = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isSubmittingComment = false;
        this.errorMessage = 'No se pudo publicar el comentario.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  submitRating(): void {
    if (!this.restaurante) {
      return;
    }

    if (this.ratingValue < 1 || this.ratingValue > 5) {
      this.errorMessage = 'La puntuación debe estar entre 1 y 5.';
      return;
    }

    this.isSubmittingRating = true;
    this.errorMessage = '';

    this.restaurantesService.createOrUpdateRating(this.restaurante.id, {
      calificacion: this.ratingValue,
    }).subscribe({
      next: (response) => {
        this.myRating = response.my_rating;
        this.ratingSummary = response.summary;
        this.isSubmittingRating = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isSubmittingRating = false;
        this.errorMessage = 'No se pudo guardar la puntuación.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadRestaurantPage(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.restaurantesService.getById(id).subscribe({
      next: (restaurante) => {
        this.restaurante = restaurante;
        this.isLoading = false;
        this.loadComments(id);
        this.loadRatingSummary(id);

        if (this.isLoggedIn()) {
          this.loadMyRating(id);
        }

        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'No se pudo cargar el restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadComments(id: number): void {
    this.restaurantesService.getComments(id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadRatingSummary(id: number): void {
    this.restaurantesService.getRatingsSummary(id).subscribe({
      next: (summary) => {
        this.ratingSummary = summary;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadMyRating(id: number): void {
    this.restaurantesService.getMyRating(id).subscribe({
      next: (rating) => {
        this.myRating = rating;
        if (rating) {
          this.ratingValue = rating.calificacion;
        }
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
