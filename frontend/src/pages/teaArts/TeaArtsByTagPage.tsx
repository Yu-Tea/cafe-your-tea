import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getTagTeaArts } from "@/api/tagApi";
import type { TeaArt, PaginationInfo } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";

import SmartBackButton from "./components/SmartBackButton";
import StatusDisplay from "@/shared/components/StatusDisplay";
import TeaArtGrid from "./components/TeaArtGrid";
import Pagination from "@/shared/components/Pagination";

const TeaArtsByTagPage = () => {
  const [tagName, setTagName] = useState<string>("");
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const animationPlayedRef = useRef(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTagTeaArts(Number(id), 1);

        setTagName(data.tag_name);
        setTeaArts(data.tea_arts);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("作品の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id]);

  // ページ変更時の処理
  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);

      // 作品データのみを取得・更新（tag_nameは初回取得時のまま保持）
      const teaData = await getTagTeaArts(Number(id), page);

      setTeaArts(teaData.tea_arts);
      setPagination(teaData.pagination || null);
    } catch (err) {
      console.error("Error fetching tea arts:", err);
    } finally {
      setLoading(false);
    }
  };

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  // エラー状態
  if (error) {
    return <StatusDisplay type="error" />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10 p-5 sm:p-10">
      <Title
        title="Tag Results"
        subtitle="タグでの検索結果"
        disableAnimation={animationPlayedRef.current}
      />
      <motion.div
        variants={inVariants}
        initial={animationPlayedRef.current ? false : "hidden"}
        animate="visible"
        onAnimationComplete={() => {
          // 一度アニメーションが終わったらフラグを立てる（以降は無効）
          animationPlayedRef.current = true;
        }}
        className="flex max-w-7xl flex-col items-center justify-center space-y-6"
      >
        {/* 投稿がない場合の表示 */}
        {teaArts.length === 0 ? (
          <div className="">
            <p className="text-center">
              「# {tagName}」タグのついたティーはまだありません。
              <br />
              他のタグで検索するか、新しい投稿を作成してみてください。
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              「# {tagName}」タグのついたティーの検索結果です。
            </div>
            {/* メニュー一覧 */}
            <TeaArtGrid teaArts={teaArts} />
          </>
        )}

        {/* ページネーション */}
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}

        {/* 戻るボタン */}
        <div className="mt-4 text-center">
          <SmartBackButton />
        </div>
      </motion.div>
    </div>
  );
};

export default TeaArtsByTagPage;
