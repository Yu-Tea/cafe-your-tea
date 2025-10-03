import { apiClient } from '../utils/axios';

export interface Tag {
  id: number;
  name: string;
  tea_arts_count?: number;
}

export interface TagsResponse {
  tags: Tag[];
}

// タグ一覧取得
export const getTags = async (): Promise<TagsResponse> => {
  const response = await apiClient.get('/tags');
  return response.data;
};