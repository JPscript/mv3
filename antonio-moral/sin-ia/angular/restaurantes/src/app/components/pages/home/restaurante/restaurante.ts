import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RestauranteCard } from "../components/restaurante-card/restaurante-card";
import { ActivatedRoute } from '@angular/router';
import { Restaurantes } from '../services/restaurantes';
import { Restaurante as IRestaurante } from '../../../../interfaces/restaurante';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurante',
  imports: [RestauranteCard, CommonModule],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
})
export class Restaurante {
  private route = inject(ActivatedRoute);
  private restaurantService = inject(Restaurantes);
    private cdr = inject(ChangeDetectorRef);

  
  restaurante: IRestaurante | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    if (id) {
      this.restaurantService.getRestauranteById(id).subscribe((data) => {
            console.log('DATA:', data);
        this.restaurante = data;
        this.cdr.detectChanges();
      });
    }
  }

}
