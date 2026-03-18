import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurante-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurante-detalle.html',
  styleUrl: './restaurante-detalle.css',
})
export class RestauranteDetalle implements OnInit {
  private route = inject(ActivatedRoute);

  // Signal para guardar los datos del restaurante
  restaurante = signal<any>(null);

  ngOnInit() {
    // Obtenemos el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');

    // Simulamos una carga de datos (luego esto vendrá de un servicio)
    this.restaurante.set({
      id: id,
      nombre: 'Pizzería Roma',
      descripcion: 'La mejor pizza al horno de leña con ingredientes importados de Italia.',
      direccion: 'Calle Falsa 123, Madrid',
      puntuacion: 4.8,
      imagen:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      menu: ['Margarita', 'Cuatro Quesos', 'Carbonara', 'Calzone'],
    });
  }
}
