
// Servicio para gestionar la obtención de restaurantes desde la API
import { Injectable } from '@angular/core'; // Permite que el servicio sea inyectable en otros componentes/servicios
import { HttpClient } from '@angular/common/http'; // Servicio de Angular para hacer peticiones HTTP a la API
import { Observable } from 'rxjs'; // Tipo de dato para manejar flujos asíncronos de datos (respuestas de la API)
import { Restaurant } from '../models/restaurante.model'; // Importa la interfaz Restaurante para tipar correctamente

@Injectable({
  providedIn: 'root' // Hace que el servicio sea singleton y accesible en toda la app
})
export class RestauranteService {
  // URL base de la API de restaurantes. Cambia si tu endpoint es diferente.
    private apiUrl = 'http://localhost:3000/restaurants';

  // Inyecta HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener la lista de restaurantes desde la API
  // Devuelve un Observable de array de Restaurant (tipado correctamente)
  getRestaurantes(): Observable<Restaurant[]> {
    // Realiza una petición GET a la API y devuelve la respuesta como Observable
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}
