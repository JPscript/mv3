// Esta interface describe al usuario publico que devuelve la API.
// Nos sirve para tipar bien el estado de sesion en el frontend.
export interface User {
	// Identificador unico del usuario en la base de datos.
	id: number;
	// Nombre con el que el usuario inicia sesion.
	nombre: string;
	// URL opcional de la imagen de perfil.
	image_url: string | null;
	// Fechas utiles si mas adelante queremos mostrarlas en perfil.
	created_at: string;
	updated_at: string;
}