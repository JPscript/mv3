import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service/auth.service';
import { Restaurantes, Comentario } from '../../../components/pages/home/services/restaurantes';
import { Restaurante } from '../../../interfaces/restaurante';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  errorMessage = '';
  userRestaurantes: Restaurante[] = [];
  userComentarios: Comentario[] = [];
  isLoadingRestaurantes = false;
  isLoadingComentarios = false;
  selectedProfileFile: File | null = null;
  profilePreviewUrl: string | null = null;
  isUploadingProfile = false;

  readonly currentUser = this.authService.currentUser;

  ngOnInit(): void {
    this.authService.loadProfile().subscribe({
      next: () => {
        this.loadUserData();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el perfil.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  onProfileImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedProfileFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePreviewUrl = e.target.result;
        this.changeDetectorRef.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfileImage(): void {
    if (!this.selectedProfileFile) {
      this.errorMessage = 'Por favor selecciona una imagen.';
      return;
    }

    this.isUploadingProfile = true;
    this.errorMessage = '';

    this.restaurantesService.uploadProfileImage(this.selectedProfileFile).subscribe({
      next: () => {
        this.isUploadingProfile = false;
        this.selectedProfileFile = null;
        this.profilePreviewUrl = null;
        this.authService.loadProfile().subscribe({
          next: () => {
            this.changeDetectorRef.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Imagen subida pero no se pudo recargar el perfil.';
            this.changeDetectorRef.detectChanges();
          },
        });
      },
      error: () => {
        this.isUploadingProfile = false;
        this.errorMessage = 'No se pudo subir la imagen de perfil.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadUserData(): void {
    this.loadUserRestaurantes();
    this.loadUserComentarios();
  }

  private loadUserRestaurantes(): void {
    this.isLoadingRestaurantes = true;
    this.restaurantesService.getUserRestaurants().subscribe({
      next: (restaurantes) => {
        this.userRestaurantes = restaurantes;
        this.isLoadingRestaurantes = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoadingRestaurantes = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadUserComentarios(): void {
    this.isLoadingComentarios = true;
    this.restaurantesService.getUserComments().subscribe({
      next: (comentarios) => {
        this.userComentarios = comentarios;
        this.isLoadingComentarios = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.isLoadingComentarios = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}