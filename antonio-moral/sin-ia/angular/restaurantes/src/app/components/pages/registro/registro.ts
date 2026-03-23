import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  profileForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

    handleSubmit() {
    alert('El usuario ' + this.profileForm.value.name + ' ha sido registrado con exito! ');
  }

}
