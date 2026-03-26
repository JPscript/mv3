import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from '../home/services/restaurantes';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements OnInit {
  private readonly restaurantesService = inject(Restaurantes);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  restaurantes: Restaurante[] = [];
  selectedRestaurante: Restaurante | null = null;
  mapUrl: SafeResourceUrl = this.buildMapUrl(40.4192, -3.7038);
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.loadRestaurantes();
  }

  selectRestaurante(restaurante: Restaurante): void {
    this.selectedRestaurante = restaurante;
    this.mapUrl = this.buildMapUrl(restaurante.latitud, restaurante.longitud);
  }

  private loadRestaurantes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.restaurantes = [];
    this.selectedRestaurante = null;

    this.restaurantesService.getAllRestaurantes().pipe(
      finalize(() => {
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }),
    ).subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes.slice(0, 4);

        if (this.restaurantes.length > 0) {
          this.selectRestaurante(this.restaurantes[0]);
        } else {
          this.errorMessage = 'No hay restaurantes para mostrar en el mapa.';
        }
      },
      error: (error: unknown) => {
        this.errorMessage = 'No se pudo cargar la lista de restaurantes para el mapa.';

        if (typeof error === 'object' && error !== null && 'status' in error) {
          const status = String((error as { status: unknown }).status);
          this.errorMessage += ` Estado: ${status}.`;
        }
      },
    });
  }

  private buildMapUrl(latitud: number, longitud: number): SafeResourceUrl {
    const delta = 0.015;
    const left = longitud - delta;
    const right = longitud + delta;
    const bottom = latitud - delta;
    const top = latitud + delta;

    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitud}%2C${longitud}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
