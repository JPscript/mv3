import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // <-- Asegúrate de tener estos tres
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'restaurantes-app';
  buscar(texto: string) {
    if (texto.trim().length > 0) {
      alert('Has buscado: ' + texto);
    } else {
      alert('Escribe algo para buscar');
    }
  }
}
