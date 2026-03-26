import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  nombre = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  submitLogin(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.password.trim()) {
      this.errorMessage = 'Debes completar nombre y contraseña.';
      return;
    }

    this.isSubmitting = true;

    this.authService.login({
      nombre: this.nombre.trim(),
      password: this.password,
    }).subscribe({
     
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes']);
      },
     
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo iniciar sesión. Revisa tus credenciales.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}