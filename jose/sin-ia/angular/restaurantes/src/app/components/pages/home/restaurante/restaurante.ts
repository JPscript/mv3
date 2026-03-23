import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { Restaurante as RestauranteModel } from '../../../../models/restaurante.model';

@Component({
  selector: 'app-restaurante',
  imports: [],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
  standalone: true
})
// Senior Cat dice: Este componente muestra el detalle de un restaurante.
// Obtiene el id de la URL, busca el restaurante y lo muestra.
export class RestaurantePage implements OnInit {
  // Signal reactivo para almacenar el restaurante seleccionado
  restaurante = signal<RestauranteModel | null>(null);

  constructor(
    private route: ActivatedRoute, // Para leer el id de la URL
    private restauranteService: RestauranteService // Para pedir los datos
  ) {}

  ngOnInit() {
    // Al iniciar, obtiene el id de la ruta y busca el restaurante
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.restauranteService.getRestaurantes().subscribe(
        (restaurantes: RestauranteModel[]) => {
          // Busca el restaurante con ese id
          const encontrado = restaurantes.find((r: RestauranteModel) => r.id === id) || null;
          this.restaurante.set(encontrado);
        }
      );
    }
  }
}
