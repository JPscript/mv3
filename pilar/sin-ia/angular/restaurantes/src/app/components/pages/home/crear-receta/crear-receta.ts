import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecetaService } from '../components/receta/services/receta.service';

@Component({
  selector: 'app-crear-receta',
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css',
})
export class CrearReceta implements OnInit {
  private readonly recetaService = inject(RecetaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

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

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('restaurantId');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMessage = 'No se encontró el restaurante.';
      return;
    }

    this.restaurantId = id;
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

  submitCreate(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.descripcion.trim() || !this.ingredientes.trim()) {
      this.errorMessage = 'Debes completar todos los campos.';
      return;
    }

    if (this.restaurantId === null) {
      this.errorMessage = 'No se encontró el restaurante.';
      return;
    }

    this.isSubmitting = true;

    if (this.selectedFile) {
      this.recetaService.uploadRecipeImage(this.selectedFile).subscribe({
        next: (response) => {
          this.createRecipeWithImage(response.url);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'No se pudo subir la imagen.';
          this.changeDetectorRef.detectChanges();
        },
      });
    } else {
      this.createRecipeWithoutImage();
    }
  }

  private createRecipeWithImage(imageUrl: string): void {
    if (this.restaurantId === null) return;

    this.recetaService.create({
      restaurant_id: this.restaurantId,
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      ingredientes: this.ingredientes.trim(),
      tiempo_min: Number(this.tiempo_min),
      dificultad: this.dificultad,
      image_url: imageUrl,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes/restaurante', this.restaurantId]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo crear la receta.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private createRecipeWithoutImage(): void {
    if (this.restaurantId === null) return;

    this.recetaService.create({
      restaurant_id: this.restaurantId,
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      ingredientes: this.ingredientes.trim(),
      tiempo_min: Number(this.tiempo_min),
      dificultad: this.dificultad,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes/restaurante', this.restaurantId]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo crear la receta.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
