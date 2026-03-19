import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-registro',
  imports: [FormsModule], // Importa FormsModule para habilitar ngModel en el formulario
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  // Inyecta el servicio de usuarios para acceder a la API
  constructor(private usuarioService: UsuarioService) {}
  // Variable para almacenar el nombre ingresado por el usuario
  nombre: string = '';
  // Variable para almacenar la contraseña ingresada por el usuario
  password:string = '';
  // Variable para mostrar mensajes de error o éxito al usuario
  message: string = '';

  // Método que se ejecuta al pulsar el botón de registro
  onRegister() {
    // Llama al método addUser del servicio, que hace POST a la API
    // Nos suscribimos al Observable para manejar la respuesta asíncrona
    this.usuarioService.addUser(this.nombre, this.password).subscribe({
      // Si la API responde con éxito
      next: (respuesta) => {
        this.message = 'Registro exitoso'; // Muestra mensaje de éxito
        this.nombre = ''; // Limpia el campo nombre
        this.password = ''; // Limpia el campo password
      },
      // Si la API responde con error
      error: (err) => {
        if (err.status === 409) {
          this.message = 'El nombre ya está registrado'; // Mensaje si el nombre existe
        } else {
          this.message = 'Error en el registro'; // Mensaje para otros errores
        }
      }
    });
  }
}
