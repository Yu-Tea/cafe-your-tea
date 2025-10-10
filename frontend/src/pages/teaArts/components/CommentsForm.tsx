import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const CommentsForm = () => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 150;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !isSubmitting) {
      setIsSubmitting(true);

      try {
        // 後で追加

        // 成功時の処理
        alert("感想をありがとうございます！ケロ〜");
        setComment("");
      } catch (error) {
        console.error("コメント送信エラー:", error);
        alert("送信に失敗しました。もう一度お試しください。");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setComment(value);
    }
  };

  return (
    <div className="flex items-center justify-center px-10 mt-5">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="comment-id"
              className="label josefin-sans text-secondary text-2xl font-light"
            >
              Comments
            </label>
            <textarea
              id="comment-id"
              value={comment}
              onChange={handleChange}
              placeholder="このティーを飲んだ感想を送ってね！"
              maxLength={maxLength}
              className="textarea textarea-primary w-full"
              rows={4}
              disabled={isSubmitting}
            />
            <div className="mt-2 flex justify-between">
              <p className="text-secondary text-sm">
                {comment.length}/{maxLength}文字
              </p>
              <button
                type="submit"
                disabled={!comment.trim() || isSubmitting}
                className="btn btn-primary px-5 font-normal"
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
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsForm;
