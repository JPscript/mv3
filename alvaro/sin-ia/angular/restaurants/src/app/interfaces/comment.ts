export interface CommentUser {
  id: number;
  nombre: string;
  image_url?: string;
}

export interface Comment {
  id: number;
  comentario: string;
  created_at: string;
  updated_at: string;
  user: CommentUser;
}
