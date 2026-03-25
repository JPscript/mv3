import { Restaurante } from "./restaurante.model";

export interface Receta {
  id: number;
  restaurant_id: number;
  restaurant: Restaurante;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  tiempo_min: number;
  dificultad: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}