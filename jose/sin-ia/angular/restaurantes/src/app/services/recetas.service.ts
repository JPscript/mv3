
// Servicio Angular para gestionar las recetas (obtenerlas desde la API)
import { Injectable } from '@angular/core'; // Permite que el servicio sea inyectable en otros componentes/servicios
import { HttpClient } from '@angular/common/http'; // Cliente HTTP para hacer peticiones a la API
import { Observable } from 'rxjs'; // Permite trabajar con datos asíncronos (peticiones HTTP)
import { Receta } from '../models/recetaInterfaz'; // Interfaz que define la estructura de una receta

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class RecetasService {
  // URL base de la API donde se encuentran las recetas
  private apiUrl = 'http://localhost:3000/recipes'; // Cambia el puerto si tu API usa otro

  // Inyecta el cliente HTTP para poder hacer peticiones
  constructor(private http: HttpClient) {}

  // Obtiene todas las recetas de la API
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  // Obtiene solo las recetas de un restaurante concreto usando el parámetro restaurant_id
  getRecetasPorRestaurante(restaurantId: number): Observable<Receta[]> {
    // Llama a la API con un parámetro de filtro (restaurant_id) y un parámetro único para evitar caché
    return this.http.get<Receta[]>(`${this.apiUrl}?restaurant_id=${restaurantId}&_=${Date.now()}`);
  }
}