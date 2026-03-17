import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-restaurante',
  standalone: true,
  templateUrl: './crear-restaurante.html',
})
export class CrearRestaurante {

  crear(nombre: string, descripcion: string) {
    console.log(nombre, descripcion);
  }

}