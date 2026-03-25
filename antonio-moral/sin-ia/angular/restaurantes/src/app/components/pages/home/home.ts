import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { RecetaCard } from './components/receta-card/receta-card';
import { CommentCard } from './components/comment-card/comment-card';
import { Restaurantes } from './services/restaurantes';
import { Restaurante } from '../../../interfaces/restaurante';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private readonly restaurantesService = inject(Restaurantes);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  restaurantes: Restaurante[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getRestaurantes();
  };

  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAllRestaurantes().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los restaurantes';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}