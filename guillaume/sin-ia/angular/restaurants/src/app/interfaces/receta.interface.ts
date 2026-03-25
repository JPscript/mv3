export interface Receta {
    id: number;
    restaurant_id: number;
    nombre: string;
    descripcion: string;
    ingredientes: string;
    tiempo_min: number;
    dificultad: 'facil' | 'media' | 'dificil';
    image_url?: string | null;
}
