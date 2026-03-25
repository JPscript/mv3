import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  // CREO UN USUARIO DE PRUEBA PARA MOSTRAR EN EL PERFIL
  usuario = {
    usuario: 'Juan Pérez',
    foto: 'https://via.placeholder.com/150'
  };
}
