import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecetaCard } from '../components/receta-card/receta-card';
import { CommentCard } from '../components/comment-card/comment-card';
import { Restaurantes } from '../services/restaurantes';
import { Recetas } from '../services/recetas';
import { Comentarios } from '../services/comentarios';
import { AuthService } from '../../../../services/auth.service';
import type { Restaurante as RestauranteModel } from '../../../../interfaces/restaurante';
import type { Receta } from '../../../../interfaces/receta';
import type { Comentario } from '../../../../interfaces/comentario';

@Component({
  selector: 'app-restaurante',
  imports: [RouterLink, RecetaCard, CommentCard],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly recetasService = inject(Recetas);
  private readonly comentariosService = inject(Comentarios);
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restauranteId = 0;
  restaurante: RestauranteModel | null = null;
  recetas: Receta[] = [];
  comentarios: Comentario[] = [];
  readonly isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.restauranteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRestaurante();
    this.loadRecetas();
    this.loadComentarios();
  }

  private loadRestaurante(): void {
    this.restaurantesService.getAllRestaurantes().subscribe({
      next: (restaurantes) => {
        this.restaurante = restaurantes.find((r) => r.id === this.restauranteId) ?? null;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadRecetas(): void {
    this.recetasService.getAllRecetas().subscribe({
      next: (recetas) => {
        this.recetas = recetas.filter((receta) => receta.restaurant_id === this.restauranteId);
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadComentarios(): void {
    this.comentariosService.getComentariosByRestaurantId(this.restauranteId).subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
