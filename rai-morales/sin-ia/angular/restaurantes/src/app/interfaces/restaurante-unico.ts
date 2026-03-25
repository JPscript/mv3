import { Comentario } from "./comentario";
import { Receta } from "./receta";

export interface RestauranteUnico {

    id: number;
    nombre: string;
    descripcion: string;
    fotografia_url?: string;
    latitud: number;
    longitud: number;
    recipes?: Receta[];
    comments?: Comentario[];
    created_at: string;
    updated_at: string;
    rating_summary?: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    };

}
