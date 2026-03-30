import { User } from "./user";

export interface AuthResponse {
    // JWT que luego enviaremos como Bearer token en peticiones privadas.
	access_token: string;
	// Texto descriptivo del tipo de token. Hoy la API devuelve `Bearer`.
	token_type: string;
	// Usuario publico que recibimos junto al token.
	user: User;
}
