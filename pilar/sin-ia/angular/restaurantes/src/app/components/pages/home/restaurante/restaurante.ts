import { ChangeDetectorRef, OnInit, Inject, Component, inject, input, computed } from '@angular/core';
import { RestauranteService } from './services/restaurante';
import { Restaurante } from '../../../../interfaces/restaurante';

import { ActivatedRoute } from '@angular/router';
import { Receta } from '../components/receta/receta';
import { Receta as IReceta} from '../../../../interfaces/receta-interface';
import { RecetaService } from '../components/receta/services/receta.service';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { Comentarios } from '../components/comentarios/comentarios';

@Component({
  selector: 'app-restaurante',
  imports: [Receta, Comentarios],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class RestauranteComponent implements OnInit{

  private readonly restauranteService = inject(RestauranteService);

  private readonly recetaService = inject(RecetaService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly authService = inject(AuthService);

  public restaurante?: Restaurante | null = null;

  public recetas?: IReceta[] = [];

  public isOwner = computed(() => {
    const user = this.authService.currentUser();
    return user && this.restaurante ? user.id === this.restaurante.user_id : false;
  });

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

}