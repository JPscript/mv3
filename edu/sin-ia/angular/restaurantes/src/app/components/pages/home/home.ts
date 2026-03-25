import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from './services/restaurantes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class Home {
  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  restaurantes: Restaurante[] = [];
  isLoading = false;
  errorMessage = '';
  ngOnInit(): void {
    this.getRestaurantes();
  };
  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAllRestaurants().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los restaurantes. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();

      }
    });
  }
}