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
  search_text?: string;
  season?: string;
  tag_id?: number;
  per_page?: number;
}

// 全ユーザーのTeaArt一覧取得（Menuページ用）
export const getTeaArts = async (
  params: GetTeaArtsParams = {}
): Promise<TeaArtsListResponse> => {
  const { page = 1, search_text, season, tag_id, per_page } = params;
  // クエリパラメータを構築
  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  // 検索パラメータ
  if (search_text) queryParams.append('search_text', search_text);
  if (season) queryParams.append('season', season);
  if (tag_id) queryParams.append('tag_id', tag_id.toString());
  if (per_page) queryParams.append('per_page', per_page.toString());

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

// Pick Up（TOPページ用）
export const pickupTeaArts = async (): Promise<TeaArtsPickupResponse> => {
  const response = await apiClient.get("/tea_arts/pickup");
  return response.data;
};
