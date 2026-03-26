import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  errorMessage = '';

  // Exponemos directamente el usuario actual del servicio para usarlo en la plantilla.
  readonly currentUser = this.authService.currentUser;

  ngOnInit(): void {
    this.authService.loadProfile().subscribe({
      error: () => {
        this.errorMessage = 'No se pudo cargar el perfil.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
