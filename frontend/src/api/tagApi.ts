import { apiClient } from "../utils/axios";
import type { TeaArt } from "../types/teaArt";

export interface Tag {
  id: number;
  name: string;
  tea_arts_count?: number;
}

export interface TagsResponse {
  tags: Tag[];
}

// タグでフィルタリングした投稿のレスポンス型
export interface TeaArtsByTagResponse {
  tea_arts: TeaArt[];
  tag: Tag;
  total_count: number;
}

// 既存タグの一覧取得
export const getTags = async (): Promise<TagsResponse> => {
  const response = await apiClient.get("/tags");
  return response.data;
};

// タグで絞り込んだ投稿取得
export const getTeaArtsByTag = async (tagName: string): Promise<TeaArtsByTagResponse> => {
  try {
    // URLエンコードしてタグ名を安全に送信
    const response = await apiClient.get('/tea_arts/search_by_tag', {
      params: {
        tag: tagName  // ← tagパラメータで送信
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tea arts by tag:', error);
    throw error;
  }
};