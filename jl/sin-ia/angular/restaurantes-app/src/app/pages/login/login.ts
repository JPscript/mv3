import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Importamos Router para movernos

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink], // Necesario para el enlace de registro
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // El 'Router' es el que nos permite cambiar de página por código
  private router = inject(Router);

  entrar() {
    alert('¡Login correcto! Bienvenido.');
    // Esto te manda directamente a la lista de restaurantes
    this.router.navigate(['/restaurantes']);
  }
}
