
// Servicio centralizado para la gestión de usuarios en la app
// Permite compartir y actualizar el array de usuarios entre login, registro, perfil, etc.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para futuras llamadas a API (si se implementa backend real)

@Injectable({
  providedIn: 'root' // Hace que el servicio sea singleton y accesible en toda la app
})
export class UsuarioService {
  constructor(private http: HttpClient) {} // Inyecta HttpClient para posibles llamadas a API (aunque ahora usamos un array mock)
  
  


  // Registro de usuario: POST /auth/register
  addUser(nombre: string, password: string) {
    return this.http.post('http://localhost:3000/auth/register', { nombre, password });
  }

  // Login de usuario: POST /auth/login
  findUser(nombre: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', { nombre, password });
  }

  // Obtener perfil (requiere token): GET /auth/profile
  getProfile(token: string) {
    return this.http.get('http://localhost:3000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
