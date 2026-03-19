import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  fechaCompleta: string = '';
  horaCompleta: string = '';

  constructor() {
    this.actualizarFechaYHora();

    setInterval(() => {
      this.actualizarFechaYHora();
    }, 1000);
  }

  actualizarFechaYHora() {
    const now = new Date();

    this.fechaCompleta = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    this.horaCompleta = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}



