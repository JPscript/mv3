import { User } from './user';

// Esta interface representa un comentario ya transformado por el backend.
export interface Comment {
	id: number;
	comentario: string;
	created_at: string;
	updated_at: string;
	user: Pick<User, 'id' | 'nombre' | 'image_url'> | null;
}