import { apiClient } from "../utils/axios";
import type {
  CreateCommentRequest,
  CommentResponse,
  CommentsListResponse,
} from "../types/comment";

// コメント一覧取得
export const getComments = async (teaArtId: number): Promise<CommentsListResponse> => {
  const response = await apiClient.get(`/tea_arts/${teaArtId}/comments`);
  return response.data;
};

// コメント作成
export const createComment = async (
  teaArtId: number,
  data: CreateCommentRequest
): Promise<CommentResponse> => {
  const response = await apiClient.post(`/tea_arts/${teaArtId}/comments`, data);
  return response.data;
};

// コメント更新
export const updateComment = async (
  id: number,
  data: CreateCommentRequest
): Promise<CommentResponse> => {
  const response = await apiClient.patch(`/comments/${id}`, data);
  return response.data;
};

// コメント削除
export const deleteComment = async (
  id: number
): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/comments/${id}`);
  return response.data;
};