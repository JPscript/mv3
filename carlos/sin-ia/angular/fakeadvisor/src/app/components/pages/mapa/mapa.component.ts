import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { restaurantes } from '../../../data/restaurantes';

const iconRetinaUrl = '../../../../../public/marker-icon-2x.png';
const iconUrl = '../../../../../public/marker-icon.png';
const shadowUrl = '../../../../../public/marker-shadow.png';


L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = L.map('map').setView([40.4168, -3.7038], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    restaurantes.forEach(r => {
      if (r.lat && r.lng) {
        const marker = L.marker([r.lat, r.lng]).addTo(map);

        marker.bindPopup(`
          <b>${r.nombre}</b><br>
          ${r.direccion}<br>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.direccion)}" target="_blank">
            Ver en Google Maps
          </a>
        `);
      }
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
    
  }
}
