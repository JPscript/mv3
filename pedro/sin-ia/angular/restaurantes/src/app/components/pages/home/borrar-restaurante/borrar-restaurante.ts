import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Restaurante } from '../../../../interfaces/restaurante';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-borrar-restaurante',
  imports: [RouterLink],
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

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMessage = 'No se encontro el id del restaurante.';
      return;
    }

    this.restaurantesService.getRestauranteById(id).subscribe({
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

  confirmDelete(): void {
    if (!this.restaurante) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.restaurantesService.deleteRestaurante(this.restaurante.id).subscribe({
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
