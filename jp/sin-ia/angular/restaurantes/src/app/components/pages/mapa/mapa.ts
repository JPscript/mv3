import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import * as L from 'leaflet';
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from '../home/services/restaurantes';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements AfterViewInit, OnDestroy {
  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('mapContainer')
  private mapContainer?: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private markersLayer = L.layerGroup();
  private resizeObserver?: ResizeObserver;

  protected restaurantes: Restaurante[] = [];
  protected isLoading = false;
  protected errorMessage = '';

  ngOnInit(): void {
    this.loadRestaurantes();
  }

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

    this.markersLayer.addTo(this.map);

    this.renderMarkers();

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

  private loadRestaurantes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.restaurantesService.getAllRestaurants().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.renderMarkers();
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el mapa de restaurantes.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private renderMarkers(): void {
    if (!this.map) {
      return;
    }

    const bounds = L.latLngBounds([] as L.LatLngTuple[]);

    this.markersLayer.clearLayers();

    this.restaurantes.forEach((restaurante, index) => {
      const marker = L.circleMarker([restaurante.latitud, restaurante.longitud], {
        radius: 10,
        color: '#c54377',
        fillColor: '#8443c5',
        fillOpacity: 0.85,
        weight: 3,
      });

      marker
        .addTo(this.markersLayer)
        .bindPopup(
          `<strong>${restaurante.nombre}</strong><br>${restaurante.descripcion}`,
        );

      if (index === 0) {
        marker.openPopup();
      }

      bounds.extend([restaurante.latitud, restaurante.longitud]);
    });

    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [40, 40] });
    }
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
