import { Usuario } from "./usuario";

export interface Comentario {
  id: number;
  comentario: string;
  created_at: string;
  updated_at: string;
  user: Usuario;
}
