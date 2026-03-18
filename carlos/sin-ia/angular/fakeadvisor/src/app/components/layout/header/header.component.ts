import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { restaurantes } from '../../../data/restaurantes'; // ajusta la ruta

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchText = '';
  sugerencias: any[] = [];

  listaRestaurantes = restaurantes; // tu array completo

  buscar() {
    const texto = this.searchText.toLowerCase();

    if (texto.length === 0) {
      this.sugerencias = [];
      return;
    }

    this.sugerencias = this.listaRestaurantes.filter(r =>
      r.nombre.toLowerCase().includes(texto)
    );
  }

  abrirEnMaps(restaurante: any) {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurante.direccion}`;
    window.open(url, '_blank');
    this.sugerencias = [];
    this.searchText = '';
  }
}
