import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RestauranteCard } from "../components/restaurante-card/restaurante-card";
import { ActivatedRoute } from '@angular/router';
import { Restaurantes } from '../services/restaurantes';
import { Restaurante as IRestaurante } from '../../../../interfaces/restaurante';
import { CommonModule } from '@angular/common';
import { Recetas } from '../services/recetas';
import { Receta } from '../../../../interfaces/receta';
import { RecetaCard } from "../components/receta-card/receta-card";
import { CommentCard } from "../components/comment-card/comment-card";
import { Comentarios } from '../services/comentarios';
import { Comentario } from '../../../../interfaces/comentario';

@Component({
  selector: 'app-restaurante',
  imports: [RestauranteCard, CommonModule, RecetaCard, CommentCard],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante {
  private route = inject(ActivatedRoute);
  private restaurantService = inject(Restaurantes);
  private recetasService = inject(Recetas);
  private comentariosService = inject(Comentarios);
  private cdr = inject(ChangeDetectorRef);

  recetas: Receta[] = [];
  comentarios: Comentario[] = [];
  restaurante: IRestaurante | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    if (id) {
      // Cargar datos del restaurante
      this.restaurantService.getRestauranteById(id).subscribe((data) => {
            console.log('DATA:', data);
        this.restaurante = data;
        this.cdr.detectChanges();

    // Cargar recetas relacionadas
    this.recetasService.getRecetasPorRestaurante(data.id).subscribe(recetas => {
      this.recetas = recetas;
      this.cdr.detectChanges();
      });
    });
    // Cargar comentarios relacionados
    this.comentariosService.getComentariosPorRestaurante(Number(id)).subscribe(comentarios => {
      this.comentarios = comentarios;
      this.cdr.detectChanges();
      });
    }
  }

}
