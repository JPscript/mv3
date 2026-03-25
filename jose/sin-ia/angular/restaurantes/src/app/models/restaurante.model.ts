// Interfaz que define la estructura de un restaurante según la API
// Senior Cat recomienda usar interfaces para tener cimientos sólidos y autocompletado en todo el proyecto

export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  fotografia_url: string;
  latitud: number;
  longitud: number;
  created_at: string;
  updated_at: string;
  total_recetas: number;
  rating_summary: {
    average: number;
    count: number;
    distribution: {
      [key: string]: number; // Ejemplo: "1": 0, "2": 0, ...
    };
  };
}
