import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    profileForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

    handleSubmit() {
    alert('El usuario ' + this.profileForm.value.name + ' ha iniciado sesion con exito! ');
  }
}
