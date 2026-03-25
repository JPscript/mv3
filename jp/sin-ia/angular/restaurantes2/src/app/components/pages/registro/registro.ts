import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  nombre = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isSubmitting = false;

  submitRegister(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.errorMessage = 'Debes completar todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isSubmitting = true;

    this.authService.register({
      nombre: this.nombre.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo crear la cuenta.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
