import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Title } from "../../../shared/components/Title";
import { Avatar } from "../../../shared/components/Avatar";
import { getComments } from "../../../api/commentApi";
import { Comment } from "../../../types/comment";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import StatusDisplay from "../../../shared/components/StatusDisplay";

interface CommentsProps {
  teaArtId: number;
  newComment?: Comment | null;
  onNewCommentProcessed?: () => void;
}

const Comments = ({
  teaArtId,
  newComment,
  onNewCommentProcessed,
}: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 新しいコメントが追加された時の処理
  useEffect(() => {
    if (newComment) {
      setComments((prev) => [newComment, ...prev]); // 先頭に追加
      onNewCommentProcessed?.(); // 親に処理完了を通知
    }
  }, [newComment, onNewCommentProcessed]);

  // 初回読み込み
  const loadInitialComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getComments(teaArtId, 1, 20);
      setComments(response.comments);
      setHasMore(response.pagination.has_next_page);
      setPage(1);
    } catch (err) {
      console.error("コメント取得エラー:", err);
      setError("コメントの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [teaArtId]);

  // 追加読み込み（無限スクロール用）
  const loadMoreComments = useCallback(async () => {
    if (!hasMore) return;

    try {
      const nextPage = page + 1;
      const response = await getComments(teaArtId, nextPage, 20);

      setComments((prev) => [...prev, ...response.comments]);
      setHasMore(response.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      console.error("追加コメント取得エラー:", err);
      // エラーが発生してもスクロールは継続
    }
  }, [teaArtId, page, hasMore]);

  useEffect(() => {
    loadInitialComments();
  }, [loadInitialComments]);

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

        {/* スクロール可能なコメント一覧コンテナ */}
        <div className="border-neutral/40 w-full max-w-3xl rounded-xl border-1 px-1 py-4 sm:pr-3 sm:pl-6">
          {comments.length === 0 ? (
            <div className="py-8 text-center">
              <p>
                まだコメントがありません。
                <br />
                最初のコメントを投稿してみませんか？
              </p>
            </div>
          ) : (
            <>
              {/* スクロール可能エリア */}
              <div
                id="comments-scrollable-div"
                className="max-h-96 overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "thin",
                }}
              >
                <InfiniteScroll
                  dataLength={comments.length}
                  next={loadMoreComments}
                  hasMore={hasMore}
                  loader={
                    <div className="flex items-center justify-center py-4">
                      <span className="loading loading-spinner loading-sm text-primary"></span>
                      <span className="ml-2 text-sm">読み込み中...</span>
                    </div>
                  }
                  // 一番最後まで到達したときの表示
                  endMessage={
                    <div className="border-neutral/50 mt-6 border-t pt-4 text-center">
                      <p className="text-neutral josefin-sans text-lg font-light">
                        All Comments Loaded
                      </p>
                    </div>
                  }
                  scrollableTarget="comments-scrollable-div"
                  className="space-y-2"
                >
                  {comments.map((comment, index) => (
                    <div
                      key={`${comment.id}-${index}`}
                      className="chat chat-start"
                    >
                      {/* アバター画像 */}
                      <div className="chat-image avatar">
                        <div className="w-10">
                          <Avatar avatarPreset={comment.avatar_preset} />
                        </div>
                      </div>
                      {/* 名前 */}
                      <div className="chat-header text-secondary">
                        {comment.user_name}さん
                        <time className="ml-1 opacity-50">
                          {comment.created_at}
                        </time>
                        {/* 自分のコメントのみ編集・削除ボタン追加部分 */}
                        {comment.is_owner && (
                          <div className="ml-0.5 flex items-center gap-0.5">
                            {/* 編集ボタン */}
                            <button
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
                      {/* コメント文章 */}
                      <div className="chat-bubble mr-2 max-w-full px-4 py-4 text-sm whitespace-pre-wrap">
                        {comment.body}
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
