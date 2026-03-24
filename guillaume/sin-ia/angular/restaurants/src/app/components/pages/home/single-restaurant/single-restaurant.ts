import { ChangeDetectorRef, OnInit, Inject, Component, inject } from '@angular/core';
import { RestauranteService } from './services/restaurante';
import { Restaurante } from '../../../../interfaces/restaurante';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-restaurant',
  imports: [],
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

    // ou, pour réagir aux changements dynamiques :
    // this.route.paramMap.subscribe(params => { const id = params.get('id'); });
  }


  isLoading = false;

  errorMessage = '';

  // ngOnInit(): void {
  //   this.getRestaurante(id);
  // }



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
}
