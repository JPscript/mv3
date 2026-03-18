import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = input<string>();
  password = input<string>();

  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/registration']);
  }
}
