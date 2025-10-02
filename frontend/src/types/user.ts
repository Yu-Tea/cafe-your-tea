export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar_preset: number;
  is_owner?: boolean;
}

export interface AuthResponse {
  logged_in: boolean;
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
  avatar_preset?: number;
}

// 🆕 プロフィール更新用の型定義
export interface UpdateProfileRequest {
  name: string;
  bio: string;
  avatar_preset: number;
}

export interface UpdateProfileResponse {
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar_preset: number;
  };
}