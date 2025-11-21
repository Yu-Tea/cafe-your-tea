import { apiClient } from "@/utils/axios";
import type { TeaArt } from "@/types/teaArt";

export interface Tag {
  id: number;
  name: string;
}

export interface TagsResponse {
  tags: Tag[];
}

// タグ詳細用のレスポンス型
export interface TagDetailResponse {
  tea_arts: TeaArt[];
  tag_name: string;
  pagination?: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    next_page: number | null;
    prev_page: number | null;
  };
  selected_tag?: Tag | null;
}

// 既存タグの一覧取得
export const getTags = async (): Promise<TagsResponse> => {
  const response = await apiClient.get("/tags");
  return response.data;
};

// タグで絞り込んだ投稿取得
export const getTagTeaArts = async (
  tagId: number,
  page: number = 1
): Promise<TagDetailResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  const response = await apiClient.get(`/tags/${tagId}?${queryParams}`);
  return response.data;
};
