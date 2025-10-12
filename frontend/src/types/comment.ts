export interface Comment {
  id: number;
  body: string;
  is_guest?: boolean;
  user_name: string;
  avatar_preset: number | null;
  created_at: string;
  is_owner: boolean;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface CreateCommentRequest {
  comment: {
    body: string;
  };
}

export interface CreateCommentResponse {
  comment: Comment; // 作成されたコメント単体
}

export interface CommentsResponse {
  comments: Comment[];
  pagination: Pagination;
}

export interface UpdateCommentResponse {
  comment: Comment;
  message?: string;
}