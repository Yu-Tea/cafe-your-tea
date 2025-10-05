import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeaArt } from "../../api/teaArtApi";

import type { TeaArt } from "../../types/teaArt";
import { Title } from "../../shared/components/Title";
import { FaPenFancy } from "react-icons/fa";
import { DeleteButton } from "./components/DeleteButton";
import TagButtonList from "./components/TagButtonList";
import SeasonText from "./components/SeasonText";
import StatusDisplay from "../../shared/components/StatusDisplay";

const TeaArtDetailPage = () => {
  const [teaArt, setTeaArt] = useState<TeaArt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTeaArt = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getTeaArt(Number(id));
        setTeaArt(response.tea_art);
      } catch (err) {
        setError("作品の取得に失敗しました");
        console.error("TeaArt取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaArt();
  }, [id]);

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  if (error || !teaArt) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error || "作品が見つかりませんでした"}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 text-center">
        <div className="flex items-center justify-center px-10">
          <div className="flex w-full max-w-4xl flex-col gap-y-10">
            <Title title="Menu Details" subtitle="メニュー詳細" />
            <div className="flex flex-col gap-x-6 text-left sm:flex-row">
              <div className="h-[300px] w-[400px] bg-gray-400">画像</div>

              {/* ティー説明 */}
              <div className="flex-1">
                <div className="mb-3 flex items-center space-x-1">
                  {/* 季節 */}
                  <SeasonText teaArt={teaArt} className="mr-2 pt-1 text-2xl" />
                  {/* 温度表記の切り替え */}
                  <>
                    {(teaArt.temperature === "hot" ||
                      teaArt.temperature === "both") && (
                      <span className="badge badge-soft badge-error josefin-sans bg-error/20 pt-1">
                        HOT
                      </span>
                    )}
                    {(teaArt.temperature === "ice" ||
                      teaArt.temperature === "both") && (
                      <span className="badge badge-soft badge-info josefin-sans bg-info/20 pt-1">
                        ICE
                      </span>
                    )}
                  </>
                  {/* 温度表記の切り替えここまで */}
                </div>
                <div className="border-secondary mt-1 mb-2 border-b-1 pb-3 text-4xl font-bold tracking-wider">
                  {teaArt.title}
                </div>
                <div className="text-right">
                  <Link
                    to={`/users/${teaArt.user.id}`}
                    className="link link-hover text-accent textarea-md font-bold"
                  >
                    ティー制作者：{teaArt.user.name}
                  </Link>
                </div>
                <div className="mt-4 mb-6">{teaArt.description}</div>

                {/* タグ */}
                <TagButtonList teaArt={teaArt} />
              </div>
            </div>

            {/* 自作メニューのみ表示の編集・削除ボタン */}
            {teaArt.is_owner && (
              <div className="space-x-3">
                <Link
                  to={`/tea-arts/${teaArt.id}/edit`}
                  className="btn btn-neutral px-5 font-normal"
                >
                  <FaPenFancy />
                  編集
                </Link>
                <DeleteButton
                  teaArtId={teaArt.id}
                  teaArtTitle={teaArt.title}
                  className={`btn-neutral px-5`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 注文 */}
      <div className="my-10 h-[300px] w-full bg-gray-300">注文</div>
      {/* コメント欄 */}
      <div className="container mx-auto py-10 text-center">
        <Title title="Comments" subtitle="ティーを飲んだ方のご感想" />
      </div>
      <div className="text-center">
        <Link to="/tea-arts" className="btn btn-outline btn-primary">
          ← メニューの一覧に戻る
        </Link>
      </div>
    </>
  );
};

export default TeaArtDetailPage;
