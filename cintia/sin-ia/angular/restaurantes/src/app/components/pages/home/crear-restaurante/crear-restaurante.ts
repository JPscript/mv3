import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-restaurante',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-restaurante.html',
  styleUrl: './crear-restaurante.css',
})


export class CrearRestaurante {
  restauranteForm = new FormGroup({
  nombre: new FormControl(''),
  descripcion: new FormControl(''),
  imagen: new FormControl(''),
  latitud: new FormControl(''),
  longitud: new FormControl('')
});
crearRestaurante(){
  if (this.restauranteForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    console.log('Restaurante creado:', this.restauranteForm.value);
    this.restauranteForm.reset();
  }
};



