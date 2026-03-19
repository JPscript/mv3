// Servicio Angular para conectar con la API de recetas (NestJS)
import { Injectable } from '@angular/core'; // Permite marcar la clase como inyectable (puede usarse en otros componentes/servicios)
import { HttpClient } from '@angular/common/http'; // Cliente HTTP de Angular para hacer peticiones a la API

@Injectable({ providedIn: 'root' }) // Hace que el servicio esté disponible en toda la app (singleton)
export class RecetasService {
  // URL base de la API (ajusta el puerto si tu backend usa otro)
  private apiUrl = 'http://localhost:3000';

  // Inyecta HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todas las recetas desde la API
  getRecetas() {
    // Realiza una petición GET a http://localhost:3000/recetas
    return this.http.get(`${this.apiUrl}/recetas`);
  }
}
