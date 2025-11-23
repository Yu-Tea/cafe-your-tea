import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { getTeaArts } from "@/api/teaArtApi";
import type { TeaArt, PaginationInfo } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";
import { TeaArtSearchForm } from "./components/TeaArtSearchForm";
import StatusDisplay from "@/shared/components/StatusDisplay";
import TeaArtGrid from "./components/TeaArtGrid";
import Pagination from "@/shared/components/Pagination";

interface SearchConditions {
  season: string;
  tag_id: number | null;
  search_text: string;
}

const TeaArtsListPage = () => {
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchConditions, setSearchConditions] = useState<SearchConditions>({
    season: "",
    tag_id: null,
    search_text: "",
  });
  const animationPlayedRef = useRef(false);

  // データ取得用
  const fetchTeaArts = useCallback(
    async (page: number = 1, conditions?: SearchConditions) => {
      try {
        setLoading(true);
        const searchParams = conditions ?? {
          season: "",
          tag_id: null,
          search_text: "",
        };

        const params = {
          page,
          ...(searchParams.season && { season: searchParams.season }),
          ...(searchParams.tag_id && { tag_id: searchParams.tag_id }),
          ...(searchParams.search_text && {
            search_text: searchParams.search_text,
          }),
        };

        const data = await getTeaArts(params);
        setTeaArts(data.tea_arts);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error("ティー情報取得エラー:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 初回読み込み
  useEffect(() => {
    fetchTeaArts(1);
  }, [fetchTeaArts]);

  // 検索条件変更時の処理
  const handleSearch = useCallback(
    (newConditions: SearchConditions) => {
      setSearchConditions(newConditions);
      fetchTeaArts(1, newConditions); // 1ページ目から検索実行
    },
    [fetchTeaArts]
  );

  // 検索リセット処理
  const handleReset = useCallback(() => {
    const resetConditions = { season: "", tag_id: null, search_text: "" };
    setSearchConditions(resetConditions);
    fetchTeaArts(1, resetConditions); // リセット後に全件取得
  }, [fetchTeaArts]);

  // ページ変更ハンドラ
  const handlePageChange = useCallback(
    (page: number) => {
      fetchTeaArts(page, searchConditions); // 現在の検索条件でページ変更
    },
    [fetchTeaArts, searchConditions]
  );

  // 検索結果があるかどうかの判定（メモ化しておく）
  const hasResults = useMemo(() => {
    const hasSearchConditions =
      !!searchConditions.season ||
      !!searchConditions.tag_id ||
      !!searchConditions.search_text;
    return hasSearchConditions ? teaArts.length > 0 : null;
  }, [searchConditions, teaArts]);

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-5 sm:p-10">
      <Title
        title="Menu"
        subtitle="メニュー"
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
        className="flex max-w-7xl flex-col items-center justify-center space-y-8"
      >
        {/* 説明文 */}
        <div className="text-left sm:text-center">
          こちらではカフェで取り扱っているティーを一覧でご紹介しております。
          <br />
          ティーはすべてこのカフェに訪れたお客様が考案したものとなります。是非、気になるティーをお探しください。
        </div>
        {/* 検索フォーム */}
        <TeaArtSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
          hasResults={hasResults}
          searchConditions={searchConditions}
        />

        {/* ティー一覧表示 */}
        <TeaArtGrid teaArts={teaArts} />

        {/* ページネーション */}
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </motion.div>
    </div>
  );
};

export default TeaArtsListPage;
