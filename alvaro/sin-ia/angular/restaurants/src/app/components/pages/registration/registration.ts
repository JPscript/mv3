import { Component, input } from '@angular/core';

@Component({
  selector: 'app-registration',
  imports: [],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  username = input<string>();
  passwpord = input<string>();
}
