import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { restaurantes } from '../../data/restaurantes';
import { CommonModule } from '@angular/common';
import { RestauranteCardComponent } from '../pages/home/components/restaurante-card/restaurante-card.component';

@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [CommonModule, RouterModule, RestauranteCardComponent],
  templateUrl: './restaurante.component.html',
  styleUrl: './restaurante.component.css'
})
export class RestauranteComponent implements OnInit {

  restaurante: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurante = restaurantes.find(r => r.id === id);
  }
}
