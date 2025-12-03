import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { FaPenFancy, FaUser } from "react-icons/fa";
import { getTeaArt } from "@/api/teaArtApi";
import { Comment } from "@/types/comment";
import { TeaArt } from "@/types/teaArt";
import { inVariants, upVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";
import { Button } from "@/shared/components/Button";
import { TeaDeleteButton } from "./components/TeaDeleteButton";
import TwitterButton from "./components/TwitterButton";
import SmartBackButton from "./components/SmartBackButton";
import TagButtonList from "./components/TagButtonList";
import SeasonText from "./components/SeasonText";
import Order from "./components/Order";
import Comments from "./components/Comments";
import StatusDisplay from "@/shared/components/StatusDisplay";

const TeaArtDetailPage = () => {
  const [teaArt, setTeaArt] = useState<TeaArt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<Comment | null>(null);

  const { id } = useParams<{ id: string }>();
  const teaArtId = Number(id);

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
      <StatusDisplay type="empty" message="ティーが見つかりませんでした" />
    );
  }

  // コメント作成時のコールバック
  const handleCommentCreated = (comment: Comment) => {
    setNewComment(comment);
  };

  // 新規コメントをCommentsで処理したらリセット
  const handleNewCommentProcessed = () => {
    setNewComment(null);
  };

  // 背景画像用に季節の頭文字を小文字に変更
  const seasonKey = teaArt?.season
    ? teaArt.season.charAt(0).toLowerCase() + teaArt.season.slice(1)
    : "";

  // 背景画像を左右どちらに配置するかの判定
  const isAllOrSummerOrWinter = ["all", "summer", "winter"].includes(seasonKey);

  return (
    <>
      {/* ティー情報 */}
      <div
        style={{
          backgroundImage: `url(/images/top_bg_${seasonKey}.png)`,
        }}
        className={`flex flex-col items-center justify-center space-y-10 bg-no-repeat p-5 sm:p-10 ${
          isAllOrSummerOrWinter
            ? "bg-position-[right_top_1rem]"
            : "bg-position-[left_top_1rem]"
        }`}
      >
        <Title title="Tea Details" subtitle="ティーの詳細" />
        <motion.div
          variants={upVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-[600px] space-y-10"
        >
          {/* 画像 */}
          <div className="border-secondary/20 relative aspect-[3/2] w-full overflow-hidden rounded-xl border-1">
            <img
              src={teaArt.image_url}
              alt={teaArt.title}
              className="absolute h-full w-full object-cover"
            />
            <img
              src="/images/bg_table_big.webp"
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

            {/* タイトル */}
            <div className="border-secondary mt-1 mb-2 border-b-1 pb-3 text-4xl font-bold tracking-wider">
              {teaArt.title}
            </div>

            {/* 制作者 */}
            <Link
              to={`/users/${teaArt.user.id}`}
              className="link link-hover text-accent textarea-md flex items-center font-bold sm:justify-end"
            >
              <FaUser className="mr-1" />
              ティー制作者：{teaArt.user.name}
            </Link>

            <div className="mt-4 whitespace-pre-wrap">{teaArt.description}</div>

            {/* タグ */}
            <TagButtonList teaArt={teaArt} className={`mt-5 space-x-4`} />

            {/* 自作メニューのみ表示のボタン3つ */}
            {teaArt.is_owner && (
              <div className="mt-5 flex w-full justify-center space-x-2 sm:justify-end">
                <TwitterButton
                  teaArtId={teaArt.id}
                  teaArtTitle={teaArt.title}
                  className={`btn-accent gap-0.5 px-5`}
                />
                <Link to={`/tea-arts/${teaArt.id}/edit`}>
                  <Button variant="st-btn" className="btn-neutral px-5">
                    <FaPenFancy />
                    編集
                  </Button>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <TeaDeleteButton
                    teaArtId={teaArt.id}
                    teaArtTitle={teaArt.title}
                    className={`btn-neutral btn-outline px-5`}
                    redirectAfterDelete={true}
                  />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 注文 */}
      <motion.div
        variants={inVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Order teaArt={teaArt} onCommentCreated={handleCommentCreated} />
      </motion.div>
      {/* コメント欄 */}
      <Comments
        teaArtId={teaArtId}
        newComment={newComment}
        onNewCommentProcessed={handleNewCommentProcessed}
      />

      {/* 戻るorTOPに移動ボタン */}
      <motion.div
        variants={upVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 mb-5 text-center"
      >
        <SmartBackButton />
      </motion.div>
    </>
  );
};

export default TeaArtDetailPage;
