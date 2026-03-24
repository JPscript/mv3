import { Component, input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-restaurante-card',
  imports: [RouterModule],
  templateUrl: './restaurante-card.html',
  styleUrl: './restaurante-card.css',
})
export class RestauranteCard {

  //CREAMOS LAS PROPIEDADES DEL COMPONENTE PARA RECIBIR LOS DATOS DE CADA RESTAURANTE

  id = input<number>();
  nombre = input<string>();
  descripcion = input<string>();
  fotografia_url = input<string>();
  lat = input<number>();
  lng = input<number>();

  llamoConsola() {

    console.log(this.id);

  }
  constructor(private router: Router) {} //NO ENTIENDO BIEN PORQUE UN CONSTRUCTOR
  
  ubicacionClick(event: Event) {

    event.stopPropagation(); //EVITAMOS QUE EL CLICK EN EL BOTÓN DE UBICACIÓN DISPARÉ EL ENLACE DEL CARD
    this.router.navigate(['mapa'], { queryParams: { lat: this.lat, lng: this.lng } });
  }

}
