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
    nombre: 'DiverXO',
    descripcion: 'Cocina vanguardista y creativa del chef Dabiz Muñoz. Una experiencia surrealista única.',
    lat: 40.4583,
    lng: -3.6860,
  },
  {
    id: 2,
    nombre: 'Central Restaurante',
    descripcion: 'Exploración de los ecosistemas peruanos a través de diferentes altitudes.',
    lat: -12.1301,
    lng: -77.0229,
  },
  {
    id: 3,
    nombre: 'Osteria Francescana',
    descripcion: 'El arte de la cocina italiana reinventado por Massimo Bottura en Módena.',
    lat: 44.6448,
    lng: 10.9216,
  },
  {
    id: 4,
    nombre: 'Eleven Madison Park',
    descripcion: 'Cocina de alta gama basada en plantas con vistas icónicas a Madison Park.',
    lat: 40.7416,
    lng: -73.9872,
  },
  {
    id: 5,
    nombre: 'Noma',
    descripcion: 'Pionero de la nueva cocina nórdica, enfocado en ingredientes locales y fermentación.',
    lat: 55.6828,
    lng: 12.6105,
  },
  {
    id: 6,
    nombre: 'Azurmendi',
    descripcion: 'Sostenibilidad y alta gastronomía vasca integradas en un edificio bioclimático.',
    lat: 43.2641,
    lng: -2.8123,

  }
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