// `Injectable` marca esta clase como servicio utilizable por Angular.
// `inject` es la forma moderna de pedir dependencias sin usar constructor.
import { Injectable, inject } from '@angular/core';
// `HttpClient` es la herramienta oficial de Angular para hacer peticiones HTTP.
import { HttpClient } from '@angular/common/http';
// `Observable` representa un flujo de datos que llegara en el tiempo.
// En una peticion HTTP, la respuesta no existe al instante: llega despues.
import { Observable } from 'rxjs';
// Importamos la interface para tipar lo que esperamos recibir desde la API.
import { Restaurante } from '../../../../interfaces/restaurante';

@Injectable({
  // `providedIn: 'root'` hace que Angular cree una unica instancia global
  // de este servicio para toda la aplicacion.
  providedIn: 'root',
})
export class Restaurantes {
	// `private` significa que esta propiedad solo se usa dentro de esta clase.
	// `readonly` indica que no queremos reasignarla mas adelante.
	// Aqui Angular inyecta automaticamente una instancia de HttpClient.
	private readonly http = inject(HttpClient);
	// URL base del backend para no repetir el mismo prefijo en todos los metodos.
	private readonly apiUrl = 'http://127.0.0.1:3000';

	// Este metodo pide al backend la lista completa de restaurantes.
	// Devuelve `Observable<Restaurante[]>`, es decir:
	// "cuando llegue la respuesta, sera un array de restaurantes".
	getAll(): Observable<Restaurante[]> {
		// `this.http.get<Restaurante[]>()` hace una peticion GET y ademas tipa la respuesta.
		return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
	}
}
