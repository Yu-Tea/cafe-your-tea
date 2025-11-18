import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getTeaArtsByTag } from "@/api/tagApi";
import type { TeaArt } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";
import SmartBackButton from "./components/SmartBackButton";
import StatusDisplay from "@/shared/components/StatusDisplay";
import TeaArtGrid from "./components/TeaArtGrid";

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
    <div className="space-y-10 p-5 sm:p-10">
      <Title title="Search results" subtitle="タグでの検索結果" />
      <motion.div 
      variants={inVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
      className="max-w-7xl space-y-6">
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

        {/* 戻るボタン */}
        <div className="mt-10 text-center">
          <SmartBackButton />
        </div>
      </motion.div>
    </div>
  );
};

export default TeaArtsByTagPage;
