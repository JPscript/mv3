// `Component` convierte esta clase en un componente Angular.
// `OnInit` indica que implementaremos el ciclo de vida `ngOnInit`.
// `inject` permite pedir dependencias sin usar constructor.
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
// Importamos el componente hijo que mostrara cada restaurante.
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
// Importamos la interface para tipar correctamente el array de restaurantes.
import { Restaurante } from '../../../interfaces/restaurante';
// Importamos el servicio que contiene las llamadas HTTP.
import { Restaurantes } from './services/restaurantes';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Inyectamos el servicio de restaurantes para poder reutilizar sus metodos.
  // `private readonly` indica que es de uso interno y que no deberia reasignarse.
  private readonly restaurantesService = inject(Restaurantes);
  // En algunos flujos asincronos necesitamos avisar manualmente a Angular
  // para que repinte la pantalla cuando llegan los datos.
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // Estado local donde guardamos la lista que llega desde la API.
  restaurantes: Restaurante[] = [];
  // Mientras la peticion esta en curso mostramos un mensaje de carga.
  isLoading = false;
  // Mensaje de error simple para mostrar en la plantilla si falla la carga.
  errorMessage = '';

  // Angular llama a `ngOnInit` cuando el componente ya esta inicializado.
  // Aqui aprovechamos para cargar los restaurantes nada mas entrar en la pagina.
  ngOnInit(): void {
    this.getRestaurantes();
  }

  // Este metodo se encarga de pedir los restaurantes al servicio.
  // Lo usamos al iniciar la pagina y tambien como reintento si hubo error.
  getRestaurantes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // `getAll()` devuelve un Observable, asi que usamos `subscribe()`
    // para reaccionar cuando llegue la respuesta del servidor.
    this.restaurantesService.getAll().subscribe({
      // `next` se ejecuta cuando la peticion se resuelve correctamente.
      // El parametro `restaurantes` contiene la respuesta recibida.
      next: (restaurantes) => {
        // Guardamos los datos en el estado local del componente.
        this.restaurantes = restaurantes;
        // Indicamos que la carga ya termino.
        this.isLoading = false;
        // Forzamos la actualizacion de la vista para que no dependa de un click.
        this.changeDetectorRef.detectChanges();
      },
      // `error` se ejecuta si la peticion falla.
      // Puede fallar por backend apagado, URL incorrecta o problemas de red.
      error: () => {
        this.isLoading = false;
        // Guardamos un mensaje simple para mostrarlo en pantalla.
        this.errorMessage = 'No se pudieron cargar los restaurantes.';
        // Actualizamos la vista tambien en caso de error.
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
