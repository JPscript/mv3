import { ChangeDetectorRef, OnInit, Inject, Component, inject, input } from '@angular/core';
import { RestauranteService } from './services/restaurante';
import { Restaurante } from '../../../../interfaces/restaurante';

import { ActivatedRoute } from '@angular/router';
import { Receta } from '../components/receta/receta';

@Component({
  selector: 'app-single-restaurant',
  imports: [Receta],
  templateUrl: './single-restaurant.html',
  styleUrl: './single-restaurant.css',
})
export class SingleRestaurant implements OnInit{

  private readonly restauranteService = inject(RestauranteService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public restaurante?: Restaurante | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? parseInt(idString, 10) : null;

    if (id) {
      this.getRestaurante(id);
    }
  }


  isLoading = false;

  errorMessage = '';


  getRestaurante(id: number): void {
    this.isLoading = true;
    this.restauranteService.getRestaurant(id).subscribe ({
      next: (restaurante) => {
        this.restaurante = restaurante;
        console.log(this.restaurante);

        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = "my error message";

        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  recetas = [
    {
      id: 1,
      restaurant_id: 1,
      nombre: 'Receta 1',
      descripcion: 'Descripción de la receta 1',
      ingredientes: 'Ingredientes de la receta 1',
      tiempo_min: 30,
      dificultad: 'media',
      image_url: 'algo',
    },
    {
      id: 2,
      restaurant_id: 1,
      nombre: 'Receta 2',
      descripcion: 'Descripción de la receta 2',
      ingredientes: 'Ingredientes de la receta 2',
      tiempo_min: 45,
      dificultad: 'dificil',
      image_url: 'algo',
    }
  ];
}
