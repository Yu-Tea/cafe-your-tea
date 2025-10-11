export interface Comment {
  id: number;
  body: string;
  is_guest?: boolean;
  user_name: string;
  avatar_preset: number | null;
  created_at: string;
  is_owner: boolean;
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