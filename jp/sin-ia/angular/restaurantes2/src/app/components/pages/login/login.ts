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
  // Igual que en otros archivos del proyecto, usamos `inject()` para pedir
  // dependencias sin tener que declararlas en un constructor clasico.
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // Estas propiedades representan el estado del formulario en pantalla.
  // Angular las mantiene sincronizadas con los inputs gracias a `[(ngModel)]`.
  nombre = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  // Este metodo se ejecuta al enviar el formulario.
  // Su trabajo es validar datos, llamar al servicio y reaccionar al resultado.
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
      // `next` se ejecuta cuando el Observable recibe una respuesta correcta
      // del backend. En nuestro caso significa que login devolvio token + user.
      // Como el servicio ya guardo esa informacion, aqui solo falta navegar.
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes']);
      },
      // `error` se ejecuta si la peticion falla, por ejemplo por credenciales
      // incorrectas o porque el servidor no responde.
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo iniciar sesión. Revisa tus credenciales.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
