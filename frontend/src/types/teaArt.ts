export interface TeaArt {
  id: number;
  title: string;
  description: string;
  season: string;
  temperature: string;
  tags: Tag[];
  tag_names: string[];
  user: {
    id: number;
    name: string;
  };
  is_owner: boolean;
}

// タグ用
export interface Tag {
  id: number;
  name: string;
  tea_arts_count?: number;
}

// フォームデータ用
export interface TeaArtFormData {
  title: string;
  description: string;
  season: number;
  temperature: number;
  tag_names: string[];
}

export interface CreateTeaArtRequest {
  tea_art: {
    title: string;
    description: string;
    season: number;
    temperature: number;
    tag_names: string[];
  };
}

export interface TeaArtResponse {
  tea_art: TeaArt;
  message: string;
}

// 一覧レスポンス
export interface TeaArtsListResponse {
  tea_arts: TeaArt[];
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

// タグ関連の追加インターフェース
export interface TagFilterParams {
  tag_id?: number;
  tag_name?: string;
  page?: number;
}

// タグ検索用のレスポンス
export interface TagsResponse {
  tags: Tag[];
}