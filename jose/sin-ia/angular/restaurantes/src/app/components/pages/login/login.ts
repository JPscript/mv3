import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../../../services/usuario.service';
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
    // Aquí se implementaría la lógica de autenticación, como llamar a un servicio de autenticación
    console.log('Nombre:', this.nombre);
    console.log('Password:', this.password);
    // Depuración: mostrar usuarios actuales
    console.log('Usuarios en login:', this.usuarioService.findUser(this.nombre, this.password));
    const usuario = this.usuarioService.findUser(this.nombre, this.password);
    if (usuario) {
      this.message = 'Inicio de sesión exitoso'; // Ejemplo de mensaje de éxito
      this.router.navigate(['/perfil']); // Redirige al usuario a la página de inicio después del login
    } else {
      this.message = 'Credenciales incorrectas'; // Ejemplo de mensaje de error (descomentar para probar)
    }
  }
  
}
