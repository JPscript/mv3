export interface Comentario {
  id: number;
  comentario: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    nombre: string;
    image_url: string | null;
  } | null;
}