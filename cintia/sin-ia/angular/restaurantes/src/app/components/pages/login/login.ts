import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuarioForm = new FormGroup({
  nombre: new FormControl(''),
  intereses: new FormControl(''),
  ifoto: new FormControl(''),
});
crearUsuario(){
  if (this.usuarioForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    console.log('Restaurante creado:', this.usuarioForm.value);
    this.usuarioForm.reset();
  }
};


