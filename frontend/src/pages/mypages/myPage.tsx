import { useAuth } from "../../shared/contexts/AuthContext";
import { Avatar } from "../../shared/components/Avatar";
import { Title } from "../../shared/components/Title";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <Title title="My Page" subtitle={`${user?.name}さんのページ`} />
          {/* ユーザー情報 */}
          <div className="flex gap-x-8 text-left">
            <Avatar user={user} />
            <div className="w-full">
              <div className="mt-2 mb-5 border-b-1 pb-3 border-neutral">
                <span className="text-3xl font-bold">{user?.name}</span>
              </div>
              <div>{user?.bio}</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-accent px-8 text-base font-normal">
        編集
      </button>

      {/* ティーギャラリー */}
      <div className="mt-20 flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <Title title="Tea Gallery" subtitle={`${user?.name}さんのティー`} />
          <div>未作成です。Tea Artから作成しよう！</div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
