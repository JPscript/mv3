export interface Restaurant {
    id: number;
    nombre: string;
    descripcion: string;
    fotografia_url?: string;
    latitud: number;
    longitud: number;
    total_recetas?: number;
    created_at?: string;
    updated_at?: string;
    rating_summary?: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    };
}
