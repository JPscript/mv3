import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RestaurantesService, Restaurante } from './restaurante.service';
import { RestauranteCard } from '../components/restaurante-card/restaurante-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RestauranteCard],
  standalone: true,
})
export class Home implements OnInit {
  private readonly restaurantesService = inject(RestaurantesService); // ✅ con s
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restaurantes: Restaurante[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAllRestaurantes().subscribe({
      next: (restaurantes) => {
        console.log('Datos recibidos:', restaurantes); // ✅ añade esto
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.log('Error:', err); // ✅ añade esto también
        this.errorMessage = 'Error al cargar los restaurantes. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
