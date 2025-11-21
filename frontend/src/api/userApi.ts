import { apiClient } from "@/utils/axios";
import {
  User,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/user";
import type { TeaArtsListResponse } from "@/types/teaArt";

// ユーザー個別ページ用
export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// ティーギャラリー（ユーザー個別のティー一覧）用
interface GetUserTeaArtsParams {
  page?: number;
}

export const getUserTeaArts = async (
  id: number,
  params: GetUserTeaArtsParams = {}
): Promise<TeaArtsListResponse> => {
  const { page = 1 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  const response = await apiClient.get(`/users/${id}/tea_arts?${queryParams}`);
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
