import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-crear-restaurante',
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-restaurante.html',
  styleUrl: './crear-restaurante.css',
})
export class CrearRestaurante {
  private readonly restaurantesService = inject(Restaurantes);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  nombre = '';
  descripcion = '';
  latitud = 0;
  longitud = 0;
  errorMessage = '';
  isSubmitting = false;

  submitCreate(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.descripcion.trim()) {
      this.errorMessage = 'Debes completar nombre y descripción.';
      return;
    }

    this.isSubmitting = true;

    this.restaurantesService.createRestaurante({
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      latitud: Number(this.latitud),
      longitud: Number(this.longitud),
    }).subscribe({
      next: (restaurante) => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes/restaurante', restaurante.id]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo crear el restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
