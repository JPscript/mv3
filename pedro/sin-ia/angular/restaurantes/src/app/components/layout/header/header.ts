import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;
  readonly isLoggedIn = this.authService.isLoggedIn;
  mostrarBarraBuscador = false;

  toggleBarraBuscador(): void {
    this.mostrarBarraBuscador = !this.mostrarBarraBuscador;
  }

  cerrarBarraBuscador(): void {
    this.mostrarBarraBuscador = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
