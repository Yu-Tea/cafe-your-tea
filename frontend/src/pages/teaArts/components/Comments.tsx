import { useEffect, useState } from "react";
import { Title } from "../../../shared/components/Title";
import { Avatar } from "../../../shared/components/Avatar";
import { getComments } from "../../../api/commentApi";
import { Comment } from "../../../types/comment";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import StatusDisplay from "../../../shared/components/StatusDisplay";

interface CommentsProps {
  teaArtId: number;
}

const Comments = ({ teaArtId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const response = await getComments(teaArtId);
        setComments(response.comments);
      } catch (err) {
        console.error("コメント取得エラー:", err);
        setError("コメントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [teaArtId]);

  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  if (error) {
    return <StatusDisplay type="error" message={error} />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-y-6 px-5">
        <Title title="Comments" subtitle="ティーを飲んだ方のご感想" />
        <div className="sm:border-secondary/20 w-full max-w-3xl space-y-3 rounded-xl py-4 sm:border-1 sm:px-8">
          {comments.length === 0 ? (
            <div className="py-8 text-center">
              <p>まだコメントがありません</p>
              <p className="text-sm">最初のコメントを投稿してみませんか？</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10">
                    <Avatar
                      avatarPreset={comment.avatar_preset}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="chat-header text-secondary">
                  {comment.user_name}
                  <time className="ml-1 opacity-50">{comment.created_at}</time>
                  {/* 自分のコメントのみ編集・削除ボタン追加部分 */}
                  {comment.is_owner && (
                    <div className="ml-0.5 flex items-center gap-0.5">
                      {/* 編集ボタン */}
                      <button
                        onClick={() =>
                          console.log(`編集: コメント${comment.id}`)
                        }
                        className="btn btn-link btn-xs text-accent hover:text-neutral px-0.5"
                        title="編集"
                      >
                        <FaPenFancy size={15} />
                      </button>

                      {/* 削除ボタン */}
                      <button
                        className="btn btn-link btn-xs text-secondary hover:text-neutral px-0.5"
                        title="削除"
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="chat-bubble max-w-full px-5 py-4 text-sm whitespace-pre-wrap">
                  {comment.body}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
