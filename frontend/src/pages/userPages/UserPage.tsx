import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "@/api/userApi";
import { getTeaArts } from "@/api/teaArtApi";
import { User } from "@/types/user";
import { TeaArt } from "@/types/teaArt";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Avatar } from "@/shared/components/Avatar";
import { Title } from "@/shared/components/Title";
import { Button } from "@/shared/components/Button";
import TeaArtGrid from "@/pages/teaArts/components/TeaArtGrid";
import StatusDisplay from "@/shared/components/StatusDisplay";

const UserPage = () => {
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [teaArts, setTeaArts] = useState<TeaArt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user: currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  const isOwnProfile =
    currentUser && userDetail && currentUser.id === userDetail.id;

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const data = await getUser(Number(id));
        setUserDetail(data);
        const teaData = await getTeaArts();
        setTeaArts(teaData.tea_arts);
      } catch (err) {
        console.error("Error fetching user detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [id]);

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
        <Title title="My Page" subtitle={`${userDetail.name}さんのページ`} />
      ) : (
        <Title title="Tea Artist" subtitle={`${userDetail.name}さんのページ`} />
      )}

      <div className="w-full max-w-2xl">
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
      </div>

      {/* マイページのときのみ編集ボタン */}
      {userDetail.is_owner && (
        <div className="text-center">
          <Link to={`/users/${userDetail?.id}/edit`}>
            <Button variant="btn" className="btn-accent">
              プロフィールを編集
            </Button>
          </Link>
        </div>
      )}

      {/* ティーギャラリー */}

      <div className="mt-10 max-w-7xl space-y-8">
        <Title
          title="Tea Gallery"
          subtitle={`${userDetail?.name}さんのティー`}
        />
        <TeaArtGrid
          teaArts={teaArts}
          filterByUserId={true}
          userId={userDetail.id}
          emptyMessage={
            isOwnProfile
              ? "まだ作品を投稿していません。"
              : `${userDetail.name}さんの作品はまだありません。`
          }
        />
      </div>
    </div>
  );
};

export default UserPage;
