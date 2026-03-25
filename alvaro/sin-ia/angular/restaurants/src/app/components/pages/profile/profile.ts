import { Component } from '@angular/core';

/**
 * Profile Component
 *
 * Displays the current user's profile information.
 *
 * TODO: Connect to authentication service and load real user data.
 */
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  /** Placeholder user name (will be replaced with real user data) */
  fakeUser = 'John Doe';
}

