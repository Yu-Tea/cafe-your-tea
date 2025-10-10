import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeaArt } from "../../api/teaArtApi";

import type { TeaArt } from "../../types/teaArt";
import { Title } from "../../shared/components/Title";
import { FaPenFancy } from "react-icons/fa";
import { DeleteButton } from "./components/DeleteButton";
import TwitterButton from "./components/TwitterButton";
import TagButtonList from "./components/TagButtonList";
import SeasonText from "./components/SeasonText";
import StatusDisplay from "../../shared/components/StatusDisplay";
import Order from "./components/Order";

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
          <div className="flex w-full max-w-[600px] flex-col items-center gap-y-10">
            <Title title="Menu Details" subtitle="メニュー詳細" />
            {/* 画像 */}
            <div className="border-secondary/20 relative aspect-[3/2] w-full overflow-hidden rounded-xl border-1">
              <img
                src={teaArt.image_url}
                alt={teaArt.title}
                className="absolute h-full w-full object-cover"
              />
              <img
                src="../images/bg_table_big.png"
                alt="テーブル"
                className="h-full w-full object-cover"
              />
            </div>

            {/* ティー説明 */}
            <div className="w-full text-left">
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
              <div className="mt-4">{teaArt.description}</div>

              {/* タグ */}
              <TagButtonList teaArt={teaArt} className={`mt-5 space-x-4`} />

              {/* 自作メニューのみ表示のボタン3つ */}
              {teaArt.is_owner && (
                <div className="mt-5 w-full space-x-2 text-right">
                  <TwitterButton
                    teaArtId={teaArt.id}
                    teaArtTitle={teaArt.title}
                    className={`btn-accent gap-0.5 px-5`}
                  />
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
                    className={`btn-neutral btn-outline px-5`}
                    redirectAfterDelete={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 注文 */}
      <Order teaArt={teaArt} />

      {/* コメント欄 */}

      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-y-6 px-5">
          <Title title="Comments" subtitle="ティーを飲んだ方のご感想" />
          <div className="sm:border-secondary/20 w-full max-w-3xl space-y-3 rounded-xl py-4 sm:border-1 sm:px-8">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10">
                  <img alt="アバター画像" src="../images/avatar_user1.png" />
                </div>
              </div>
              <div className="chat-header text-secondary">てすと名前さん</div>
              <div className="chat-bubble max-w-full px-5 py-4 text-sm">
                あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="../images/avatar_user2.png"
                  />
                </div>
              </div>
              <div className="chat-header text-secondary">てすと名前さん</div>
              <div className="chat-bubble max-w-full px-5 py-4 text-sm">
                おいしかったです！また飲みにきますね〜
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="mt-15 mb-5 text-center">
        <Link to="/tea-arts" className="btn btn-outline btn-primary">
          ← メニューの一覧に戻る
        </Link>
      </div>
    </>
  );
};

export default TeaArtDetailPage;
