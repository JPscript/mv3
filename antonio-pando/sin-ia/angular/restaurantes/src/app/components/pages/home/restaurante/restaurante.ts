import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RestauranteUnico } from '../../../../interfaces/restaurante-unico';
import { UnRestaurante } from './services/restaurante';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecetaCard } from './components/receta-card/receta-card';
import { Comentario } from "./components/comentario/comentario";

@Component({
  selector: 'app-restaurante',
  imports: [RecetaCard, Comentario, RouterLink],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private readonly restaurantesService = inject(UnRestaurante);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  contenedorRestaurante: RestauranteUnico | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = +idString!;

    if (id) {
      this.getDetallesRestaurante(id);
    }
  }

  getDetallesRestaurante(id : number): void {

    this.isLoading = true;
    this.restaurantesService.getDetallesRestaurante(id).subscribe({

      next: (resRestaurante) => {
        this.contenedorRestaurante = resRestaurante;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el restaurante';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
