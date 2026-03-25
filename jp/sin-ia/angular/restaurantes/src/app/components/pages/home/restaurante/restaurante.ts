import { ChangeDetectorRef, Component, OnInit, inject, input, numberAttribute } from '@angular/core';
import { Restaurante as RestauranteModel } from '../../../../interfaces/restaurante';
import { Restaurantes } from '../services/restaurantes';

@Component({
  selector: 'app-restaurante',
  imports: [],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante implements OnInit {
  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // Gracias a `withComponentInputBinding()`, Angular toma el `:id` de la ruta
  // y lo coloca automaticamente en este input del componente.
  id = input.required<number, string>({ transform: numberAttribute });

  restaurante: RestauranteModel | null = null;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.id();

    if (Number.isNaN(id)) {
      this.errorMessage = 'No se encontro el id del restaurante.';
      return;
    }

    this.restaurantesService.getById(id).subscribe({
      next: (restaurante) => {
        this.restaurante = restaurante;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el restaurante.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
