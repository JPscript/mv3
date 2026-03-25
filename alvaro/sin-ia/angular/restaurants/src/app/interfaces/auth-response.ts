import { User } from './user';

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    user: User;
}