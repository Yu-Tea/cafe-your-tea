import { apiClient } from "../utils/axios";
import type {
  TeaArt,
  CreateTeaArtRequest,
  TeaArtResponse,
  TeaArtsListResponse,
} from "../types/teaArt";

// 全ユーザーのTeaArt一覧取得（Menuページ用）
export const getTeaArts = async (): Promise<TeaArtsListResponse> => {
  const response = await apiClient.get("/tea_arts");
  return response.data;
};

// 自分のTeaArt一覧取得（マイページ用）
export const getMyTeaArts = async (): Promise<TeaArtsListResponse> => {
  const response = await apiClient.get("/tea_arts/my");
  return response.data;
};

// TeaArt作成
export const createTeaArt = async (
  data: CreateTeaArtRequest
): Promise<TeaArtResponse> => {
  const response = await apiClient.post("/tea_arts", data);
  return response.data;
};

// TeaArt詳細取得
export const getTeaArt = async (id: number): Promise<{ tea_art: TeaArt }> => {
  const response = await apiClient.get(`/tea_arts/${id}`);
  return response.data;
};

// TeaArt更新
export const updateTeaArt = async (
  id: number,
  data: CreateTeaArtRequest
): Promise<TeaArtResponse> => {
  const response = await apiClient.patch(`/tea_arts/${id}`, data);
  return response.data;
};

// TeaArt削除
export const deleteTeaArt = async (
  id: number
): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/tea_arts/${id}`);
  return response.data;
};

// タグ検索専用（高速・シンプル）
export const searchByTag = async (tagName: string, page = 1) => {
  const response = await apiClient.get(
    `/tea_arts/search_by_tag?tag_name=${encodeURIComponent(tagName)}&page=${page}`
  );
  return response.data;
};

// 総合検索用（将来の機能拡張）
// export const comprehensiveSearch = async (searchParams: SearchParams, page = 1) => {
//   const params = new URLSearchParams({ ...searchParams, page: page.toString() });
//   const response = await fetch(`/api/v1/tea_arts/search?${params}`);
//   return response.data;
// };
