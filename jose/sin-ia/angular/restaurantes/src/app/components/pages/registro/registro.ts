// Componente Registro: gestiona el formulario y la lógica de registro de usuario.
// Aquí se conecta el formulario visual con la lógica para crear un nuevo usuario en la API.

import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service'; // Servicio para registrar usuarios
import { FormsModule } from '@angular/forms'; // Necesario para usar [(ngModel)] en el formulario

@Component({
  selector: 'app-registro', // Nombre de la etiqueta personalizada para este componente
  imports: [FormsModule], // Importa FormsModule para habilitar ngModel en el formulario
  templateUrl: './registro.html', // HTML asociado al formulario de registro
  styleUrl: './registro.css', // CSS para estilos del registro
})
export class Registro {
  // Constructor: inyecta el servicio de usuario para registrar y acceder a la API
  constructor(private usuarioService: UsuarioService) {}

  // Variables enlazadas al formulario visual mediante [(ngModel)]
  nombre: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada
  message: string = ''; // Mensaje para mostrar errores o éxito

  // Método que se ejecuta al enviar el formulario de registro
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
