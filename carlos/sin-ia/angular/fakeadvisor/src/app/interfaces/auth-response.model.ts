import { User } from './user.model';

export interface AuthResponse {
  access_token: string;
  token_type: 'Bearer';
  user: User;
}
