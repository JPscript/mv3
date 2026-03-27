import { Receta } from "./receta";
import { Comentario } from "./comentario";

export interface RestauranteUnico {
  id: number;
  nombre: string;
  descripcion: string;
  fotografia_url: string;
  latitud: number;
  longitud: number;
  recipes: Receta[];
  comments: Comentario[];
  created_at: string;
  updated_at: string;
  rating_summary: RatingSummary;
}

export interface RatingSummary {
  average: number;
  count: number;
  distribution: Distribution;
}

export interface Distribution {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}
