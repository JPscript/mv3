import { Component, OnDestroy, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { RestaurantsService } from '../home/services/restaurants/restaurants-service';
import { Restaurant } from '../../../interfaces/restaurant';

/**
 * Map Component
 *
 * Displays a map showing all restaurant locations.
 *
 * TODO: Integrate a real map library (e.g., Leaflet, Mapbox, Google Maps)
 * and display restaurant markers with coordinates.
 */
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit, OnDestroy {
  private readonly restaurantsService = inject(RestaurantsService);

  private mapInstance: L.Map | null = null;
  private markersLayer: L.LayerGroup = L.layerGroup();

  ngAfterViewInit(): void {
    this.initializeMap();
    this.loadRestaurants();
  }

  ngOnDestroy(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
  }

  private initializeMap(): void {
    this.mapInstance = L.map('restaurants-map', {
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 18,
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mapInstance);

    this.markersLayer.addTo(this.mapInstance);
  }

  private loadRestaurants(): void {
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (restaurants: Restaurant[]) => {
        this.renderRestaurantMarkers(restaurants);
      },
      error: () => {
        this.renderRestaurantMarkers([]);
      },
    });
  }

  private renderRestaurantMarkers(restaurants: Restaurant[]): void {
    if (!this.mapInstance) {
      return;
    }

    this.markersLayer.clearLayers();

    const validRestaurants = restaurants.filter(
      (restaurant) =>
        Number.isFinite(restaurant.latitud) && Number.isFinite(restaurant.longitud)
    );

    const markerBounds: L.LatLngTuple[] = [];

    for (const restaurant of validRestaurants) {
      const latLng: L.LatLngTuple = [restaurant.latitud, restaurant.longitud];

      L.circleMarker(latLng, {
        radius: 8,
        weight: 2,
      })
        .bindPopup(`<strong>${restaurant.nombre}</strong><br>${restaurant.descripcion}`)
        .addTo(this.markersLayer);

      markerBounds.push(latLng);
    }

    if (markerBounds.length > 0) {
      this.mapInstance.fitBounds(markerBounds, { padding: [40, 40], maxZoom: 6 });
    } else {
      this.mapInstance.setView([20, 0], 2);
    }
  }
}

