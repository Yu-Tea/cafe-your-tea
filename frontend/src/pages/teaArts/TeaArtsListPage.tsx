import { useEffect, useState, useMemo } from "react";
import { getTeaArts } from "../../api/teaArtApi";
import TeaArtGrid from "./components/TeaArtGrid";
import type { TeaArt } from "../../types/teaArt";
import { Title } from "../../shared/components/Title";
import { TeaArtSearchForm } from "./components/TeaArtSearchForm";
import StatusDisplay from "../../shared/components/StatusDisplay";

const TeaArtsListPage = () => {
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchConditions, setSearchConditions] = useState({
    season: "",
    tagName: "",
    searchQuery: "",
  });

  useEffect(() => {
    const fetchTeaArts = async () => {
      try {
        setLoading(true);
        const data = await getTeaArts();
        setTeaArts(data.tea_arts);
      } catch (err) {
        console.error("ティー情報取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaArts();
  }, []);

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
        const hasTag = teaArt.tag_names.includes(searchConditions.tagName);
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
    <div className="py-10 text-center">
      <div className="flex items-center justify-center px-6 sm:px-10">
        <div className="flex max-w-7xl flex-col items-center gap-y-8">
          <Title title="Menu" subtitle="メニュー" />

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
        </div>
      </div>
    </div>
  );
};

export default TeaArtsListPage;
