import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ComentarioCard } from './components/comentario-card/comentario-card';
import { RecetaCard } from './components/receta-card/receta-card';
import { Comentario } from '../../../../interfaces/comentario';
import { RestauranteUnico } from '../../../../interfaces/restaurante-unico';
import { Receta } from '../../../../interfaces/receta';
import { Comentarios } from './services/comentarios';
import { Recetas } from './services/recetas';
import { UnRestaurante } from './services/un-restaurante';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  imports: [ComentarioCard, RecetaCard],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante implements OnInit{

  //SACAMOS EL ID Y ESTO NO LO ENTIENDO BIEN

  constructor(
    private route: ActivatedRoute
  ) {}

  private readonly unRestauranteService = inject(UnRestaurante);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  contenedorRestaurante: RestauranteUnico | null = null;
  isloading = false;
  errorMessage = '';

  ngOnInit(): void {

    //OBTENEMOS EL ID DE LA URL

    const idString = this.route.snapshot.paramMap.get('id');
    const id = +idString!;

    //LLAMAMOS AL SERVICIO CON ESE ID

    if (id) {
      this.getRestaurante(id);
    }
  }

  getRestaurante(id : number): void {

    this.isloading = true;
    this.unRestauranteService.getRestauranteById(id).subscribe({

      next: (respuestaRestaurante) => {

        console.log('Lo que llega de la API: ',respuestaRestaurante);
        this.contenedorRestaurante = respuestaRestaurante;
        this.isloading = false;
        this.changeDetectorRef.detectChanges();
      },

      error: () => {

        this.errorMessage = 'No se pudo cargar el restaurante';
        this.isloading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
