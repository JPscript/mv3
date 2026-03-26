import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { Restaurantes } from './services/restaurantes';
import { AuthService } from '../../../services/auth.service';
import type { Restaurante } from '../../../interfaces/restaurante';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private readonly restaurantesService = inject(Restaurantes);
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  restaurantes: Restaurante[] = [];
  isLoading = false;
  errorMessage = '';
  readonly isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.getRestaurantes();
  };

  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAllRestaurantes().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los restaurantes';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}