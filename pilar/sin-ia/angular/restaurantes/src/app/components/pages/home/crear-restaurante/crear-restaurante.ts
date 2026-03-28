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
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage = '';
  isSubmitting = false;

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

  submitCreate(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.descripcion.trim()) {
      this.errorMessage = 'Debes completar nombre y descripción.';
      return;
    }

    this.isSubmitting = true;

    if (this.selectedFile) {
      this.restaurantesService.uploadRestaurantImage(this.selectedFile).subscribe({
        next: (response) => {
          this.createRestaurantWithImage(response.url);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'No se pudo subir la imagen.';
          this.changeDetectorRef.detectChanges();
        },
      });
    } else {
      this.createRestaurantWithoutImage();
    }
  }

  private createRestaurantWithImage(imageUrl: string): void {
    this.restaurantesService.create({
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      latitud: Number(this.latitud),
      longitud: Number(this.longitud),
      fotografia_url: imageUrl,
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

  private createRestaurantWithoutImage(): void {
    this.restaurantesService.create({
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