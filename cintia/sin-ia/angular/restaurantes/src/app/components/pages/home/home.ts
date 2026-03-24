import { Component } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RestauranteCard, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  restaurantesFake = [
    {
      id: 1,
      nombre: 'Restaurante A',
      descripcion: 'Descripcion del Restaurante A',
      imagen: "assets/id1.jpg",
      coordenadas: { latitud: 40.7128, longitud: -74.0060 },
    },
    {
      id: 2,
      nombre: 'Restaurante B',
      descripcion: 'Descripcion del Restaurante B',
      imagen: "assets/id2.jpg",
      coordenadas: { latitud: 34.0522, longitud: -118.2437 },
    },
    {
      id: 3,
      nombre: 'Restaurante C',
      descripcion: 'Descripcion del Restaurante C',
      imagen: "assets/id3.jpg",
      coordenadas: { latitud: 41.8781, longitud: -87.6298 },
    },
    {
      id: 4,
      nombre: 'Restaurante D',
      descripcion: 'Descripcion del Restaurante D',
      imagen: "assets/id4.jpg",
      coordenadas: { latitud: 29.7604, longitud: -95.3698 },
    },
    {
      id: 5,
      nombre: 'Restaurante E',
      descripcion: 'Descripcion del Restaurante E',
      imagen: "assets/id5.jpg",
      coordenadas: { latitud: 33.4481, longitud: -112.0752 },
    }
  ]

  restauranteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.restauranteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
    });
  }

  crearRestaurante() {
    if (this.restauranteForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const nuevoRestaurante = {
      id: this.restaurantesFake.length + 1,
      nombre: this.restauranteForm.value.nombre,
      descripcion: this.restauranteForm.value.descripcion,
      imagen: this.restauranteForm.value.imagen || 'assets/default.jpg',
      coordenadas: {
        latitud: this.restauranteForm.value.latitud,
        longitud: this.restauranteForm.value.longitud,
      }
    };

    this.restaurantesFake.push(nuevoRestaurante);
    this.restauranteForm.reset();
    console.log('Restaurante creado:', nuevoRestaurante);
  }

  actualizarRestaurante(id: number) {
    console.log('Actualizar restaurante con id', id);
  }

  eliminarRestaurante(id: number) {
    console.log('Eliminar restaurante con id', id);
    this.restaurantesFake = this.restaurantesFake.filter(r => r.id !== id);
  }

  trackById(index: number, restaurante: any) {
    return restaurante.id;
  }
}



