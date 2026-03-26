import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  registrar() {
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(this.nombre, this.password).subscribe({
      next: () => {
        this.successMessage = 'Usuario creado correctamente';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el usuario';
      }
    });
  }
}
