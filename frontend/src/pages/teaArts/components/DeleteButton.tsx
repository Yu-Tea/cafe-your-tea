import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTeaArt } from "../../../api/teaArtApi";
import { FaTrashAlt } from "react-icons/fa";

interface DeleteButtonProps {
  teaArtId: number;
  teaArtTitle: string;
  text?: string;
  className?: string;
  spanClassName?: string;
}

export const DeleteButton = ({
  teaArtId,
  teaArtTitle,
  text = "削除",
  className = "",
  spanClassName = "",
}: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    // 削除確認ダイアログ
    const isConfirmed = window.confirm(
      `「${teaArtTitle}」を削除しますか？\nこの操作は取り消せません。`
    );

    if (!isConfirmed) return;

    try {
      setIsDeleting(true);
      await deleteTeaArt(teaArtId);

      // 削除成功時は一覧ページに戻る
      navigate("/tea-arts", {
        state: { message: "ティーアートが削除されました" },
      });
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。もう一度お試しください。");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className={`btn ${className}`}
    >
      {isDeleting ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          delete...
        </>
      ) : (
        <>
          <FaTrashAlt />
          <span className={`font-normal ${spanClassName}`}>{text}</span>
        </>
      )}
    </button>
  );
};
