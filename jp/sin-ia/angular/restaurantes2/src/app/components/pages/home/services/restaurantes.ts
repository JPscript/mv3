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
import { Comment } from '../../../../interfaces/comment';
import { MyRating, RatingMutationResponse, RatingSummary } from '../../../../interfaces/rating';

// Estas interfaces auxiliares nos ayudan a tipar payloads y respuestas de endpoints privados.
export interface CreateOrUpdateRestaurantPayload {
	nombre: string;
	descripcion: string;
	latitud: number;
	longitud: number;
}

export interface CreateCommentPayload {
	comentario: string;
}

export interface CreateRatingPayload {
	calificacion: number;
}

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

	// Recupera un restaurante concreto a partir de su id.
	getById(id: number): Observable<Restaurante> {
		return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
	}

	// Crea un restaurante usando un endpoint privado del backend.
	create(payload: CreateOrUpdateRestaurantPayload): Observable<Restaurante> {
		return this.http.post<Restaurante>(`${this.apiUrl}/restaurants`, payload);
	}

	// Actualiza parcialmente un restaurante existente.
	update(id: number, payload: Partial<CreateOrUpdateRestaurantPayload>): Observable<Restaurante> {
		return this.http.patch<Restaurante>(`${this.apiUrl}/restaurants/${id}`, payload);
	}

	// Elimina un restaurante por id.
	remove(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/restaurants/${id}`);
	}

	// Recupera los comentarios publicos de un restaurante.
	getComments(restaurantId: number): Observable<Comment[]> {
		return this.http.get<Comment[]>(`${this.apiUrl}/restaurants/${restaurantId}/comments`);
	}

	// Crea un comentario en un endpoint protegido por JWT.
	createComment(restaurantId: number, payload: CreateCommentPayload): Observable<Comment[]> {
		return this.http.post<Comment[]>(`${this.apiUrl}/restaurants/${restaurantId}/comments`, payload);
	}

	// Recupera el resumen publico de ratings.
	getRatingsSummary(restaurantId: number): Observable<RatingSummary> {
		return this.http.get<RatingSummary>(`${this.apiUrl}/restaurants/${restaurantId}/ratings/summary`);
	}

	// Recupera el rating del usuario autenticado para un restaurante.
	getMyRating(restaurantId: number): Observable<MyRating | null> {
		return this.http.get<MyRating | null>(`${this.apiUrl}/restaurants/${restaurantId}/ratings/me`);
	}

	// Crea o actualiza un rating usando el endpoint privado.
	createOrUpdateRating(restaurantId: number, payload: CreateRatingPayload): Observable<RatingMutationResponse> {
		return this.http.post<RatingMutationResponse>(`${this.apiUrl}/restaurants/${restaurantId}/ratings`, payload);
	}
}
