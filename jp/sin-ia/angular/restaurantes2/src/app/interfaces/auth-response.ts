import { User } from './user';

// Esta interface representa exactamente la respuesta que devuelve
// `POST /auth/login` y `POST /auth/register` en el backend.
export interface AuthResponse {
	// JWT que luego enviaremos como Bearer token en peticiones privadas.
	access_token: string;
	// Texto descriptivo del tipo de token. Hoy la API devuelve `Bearer`.
	token_type: string;
	// Usuario publico que recibimos junto al token.
	user: User;
}