import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RestaurantesService, Restaurante } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [RouterLink, JsonPipe, CommonModule],
  templateUrl: './restaurantes.html', // ✅ Ruta al archivo HTML
  styleUrl: './restaurantes.css',
})
export class RestaurantesComponent implements OnInit {
  private restService = inject(RestaurantesService);

  restaurantes = signal([] as Restaurante[]);
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    console.log('ngOnInit ejecutado');
    this.getRestaurantes();
  }

  getImagenUrl(url: string): string {
    if (!url) return 'https://via.placeholder.com/300x200';

    // Si la url ya es absoluta (empieza con http), no la toques
    if (url.startsWith('http')) return url;

    // Si la url es solo el nombre del archivo (ej: "177325...jpg")
    // o si empieza por barra (ej: "/files/177325...jpg")
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;

    // IMPORTANTE: Asegúrate de que no se repita "/files/files/"
    if (cleanUrl.includes('/files/')) {
      return `http://localhost:3000${cleanUrl}`;
    }

    return `http://localhost:3000/files${cleanUrl}`;
  }

  getRestaurantes(): void {
    this.isLoading = true;
    this.restService.getAllRestaurantes().subscribe({
      next: (data) => {
        console.log('¿Qué campos tiene el primer objeto?', data[0]); // <--- MIRA ESTO EN LA CONSOLA (F12)
        this.restaurantes.set(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error:', err);
        this.errorMessage = 'Error al cargar los restaurantes.';
        this.isLoading = false;
      },
    });
  }
}
