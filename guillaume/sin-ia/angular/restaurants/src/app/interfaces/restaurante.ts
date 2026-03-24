export interface Restaurante {
    id: number;
    nombre: string;
    descripcion: string;
    fotografia_url: string | null;
    latitud: number;
    longitud: number;
    total_recetas?: number;
    rating_sumary: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    };
}
