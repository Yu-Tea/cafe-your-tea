import { useEffect, useState } from "react";
import { getTeaArts } from "../../api/teaArt";
import TeaArtGrid from "../../shared/components/TeaArtGrid";
import type { TeaArt } from '../../types/teaArt';
import { Title } from "../../shared/components/Title";


const Menu = () => {
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

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-6xl flex-col gap-y-8">
          <Title title="Menu" subtitle="メニュー" />
          <div className="bg-gray-300 p-4">検索バー</div>

          {/* メニュー一覧 */}
          <TeaArtGrid teaArts={teaArts} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
