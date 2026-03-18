import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.css',
})
export class RestaurantesComponent {
  // Inyectamos el servicio
  private restService = inject(RestauranteService);

  // Obtenemos la señal de la lista
  restaurantes = this.restService.getRestaurantes();
}
