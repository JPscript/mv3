// Importa las dependencias necesarias de Angular y del proyecto
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Component, OnInit y ChangeDetectorRef para forzar actualización
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute para acceder a los parámetros de la ruta (id del restaurante)
import { RecetasService } from '../../../services/recetas.service'; // Servicio para obtener recetas desde la API
import { Receta } from '../../../models/recetaInterfaz'; // Interfaz que define la estructura de una receta
import { Location } from '@angular/common'; // Location para manejar la navegación (por ejemplo, volver atrás)
@Component({
  selector: 'app-recetas-por-restaurante', // Nombre del selector para usar el componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita estar en un módulo)
  imports: [CommonModule], // Importa CommonModule para habilitar @for y @if
  templateUrl: './recetas-por-restaurante.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./recetas-por-restaurante.css'] // Ruta al archivo de estilos CSS
})
export class RecetasPorRestauranteComponent implements OnInit {
  // Array donde se guardarán las recetas filtradas por restaurante
  recetas: Receta[] = [];
  cargando = true;

  // Inyecta las dependencias necesarias: la ruta activa y el servicio de recetas
  constructor(
    private route: ActivatedRoute, // Permite acceder a los parámetros de la URL (por ejemplo, el id del restaurante)
    private recetasService: RecetasService, // Servicio para obtener recetas desde la API
    private location: Location, // Servicio para manejar la navegación (por ejemplo, volver atrás)
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef para forzar actualización
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene el id del restaurante desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('[RecetasPorRestauranteComponent] ngOnInit - ID recibido:', id);
    this.recetasService.getRecetasPorRestaurante(id).subscribe({
      next: (data) => {
        console.log('[RecetasPorRestauranteComponent] Datos recibidos de la API:', data);
        // Filtra solo las recetas del restaurante seleccionado
        this.recetas = data.filter(receta => receta.restaurant_id === id);
        console.log('[RecetasPorRestauranteComponent] Recetas tras filtro:', this.recetas);
        this.cargando = false;
        this.cdr.detectChanges(); // Fuerza la actualización de la vista
      },
      error: (err) => {
        console.error('[RecetasPorRestauranteComponent] Error al obtener recetas:', err);
        this.cargando = false;
        this.cdr.detectChanges(); // Fuerza la actualización de la vista en caso de error
      }
    });
  }

  // Método para volver a la página anterior
  goBack(): void {
    this.location.back();
  }
}