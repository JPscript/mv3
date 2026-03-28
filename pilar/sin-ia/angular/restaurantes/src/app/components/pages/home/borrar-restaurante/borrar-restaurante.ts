import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Restaurante } from '../../../../interfaces/restaurante';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-borrar-restaurante',
  imports: [RouterLink, CommonModule],
  templateUrl: './borrar-restaurante.html',
  styleUrl: './borrar-restaurante.css',
})
export class BorrarRestaurante implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restaurante: Restaurante | null = null;
  errorMessage = '';
  isDeleting = false;
  isLoadingList = false;
  userRestaurantes: Restaurante[] = [];
  showConfirm = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (idParam && !Number.isNaN(id)) {
      // Si hay ID, cargar ese restaurante y mostrar confirmación
      this.loadRestauranteById(id);
    } else {
      // Si no hay ID, mostrar lista de restaurantes del usuario
      this.loadUserRestaurantes();
    }
  }

  private loadRestauranteById(id: number): void {
    this.showConfirm = true;

    this.restaurantesService.getById(id).subscribe({
      next: (restaurante) => {
        this.restaurante = restaurante;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el restaurante a borrar.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadUserRestaurantes(): void {
    this.isLoadingList = true;
    this.restaurantesService.getUserRestaurants().subscribe({
      next: (restaurantes) => {
        this.userRestaurantes = restaurantes;
        this.isLoadingList = false;
        if (restaurantes.length === 0) {
          this.errorMessage = 'No tienes restaurantes para borrar.';
        }
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoadingList = false;
        this.errorMessage = 'No se pudo cargar tus restaurantes.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  selectRestaurante(id: number): void {
    void this.router.navigate(['/restaurantes/borrar-restaurante', id]);
  }

  confirmDelete(): void {
    if (!this.restaurante) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.restaurantesService.remove(this.restaurante.id).subscribe({
      next: () => {
        this.isDeleting = false;
        void this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.isDeleting = false;
        this.errorMessage = 'No se pudo borrar el restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}