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
        distribution: Record<string, number>; //ESTO SON PARES CLAVE VALOR
    };
}
