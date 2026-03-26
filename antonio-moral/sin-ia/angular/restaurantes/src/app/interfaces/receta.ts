export interface Receta {
  id: number;
  restaurant_id: number;
  restaurant: {
    id: number;
    nombre: string;
    descripcion: string;
    fotografia_url: string;
    latitud: number;
    longitud: number;
    created_at: string;
    updated_at: string;
  };
  nombre: string;
  descripcion: string;
  ingredientes: string; 
  tiempo_min: number;
  dificultad: 'facil' | 'medio' | 'dificil';
  image_url: string;
  created_at: string;
  updated_at: string;
}
