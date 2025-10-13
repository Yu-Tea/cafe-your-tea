import { apiClient } from "../utils/axios";
import {
  User,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/user";

// ユーザー個別ページ用
export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// プロフィール更新用
export const updateUserProfile = async (
  profileData: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>("/user", {
    user: profileData,
  });
  return response.data;
};
