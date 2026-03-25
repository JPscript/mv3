
// Componente principal de la página Home.
// Senior Cat dice: Este componente es el "cerebro" de la página principal.
// Aquí se pide la lista de restaurantes y se conecta con las tarjetas.
// Cuando el usuario pulsa una tarjeta, navega al detalle usando el id.

// Importaciones necesarias:
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { RestauranteService } from '../../../services/restaurante.service';
import { Restaurante } from '../../../models/restaurante.model';
@Component({
  selector: 'app-home', // Nombre de la etiqueta personalizada para usar este componente en el HTML (como <app-home>)
  imports: [CommonModule, RestauranteCard, RouterModule], // Importa módulos y componentes necesarios para la vista
  templateUrl: './home.html', // Ruta al archivo HTML asociado a este componente
  styleUrl: './home.css', // Ruta al archivo CSS asociado a este componente
  standalone: true // Indica que este componente es independiente y no necesita estar en un módulo de Angular
})
export class Home implements OnInit {
  // Signal reactivo que almacena la lista de restaurantes.
  // Permite que la vista se actualice automáticamente cuando cambian los datos.
  // Signal reactivo que almacena la lista de restaurantes.
  // Permite que la vista se actualice automáticamente cuando cambian los datos.
  listaRestaurantes = signal<Restaurante[]>([]);

  // Inyecta el servicio RestauranteService para poder pedir los datos a la "API".
  constructor(private restauranteService: RestauranteService, private router: Router) {
    // Mensaje en consola para saber que el componente se ha creado correctamente.
    console.log('Componente Home inicializado');
  }

  // Método para navegar al detalle del restaurante
  // Recibe el id desde la tarjeta y navega a la ruta de detalle
  irADetalle(id: number) {
    this.router.navigate([`restaurantes/${id}`]);
  }

  // Método especial de Angular que se ejecuta al iniciar el componente.
  ngOnInit() {
    // Al iniciar el componente, pide la lista de restaurantes al servicio.
    this.restauranteService.getRestaurantes().subscribe({
      next: (data) => {
        // Cuando llegan los datos, se muestran en consola para depuración.
        console.log('Restaurantes recibidos:', data);
        if (Array.isArray(data)) {
          // Si la respuesta es un array, muestra cuántos restaurantes hay y el primero.
          console.log('Número de restaurantes:', data.length);
          if (data.length > 0) {
            console.log('Primer restaurante:', data[0]);
          }
        } else {
          // Si la respuesta no es un array, avisa en consola.
          console.warn('La respuesta no es un array:', data);
        }
        // Actualiza el signal para que la vista se refresque con los nuevos datos.
        this.listaRestaurantes.set(data);
      },
      error: (error) => {
        // Si hay un error al pedir los datos, se muestra en consola.
        console.error('Error al cargar restaurantes', error);
      }
    });
  }

  // trackId: función que ayuda a Angular a identificar cada restaurante de forma única en la lista.
  // Esto mejora el rendimiento al renderizar listas grandes.
  trackId = (index: number, restaurante: Restaurante) => restaurante.id;
}
