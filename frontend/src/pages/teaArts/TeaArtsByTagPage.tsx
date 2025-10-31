import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTeaArtsByTag } from "../../api/tagApi";
import type { TeaArt } from "../../types/teaArt";
import TeaArtGrid from "./components/TeaArtGrid";
import { Title } from "../../shared/components/Title";
import StatusDisplay from "../../shared/components/StatusDisplay";

const TeaArtsByTagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeaArtsByTag = async () => {
      if (!tagName) return;

      try {
        setLoading(true);
        setError(null);

        // タグ専用のAPI呼び出し
        const data = await getTeaArtsByTag(tagName);
        setTeaArts(data.tea_arts || data);
      } catch (err) {
        console.error("Error fetching tea arts by tag:", err);
        setError("投稿の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchTeaArtsByTag();
  }, [tagName]);

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  // エラー状態
  if (error) {
    return <StatusDisplay type="error" message={error} />;
  }

  return (
    <div className="flex justify-center p-5 sm:p-10">
      <div className="max-w-7xl space-y-8">
        <Title title="Search results" subtitle="タグでの検索結果" />

        <div className="text-center">
          「# {tagName}」タグのついたティーは{teaArts.length}件です。
        </div>

        {/* 投稿がない場合の表示 */}
        {teaArts.length === 0 ? (
          <div className="">
            <p className="mb-6">
              他のタグで検索するか、新しい投稿を作成してみてください。
            </p>
          </div>
        ) : (
          /* メニュー一覧（タグでフィルタリング済み） */
          <TeaArtGrid teaArts={teaArts} />
        )}

        {/* アクションボタン */}
        <div className="mt-15 text-center">
          <Link to="/tea-arts" className="btn btn-outline btn-primary">
            ← メニューの一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeaArtsByTagPage;
