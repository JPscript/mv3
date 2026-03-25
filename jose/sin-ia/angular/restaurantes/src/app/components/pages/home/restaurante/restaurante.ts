import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { Restaurante as RestauranteModel } from '../../../../models/restaurante.model';

@Component({
  selector: 'app-restaurante',
  imports: [],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css',
  standalone: true
})
// Senior Cat dice: Este componente muestra el detalle de un restaurante.
// Obtiene el id de la URL, busca el restaurante y lo muestra.
export class RestaurantePage implements OnInit {

  // Signal reactivo que almacena el restaurante seleccionado.
  // Su valor inicial es null hasta que se cargan los datos.
  // Cuando se actualiza, la vista se refresca automáticamente.
  public restaurante = signal<RestauranteModel | null>(null)

  constructor( private route: ActivatedRoute, private restauranteService: RestauranteService ){}
  

  ngOnInit(): void {
      // 1. Recoge el id de la URL y lo convierte a número
      // Por ejemplo, si la URL es /restaurantes/5, numberId será 5
      const numberId = Number(this.route.snapshot.paramMap.get('id'));

      // 2. Pide la lista de restaurantes al servicio
      // Cuando llegan los datos, ejecuta la función del subscribe
      this.restauranteService.getRestaurantes().subscribe((restaurantes) => {
        // 3. Busca en la lista el restaurante cuyo id coincide con el de la URL
        // Si no lo encuentra, asigna null (para evitar el error de tipo)
        const restauranteSeleccionado = restaurantes.find(r => r.id === numberId) || null;
        // Actualiza el signal con el restaurante encontrado (o null si no existe).
        // Esto hace que la vista se refresque automáticamente y muestre los datos del restaurante.
        this.restaurante.set(restauranteSeleccionado);
      });
   
   
    
    
  }
}