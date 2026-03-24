// Componente Login: gestiona el formulario y la lógica de inicio de sesión.
// Aquí se conecta el formulario visual con la lógica de autenticación y navegación.

import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para usar [(ngModel)] en el formulario
import { Router } from '@angular/router'; // Permite redirigir al usuario tras el login
import { UsuarioService } from '../../../services/usuario.service'; // Servicio para autenticar usuarios
import { LoginResponse } from '../../../models/login-response.model'; // Modelo de la respuesta esperada al hacer login

@Component({
  selector: 'app-login', // Nombre de la etiqueta personalizada para este componente
  imports: [FormsModule], // Importa FormsModule para habilitar ngModel en el formulario
  templateUrl: './login.html', // HTML asociado al formulario de login
  styleUrl: './login.css', // CSS para estilos del login
})
export class Login {
  // Constructor: inyecta el servicio de usuario para autenticación y el router para navegación
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Variables enlazadas al formulario visual mediante [(ngModel)]
  nombre: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada
  message: string = ''; // Mensaje para mostrar errores o éxito

  // Método que se ejecuta al enviar el formulario
  onLogin() {
    // Llama al servicio para buscar el usuario y autenticarlo
    this.usuarioService.findUser(this.nombre, this.password).subscribe(
      (respuesta: LoginResponse) => {
        // Si la respuesta contiene un token, el login fue exitoso
        if (respuesta && respuesta.access_token) {
          // Guarda el token en localStorage para futuras peticiones autenticadas
          localStorage.setItem('token', respuesta.access_token);
          this.message = 'Inicio de sesión exitoso';
          // Redirige al usuario a la página de perfil
          this.router.navigate(['/perfil']);
        } else {
          // Si la respuesta no es la esperada, muestra un mensaje de error
          this.message = 'Respuesta inesperada de la API';
        }
      },
      error => {
        // Si hay error (usuario o contraseña incorrectos), muestra mensaje de error
        this.message = 'Credenciales incorrectas';
      }
    );
  }
}
