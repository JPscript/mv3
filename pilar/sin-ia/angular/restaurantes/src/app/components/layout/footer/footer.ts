import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly authService = inject(AuthService);

  readonly isLoggedIn = this.authService.isLoggedIn;

  logout(): void {
    this.authService.logout();
  }
}