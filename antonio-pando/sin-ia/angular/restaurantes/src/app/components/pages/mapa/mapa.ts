import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

interface RestauranteMapa {
  id: number;
  nombre: string;
  descripcion: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer')
  private mapContainer?: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private resizeObserver?: ResizeObserver;

  protected readonly restaurantesHardcoded: RestauranteMapa[] = [
    {
      id: 1,
      nombre: 'La Esquina de Senior Cat',
      descripcion: 'Brunch tranquilo para arrancar el dia.',
      lat: 40.4168,
      lng: -3.7038,
    },
    {
      id: 2,
      nombre: 'Bistro Ladrillos',
      descripcion: 'Cocina mediterranea para compartir.',
      lat: 41.3874,
      lng: 2.1686,
    },
    {
      id: 3,
      nombre: 'Mapa y Mesa',
      descripcion: 'Bowls y platos ligeros en el centro.',
      lat: 39.4699,
      lng: -0.3763,
    },
    {
      id: 4,
      nombre: 'Puerto Sabor',
      descripcion: 'Arroces y producto de costa.',
      lat: 36.7213,
      lng: -4.4214,
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeMap();
    }, 0);
  }

  private initializeMap(): void {
    const mapContainer = this.mapContainer?.nativeElement;

    if (!mapContainer || this.map) {
      return;
    }

    this.map = L.map(mapContainer, {
      zoomControl: true,
    }).setView([40.4168, -3.7038], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    const bounds = L.latLngBounds([] as L.LatLngTuple[]);

    this.restaurantesHardcoded.forEach((restaurante, index) => {
      const marker = L.circleMarker([restaurante.lat, restaurante.lng], {
        radius: 10,
        color: '#c54377',
        fillColor: '#8443c5',
        fillOpacity: 0.85,
        weight: 3,
      });

      marker
        .addTo(this.map!)
        .bindPopup(
          `<strong>${restaurante.nombre}</strong><br>${restaurante.descripcion}`,
        );

      if (index === 0) {
        marker.openPopup();
      }

      bounds.extend([restaurante.lat, restaurante.lng]);
    });

    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [40, 40] });
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.map?.invalidateSize();
      });

      this.resizeObserver.observe(mapContainer);
    }

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.map?.invalidateSize();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = undefined;
  }
}
