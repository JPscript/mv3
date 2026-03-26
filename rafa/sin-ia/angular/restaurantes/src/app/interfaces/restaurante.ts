export interface Restaurante {
    id: number;
    nombre: string;
    descripcion: string;
    fotografia_url?: string;
    latitud: number;
    longitud: number;
    total_recetas?: number;
    rating_summary?: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    };
    comments?: {
        id: number;
        comentario: string;
        user?: {
            id: number;
            nombre: string;
            image_url: string;
        }
    }[];
    recipes?: {
        id: number;
        nombre: string;
        descripcion: string;
        ingredientes: string;
        tiempo_min: number;
        dificultad: string;
        image_url?: string;
        restaurant_id: number;
    }[];

}
