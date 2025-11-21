import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { getTeaArts } from "@/api/teaArtApi";
import type { TeaArt, PaginationInfo } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";
import { TeaArtSearchForm } from "./components/TeaArtSearchForm";
import StatusDisplay from "@/shared/components/StatusDisplay";
import TeaArtGrid from "./components/TeaArtGrid";
import Pagination from "@/shared/components/Pagination";

const TeaArtsListPage = () => {
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchConditions, setSearchConditions] = useState({
    season: "",
    tagName: "",
    searchQuery: "",
  });

  // データ取得用
  const fetchTeaArts = async (page: number = 1) => {
    try {
      setLoading(true);
      // ページ番号を渡してデータ取得
      const data = await getTeaArts({ page });

      setTeaArts(data.tea_arts);
      setPagination(data.pagination || null); // undefinedの場合はnullに
    } catch (err) {
      console.error("ティー情報取得エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchTeaArts(1);
  }, []);

  // ページ変更ハンドラ
  const handlePageChange = (page: number) => {
    fetchTeaArts(page);
    // スクロールトップに
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 絞り込み検索の処理
  const filteredTeaArts = useMemo(() => {
    return teaArts.filter((teaArt) => {
      // 季節フィルタ
      if (
        searchConditions.season &&
        teaArt.season !== searchConditions.season
      ) {
        return false;
      }

      // タグフィルタ
      if (searchConditions.tagName) {
        const hasTag = teaArt.tags.some((tag) => tag.name === searchConditions.tagName);
        if (!hasTag) return false;
      }

      // テキスト検索（title と user.name のみ）
      if (searchConditions.searchQuery) {
        const query = searchConditions.searchQuery.toLowerCase();
        const matchesTitle = teaArt.title.toLowerCase().includes(query);
        const matchesCreator = teaArt.user.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCreator) return false;
      }

      return true;
    });
  }, [teaArts, searchConditions]);

  const isFiltered =
    !!searchConditions.season ||
    !!searchConditions.tagName ||
    !!searchConditions.searchQuery;

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-5 sm:p-10">
      <Title title="Menu" subtitle="メニュー" />
      <motion.div
        variants={inVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex max-w-7xl flex-col items-center justify-center space-y-8"
      >
        {/* 説明文 */}
        <div className="text-left sm:text-center">
          こちらではカフェで取り扱っているティーを一覧でご紹介しております。
          <br />
          ティーはすべてこのカフェに訪れたお客様が考案したものとなります。是非、気になるティーをお探しください。
        </div>

        {/* 検索用 */}
        <TeaArtSearchForm
          onSearch={setSearchConditions}
          onReset={() =>
            setSearchConditions({ season: "", tagName: "", searchQuery: "" })
          }
          hasResults={isFiltered ? filteredTeaArts.length > 0 : null}
        />

        {/* メニュー一覧 */}
        <TeaArtGrid teaArts={filteredTeaArts} />

        {/* ページネーション */}
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </motion.div>
    </div>
  );
};

export default TeaArtsListPage;
