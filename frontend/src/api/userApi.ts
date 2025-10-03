import { apiClient } from '../utils/axios';
import { User } from "../types/user";

// ユーザー個別ページ用
export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};