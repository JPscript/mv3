import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Header Component
 *
 * Displays the top navigation bar with:
 * - Brand logo and title (left)
 * - Search bar (center)
 * - Links to map and profile (right)
 *
 * This is a simple presentational component with no properties or methods.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // This component has no properties or methods.
  // It just displays the static navigation structure.
}
