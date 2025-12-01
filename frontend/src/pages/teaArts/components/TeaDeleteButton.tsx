import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTeaArt } from "@/api/teaArtApi";
import { FaTrashAlt } from "react-icons/fa";

interface TeaDeleteButtonProps {
  teaArtId: number;
  teaArtTitle: string;
  text?: string;
  className?: string;
  spanClassName?: string;
  redirectAfterDelete?: boolean; // 削除後にリダイレクトするかどうか
}

export const TeaDeleteButton = ({
  teaArtId,
  teaArtTitle,
  text = "削除",
  className = "",
  spanClassName = "",
  redirectAfterDelete = true, // デフォルトはリダイレクトあり
}: TeaDeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // イベントのデフォルト動作を防いでボタン押したときに詳細ページへの遷移を禁止
    e.preventDefault();
    e.stopPropagation();

    // 削除確認ダイアログ
    const isConfirmed = window.confirm(
      `「${teaArtTitle}」を削除しますか？\nこの操作は取り消せません。`
    );

    if (!isConfirmed) return;

    try {
      setIsDeleting(true);
      await deleteTeaArt(teaArtId);

      // 削除成功時の処理を分岐
      if (redirectAfterDelete) {
        // リダイレクトが有効な場合のみナビゲート
        navigate("/tea-arts", {
          state: { message: "ティーアートが削除されました" },
        });
      } else {
        // リダイレクトしない場合はページをリロード
        window.location.reload();
      }
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
      onMouseDown={(e) => e.preventDefault()}
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
