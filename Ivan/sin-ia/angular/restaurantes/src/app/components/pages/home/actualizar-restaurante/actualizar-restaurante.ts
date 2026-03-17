import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-restaurante',
  standalone: true,
  templateUrl: './actualizar-restaurante.html',
})
export class ActualizarRestaurante {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Editar restaurante con ID:', this.id);
  }

}