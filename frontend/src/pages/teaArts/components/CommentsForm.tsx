import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { createComment } from "../../../api/commentApi";
import { CreateCommentRequest, Comment } from "../../../types/comment";
import { useAuth } from "../../../shared/contexts/AuthContext";
import { TextAreaField } from "../../../shared/components/TextAreaField";
import { Button } from "../../../shared/components/Button";

interface CommentsFormProps {
  teaArtId: number;
  onCommentCreated?: (newComment: Comment) => void; // コメント作成後のコールバック
}

const CommentsForm = ({ teaArtId, onCommentCreated }: CommentsFormProps) => {
  const { isLoggedIn } = useAuth();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxLength = 150;

  // ゲスト用の定型文
  const presetComments = [
    "おいしかったです〜！",
    "すっきりした後味で飲みやすかったです。",
    "深い味わいで心が落ち着きました。",
    "ティーアートが素敵ですね！",
    "見た目も味も楽しめました〜。",
    "ほっとする時間を過ごせました。",
    "心まであたたまりました！",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const commentData: CreateCommentRequest = {
        comment: {
          body: comment.trim(),
        },
      };

      // createCommentのレスポンスから新しいコメントを取得
      const response = await createComment(teaArtId, commentData);
      const newComment = response.comment; // ← commentプロパティを取得

      // 成功時のリセット
      setComment("");

      // 親コンポーネントに新しいコメントを渡す
      onCommentCreated?.(newComment);
    } catch (err) {
      console.error("コメント送信エラー:", err);
      setError("コメントの送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setComment(value);
      setError(null);
    }
  };

  const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedComment = e.target.value;
    if (selectedComment !== "このティーを飲んだ感想を送ってね！") {
      setComment(selectedComment);
      setError(null);
    }
  };

  return (
    <div className="mt-5 flex items-center justify-center px-10">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* コメント入力フィールド */}
            {!isLoggedIn ? (
              // ゲスト用：定型文のみ
              <>
                <label
                  htmlFor="comment-id"
                  className="label josefin-sans text-secondary text-2xl font-light"
                >
                  Comment
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <select
                      id="comment-id"
                      value={comment || "このティーを飲んだ感想を送ってね！"}
                      onChange={handlePresetSelect}
                      className="select select-bordered flex-1"
                      disabled={isSubmitting}
                    >
                      <option disabled>
                        このティーを飲んだ感想を送ってね！
                      </option>
                      {presetComments.map((preset, index) => (
                        <option key={index} value={preset}>
                          {preset}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* ゲスト用の説明文 */}
                  <p className="text-secondary text-sm">
                    ※
                    ログインしていないゲストの方は定型文のみ送信できます。投稿者名は「匿名」と表示されます。
                  </p>
                </div>
              </>
            ) : (
              // ログインユーザー用：自由入力
              <>
                <TextAreaField
                  label="Comment"
                  name="body"
                  value={comment}
                  maxLength={maxLength}
                  onChange={handleCommentChange}
                  placeholder="このティーを飲んだ感想を送ってね！"
                  rows={4}
                  disabled={isSubmitting}
                />
              </>
            )}

            {/* エラーメッセージ */}
            {error && (
              <div className="alert alert-error mt-2">
                <span>{error}</span>
              </div>
            )}

            {/* 送信ボタン */}
            <div className="mt-3 flex justify-end">
              <Button
                variant="st-btn"
                type="submit"
                disabled={!comment.trim() || isSubmitting}
                className="btn-primary px-5"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    送信中...
                  </>
                ) : (
                  <>
                    <IoIosSend />
                    感想を送る
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsForm;
