import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  // Datos del usuario (Imagina que vienen del Login)
  usuario = signal({
    nombre: 'Jose Luis',
    email: 'jose@correo.com',
    foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    fechaRegistro: 'Marzo 2026',
    favoritos: ['Pizzería Roma', 'Sushi House', 'La Hamburguesería'],
  });
}
