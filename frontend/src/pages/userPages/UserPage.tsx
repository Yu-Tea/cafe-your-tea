import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../../shared/components/Avatar";
import { Title } from "../../shared/components/Title";
import { Link } from "react-router-dom";
import { getUser } from "../../api/userApi";
import { User } from "../../types/user";
import TeaArtGrid from "../../shared/components/TeaArtGrid";
import type { TeaArt } from "../../types/teaArt";
import { getTeaArts } from "../../api/teaArtApi";
import { useAuth } from "../../shared/contexts/AuthContext";

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

  if (loading)
    return <div className="loading loading-spinner loading-lg"></div>;
  if (!userDetail) return <div>ユーザーが見つかりません</div>;

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          {/* タイトル */}
          {userDetail.is_owner ? (
            <Title
              title="My Page"
              subtitle={`${userDetail.name}さんのページ`}
            />
          ) : (
            <Title
              title="Tea Artist"
              subtitle={`${userDetail.name}さんのページ`}
            />
          )}

          {/* ユーザー情報 */}
          <div className="flex gap-x-8 text-left">
            <Avatar user={userDetail} className="object-scale-down" />
            <div className="w-full">
              <div className="border-neutral mt-2 mb-5 border-b-1 pb-3">
                <span className="text-3xl font-bold">{userDetail?.name}</span>
              </div>
              <div>{userDetail?.bio}</div>
            </div>
          </div>
        </div>
      </div>
      {/* マイページのときのみ編集ボタン */}
      {userDetail.is_owner && (
        <Link
          to="/users/edit"
          className="btn btn-accent mt-5 px-8 text-base font-normal"
        >
          編集
        </Link>
      )}
      {/* ティーギャラリー */}
      <div className="mt-20 flex items-center justify-center px-10">
        <div className="flex w-full max-w-6xl flex-col gap-y-8">
          <Title
            title="Tea Gallery"
            subtitle={`${userDetail?.name}さんのティー`}
          />
          <TeaArtGrid
            teaArts={teaArts}
            filterByUserId={true}
            userId={userDetail.id} // 🎯 表示対象のユーザーID（URLパラメータから）
            emptyMessage={
              isOwnProfile // 🎯 currentUser.idとuserDetail.idの比較で判定
                ? "まだ作品を投稿していません。"
                : `${userDetail.name}さんの作品はまだありません。`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
