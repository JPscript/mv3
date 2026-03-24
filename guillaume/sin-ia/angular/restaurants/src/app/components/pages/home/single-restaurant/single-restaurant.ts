import { ChangeDetectorRef, OnInit, Inject, Component, inject, input } from '@angular/core';
import { RestauranteService } from './services/restaurante';
import { Restaurante } from '../../../../interfaces/restaurante';

import { ActivatedRoute } from '@angular/router';
import { Receta } from '../components/receta/receta';
import { Receta as IReceta} from '../../../../interfaces/receta.interface';
import { RecetaService } from '../components/receta/services/receta.service';

@Component({
  selector: 'app-single-restaurant',
  imports: [Receta],
  templateUrl: './single-restaurant.html',
  styleUrl: './single-restaurant.css',
})
export class SingleRestaurant implements OnInit{

  private readonly restauranteService = inject(RestauranteService);

  private readonly recetaService = inject(RecetaService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public restaurante?: Restaurante | null = null;

  public recetas?: IReceta[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? parseInt(idString, 10) : null;

    if (id) {
      this.getRestaurante(id);
      this.getRecetas(id);
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

  getRecetas(id: number): void {
    this.isLoading = true;
    this.recetaService.getRecetas(id).subscribe ({
      next: (receta) => {
        console.log(receta);

        this.recetas = receta;
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


  // recetas: IReceta[] = [
  //   {
  //     id: 1,
  //     restaurant_id: 1,
  //     nombre: 'Receta 1',
  //     descripcion: 'Descripción de la receta 1',
  //     ingredientes: 'Ingredientes de la receta 1',
  //     tiempo_min: 30,
  //     dificultad: 'media',
  //     image_url: 'algo',
  //   },
  //   {
  //     id: 2,
  //     restaurant_id: 1,
  //     nombre: 'Receta 2',
  //     descripcion: 'Descripción de la receta 2',
  //     ingredientes: 'Ingredientes de la receta 2',
  //     tiempo_min: 45,
  //     dificultad: 'dificil',
  //     image_url: '',
  //   }
  // ];
}
