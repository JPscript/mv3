import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  password = '';
  errorMessage = '';

  login() {
    this.errorMessage = '';

    this.auth.login(this.nombre, this.password).subscribe({
      next: () => {
        this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
