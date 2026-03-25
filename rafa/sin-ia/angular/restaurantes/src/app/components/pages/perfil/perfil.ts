import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  miPerfil = {
    nombre: 'Rafa Garrido',
    email: 'rafa.garrido@example.com',
    nivelDeExperiencia: 'Silver',
    ubicacion: 'Granada, España',
    numeroDeValoraciones: 120,
    descripcion: 'Amante de la gastronomía y crítico culinario con más de 10 años de experiencia.',
    image:'https://fpabloiglesias.es/wp-content/uploads/2020/03/pedro-sanchez-2.jpg'
  }
}
