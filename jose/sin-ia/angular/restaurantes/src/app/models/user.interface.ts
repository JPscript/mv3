export interface User{
  access_token: string,
  token_type: 'Bearer',
  user: {
    id: number,
    nombre: string,
    image_url: string | null,
    created_at: string,
    updated_at: string,
  }
}