import { useEffect, useState } from "react";
import { getTeaArts } from "../../api/teaArtApi";
import TeaArtGrid from "./components/TeaArtGrid";
import type { TeaArt } from "../../types/teaArt";
import { Title } from "../../shared/components/Title";
import { TeaArtSearchForm } from "./components/TeaArtSearchForm";
import StatusDisplay from "../../shared/components/StatusDisplay";

const TeaArtsListPage = () => {
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeaArts = async () => {
      try {
        setLoading(true);
        const data = await getTeaArts();
        setTeaArts(data.tea_arts || data); // APIレスポンスの構造に応じて調整
      } catch (err) {
        console.error("Error fetching tea arts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaArts();
  }, []);

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-7xl flex-col gap-y-8 items-center">
          <Title title="Menu" subtitle="メニュー" />
          {/* 検索用 */}
          <TeaArtSearchForm />
          
          {/* メニュー一覧 */}
          <TeaArtGrid teaArts={teaArts} />
        </div>
      </div>
    </div>
  );
};

export default TeaArtsListPage;
