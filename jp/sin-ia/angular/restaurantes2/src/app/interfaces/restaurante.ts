// Una `interface` en TypeScript funciona como un plano.
// No crea objetos reales, pero describe que forma deben tener.
// Gracias a esto, el editor y TypeScript saben que propiedades esperamos
// recibir desde la API del backend.
export interface Restaurante {
    // Identificador unico del restaurante en la base de datos.
    id: number;
    // Nombre visible que mostraremos en la interfaz.
    nombre: string;
    // Descripcion del restaurante.
    descripcion: string;
    // URL de la imagen del restaurante.
    // Puede ser `null` si el backend todavia no tiene una foto asociada.
    fotografia_url: string | null;
    // Coordenadas geograficas del restaurante.
    latitud: number;
    longitud: number;
    // El signo `?` significa que esta propiedad es opcional.
    // Puede venir en algunas respuestas y no venir en otras.
    total_recetas?: number;
    // Resumen opcional de valoraciones.
    rating_summary?: {
        // Promedio de puntuaciones.
        average: number;
        // Numero total de votos recibidos.
        count: number;
        // `Record<string, number>` significa: objeto con claves de texto y valores numericos.
        // Ejemplo: { "1": 0, "2": 1, "3": 2, "4": 5, "5": 8 }
        distribution: Record<string, number>;
    };
}
