export interface Comment {
  id: number;
  body: string;
  is_guest: boolean;
  user_name: string;
  avatar_preset: string;
  created_at: string;
  can_edit: boolean;
  can_delete: boolean;
}

export interface CreateCommentRequest {
  comment: {
    body: string;
  };
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsListResponse {
  comments: Comment[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    next_page: number | null;
    prev_page: number | null;
  };
}