export interface AuthResponse {
  logged_in: boolean;
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
  avatar_preset?: number;
}

export interface GoogleLoginResponse {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar_preset: number;
}
