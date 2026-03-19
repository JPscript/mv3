import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Restaurante } from '../../../models/restaurante.model';
import { restaurantes } from '../../../data/restaurantes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchText = '';
  sugerencias: Restaurante[] = [];

  listaRestaurantes: Restaurante[] = restaurantes;

  buscar() {
    const texto = this.searchText.toLowerCase();

    if (texto.length === 0) {
      this.sugerencias = [];
      return;
    }

    this.sugerencias = this.listaRestaurantes.filter((r: Restaurante) =>
      r.nombre.toLowerCase().includes(texto)
    );
  }

  abrirEnMaps(restaurante: Restaurante) {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurante.direccion}`;
    window.open(url, '_blank');
    this.sugerencias = [];
    this.searchText = '';
  }
}
