import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RestaurantesService, Restaurante } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [RouterLink, JsonPipe, CommonModule],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.css',
})
export class RestaurantesComponent implements OnInit {
  private readonly restService = inject(RestaurantesService);

  restaurantes = signal<Restaurante[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.isLoading.set(true);
    this.restService.getAllRestaurantes().subscribe({
      next: (data) => {
        console.log('¡AJÁ! Han llegado estos:', data);
        this.restaurantes.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
