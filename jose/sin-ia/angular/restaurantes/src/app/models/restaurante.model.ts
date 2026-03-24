// Interfaz que define la estructura de un restaurante según la API
// Senior Cat recomienda usar interfaces para tener cimientos sólidos y autocompletado en todo el proyecto

export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  fotografia_url: string;
  // Agrega aquí otros campos si tu API los devuelve (por ejemplo: direccion, telefono, etc.)
}
