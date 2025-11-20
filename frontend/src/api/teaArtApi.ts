import { apiClient } from "@/utils/axios";
import type {
  TeaArt,
  CreateTeaArtRequest,
  TeaArtResponse,
  TeaArtsListResponse,
  TeaArtsPickupResponse,
} from "../types/teaArt";

interface GetTeaArtsParams {
  page?: number;
  // 将来の検索機能用（今は使わないけど準備）
  search?: string;
  season?: string;
  tagName?: string;
}

// 全ユーザーのTeaArt一覧取得（Menuページ用）
export const getTeaArts = async (
  params: GetTeaArtsParams = {}
): Promise<TeaArtsListResponse> => {
  const { page = 1, search, season, tagName } = params;
  // クエリパラメータを構築
  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  // 将来の検索機能用（現在は未使用）
  if (search) queryParams.append('search', search);
  if (season) queryParams.append('season', season);
  if (tagName) queryParams.append('tag_name', tagName);

  const response = await apiClient.get(`/tea_arts?${queryParams}`);
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

// タグ検索専用
export const searchByTag = async (tagName: string, page = 1) => {
  const response = await apiClient.get(
    `/tea_arts/search_by_tag?tag_name=${encodeURIComponent(tagName)}&page=${page}`
  );
  return response.data;
};

// Pick Up（TOPページ用）
export const pickupTeaArts = async (): Promise<TeaArtsPickupResponse> => {
  const response = await apiClient.get("/tea_arts/pickup");
  return response.data;
};
