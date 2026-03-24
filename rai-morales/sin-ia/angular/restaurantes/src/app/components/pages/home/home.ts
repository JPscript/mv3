import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from './services/restaurantes';


@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  allRestaurantes: Restaurante[] = [];
  isloading = false;
  errorMessage = '';

  ngOnInit(): void {

    this.getRestaurantes();
  }

  getRestaurantes(): void {

    this.isloading = true;
    this.restaurantesService.getAllRestaurants().subscribe({

      next: (respuestaRestaurantes) => {

        this.allRestaurantes = respuestaRestaurantes;
        this.isloading = false;
        this.changeDetectorRef.detectChanges();
      },

      error: () => {

        this.errorMessage = 'No se pudieron cargar los restaurantes.';
        this.isloading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

}
