// Componente principal de la página Home
// Aquí se gestiona la lista de restaurantes y se conecta con el componente restaurante-card
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { RouterModule } from '@angular/router';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-home', // Nombre de la etiqueta personalizada para usar este componente
  imports: [CommonModule, RestauranteCard, RouterModule], // Importa CommonModule para directivas de Angular, RestauranteCard para mostrar cada carta y RouterModule para la navegación
  templateUrl: './home.html', // HTML asociado a este componente
  styleUrl: './home.css', // CSS asociado a este componente
  standalone: true // Indica que este componente es independiente y no forma parte de un módulo específico
})
export class Home implements OnInit {
  listaRestaurantes = signal<any[]>([]);

  constructor(private restauranteService: RestauranteService) {
    console.log('Componente Home inicializado');
  }

  ngOnInit() {
    // Llama a la API para obtener los restaurantes al iniciar el componente
    this.restauranteService.getRestaurantes().subscribe(
      (data) => {
        console.log('Restaurantes recibidos:', data);
        if (Array.isArray(data)) {
          console.log('Número de restaurantes:', data.length);
          if (data.length > 0) {
            console.log('Primer restaurante:', data[0]);
          }
        } else {
          console.warn('La respuesta no es un array:', data);
        }
        // Actualizar el signal para reactividad
        this.listaRestaurantes.set(data);
      },
      (error) => {
        // Puedes mostrar un mensaje de error si lo deseas
        console.error('Error al cargar restaurantes', error);
      }
    );
  }

  // trackId ayuda a Angular a optimizar el renderizado de listas usando un identificador único
  trackId = (index: number, restaurante: any) => restaurante.id;
}
