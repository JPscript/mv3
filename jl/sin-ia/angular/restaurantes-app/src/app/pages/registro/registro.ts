import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink], // Para que el enlace 'Inicia sesión' funcione
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private router = inject(Router);

  crearCuenta() {
    // Simulamos que se guarda el usuario
    alert('¡Cuenta creada con éxito! Ahora puedes entrar.');

    // Lo mandamos al login para que pruebe su nueva cuenta
    this.router.navigate(['/login']);
  }
}
