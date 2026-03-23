import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../../../services/usuario.service';
import {LoginResponse} from '../../../models/login-response.model';
@Component({
  selector: 'app-login',
  imports: [FormsModule], // Importa FormsModule para habilitar ngModel en el formulario
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private usuarioService: UsuarioService, private router: Router) {} // Inyecta el servicio de usuarios y el router
  nombre: string = ''; // Variable para almacenar el nombre ingresado por el usuario
  password:string = ''; // Variable para almacenar la contraseña ingresada por el usuario
  message: string = ''; // Variable para mostrar mensajes de error o éxito al usuario
  onLogin() {
    // Lógica de autenticación usando la API real y manejo del token
    this.usuarioService.findUser(this.nombre, this.password).subscribe(
      (respuesta: LoginResponse) => {
        // Guardar el token recibido en localStorage
        if (respuesta && respuesta.access_token) {
          localStorage.setItem('token', respuesta.access_token);
          this.message = 'Inicio de sesión exitoso';
          this.router.navigate(['/perfil']);
        } else {
          this.message = 'Respuesta inesperada de la API';
        }
      },
      error => {
        this.message = 'Credenciales incorrectas';
      }
    );
  }
  
}
