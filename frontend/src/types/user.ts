export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar_preset: number;
  is_owner?: boolean;
}

export interface UserMe {
  id: number;
  name: string;
  bio: string;
  avatar_preset: number;
  is_owner?: boolean;
}

// プロフィール更新用
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