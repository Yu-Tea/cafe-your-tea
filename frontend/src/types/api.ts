export interface User {
  id: number;
  email: string;
  name: string;
  provider: string;
  uid?: string;
  bio: string;
  avatar_preset: number;
  jti: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  logged_in: boolean;
  user: User;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleAuthCredentials {
  provider: string;
  uid: string;
  email: string;
  name: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  errors?: Record<string, string[]>;
}