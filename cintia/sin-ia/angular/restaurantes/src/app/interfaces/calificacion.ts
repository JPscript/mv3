export interface Calificacion {
    id: number;
    restaurant_id: number;
    nombre: string;
    descripcion: string;
    ingredientes: string;
    tiempo_min: number;
    dificultad: string;
    image_url: string;
    created_at?: string;
    updated_at?: string;
    rating_summary: {
        average: number;
        count: number;
        distribution: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        }
    }
}