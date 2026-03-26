import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-actualizar-restaurante',
  imports: [FormsModule, RouterLink],
  templateUrl: './actualizar-restaurante.html',
  styleUrl: './actualizar-restaurante.css',
})
export class ActualizarRestaurante implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restaurantId: number | null = null;
  nombre = '';
  descripcion = '';
  latitud = 0;
  longitud = 0;
  errorMessage = '';
  isSubmitting = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMessage = 'No se encontro el id del restaurante.';
      return;
    }

    this.restaurantId = id;

    this.restaurantesService.getById(id).subscribe({
      next: (restaurante) => {
        this.nombre = restaurante.nombre;
        this.descripcion = restaurante.descripcion;
        this.latitud = restaurante.latitud;
        this.longitud = restaurante.longitud;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el restaurante a editar.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  submitUpdate(): void {
    if (this.restaurantId === null) {
      this.errorMessage = 'No se encontro el restaurante a actualizar.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.restaurantesService.update(this.restaurantId, {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      latitud: Number(this.latitud),
      longitud: Number(this.longitud),
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes/restaurante', this.restaurantId]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo actualizar el restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
