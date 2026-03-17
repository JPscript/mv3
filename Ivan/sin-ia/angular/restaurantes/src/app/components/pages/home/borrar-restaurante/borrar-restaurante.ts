import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrar-restaurante',
  standalone: true,
  templateUrl: './borrar-restaurante.html',
})
export class BorrarRestaurante {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Borrar restaurante con ID:', this.id);
  }

}