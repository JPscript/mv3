import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Login Component
 *
 * Displays a login form where users can enter credentials.
 * - Receives username and password as inputs
 * - Has a link to navigate to registration page
 *
 * TODO: Add actual login logic and form submission handling.
 */
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  /** Username input value */
  username = input<string>();
  
  /** Password input value */
  password = input<string>();

  constructor(private router: Router) {}

  /**
   * Navigate to the registration page.
   * Called when user clicks "Don't have an account? Register"
   */
  register() {
    this.router.navigate(['/registration']);
  }
}
