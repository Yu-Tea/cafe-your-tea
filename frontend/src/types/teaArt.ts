export interface TeaArt {
  id: number;
  title: string;
  description: string;
  season: string;
  temperature: string;
  image_url: string;
  tags: Tag[];
  tag_names: string[];
  user: {
    id: number;
    name: string;
  };
  is_owner: boolean;
}

//ページネーション用
export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
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

// 新規作成・編集ページ用の設定
export const SEASONS = [
  { id: "season-0", value: 0, label: "通年" },
  { id: "season-1", value: 1, label: "春期限定" },
  { id: "season-2", value: 2, label: "夏期限定" },
  { id: "season-3", value: 3, label: "秋期限定" },
  { id: "season-4", value: 4, label: "冬期限定" },
] as const;

export const TEMPERATURES = [
  { id: "temp-0", value: 0, label: "HOT" },
  { id: "temp-1", value: 1, label: "ICE" },
  { id: "temp-2", value: 2, label: "HOT & ICE" },
] as const;

// ユーティリティ関数
export const getSeasonLabel = (value: number): string => {
  return SEASONS.find((season) => season.value === value)?.label || "不明";
};

export const getTemperatureLabel = (value: number): string => {
  return TEMPERATURES.find((temp) => temp.value === value)?.label || "不明";
};

// 編集時に季節と温度を数値に戻すための処理
export const getSeasonValue = (seasonName: string): number => {
  const seasonMap: { [key: string]: number } = {
    All: 0,
    Spring: 1,
    Summer: 2,
    Autumn: 3,
    Winter: 4,
  };
  return seasonMap[seasonName] ?? 0;
};

export const getTemperatureValue = (temperatureName: string): number => {
  const temperatureMap: { [key: string]: number } = {
    hot: 0,
    ice: 1,
    both: 2,
  };
  return temperatureMap[temperatureName] ?? 0;
};

// PickUp用のTeaArt型
export interface PickupTeaArtData {
  id: number;
  title: string;
  image_url: string;
  user: {
    name: string;
  };
}
// 季節ごとのデータ型
export interface SeasonTeaArt {
  exists: boolean;
  season: string;
  data: PickupTeaArtData | null;
}

// ピックアップAPIのレスポンス型
export interface TeaArtsPickupResponse {
  status: string;
  data: {
    all: SeasonTeaArt;
    spring: SeasonTeaArt;
    summer: SeasonTeaArt;
    autumn: SeasonTeaArt;
    winter: SeasonTeaArt;
  };
  available_count: number;
}

// PickUpSection用のデータ変換型
export interface PickupSectionData {
  id: number;
  category: SeasonKey;
  season: string;
  title: string;
  name: string;
  description: string;
  teaImage: string;
  colors: {
    bg: string;
    text: string;
  };
}

// 季節のキー型
export type SeasonKey = "all" | "spring" | "summer" | "autumn" | "winter";
