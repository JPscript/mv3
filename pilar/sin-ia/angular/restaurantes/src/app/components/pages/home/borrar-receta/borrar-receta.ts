import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecetaService } from '../components/receta/services/receta.service';
import { Restaurantes } from '../services/restaurantes';
import { Receta } from '../../../../interfaces/receta-interface';
import { Restaurante } from '../../../../interfaces/restaurante';

@Component({
  selector: 'app-borrar-receta',
  imports: [RouterLink, CommonModule],
  templateUrl: './borrar-receta.html',
  styleUrl: './borrar-receta.css',
})
export class BorrarReceta implements OnInit {
  private readonly recetaService = inject(RecetaService);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  recetaId: number | null = null;
  restaurantId: number | null = null;
  nombre = '';
  descripcion = '';
  image_url = '';
  errorMessage = '';
  isDeleting = false;

  // Para selección
  isLoadingRestaurantes = false;
  isLoadingRecetas = false;
  userRestaurantes: Restaurante[] = [];
  restaurantRecetas: Receta[] = [];
  showConfirmation = false;
  selectedRestaurantId: number | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (idParam && !Number.isNaN(id)) {
      // Si hay ID, cargar esa receta
      this.loadReceta(id);
    } else {
      // Si no hay ID, mostrar lista de restaurantes del usuario
      this.loadUserRestaurantes();
    }
  }

  private loadRestaurante(id: number): void {
    this.selectedRestaurantId = id;
    this.isLoadingRecetas = true;

    this.recetaService.getRecetas(id).subscribe({
      next: (recetas) => {
        this.restaurantRecetas = recetas;
        this.isLoadingRecetas = false;
        if (recetas.length === 0) {
          this.errorMessage = 'Este restaurante no tiene recetas para eliminar.';
        }
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoadingRecetas = false;
        this.errorMessage = 'No se pudieron cargar las recetas del restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  selectRestaurante(id: number): void {
    this.loadRestaurante(id);
  }

  selectReceta(id: number): void {
    void this.router.navigate(['/recetas/borrar-receta', id]);
  }

  private loadReceta(id: number): void {
    this.recetaId = id;
    this.showConfirmation = true;

    this.recetaService.getRecetaById(id).subscribe({
      next: (receta: any) => {
        this.nombre = receta.nombre;
        this.descripcion = receta.descripcion;
        this.image_url = receta.image_url;
        this.restaurantId = receta.restaurant_id;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la receta a eliminar.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadUserRestaurantes(): void {
    this.isLoadingRestaurantes = true;
    this.restaurantesService.getUserRestaurants().subscribe({
      next: (restaurantes) => {
        this.userRestaurantes = restaurantes;
        this.isLoadingRestaurantes = false;
        if (restaurantes.length === 0) {
          this.errorMessage = 'No tienes restaurantes con recetas para eliminar.';
        }
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoadingRestaurantes = false;
        this.errorMessage = 'No se pudieron cargar tus restaurantes.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  confirmDelete(): void {
    if (this.recetaId === null) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.recetaService.delete(this.recetaId).subscribe({
      next: () => {
        this.isDeleting = false;
        void this.router.navigate(['/restaurantes/restaurante', this.restaurantId]);
      },
      error: () => {
        this.isDeleting = false;
        this.errorMessage = 'No se pudo borrar la receta.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
