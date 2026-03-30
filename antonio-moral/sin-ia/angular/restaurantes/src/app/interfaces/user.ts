export interface User {
    id: number;
	// Nombre con el que el usuario inicia sesion.
	nombre: string;
	// URL opcional de la imagen de perfil.
	image_url: string | null;
	// Fechas utiles si mas adelante queremos mostrarlas en perfil.
	created_at: string;
	updated_at: string;
}
