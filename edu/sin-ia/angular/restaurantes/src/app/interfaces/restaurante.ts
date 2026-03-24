export interface Restaurante {
fotografia_url: string|undefined;
    id: number;
    nombre: string;
    descripcion: string;
    fotografia?: string;
    latitud: number;
    longitud: number;
    total_recetas?: number;
    rating_summary?: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    }
}
