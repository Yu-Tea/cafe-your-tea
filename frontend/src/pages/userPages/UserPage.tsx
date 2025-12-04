import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { getUser, getUserTeaArts } from "@/api/userApi";
import { User } from "@/types/user";
import { TeaArt, PaginationInfo } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Avatar } from "@/shared/components/Avatar";
import { Title } from "@/shared/components/Title";
import { Button } from "@/shared/components/Button";
import TeaArtGrid from "@/pages/teaArts/components/TeaArtGrid";
import StatusDisplay from "@/shared/components/StatusDisplay";
import Pagination from "@/shared/components/Pagination";

const UserPage = () => {
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user: currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const animationPlayedRef = useRef(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        const [userData, teaData] = await Promise.all([
          getUser(Number(id)),
          getUserTeaArts(Number(id), { page: 1 }),
        ]);

        setUserDetail(userData);
        setTeaArts(teaData.tea_arts);
        setPagination(teaData.pagination || null);
      } catch (err) {
        console.error("Error fetching data:", err);
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
      const teaData = await getUserTeaArts(Number(id), { page });

      setTeaArts(teaData.tea_arts);
      setPagination(teaData.pagination || null);
    } catch (err) {
      console.error("Error fetching tea arts:", err);
    } finally {
      setLoading(false);
    }
  };

  // 投稿したティーがあるか判別
  const isOwnProfile =
    currentUser && userDetail && currentUser.id === userDetail.id;

  // ローディング状態
  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  if (!userDetail)
    return (
      <StatusDisplay type="empty" message="ユーザーが見つかりませんでした" />
    );

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-5 sm:p-10">
      {/* タイトル */}
      {userDetail.is_owner ? (
        <Title
          title="My Page"
          subtitle={`${userDetail.name}さんのページ`}
          disableAnimation={animationPlayedRef.current}
        />
      ) : (
        <Title
          title="Tea Artist"
          subtitle={`${userDetail.name}さんのページ`}
          disableAnimation={animationPlayedRef.current}
        />
      )}

      <motion.div
        variants={inVariants}
        initial={animationPlayedRef.current ? false : "hidden"}
        animate="visible"
        onAnimationComplete={() => {
          // 一度アニメーションが終わったらフラグを立てる（以降は無効）
          animationPlayedRef.current = true;
        }}
        className="w-full max-w-2xl"
      >
        {/* ユーザー情報 */}
        <div className="flex flex-col items-center gap-x-8 gap-y-3 text-left sm:flex-row">
          <Avatar user={userDetail} className="size-[100px] sm:size-auto" />
          <div className="w-full">
            <div className="border-neutral mb-5 border-b-1 pb-3 text-center text-3xl font-bold sm:text-left">
              {userDetail?.name}
            </div>
            <div>{userDetail?.bio}</div>
          </div>
        </div>
      </motion.div>

      {/* マイページのときのみ編集ボタン */}
      {userDetail.is_owner && (
        <motion.div
          variants={inVariants}
          initial={animationPlayedRef.current ? false : "hidden"}
          animate="visible"
          className="text-center"
        >
          <Link to={`/users/${userDetail?.id}/edit`}>
            <Button variant="st-btn" className="btn-accent">
              プロフィールを編集
            </Button>
          </Link>
        </motion.div>
      )}

      {/* ティーギャラリー */}

      <motion.div
        variants={inVariants}
        initial={animationPlayedRef.current ? false : "hidden"}
        animate="visible"
        className="mt-10 flex max-w-7xl flex-col items-center justify-center space-y-8"
      >
        <Title
          title="Tea Gallery"
          subtitle={`${userDetail?.name}さんのティー`}
          disableAnimation={animationPlayedRef.current}
        />
        <TeaArtGrid
          teaArts={teaArts}
          emptyMessage={
            isOwnProfile
              ? "あなたはまだティーを投稿していません。"
              : `${userDetail.name}さんが作成したティーはまだありません。`
          }
          showCreateLink={isOwnProfile} 
        />

        {/* ページネーション */}
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </motion.div>
    </div>
  );
};

export default UserPage;
