// Interface para un rating individual del backend.
export interface Rating {
	id: number;
	user_id: number;
	calificacion: number;
	created_at: string;
	updated_at: string;
}

// Resumen publico de ratings para un restaurante.
export interface RatingSummary {
	average: number;
	count: number;
	ratings: Rating[];
}

// Rating del usuario autenticado para un restaurante concreto.
export interface MyRating {
	id: number;
	restaurant_id: number;
	user_id: number;
	calificacion: number;
	created_at: string;
	updated_at: string;
}

// Respuesta que devuelve el backend al crear o actualizar un rating.
export interface RatingMutationResponse {
	my_rating: MyRating | null;
	summary: RatingSummary;
}