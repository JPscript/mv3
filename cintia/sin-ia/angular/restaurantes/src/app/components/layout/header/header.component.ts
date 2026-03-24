import { Component } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [ɵEmptyOutletComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  title = 'restaurantes';
  imagen: string = 'assets/grandma.svg'
}