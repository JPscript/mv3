import { Component, input } from '@angular/core';

/**
 * Registration Component
 *
 * Displays a registration form where new users can create an account.
 * - Receives username and password as inputs
 *
 * TODO: Add form validation, password confirmation, and account creation logic.
 */
@Component({
  selector: 'app-registration',
  imports: [],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  /** Username input value */
  username = input<string>();
  
  /** Password input value (fixed typo: was 'passwpord') */
  password = input<string>();
}

