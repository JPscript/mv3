export interface Receta {

    id: number;
    restaurante_id: number;
    nombre: string;
    descripcion: string;
    ingredientes: string;
    tiempo_min: number;
    dificultad: "facil" | "media" | "dificil";
    image_url?: string;
    created_at: string;
    updated_at: string;
}
