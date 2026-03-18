import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa {
  // 1. Creamos el Signal para la ubicación (lo que pide tu HTML)
  ubicacionActual = signal({
    lat: 40.4167,
    lng: -3.7037,
  });

  // 2. Creamos la función para el botón
  actualizarMapa() {
    alert('Buscando tu señal GPS...');
    // Aquí podrías cambiar los números del signal
    this.ubicacionActual.set({
      lat: 39.4699,
      lng: -0.3763,
    });
  }
}
