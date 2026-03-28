import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecetaService } from '../components/receta/services/receta.service';
import { Restaurantes } from '../services/restaurantes';
import { Receta } from '../../../../interfaces/receta-interface';
import { Restaurante } from '../../../../interfaces/restaurante';

@Component({
  selector: 'app-actualizar-receta',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './actualizar-receta.html',
  styleUrl: './actualizar-receta.css',
})
export class ActualizarReceta implements OnInit {
  private readonly recetaService = inject(RecetaService);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  recetaId: number | null = null;
  restaurantId: number | null = null;
  
  nombre = '';
  descripcion = '';
  ingredientes = '';
  tiempo_min = 0;
  dificultad = 'Media';
  image_url = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage = '';
  isSubmitting = false;
  
  // Para selección
  isLoadingRestaurantes = false;
  isLoadingRecetas = false;
  userRestaurantes: Restaurante[] = [];
  restaurantRecetas: Receta[] = [];
  showForm = false;
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
          this.errorMessage = 'Este restaurante no tiene recetas para actualizar.';
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
    void this.router.navigate(['/recetas/actualizar-receta', id]);
  }

  private loadReceta(id: number): void {
    this.recetaId = id;
    this.showForm = true;

    this.recetaService.getRecetaById(id).subscribe({
      next: (receta: any) => {
        this.nombre = receta.nombre;
        this.descripcion = receta.descripcion;
        this.ingredientes = receta.ingredientes;
        this.tiempo_min = receta.tiempo_min;
        this.dificultad = receta.dificultad;
        this.image_url = receta.image_url;
        this.restaurantId = receta.restaurant_id;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la receta a editar.';
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
          this.errorMessage = 'No tienes restaurantes con recetas para actualizar.';
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.changeDetectorRef.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  submitUpdate(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.descripcion.trim() || !this.ingredientes.trim()) {
      this.errorMessage = 'Debes completar todos los campos.';
      return;
    }

    if (this.recetaId === null) {
      this.errorMessage = 'No se encontró la receta.';
      return;
    }

    this.isSubmitting = true;

    const updateData: any = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      ingredientes: this.ingredientes.trim(),
      tiempo_min: Number(this.tiempo_min),
      dificultad: this.dificultad,
    };

    if (this.selectedFile) {
      this.recetaService.uploadRecipeImage(this.selectedFile).subscribe({
        next: (response) => {
          updateData.image_url = response.url;
          this.performUpdate(updateData);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'No se pudo subir la imagen.';
          this.changeDetectorRef.detectChanges();
        },
      });
    } else {
      this.performUpdate(updateData);
    }
  }

  private performUpdate(updateData: any): void {
    if (this.recetaId === null) return;

    this.recetaService.update(this.recetaId, updateData).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes/restaurante', this.restaurantId]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo actualizar la receta.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
