import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Restaurantes } from '../services/restaurantes';
import { Restaurante } from '../../../../interfaces/restaurante';

@Component({
  selector: 'app-actualizar-restaurante',
  imports: [FormsModule, RouterLink, CommonModule],
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
  fotografia_url = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage = '';
  isSubmitting = false;
  isLoadingList = false;
  userRestaurantes: Restaurante[] = [];
  showForm = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (idParam && !Number.isNaN(id)) {
      // Si hay ID, cargar ese restaurante
      this.loadRestauranteById(id);
    } else {
      // Si no hay ID, mostrar lista de restaurantes del usuario
      this.loadUserRestaurantes();
    }
  }

  private loadRestauranteById(id: number): void {
    this.restaurantId = id;
    this.showForm = true;

    this.restaurantesService.getById(id).subscribe({
      next: (restaurante) => {
        this.nombre = restaurante.nombre;
        this.descripcion = restaurante.descripcion;
        this.latitud = restaurante.latitud;
        this.longitud = restaurante.longitud;
        this.fotografia_url = restaurante.fotografia_url;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el restaurante a editar.';
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
          this.errorMessage = 'No tienes restaurantes para actualizar.';
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
    void this.router.navigate(['/restaurantes/actualizar-restaurante', id]);
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
    if (this.restaurantId === null) {
      this.errorMessage = 'No se encontro el restaurante a actualizar.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const updateData: any = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      latitud: Number(this.latitud),
      longitud: Number(this.longitud),
    };

    if (this.selectedFile) {
      this.restaurantesService.uploadRestaurantImage(this.selectedFile).subscribe({
        next: (response) => {
          updateData.fotografia_url = response.url;
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
    if (this.restaurantId === null) return;

    this.restaurantesService.update(this.restaurantId, updateData).subscribe({
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