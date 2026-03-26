import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
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

    if (!this.nombre.trim() || !this.password.trim()) {
      this.errorMessage = 'Debes completar todo, por Dios !';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Tooooooooooooo short password'
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = `Passwords don't coinciden`;
      return;
    }

    this.isSubmitting = true;

    this.authService.register({
      nombre: this.nombre.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurants']);
      },
      error: () => {
        console.log('error');

        this.isSubmitting = false;
        this.errorMessage = 'Houston... we have a problem !';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
